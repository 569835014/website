import {controller, get, post, required} from '../decorator/router'
import mongoose from 'mongoose'

const User = mongoose.model('User')
import UserService from '../service/UserService'

@controller('/admin')
export class AdminContorller {
    @post('/login')
    @required({body: []})
    async login(ctx, next) {

        let {account, password} = ctx.request.body;
        let data = await UserService.login(account, password, ctx)
        return ctx.body = data
    }

    @post('/register')
    @required({body: ['account', 'password', 'code']})
    async register(ctx, next) {
        let {account, password, code} = ctx.request.body
        let data = await UserService.register({account, password, code}, ctx)
        return ctx.body = data
    }
}
