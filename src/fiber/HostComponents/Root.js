import invariant from 'invariant'
import nodePath from 'path'

const NEW = 'NEW'
const CREATED = 'CREATED'

// TODO: remove anything that isn't essential
class Root {
  constructor(root, props) {
    console.log('Dir props', props)
    // TODO: refactor out this.props and set this.name and this.path directly
    this.props = props
    this.children = []
    this.status = NEW
  }

  // Add children
  appendChild(child) {
    console.log('child', child)
    this.children.push(child)
  }

  // Remove children
  removeChild(child) {
    const index = this.children.indexOf(child)
    this.children.splice(index, 1)
  }

  renderChildren(path) {
    this.children.forEach(child => {
      invariant(
        typeof child.render === 'function',
        `Dir can only render components with a render method. Found \`${child}\` instead.`
      )
      child.render(path)
    })
  }

  render() {
    invariant(
      typeof this.props.path !== 'undefined',
      'Root node was not provided props.path'
    )
    const path = this.props.path
    if (this.status === NEW) {
      console.log(`[Create Root Directory]: `, path)
      this.status = CREATED
    }
    this.renderChildren(path)
  }
}

export default Root
