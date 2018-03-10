import invariant from 'invariant'
import fs from 'fs-extra'
import FileSystemParent from './FileSystemParent'

// The Root element exists simply to create the output path for
// an exuberant project. It is not intended to be used directly.
// Unlike <dir> it cannot be renamed or deleted on subsequent
// renders.

const NEW = 'NEW'
const CREATED = 'CREATED'

class Root extends FileSystemParent {
  constructor(root, props) {
    super(root, props)
    this.status = NEW
  }

  render() {
    invariant(
      typeof this.props.path !== 'undefined',
      'Root node was not provided props.path'
    )
    const { path, appPath } = this.props

    if (this.status === NEW) {
      // TODO: this might not be necessary since Dir's ensurePath should take care of creating the first path
      console.log(`[Create Root Directory]: `, path)
      fs.ensureDirSync(path)
      this.status = CREATED
    }
    this.renderChildren(path, appPath)
  }
}

export default Root
