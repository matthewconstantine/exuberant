import invariant from 'invariant'
import nodePath from 'path'
import fs from 'fs-extra'

// Note: This is a host component not a React component. It's created
// by the renderer (render.js) and updated by the reconciler (FileSystemRenderer)

class Project {
  constructor() {
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

  renderChildren(path) {
    this.removeDeletedChildren(path)
    this.children.forEach(child => {
      // TODO: is this necessary
      invariant(
        typeof child.render === 'function',
        `Dir can only render components with a render method. Found \`${child}\` instead.`
      )
      child.render(path)
    })
  }

  render(parentPath) {
    invariant(
      typeof parentPath !== 'undefined',
      'props.path was not passed down from parent'
    )
    this.renderChildren(parentPath)
  }
}

export default Project
