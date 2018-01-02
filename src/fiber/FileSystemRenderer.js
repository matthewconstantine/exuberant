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
      // TODO: remove this branch
      parentInstance.document = child;
    }
  },

  createInstance(type, props, internalInstanceHandle, fiberNode) {
    console.log('a createInstance', (arguments))
    return createElement(type, props, internalInstanceHandle);
  },

  createTextInstance(text, rootContainerInstance, internalInstanceHandle, fiberNode) {
    console.log('b createTextInstance', (arguments))
    return text;
  },

  finalizeInitialChildren(instance, type, props) {
    console.log('c finalizeInitialChildren', (arguments))
    return false;
  },

  getPublicInstance(inst) {
    console.log('d getPublicInstance', (arguments))
    return inst;
  },

  prepareForCommit() {
    console.log('e prepareForCommit', (arguments))
    // noop
  },

  prepareUpdate(instance, type, oldProps, newProps) {
    console.log('f prepareUpdate', (arguments))
    return true // appears in commitUpdate as the updatePayload argument
  },

  resetAfterCommit() {
    console.log('g resetAfterCommit', (arguments))
    // noop
  },

  resetTextContent(instance) {
    console.log('h resetTextContent', (arguments))
    // noop
  },

  getRootHostContext(rootInstance) {
    console.log('i getRootHostContext', (arguments))
    // You can use this 'rootInstance' to pass data from the roots.
  },

  getChildHostContext() {
    console.log('j getChildHostContext', (arguments))
    return emptyObject;
  },

  shouldSetTextContent(type, props) {
    console.log('k shouldSetTextContent', (arguments))
    return false;
  },

  now: () => now(),

  useSyncScheduling: true,

  mutation: {
    appendChild(parentInstance, child) {
      console.log('aa appendChild', (arguments))
      parentInstance.appendChild(child);     
    },

    appendChildToContainer(parentInstance, child) {
      console.log('bb appendChildToContainer', (arguments))
      parentInstance.appendChild(child);
    },

    removeChild(parentInstance, child) {
      console.log('cc removeChild', (arguments))
      parentInstance.removeChild(child);
    },

    removeChildFromContainer(parentInstance, child) {
      console.log('dd removeChildFromContainer', (arguments))
      parentInstance.removeChild(child);
    },

    insertBefore(parentInstance, child, beforeChild) {
      console.log('ee insertBefore', (arguments))
      // noop
    },

    commitUpdate(instance, updatePayload, type, oldProps, newProps) {
      console.log('ff commitUpdate', (arguments))
      instance.commitUpdate(oldProps, newProps)
      // noop
    },

    commitMount(instance, updatePayload, type, oldProps, newProps) {
      console.log('gg commitMount', (arguments))
      // noop
    },

    commitTextUpdate(textInstance, oldText, newText) {
      console.log('hh commitTextUpdate', (arguments))
      textInstance.children = newText;
    },
  }
})

export default FileSystemRenderer