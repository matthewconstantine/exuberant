import invariant from 'invariant'
import nodePath from 'path'

// Note: This is a host component not a React component. It's created
// by the renderer (render.js) and updated by the reconciler (FileSystemRenderer)

class File {
  
  constructor(root, props) {
    console.log("props", props)
    this.name = props.name
    this.children = []
  }

  appendChild(child) {
    console.log("(File appendChild)", child)
    this.children.push(child);
  }

  removeChild(child) {
    console.log("(File removeChild)", child)
    const index = this.children.indexOf(child);
    this.children.splice(index, 1);
  }

  insertBefore(child, beforeChild) {    
    const index = this.children.indexOf(beforeChild)
    this.children.splice(index, 0, child)
  }

  commitUpdate(oldProps, newProps) {
    // this.children = []
    // debugger
    // if (oldProps.children !== newProps.children) {
    //   this.children = newProps.children
    // }
  }

  // // TODO: this can probably just be a reduce without this.contents
  // renderChildren() {
  //   this.children.forEach(child => {
  //     let output
  //     if (typeof child === 'string') {
  //       output = child
  //       console.log(`[Add String to File]: ${output}`)
  //     } else if (typeof child === 'function') {
  //       output = child()
  //       console.log(`[Add String to File from function]: ${output}`)
  //     } else if (typeof child.render === 'function') {
  //       output = child.render()
  //       console.log(`[Add String to File from child.render]: ${output}`)
  //     } else if (child.type === 'HostTextInstance')
  //       output = 
  //     } else {
  //       invariant(false, `File Could not render: ${child}`)
  //     }
  //     this.contents.push(output)
  //   })
  // }

  renderChildren2() {
    return this.children.map((child) => {
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
      } else {
        invariant(false, `File Could not render: ${child}`)
      }      
    })
  }

  render(parentPath) {
    invariant(typeof this.name !== 'undefined', 'File node was not provided props.path')    
    const path = nodePath.join(parentPath, this.name)
    const contents = this.renderChildren2()
    console.log("contents", contents)
    
    console.log(`[Render file with name:] ${path}`)
    console.log(`  ${contents.join('\n  ')}`)
    return contents;
  }

}

export default File