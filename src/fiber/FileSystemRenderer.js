import React from 'react'
import Reconciler from 'react-reconciler'
import emptyObject from 'fbjs/lib/emptyObject'
import now from 'performance-now'
import { createElement } from './createElement'

const FileSystemRenderer = Reconciler({
  appendInitialChild(parentInstance, child) {
    if (parentInstance.appendChild) {
      parentInstance.appendChild(child);
    } else {
      parentInstance.document = child;
    }
  },

  createInstance(type, props, internalInstanceHandle, fiberNode) {
    console.log('a', (arguments))
    return createElement(type, props, internalInstanceHandle);
  },

  createTextInstance(text, rootContainerInstance, internalInstanceHandle, fiberNode) {
    console.log('b', (arguments))
    return text;
  },

  finalizeInitialChildren(wordElement, type, props) {
    console.log('c', (arguments))
    return false;
  },

  getPublicInstance(inst) {
    console.log('d', (arguments))
    return inst;
  },

  prepareForCommit() {
    console.log('e', (arguments))
    // noop
  },

  prepareUpdate(wordElement, type, oldProps, newProps) {
    console.log('f', (arguments))
    return true;
  },

  resetAfterCommit() {
    console.log('g', (arguments))
    // noop
  },

  resetTextContent(wordElement) {
    console.log('h', (arguments))
    // noop
  },

  getRootHostContext(rootInstance) {
    console.log('i', (arguments))
    // You can use this 'rootInstance' to pass data from the roots.
  },

  getChildHostContext() {
    console.log('j', (arguments))
    return emptyObject;
  },

  shouldSetTextContent(type, props) {
    console.log('k', (arguments))
    return false;
  },

  now: () => now(),

  useSyncScheduling: true,

  mutation: {
    appendChild(parentInstance, child) {
      console.log('aa', (arguments))
      if (parentInstance.appendChild) {
        parentInstance.appendChild(child);
      } else {
        parentInstance.document = child;
      }
    },

    appendChildToContainer(parentInstance, child) {
      console.log('bb', (arguments))
      if (parentInstance.appendChild) {
        parentInstance.appendChild(child);
      } else {
        parentInstance.document = child;
      }
    },

    removeChild(parentInstance, child) {
      console.log('cc', (arguments))
      parentInstance.removeChild(child);
    },

    removeChildFromContainer(parentInstance, child) {
      console.log('dd', (arguments))
      parentInstance.removeChild(child);
    },

    insertBefore(parentInstance, child, beforeChild) {
      console.log('ee', (arguments))
      // noop
    },

    commitUpdate(instance, updatePayload, type, oldProps, newProps) {
      console.log('ff', (arguments))
      // noop
    },

    commitMount(instance, updatePayload, type, oldProps, newProps) {
      console.log('gg', (arguments))
      // noop
    },

    commitTextUpdate(textInstance, oldText, newText) {
      console.log('hh', (arguments))
      textInstance.children = newText;
    },
  }
})

export default FileSystemRenderer