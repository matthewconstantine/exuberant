import fs from 'fs-extra'
import HostComponent from './HostComponent'

export default (root, props) =>
  new HostComponent(root, props, {
    type: 'FILE',
    onCreateWithContents: (path, contents) => fs.writeFileSync(path, contents),
    onDelete: path => fs.removeSync(path),
    onRename: (oldPath, newPath) => fs.renameSync(oldPath, newPath),
    onRenderChildren: children => children.map(child => child.text).join('\n'),
  })
