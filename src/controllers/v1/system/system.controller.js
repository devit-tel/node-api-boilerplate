import {
    HttpMethod,
    route
  } from '@spksoft/koa-decorator'
import yup from 'yup'
import mongoose from 'mongoose'
  
  @route('/v1/system')
  export default class HelloWorldController {
    @route('/health', HttpMethod.GET)
    async health (ctx) {
      ctx.body = {
        databaseStatus: mongoose.connection.readyState
      }
    }
  }
  