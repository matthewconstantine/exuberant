import invariant from 'invariant'
import nodePath from 'path'
import fs from 'fs-extra'
import FileSystemParent from './FileSystemParent'

const NEW = 'NEW'
const CREATED = 'CREATED'

class Dir extends FileSystemParent {
  constructor(root, props) {
    super(root, props)
    this.status = NEW
    this.rename = null
  }

  removeSelf(parentPath) {
    const path = nodePath.join(parentPath, this.props.name)
    console.log(`[Remove Directory]: ${path}`)
    fs.removeSync(path)
  }

  commitUpdate(oldProps, newProps) {
    if (oldProps.name !== newProps.name) {
      this.rename = {
        old: oldProps.name,
        new: newProps.name,
      }
      console.log(
        `(Rename Directory Prepared): \n  from: ${oldProps.name}\n  to: ${
          newProps.name
        }`
      )
    }
  }

  render(parentPath, appPath) {
    let path
    invariant(
      typeof parentPath !== 'undefined',
      'props.path was not passed down from parent'
    )
    invariant(
      typeof this.props.name !== 'undefined',
      'Dir does not have props.name'
    )
    if (this.rename) {
      const oldFilePath = nodePath.join(parentPath, this.rename.old)
      path = nodePath.join(parentPath, this.rename.new)
      console.log(`[Rename Directory]: \n  from: ${oldFilePath}\n  to: ${path}`)
      fs.renameSync(oldFilePath, path)
      this.rename = null
    } else {
      path = nodePath.join(parentPath, this.props.name)
      if (this.status === NEW) {
        console.log(`[Create Directory]: `, path)
        fs.ensureDirSync(path)
      }
      this.status = CREATED
    }
    this.renderChildren(path, appPath)
  }
}

export default Dir
