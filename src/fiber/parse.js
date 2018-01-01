/**
 * Parse the input component by calling the render() method (passed to docx generator instance)
 * @param {Object} input Input component
 */
const parse = (input) => {
  function parseComponent(inputComponent) {
    const document = inputComponent.document;

    document.render(); // Flush everything

    return inputComponent;
  }

  function toBuffer() {
    return parseComponent(input);
  }

  return {
    toBuffer,
  };
};

export default parse;