import invariant from 'invariant'
import nodePath from 'path'

// Note: This is a host component not a React component. It's created
// by the renderer (render.js) and updated by the reconciler (FileSystemRenderer)

class File {
  
  constructor(root, props) {
    console.log("props", props)
    this.name = props.name
    this.children = []
    this.contents = []
  }

  // Add children
  appendChild(child) {
    console.log("child", child)
    this.children.push(child);
  }

  // Remove children
  removeChild(child) {
    const index = this.children.indexOf(child);
    this.children.splice(index, 1);
  }

  commitUpdate(oldProps, newProps) {
    // Implement
  }

  // TODO: this can probably just be a reduce without this.contents
  renderChildren() {
    this.children.forEach(child => {
      let output
      if (typeof child === 'string') {
        output = child
        console.log(`[Add String to File]: ${output}`)
      } else if (typeof child === 'function') {
        output = child()
        console.log(`[Add String to File from function]: ${output}`)
      } else if (typeof child.render === 'function') {
        output = child.render()
        console.log(`[Add String to File from child.render]: ${output}`)
      } else {
        invariant(false, `File Could not render: ${child}`)
      }
      this.contents.push(output)
    })
  }

  render(parentPath) {
    invariant(typeof this.name !== 'undefined', 'File node was not provided props.path')    
    const path = nodePath.join(parentPath, this.name)
    this.renderChildren()
    console.log(`[Render file with name:] ${path}`)
    console.log(`  ${this.contents.join('\n  ')}`)
  }

}

export default File