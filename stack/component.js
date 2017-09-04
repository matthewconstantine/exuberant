'use strict';

const ReactMultiChild = require('react/lib/ReactMultiChild');
const serialize = require('./utilities/serialize');

const MinimumViableComponent = function(element) {
  this.node = null;
  this._mountImage = null;
  this._renderedChildren = null;
  this._currentElement = element;
};

MinimumViableComponent.prototype = Object.assign(
  {
    getPublicInstance() {},
    mountComponent() {},
    receiveComponent() {},
    unmountComponent() {},
    getNativeNode() {},
    getHostNode() {}
  },
  ReactMultiChild.Mixin
);

const TinyRendererComponent = function(element) {
  this.node = null;
  this._mountImage = null;
  this._renderedChildren = null;
  this._currentElement = element;
};

const TinyRendererComponentMixin = {
  getPublicInstance() {
    // return {hey:this}
    console.log("getPublicInstance!z!!!!")
    return JSON.stringify(this.node)
    // return JSON.stringify(serialize.toJSON(this.node))
  },

  mountComponent(
    transaction,
    nativeParent,
    nativeContainerInfo,
    context
  ) {
    this.node = this._currentElement;
    this.mountChildren(this.node.children, transaction, context);
    return this.node;
  },

  receiveComponent(nextElement, transaction, context) {
    const prevElement = this._currentElement;
    this._currentElement = nextElement;
    this.updateChildren(nextElement.props.children, transaction, context);
  },
  getHostNode() {
    console.log('getHOSTODE!!!!')
  },
  unmountComponent() {},
};

Object.assign(
  TinyRendererComponent.prototype,
  TinyRendererComponentMixin,
  ReactMultiChild.Mixin
);

module.exports = TinyRendererComponent;

