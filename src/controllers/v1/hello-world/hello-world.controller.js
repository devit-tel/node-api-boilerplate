import {
  HttpMethod,
  route,
} from '@spksoft/koa-decorator';
import yup from 'yup'
import validate from '../../../libraries/koa-validator-decorators'

@route('/v1/hello-world')
export default class HelloWorldController{

  @route('/', HttpMethod.POST)
  // @validate({
  //   body: yup.object().shape({
  //     name: yup.number().required(),
  //   }),
  // })
  async main(ctx) {
    ctx.body = {
      'hello': 'world'
    };
  }
}
