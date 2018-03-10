import invariant from 'invariant'

// Base Class for host components which manage children.
//
// Background: Host components are different than React components. They are created
// by the custom createElement (src/createElement.js) and updated by the
// reconciler (FileSystemRenderer)

class FileSystemParent {
  constructor(root, props) {
    this.props = props
    this.children = []
    this.rename = null
    this.childrenToDelete = []
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

  renderChildren(path, appPath) {
    this.removeDeletedChildren(path)
    this.children.forEach(child => {
      invariant(
        typeof child.render === 'function',
        `Exuberant HostComponents can only render components with a render method. Found \`${child}\` instead.`
      )
      child.render(path, appPath)
      if (this.props.didRender) this.props.didRender(path)
    })
  }
}

export default FileSystemParent
