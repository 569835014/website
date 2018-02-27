class ValiForm{
    static builtIn={
        emil:'',
        idCard:'',
        phone:'',
        acction:''
    }
    constructor(rules){
        //内置验证函数
        this.inFun={
            minLength(str,boundary){},
            maxLength(str,boundary){}
        }
        this.builtIn=Object.assign({},ValiForm.builtIn,rules)
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
        if(rules.join==='and'){
            for(let i=0;i<len;i++){
                let item=rules[i];
                switch (item.type){
                    case 'patter':
                        flag=this.valiRegArr(Field.value,item.rule);
                        break
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
                        break
                }
                if(flag){
                    return {
                        success:true,
                        msg:item.msg
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
    extract(str){
        let regex="\\((.+?)\\)";
        let  arr=str.match(regex);
        if(arr.length>1){
            if(arr[1].indexOf(',')>0){
                return arr[1].split(',')
            }
            return arr[1]
        }
        return null
    }

}

export default ValiForm