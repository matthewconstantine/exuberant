import invariant from 'invariant'
import HostComponent from './HostComponent'

export default (root, props) =>
  new HostComponent(root, props, {
    type: 'PROJECT',
    onRenderChildren: (children, path) =>
      children.forEach(child => {
        invariant(
          child.type === 'DIR' ||
            child.type === 'FILE' ||
            child.type === 'PROJECT',
          `<project> can only render host components. Found \`${child}\` instead.`
        )
        child.render(path)
      }),
  })
