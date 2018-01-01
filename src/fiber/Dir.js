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
    invariant(typeof parentPath !== 'undefined', "props.path was not passed down from parent" )
    invariant(typeof this.props.name !== 'undefined', "Dir does not have props.name")
    const path = nodePath.join(parentPath, this.props.name)
    console.log(`[Create Directory]: `, path)
    this.renderChildren(path);
  }

}

export default Dir