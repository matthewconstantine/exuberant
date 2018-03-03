import invariant from 'invariant'
import nodePath from 'path'
import fs from 'fs-extra'

class Read {
  constructor(root, props) {
    this.from = props.from
  }

  render(parentPath, appPath) {
    invariant(
      typeof this.from !== 'undefined',
      '<read> was not provided props.from'
    )
    const text = fs.readFileSync(nodePath.join(appPath, this.from))

    return text
  }
}

export default Read
