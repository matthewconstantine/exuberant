import invariant from 'invariant'
import nodePath from 'path'
import fs from 'fs-extra'

class Copy {
  constructor(root, props) {
    // console.log('(construct File)', arguments)
    this.name = props.name
    this.from = props.from
    this.rename = null
  }

  // TODO: add invariant for null newProps.name
  commitUpdate(oldProps, newProps) {
    if (oldProps.name !== newProps.name) {
      this.rename = {
        old: oldProps.name,
        new: newProps.name,
      }
      console.log(
        `(Rename <copy> Prepared): \n  from: ${oldProps.name}\n  to: ${
          newProps.name
        }`
      )
    }
  }

  removeSelf(parentPath) {
    const path = nodePath.join(parentPath, this.name)
    console.log(`[Removing copied file:] ${path}`)
    fs.removeSync(path)
  }

  render(parentPath, appPath) {
    invariant(
      typeof this.from !== 'undefined',
      '<copy> was not provided props.from'
    )
    const name = this.name || nodePath.basename(this.from)

    if (this.rename && this.rename.old !== null) {
      fs.copySync(
        nodePath.join(appPath, this.from),
        nodePath.join(parentPath, this.rename.new)
      )
      fs.removeSync(nodePath.join(parentPath, this.rename.old))
    } else {
      fs.copySync(
        nodePath.join(appPath, this.from),
        nodePath.join(parentPath, name)
      )
    }
  }
}

export default Copy
