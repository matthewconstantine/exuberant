const React = require('react');
const exuberant = require('../../src/index')
const { Project, Dir, File, buildTree } = exuberant

const Code = (props) => <code>{props.children}</code>

const helloWorld = (name) => `
  export () => {return 'hello ${name}'}
`

const tree = buildTree(
  <Project>
    <Dir name="src">
      <File name="index.js">
        <Code>{helloWorld('dude')}</Code>
      </File>
      <Dir name="components">
        <File name="List.js"/>
        <File name="Item.js"/>
      </Dir>
    </Dir>
  </Project>
);

module.exports = tree;