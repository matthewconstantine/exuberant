import invariant from 'invariant'
import nodePath from 'path'

// Note: This is a host component not a React component. It's created
// by the renderer (render.js) and updated by the reconciler (FileSystemRenderer)

// const NEW = 'NEW'
// const CREATED = 'CREATED'

class HostComponent {
  constructor(root, props, options) {
    this.props = props
    this.children = []
    this.childrenToDelete = []
    this.rename = null
    // this.status = NEW
    this.onRename = options.onRename
    this.onRenderChildren = options.onRenderChildren
    this.onCreate = options.onCreate
    this.onCreateWithContents = options.onCreateWithContents
    this.onDelete = options.onDelete
    this.type = options.type
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

  insertBefore(child, beforeChild) {
    const index = this.children.indexOf(beforeChild)
    this.children.splice(index, 0, child)
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
    console.log(`[Remove ${this.type}]: ${path}`)
    this.onDelete(path)
  }

  commitUpdate(oldProps, newProps) {
    if (oldProps.name !== newProps.name) {
      this.rename = {
        old: oldProps.name,
        new: newProps.name,
      }
      console.log(
        `(Rename ${this.type} Prepared): \n  from: ${oldProps.name}\n  to: ${
          newProps.name
        }`
      )
    }
  }

  render(parentPath) {
    let path
    invariant(
      typeof parentPath !== 'undefined',
      'props.path was not passed down from parent'
    )
    invariant(
      typeof this.props.name !== 'undefined' || this.type === 'PROJECT',
      `${this.type} does not have props.name`
    )
    if (this.rename) {
      const oldFilePath = nodePath.join(parentPath, this.rename.old)
      path = nodePath.join(parentPath, this.rename.new)
      console.log(
        `[Rename ${this.type}]: \n  from: ${oldFilePath}\n  to: ${path}`
      )
      this.onRename(oldFilePath, path)
      this.rename = null
    } else {
      path = nodePath.join(parentPath, this.props.name || '')
    }
    this.removeDeletedChildren(path)
    console.log(`[Create ${this.type}]: `, path)
    if (this.onCreate) this.onCreate(path)
    const contents = this.onRenderChildren(this.children, path)
    if (this.onCreateWithContents) this.onCreateWithContents(path, contents)
  }
}

export default HostComponent
