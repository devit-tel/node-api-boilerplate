import {
  HttpMethod,
  route
} from '@spksoft/koa-decorator'
import yup from 'yup'
import validate from '@spksoft/koa-validator-decorator'
import User from '../../../models/user/user.repository'

@route('/v1/hello-world')
export default class HelloWorldController {
  @route('/', HttpMethod.POST)
  @validate({
    body: yup.object().shape({
      username: yup.string().required(),
      password: yup.string().required()
    })
  })
  async main (ctx) {
    const { username, password } = ctx.request.body
      await User.create({
        username,
        password
      })

    ctx.body = {
      'hello': 'world'
    }
  }
}
