'use strict';

const invariants = require('./utilities/invariants');
const instantiateReactComponent = require('react/lib/instantiateReactComponent');
const ReactInstanceHandles = require('react/lib/ReactInstanceHandles');
const ReactUpdates = require('react/lib/ReactUpdates');
const DefaultInjection = require('./injection');

DefaultInjection.inject();

const render = (
  nextElement, // ReactElement description.
  callback // optional callback for when mount is complete
) => {

  invariants.isValidElement(nextElement);

  const rootId = ReactInstanceHandles.createReactRootID(0);
  const component = instantiateReactComponent(nextElement);

  ReactUpdates.batchedUpdates(() => {
    const transaction = ReactUpdates.ReactReconcileTransaction.getPooled();
        
    transaction.perform(() => {
      // if (!transaction.getUpdateQueue) {
      //   console.log('nope')
      // }      
      component.mountComponent(
        transaction,
        rootId,
        {_idCounter: 0},
        {}
      );
      if (callback) {
        callback(component.getPublicInstance());
      }
    });
    ReactUpdates.ReactReconcileTransaction.release(transaction);

  });

  return component.getPublicInstance();
};

module.exports = render;

