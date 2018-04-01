import BaseSchema from '../base/base'
import bcryptjs from 'bcryptjs'
const SALT_WORK_FACTOR=10;
const Max_LOGIN_ATTEMPTS=5;
const LOCK_TIME=2*60*60*1000
class User extends BaseSchema {
    constructor() {
        const config = {
            role:{
                type:String,
                default:'user'
            },
            phone: String,
            account: String,
            openid: [String],
            unionId: String,
            nickname: String,
            address: String,
            province: String,
            country: String,
            city: String,
            sex: String,
            email: String,
            headImgUrl: String,
            avatarUrl: String,
            password: String,
            hashed_password: String,
            loginAttempts: {
                type: Number,
                require: true,
                default: 0
            },
            lockUtil: Number,
        }
        super(config, "User")
    }
    pre(){
        super.pre();
        this.schema.virtual('isLocked').get(function () {
            return !!(this.lockUtil&&this.lockUtil>Date.now())
        })
        this.schema.pre('save',function (next) {
            let user=this;
            if(!user.isModified('password')) return next()
            bcryptjs.genSalt(SALT_WORK_FACTOR,(err,salt)=>{
                if(err) return next(err)
                bcryptjs.hash(user.password,salt,(err,hash)=>{
                    if(err) return next(err);
                    user.password=hash;
                    next()
                })
            })
        });
        this.schema.methods={
            comparePassword:function (_password,password) {
                return new Promise((resolve,reject)=>{
                    bcryptjs.compare(_password,password,function (err,isMatch) {
                        if(!err) resolve(isMatch);
                        else reject(err)
                    })
                })
            },
            incLoginAttempts:function (user) {
                const that=this
                return new Promise((resolve,reject)=>{
                    if(that.lockUntil&&that.lockUntil<Date.now()){
                        that.update({
                            $set:{
                                loginAttempts:1
                            },
                            $unset:{
                                lockUntil:1
                            }
                        },function (err) {
                            if(!err) resolve(true);
                            else reject(err)
                        })
                    }else{
                        let updates={
                            $inc:{
                                loginAttempts:1
                            }
                        }
                        if(that.loginAttempts+1>=Max_LOGIN_ATTEMPTS&&!that.isLocked){
                            updates.$set={
                                lockUtil:Date.now()+LOCK_TIME
                            }
                        }
                        that.update(updates,err=>{
                            if(!err) resolve(true)
                            else reject(err)
                        })
                    }
                })
            }
        }
    }
}

const Model = new User().entity()
export default Model
