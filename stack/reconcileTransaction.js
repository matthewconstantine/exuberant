'use strict';

const CallbackQueue = require('react/lib/CallbackQueue');
const PooledClass = require('react/lib/PooledClass');
const Transaction = require('react/lib/Transaction');
const ReactUpdateQueue = require('react/lib/ReactUpdateQueue');

const ON_RENDERER_READY_QUEUEING = {
  initialize: function() {
    this.reactMountReady.reset();
  },

  close: function() {
    this.reactMountReady.notifyAll();
  },
};

const TRANSACTION_WRAPPERS = [ON_RENDERER_READY_QUEUEING];

function TinyRendererReconcileTransaction() {
  this.reinitializeTransaction();
  this.reactMountReady = CallbackQueue.getPooled(null);
}

const Mixin = {
  /**
   * @see Transaction
   * @abstract
   * @final
   * @return {array<object>} List of operation wrap procedures.
   */
  getTransactionWrappers: function() {
    return TRANSACTION_WRAPPERS;
  },

  /**
   * @return {object} The queue to collect `ready` callbacks with.
   */
  getReactMountReady: function() {
    return this.reactMountReady;
  },
  
  /**
   * @return {object} The queue to collect React async events.
   */
  getUpdateQueue: function() {
    return ReactUpdateQueue;
  },

  /**
   * `PooledClass` looks for this, and will invoke this before allowing this
   * instance to be reused.
   */
  destructor: function() {
    CallbackQueue.release(this.reactMountReady);
    this.reactMountReady = null;
  },
};

Object.assign(
  TinyRendererReconcileTransaction.prototype,
  Transaction.Mixin,
  TinyRendererReconcileTransaction,
  Mixin
);

PooledClass.addPoolingTo(TinyRendererReconcileTransaction);

module.exports = TinyRendererReconcileTransaction;

