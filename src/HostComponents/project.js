import invariant from 'invariant'
import FileSystemParent from './FileSystemParent'

// The Project tag provides a convenient wrapper around files
// and directories. It simply passes the parent path down to
// its children elements. It has no affect on the filesystem.

class Project extends FileSystemParent {
  render(parentPath, appPath) {
    invariant(
      typeof parentPath !== 'undefined',
      'props.path was not passed down from parent'
    )
    this.renderChildren(parentPath, appPath)
  }
}

export default Project
