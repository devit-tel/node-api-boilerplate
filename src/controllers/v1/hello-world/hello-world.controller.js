import {
  HttpMethod,
  route,
} from '@spksoft/koa-decorator';

@route('/v1/hello-world')
export default class HelloWorldController{

  @route('/', HttpMethod.GET)
  async main(ctx) {
    ctx.body = {
      'hello': 'world'
    };
  }
}
