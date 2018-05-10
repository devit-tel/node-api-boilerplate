import yup from 'yup'
import {
    ValidationError,
} from '../error'

export default function(yupConfig) {
    return (target, key, descriptor) => {
        const { query, body, params } = yupConfig
        const validate = async (ctx, next) => {
            const validateQuery = (query) ? (await query.isValid(ctx.query)) : true
            const validateBody = (body) ? (await body.isValid(ctx.request.body)) : true
            const validateParams = (params) ? (await params.isValid(ctx.params)) : true
            if (validateQuery && validateBody && validateParams) {
            } else {
                throw new ValidationError('User Input Validate Error', {
                    validateQuery,
                    validateBody,
                    validateParams,
                })
            }
        }
        let oldDescriptor = descriptor.value
        descriptor.value = async function(...args) {
            await validate(args[0])
            await oldDescriptor(...args)
        }
        return descriptor
    }
}
