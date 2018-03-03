import Root from './HostComponents/root'
import Project from './HostComponents/project'
import Dir from './HostComponents/dir'
import File from './HostComponents/file'
import Copy from './HostComponents/copy'
import Read from './HostComponents/read'

/**
 * Creates a HostComponent instance
 * @param {string} type Element type
 * @param {Object} props Component props
 * @param {Object} root Root instance
 */
function createElement(type, props, root) {
  console.log('type, props', type, props)

  const COMPONENTS = {
    ROOT: () => new Root(root, props),
    project: () => new Project(root, props),
    dir: () => new Dir(root, props),
    file: () => new File(root, props),
    copy: () => new Copy(root, props),
    read: () => new Read(root, props),
    default: undefined,
  }

  return COMPONENTS[type]() || COMPONENTS.default
}

export default createElement
