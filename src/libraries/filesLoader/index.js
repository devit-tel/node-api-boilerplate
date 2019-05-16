import walker from 'walker'

export const deepScanFiles = (path, regex) =>
  new Promise((resolve, reject) => {
    const files = []
    walker(path)
      .on('file', (file, stat) => {
        if (regex.test(file)) files.push(stat)
      })
      .on('error', error => {
        reject(error)
      })
      .on('end', () => {
        resolve(files)
      })
  })

export default async (path, regex = /.*/g) => {
  const files = await deepScanFiles(path, regex)
  for (const file of files) {
    require(file)
  }
}
