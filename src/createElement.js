import Root from './HostComponents/Root'
import Project from './HostComponents/Project'
import Dir from './HostComponents/Dir'
import File from './HostComponents/File'

/**
 * Creates a HostComponent instance
 * @param {string} type Element type
 * @param {Object} props Component props
 * @param {Object} root Root instance
 */
function createElement(type, props, root) {
  const COMPONENTS = {
    ROOT: () => new Root(root, props),
    project: () => new Project(root),
    dir: () => new Dir(root, props),
    file: () => new File(root, props),
    default: undefined,
  }

  return COMPONENTS[type]() || COMPONENTS.default
}

export default createElement
