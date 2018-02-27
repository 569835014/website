class ValiForm{
    static builtIn={
        emil:'',
        idCard:'',
        phone:'',
        acction:''
    }
    constructor(rules){
        this.builtIn=Object.assign({},ValiForm.builtIn,rules)
    }
    form(data,only=false){
        let keys=Object.keys(data)
        if(only) return this.isOnlyModel(keys,data);
        return this.unOnlyModel(keys,data);
    }
    field(){

    }
    //
    unOnlyModel(keys,data){}
    isOnlyModel(keys,data){
        let len=keys.length;
        for(let i=0;i<len;i++){
            let item=data[i];

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

}

export default ValiForm