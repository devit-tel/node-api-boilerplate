import errors from '../../../../../errors'

export default (hello, world, eiei = '💩') => {
  if (hello.toLowerCase() === 'bye') {
    throw new errors.InternalServerError('You can\'t say "Bye"')
  }

  if (!world) {
    throw new errors.BadRequest('"world" cannot be empty')
  }

  return `${hello} ${world} ${eiei}`
}
