import invariant from 'invariant'
import nodePath from 'path'
import fs from 'fs-extra'

// Note: This is a host component not a React component. It's created
// by the renderer (render.js) and updated by the reconciler (FileSystemRenderer)

const NEW = 'NEW'
const CREATED = 'CREATED'

class Dir {
  constructor(root, props) {
    this.props = props
    this.children = []
    this.rename = null
    this.childrenToDelete = []
    this.status = NEW
  }

  // Called by FileSystemRenderer
  appendChild(child) {
    this.children.push(child)
  }

  // Called by FileSystemRenderer
  removeChild(child) {
    const index = this.children.indexOf(child)
    this.children.splice(index, 1)
    this.childrenToDelete.push(child)
  }

  // Called from within the render loop (because only it knows the parentPath)
  removeDeletedChildren(parentPath) {
    this.childrenToDelete.forEach(
      child => child.removeSelf && child.removeSelf(parentPath)
    )
    this.childrenToDelete = []
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

  renderChildren(path) {
    this.removeDeletedChildren(path)
    this.children.forEach(child => {
      invariant(
        typeof child.render === 'function',
        `Dir can only render components with a render method. Found \`${child}\` instead.`
      )
      child.render(path)
    })
  }

  render(parentPath) {
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
    this.renderChildren(path)
  }
}

export default Dir
