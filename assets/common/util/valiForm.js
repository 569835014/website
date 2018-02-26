class ValiForm{
    static builtIn={
        emil:{
            rule:[],
            msg:"输入的邮箱格式不正确",
            join:""
        },
        idCard:{},
        phone:{},
        acction:{}
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

    /************
     * 验证单个表单字段
     * @param Field
     * type:内置类型
     * rule:自定义规则
     * msg:错误信息
     * value:待验证字段的值
     * join:连接符 and 或者 or
     */
    valiField(Field){

    }
    valiReg(str,reg){
        return reg.test(str)
    }

}

export default ValiForm