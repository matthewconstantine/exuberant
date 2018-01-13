import React from 'react'
import Reconciler from 'react-reconciler'
import emptyObject from 'fbjs/lib/emptyObject'
import now from 'performance-now'
import createElement from './createElement'

const FileSystemRenderer = Reconciler({
  appendInitialChild(parentInstance, child) {
    parentInstance.appendChild(child)
  },

  createInstance(type, props, internalInstanceHandle /* , fiberNode */) {
    // console.log('a createInstance', (arguments)); debugger
    return createElement(type, props, internalInstanceHandle)
  },

  createTextInstance(
    text
    /* rootContainerInstance,
    internalInstanceHandle,
    fiberNode */
  ) {
    // console.log('b createTextInstance', (arguments)); debugger
    return { text }
  },

  finalizeInitialChildren(/* instance, type, props */) {
    // console.log('c finalizeInitialChildren', (arguments)); debugger
    return false
  },

  getPublicInstance(inst) {
    // console.log('d getPublicInstance', (arguments)); debugger
    return inst
  },

  prepareForCommit() {
    // console.log('e prepareForCommit', (arguments)); debugger
    // noop
  },

  prepareUpdate(/* instance, type, oldProps, newProps */) {
    // console.log('f prepareUpdate', (arguments)); debugger
    return true // appears in commitUpdate as the updatePayload argument
  },

  resetAfterCommit() {
    // console.log('g resetAfterCommit', (arguments)); debugger
    // noop
  },

  resetTextContent(/* instance */) {
    // console.log('h resetTextContent', (arguments)); debugger
    // noop
  },

  getRootHostContext(/* rootInstance */) {
    // console.log('i getRootHostContext', (arguments)); debugger
  },

  getChildHostContext() {
    // console.log('j getChildHostContext', (arguments)); debugger
    return emptyObject
  },

  shouldSetTextContent(/* type, props */) {
    // console.log('k shouldSetTextContent', (arguments)); debugger
    return false
  },

  now: () => now(),

  useSyncScheduling: true,

  mutation: {
    appendChild(parentInstance, child) {
      // console.log('aa appendChild', (arguments)); debugger
      parentInstance.appendChild(child)
    },

    appendChildToContainer(parentInstance, child) {
      // console.log('bb appendChildToContainer', (arguments)); debugger
      parentInstance.appendChild(child)
      // TODO: ReactDOM does container.appendChild(child) instead
    },

    removeChild(parentInstance, child) {
      // console.log('cc removeChild', (arguments)); debugger
      parentInstance.removeChild(child)
    },

    removeChildFromContainer(parentInstance, child) {
      // console.log('dd removeChildFromContainer', (arguments)); debugger
      parentInstance.removeChild(child)
      // TODO: ReactDOM does container.removeChild(child);
    },

    insertBefore(parentInstance, child, beforeChild) {
      // console.log('ee insertBefore', (arguments)); debugger
      parentInstance.insertBefore(child, beforeChild)
    },

    commitUpdate(instance, updatePayload, type, oldProps, newProps) {
      // console.log('ff commitUpdate', { type, oldProps, newProps }); debugger
      if (instance.commitUpdate) {
        instance.commitUpdate(oldProps, newProps)
      }
    },

    commitMount(/* instance, updatePayload, type, oldProps, newProps */) {
      // console.log('gg commitMount', (arguments)); debugger
      // noop
    },

    /* eslint-disable no-param-reassign */
    commitTextUpdate(textInstance, oldText, newText) {
      // console.log('hh commitTextUpdate', (arguments)); debugger
      textInstance.text = newText
    },
  },
})

export default FileSystemRenderer
