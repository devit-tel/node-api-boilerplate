import { readdir, statSync } from 'fs-extra'
import R from 'ramda'
import { join } from 'path'

export const deepScanFiles = async (path, regex = /.*\.js/is) => {
  const list = await readdir(path)
  const statsList = list.map(file => ({ file, stat: statSync(join(path, file)) }))
  const dirs = statsList.filter(({ stat }) => stat.isDirectory())
  const matchFiles = statsList
    .filter(({ file, stat }) => !stat.isDirectory() && regex.test(file))
    .map(({ file }) => join(path, file))
  if (dirs.length) {
    return [
      ...matchFiles,
      ...(await Promise.all(dirs.map(({ file }) => deepScanFiles(join(path, file), regex)))),
    ]
  }
  return matchFiles
}

export const flatedDeepScanFiles = async (path, regex = /.*\.js/is) =>
  R.flatten(await deepScanFiles(path, regex))

export default async (path, regex = /.*\.js/is) => {
  const files = await flatedDeepScanFiles(path, regex)
  return files.map(require)
}
