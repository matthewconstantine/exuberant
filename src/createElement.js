import project from './HostComponents/project'
import dir from './HostComponents/dir'
import file from './HostComponents/file'

/**
 * Creates a HostComponent instance
 * @param {string} type Element type
 * @param {Object} props Component props
 * @param {Object} root Root instance
 */
function createElement(type, props, root) {
  const COMPONENTS = {
    ROOT: () => dir(root, props),
    project: () => project(root, props),
    dir: () => dir(root, props),
    file: () => file(root, props),
    default: undefined,
  }

  return COMPONENTS[type]() || COMPONENTS.default
}

export default createElement
