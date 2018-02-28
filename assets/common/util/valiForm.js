class ValiForm{


    constructor(rules){
        //内置验证函数
         this.builtIn={
            email:/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
            idCard:/^[1-9]\\d{7}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}$|^[1-9]\\d{5}[1-9]\\d{3}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}([0-9]|X)$/,
            phone:/^[1][3,4,5,7,8][0-9]{9}$/
        }
        this.inFun={
            //最小长度
            minLength(val,boundary){
                return !(val.length<boundary)
            },
            //最大长度
            maxLength(val,boundary){
                return !(val.length>boundary)
            },
            between(val,...arg){
                let len=arg.length;
                if(len===0) return true
                else if(len===1) return val>=arg[0];
                else  return (val>=arg[0]&&val<=arg[1])
            },
            required(val){
                if(val){
                    return true
                }
                return false
            }
        }
        this.builtIn=Object.assign({},this.builtIn,rules)
    }
    form(data,only=false){
        let keys=Object.keys(data)
        if(only) return this.isOnlyModel(keys,data);
        return this.unOnlyModel(keys,data);
    }
    unOnlyModel(keys,data){
        let res={}
        let len=keys.length;
        for(let i=0;i<len;i++){
            let key=keys[i]
            let item=data[key];
            let result=this.valiField(item)
            if(!res.success){
                res[key]=result
            }
        }
        return res
    }
    isOnlyModel(keys,data){
        let len=keys.length;
        for(let i=0;i<len;i++){
            let key=keys[i]
            let item=data[key];
            let res=this.valiField(item)
            if(!res.success){
                return {
                    [key]:res
                }
            }
        }
    }
    //验证单个属性单个规则是否合法（and）
    isOnlyRule(){}
    //验证单个属性单个规则是否合法（or）
    unOnlyRule(){}

    /*****
     * 验证单个表单字段
     * @param key
     * @param Field
     * type:内置类型
     * rule:自定义规则
     * value:待验证字段的值
     * join:连接符 and 或者 or
     */
    valiField(Field){
        let rules=Field.rules;
        let len=rules.length;
        let flag=false;
        if(Field.join==='and'){
            for(let i=0;i<len;i++){
                let item=rules[i];
                switch (item.type){
                    case 'patter':
                        flag=this.valiRegArr(Field.value,item.rule);
                        break;
                    case 'inFun':
                        flag=this.evalInFun(Field.value,item.rule)
                        break;
                    case 'outFun':
                        flag=this.evalOutFun(Field.item.rule)
                }
                if(!flag){
                    return {
                        success:false,
                        msg:item.msg
                    }
                }
            }
            return {
                success:true
            }
        }else{
            let res={
                success:true,
                msg:''
            }
            for(let i=0;i<len;i++){
                let item=rules[i];
                switch (item.type){
                    case 'patter':
                        flag=this.valiRegArr(Field.value,item.rule);
                        break;
                    case 'inFun':
                        flag=this.evalInFun(Field.value,item.rule)
                        break;
                    case 'outFun':
                        flag=this.evalOutFun(Field.item.rule)

                }
                if(flag){
                    return {
                        success:true,
                    }
                }else{
                    res={
                        success:flag,
                        msg:item.msg
                    }
                }
            }
            return res
        }
    }

    /*****
     *
     * @param str
     * @param patter
     * @param join
     * @returns {*}
     */
    valiRegArr(str,patter,join){
        if(patter.indexOf(',')<0){

            if(this.builtIn[patter]){
                patter=this.builtIn[patter]
            }
            return this.valiReg(str,patter)
        }
        let patterArr=patter.split(',');
        let len=patterArr.length;
        if(join==='and'){
            for(let i=0;i<len;i++){
                if(this.valiReg(str,patterArr[i])) return false
            }
            return true
        }
    }
    valiReg(str,reg){
        return reg.test(str)
    }

    /****
     * 例如 minLength(4),maxLength(8),between(4,5) 这种字符串函数
     * 提取括号里面的内容
     * @param str
     */
    extractReg(str){
        let regex="\\((.+?)\\)";
        let  arr=str.match(regex);
        if(!arr) return null
        if(arr.length>1){
            if(arr[1].indexOf(',')>0){
                return arr[1].split(',')
            }
            return arr[1]
        }
        return null
    }

    /*****
     * 提取函数名
     * @param str
     * @returns {*}
     */
    extractFun(str){
        let len=str.indexOf('(');
        if(len<0) return str
        return str.substring(0,len)
    }

    /*****
     * 执行内置函数
     * @param val
     * @param str
     * @returns {*}
     */
    evalInFun(val,str){
        let fun=this.inFun[this.extractFun(str)];

        if(fun){
            let arg=this.extractReg(str);
            if(arg){
                if(arg instanceof Array){
                    return fun(val,...arg);
                }
                return fun(val,arg);
            }
            return fun(val);
        }
        return true
    }

    async evalOutFun(Filed,str){
        if(typeof str==='function'){
            return await str(Filed)
        }
        return false
    }

}

export default ValiForm