import invariant from 'invariant'
import nodePath from 'path'

class Root {
  
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
      invariant(typeof child.render === 'function', `Dir can only render components with a render method. Found \`${child}\` instead.`)
      child.render(path)
    })
  }

  render() {    
    invariant(typeof this.props.path !== 'undefined', 'Root node was not provided props.path')
    const path = this.props.path
    console.log(`[Create Root Directory]: `, path)
    this.renderChildren(path);
  }

}

export default Root