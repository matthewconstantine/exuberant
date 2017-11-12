const TestRenderer = require('react-test-renderer');

const buildTree = function(element) {
  return TestRenderer.create(element);
}

module.exports = buildTree;