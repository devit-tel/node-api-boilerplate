import {
  mainImplementor,
} from './implementor'

export const main = async (ctx, next) => {
  ctx.body = await mainImplementor()
}
