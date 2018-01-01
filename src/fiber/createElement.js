import Dir from './Dir'
import File from './File'

/**
 * Creates an element for a document
 * @param {string} type Element type
 * @param {Object} props Component props
 * @param {Object} root Root instance
 */
function createElement(type, props, root) {
  console.log('CreateElement: ', {type, props, root})
  const COMPONENTS = {
    ROOT: () => new Dir(root, props),
    DIR: () => new Dir(root, props),
    FILE: () => new File(root, props),
    default: undefined,
  };

  return COMPONENTS[type]() || COMPONENTS.default;
}

export {
  createElement,
}