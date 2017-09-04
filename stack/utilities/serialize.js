'use strict';

const toJSON = (node) => {
  const props = node.props;
  if (typeof props === 'undefined') {
    return node; // Text node
  }
  if (typeof props.toJSON === 'function') {
    return props.toJSON(props);
  }
  console.log("a");
  
  let children = null;
  if (props.children) {
    console.log("b");
    if (Array.isArray(props.children)) {
      console.log("c");
      children = props.children.map(toJSON);
    } else if (props.children) {
      console.log("d");
      children = toJSON(props.children);
    }
    console.log("e");
    console.log("children", children);
    
    return Object.assign({}, props, {children});
  } else {
    console.log("f");
    const clone = Object.assign({}, props);
    delete clone.children;
    return clone;
  }
};

module.exports = {toJSON};

