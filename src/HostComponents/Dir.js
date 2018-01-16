import fs from 'fs-extra'
import invariant from 'invariant'
import HostComponent from './HostComponent'

export default (root, props) =>
  new HostComponent(root, props, {
    type: 'DIR',
    onCreate: path => fs.ensureDirSync(path),
    onDelete: path => fs.removeSync(path),
    onRename: (oldPath, newPath) => fs.renameSync(oldPath, newPath),
    onRenderChildren: (children, path) =>
      children.forEach(child => {
        invariant(
          child.type === 'DIR' ||
            child.type === 'FILE' ||
            child.type === 'PROJECT',
          `<dir> can only render host components like <dir> and <file>. Found \`${child}\` instead.`
        )
        child.render(path)
      }),
  })
