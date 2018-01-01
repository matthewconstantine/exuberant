import invariant from 'invariant'
import nodePath from 'path'

class File {
  
  constructor(root, props) {
    console.log("props", props)
    debugger
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
    console.log(`[And contents of:] ${this.contents.join('\n')}`)
  }

}

export default File