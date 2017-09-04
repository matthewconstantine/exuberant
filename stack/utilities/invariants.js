'use strict';

const invariant = require('fbjs/lib/invariant');
const ReactElement = require('react/lib/ReactElement');

const isValidElement = (nextElement) => invariant(
  ReactElement.isValidElement(nextElement),
  'ReactHardware.render(): Invalid component element.%s',
  (
    typeof nextElement === 'function' ?
      ' Instead of passing a component class, make sure to instantiate ' +
      'it by passing it to React.createElement.' :
    // Check if it quacks like an element
    nextElement != null && nextElement.props !== undefined ?
      ' This may be caused by unintentionally loading two independent ' +
      'copies of React.' :
      ''
  )
);

module.exports = {
  isValidElement: isValidElement,
};

