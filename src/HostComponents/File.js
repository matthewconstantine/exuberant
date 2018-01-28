import invariant from 'invariant'
import nodePath from 'path'
import fs from 'fs-extra'
// Note: This is a host component not a React component. It's created
// by the renderer (render.js) and updated by the reconciler (FileSystemRenderer)

class File {
  constructor(root, props) {
    // console.log('(construct File)', arguments)
    this.name = props.name
    this.children = []
    this.rename = null
  }

  appendChild(child) {
    // console.log('(File appendChild)', child)
    this.children.push(child)
  }

  removeChild(child) {
    // console.log('(File removeChild)', child)
    const index = this.children.indexOf(child)
    this.children.splice(index, 1)
  }

  // TODO: This might not be necessary anymore. React doesn't seem to be calling it
  // now that we represent `text` as `{ text }` objects
  insertBefore(child, beforeChild) {
    const index = this.children.indexOf(beforeChild)
    this.children.splice(index, 0, child)
  }

  commitUpdate(oldProps, newProps) {
    if (oldProps.name !== newProps.name) {
      this.rename = {
        old: oldProps.name,
        new: newProps.name,
      }
      console.log(
        `(Rename File Prepared): \n  from: ${oldProps.name}\n  to: ${
          newProps.name
        }`
      )
    }
  }

  removeSelf(parentPath) {
    const path = nodePath.join(parentPath, this.name)
    console.log(`[Removing file:] ${path}`)
    fs.removeSync(path)
  }

  renderChildren() {
    return this.children.map(child => child.text)
  }

  // TODO: This could be optimized for updates with both a new name and contents
  render(parentPath) {
    let path
    invariant(
      typeof this.name !== 'undefined',
      'File node was not provided props.name'
    )
    if (this.rename) {
      const oldFilePath = nodePath.join(parentPath, this.rename.old)
      path = nodePath.join(parentPath, this.rename.new)
      console.log(`[Rename File]: \n  from: ${oldFilePath}\n  to: ${path}`)
      fs.renameSync(oldFilePath, path)
      this.name = this.rename.new
      this.rename = null
    } else {
      path = nodePath.join(parentPath, this.name)
    }
    const contents = this.renderChildren()
    console.log(`[Render file with name:] ${path}`)
    console.log(`  ${contents.join('\n  ')}`)
    fs.writeFileSync(path, contents.join('\n'))
    return contents
  }
}

export default File
