import Root from './HostComponents/Root'
import Dir from './HostComponents/Dir'
import File from './HostComponents/File'

/**
 * Creates a HostComponent instance
 * @param {string} type Element type
 * @param {Object} props Component props
 * @param {Object} root Root instance
 */
function createElement(type, props, root) {
  // console.log('CreateElement: ', {type, props, root})

  const COMPONENTS = {
    ROOT: () => new Root(root, props),
    DIR: () => new Dir(root, props),
    FILE: () => new File(root, props),
    default: undefined,
  }

  return COMPONENTS[type]() || COMPONENTS.default
}

export default createElement
