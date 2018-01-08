import invariant from 'invariant'
import fs from 'fs-extra'

const NEW = 'NEW'
const CREATED = 'CREATED'

// TODO: remove anything that isn't essential
class Root {
  constructor(root, props) {
    console.log('Root props', props)
    // TODO: refactor out this.props and set this.name and this.path directly
    this.props = props
    this.children = []
    this.status = NEW
  }

  // Add children
  appendChild(child) {
    this.children.push(child)
  }

  renderChildren(path) {
    this.children.forEach(child => {
      invariant(
        typeof child.render === 'function',
        `Root can only render components with a render method. Found \`${child}\` instead.`
      )
      child.render(path)
    })
  }

  render() {
    invariant(
      typeof this.props.path !== 'undefined',
      'Root node was not provided props.path'
    )
    const { path } = this.props
    if (this.status === NEW) {
      // TODO: this might not be necessary since Dir's ensurePath should take care of creating the first path
      console.log(`[Create Root Directory]: `, path)
      fs.ensureDirSync(path);
      this.status = CREATED
    }
    this.renderChildren(path)
  }
}

export default Root
