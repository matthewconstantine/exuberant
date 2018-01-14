import stripIndent from 'strip-indent'

const trimNewLineStart = s => s.replace(/^[\r\n]+/, '')
const format = s => trimNewLineStart(stripIndent(s))

export default ({ children }) =>
  children.join ? format(children.join('\n')) : format(children)
