const React = require('react');
const buildTree = require('./src/buildTree');

const Project = (props) => <project>{props.children}</project>
const Dir = (props) => <dir name={props.name}>{props.children}</dir>
const File = (props) => <file name={props.name}>{props.children}</file>
const Code = (props) => <code>{props.children}</code>

const name = 'world'
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