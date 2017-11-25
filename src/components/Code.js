const React = require('react')
const stripIndent = require('strip-indent')
const trimNewLineStart = x => x.replace(/^[\r\n]+/, "")

module.exports = props => <code>{trimNewLineStart(stripIndent(props.children))}</code>
