const fs = require('fs-extra');
const path = require('path');

const nodeToStrings = (node) => {
  const { children } = node  
  return children.map((child) => {
    return typeof child === 'string' ? child : nodeToStrings(child)
  }).join('');
}

const renderers = {
  project: (node, filePath) => {
    const { type, props, children } = node;
    return children.map(child => renderNode(child, filePath));
  },

  dir: (node, filePath) => {
    const { type, props, children } = node;
    if (!props.name) { throw new Error("<Dir> requires a name prop."); }
    const fullPath = path.join(filePath, props.name);
    fs.ensureDirSync(fullPath);
    return children.map(child => renderNode(child, fullPath))
  },
  
  file: (node, filePath) => {
    const { type, props, children } = node;
    if (!props.name) { throw new Error("<File> requires a name prop."); }
    const fullPath = path.join(filePath, props.name);    
    const contents = children ? nodeToStrings(node) : '';
    fs.writeFileSync(fullPath, contents);
  }
}

const renderNode = (node, filePath) => { 
  const { type, props, children } = node;
  const renderer = renderers[type];
  if (renderer == null) { throw new Error(`Could not find renderer for type ${type}`) }
  return renderer(node, filePath);
}

const saveToFileSystem = (node, rootPath) => {
  const root = path.normalize(rootPath);
  fs.ensureDirSync(root);
  return renderNode(node, root);
}

module.exports = saveToFileSystem;