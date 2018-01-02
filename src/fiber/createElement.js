import Root from './Root'
import Dir from './Dir'
import File from './File'

// TODO: this doesn't work... find another way to get the key into the Fiber
const ensureKey = props => ({ key: props.name, ...props })

/**
 * Creates an element for a document
 * @param {string} type Element type
 * @param {Object} props Component props
 * @param {Object} root Root instance
 */
function createElement(type, props, root) {
  console.log('CreateElement: ', {type, props, root})

  const COMPONENTS = {
    ROOT: () => new Root(root, props),
    DIR: () => new Dir(root, ensureKey(props)),
    FILE: () => new File(root, ensureKey(props)),
    default: undefined,
  };

  return COMPONENTS[type]() || COMPONENTS.default;
}

export {
  createElement,
}