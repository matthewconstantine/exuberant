import invariant from 'invariant'
import nodePath from 'path'

class Dir {
  
  constructor(root, props) {
    console.log("Dir props", props)
    // TODO: refactor out this.props and set this.name and this.path directly
    this.props = props
    this.children = []
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

  path() {
    return typeof this.props.name !== 'undefined' ? 
      nodePath.join(this.props.path, this.props.name) :
      this.props.path
  }

  renderChildren(path) {
    this.children.forEach(child => {
      // TODO: this is probably where stateless components could be supported.
      invariant(typeof child.render === 'function', `Dir can only render components with a render method. Found \`${child}\` instead.`)
      child.render(path)
    })
  }


  render(parentPath) {    
    let path
    // TODO: refactor this out as a Root component
    if (!parentPath) {
      invariant(typeof this.props.path !== 'undefined', 'Root node was not provided props.path')
      console.log(`[Create Root Directory]: `, this.props.path)
      path = this.props.path
    } else {
      invariant(typeof parentPath !== 'undefined', "props.path was not passed down from parent" )
      invariant(typeof this.props.name !== 'undefined', "Dir does not have props.name")
      path = nodePath.join(parentPath, this.props.name)
      console.log(`[Create Directory]: `, path)
    }
    
    // if (!path) {
    //   console.log(`[Create Root Directory]: `, this.props.rootPath)
    // } else {
    //   console.log(`[Create Directory:]`, path, this.props.name)
    // }
    // const dirPath = path.join(parentPath, props.name)
    this.renderChildren(path);
  }

}

export default Dir