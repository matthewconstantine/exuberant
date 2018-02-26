let volume
let ledger

export default {
  resetMock: () => {
    volume = {}
    ledger = []
  },

  ensureDirSync: path => {
    volume[path] = true
    ledger.push({ action: 'ensureDirSync', path })
  },

  renameSync: (oldPath, newPath) => {
    volume[newPath] = volume[oldPath]
    delete volume[oldPath]
    ledger.push({ action: 'renameSync', oldPath, newPath })
  },

  writeFileSync: (path, contents) => {
    volume[path] = contents
    ledger.push({ action: 'writeFileSync', contents })
  },

  copySync: (src, dest) => {
    volume[dest] = src
    ledger.push({ action: 'copySync', src, dest })
  },

  removeSync: path => {
    delete volume[path]
    ledger.push({ action: 'removeSync', path })
  },

  pathExists: path => Boolean(volume[path]),

  getPath: path => volume[path],

  snapshot: () => ({ volume, ledger }),
}
