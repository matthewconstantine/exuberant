'use strict';

const ReactInjection = require('react/lib/ReactInjection');
const ReactDefaultBatchingStrategy = require('react/lib/ReactDefaultBatchingStrategy');
const TinyRendererReconcileTransaction = require('./reconcileTransaction');
const TinyRendererComponent = require('./component');

function inject() {
  (ReactInjection.NativeComponent || ReactInjection.HostComponent).injectGenericComponentClass(
    TinyRendererComponent
  );

  ReactInjection.Updates.injectReconcileTransaction(
    TinyRendererReconcileTransaction
  );

  ReactInjection.Updates.injectBatchingStrategy(
    ReactDefaultBatchingStrategy
  );
}

module.exports = {inject};

