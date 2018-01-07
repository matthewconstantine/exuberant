import invariant from 'invariant'
import nodePath from 'path'

// Note: This is a host component not a React component. It's created
// by the renderer (render.js) and updated by the reconciler (FileSystemRenderer)

class File {
  constructor(root, props) {
    console.log('props', props)
    this.name = props.name
    this.children = []
  }

  appendChild(child) {
    console.log('(File appendChild)', child)
    this.children.push(child)
  }

  removeChild(child) {
    console.log('(File removeChild)', child)
    const index = this.children.indexOf(child)
    this.children.splice(index, 1)
  }

  insertBefore(child, beforeChild) {
    const index = this.children.indexOf(beforeChild)
    this.children.splice(index, 0, child)
  }

  renderChildren() {
    return this.children.map(child => {
      if (typeof child === 'string') {
        console.log(`(Adding String): ${child}`)
        return child
      } else if (typeof child === 'function') {
        console.log(`(Add String to from function)`)
        return child()
      } else if (typeof child.render === 'function') {
        console.log(`(Add String to from child.render)`)
        return child.render()
      } else if (typeof child.text !== 'undefined') {
        return child.text
      }
      invariant(false, `File Could not render: ${child}`)
    })
  }

  render(parentPath) {
    invariant(
      typeof this.name !== 'undefined',
      'File node was not provided props.path'
    )
    const path = nodePath.join(parentPath, this.name)
    const contents = this.renderChildren()
    console.log('contents', contents)

    console.log(`[Render file with name:] ${path}`)
    console.log(`  ${contents.join('\n  ')}`)
    return contents
  }
}

export default File
