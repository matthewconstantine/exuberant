// const appModulePath = require('app-module-path')
const path = require('path')
const saveToFileSystem = require('./saveToFileSystem')
const jsome = require('jsome')
const chokidar = require('chokidar')
const decache = require('decache')

const build = (input, output, options) => {
  if (options.watch) { decache(input) }
  const tree = require(input)
  if (options.debug) { console.log(jsome(tree)) }
  saveToFileSystem(tree.toJSON(), output)
}

const logger = console.log

module.exports = (input, output, options = {}, log = logger) => { 
  if (options.watch) {
    log(`Watching... ${path.dirname(input)}`)
    const watcher = chokidar.watch(
      path.dirname(input), 
      { ignored: [/(^|[\/\\])\../, output] }
    )
    watcher.on('change', (changePath, stats) => {
      log(`Rebuilding. Detected change in ${path.relative(process.cwd(), changePath)}`)
      build(input, output, options)
    })
  }
  
  log(`Building\n  Input: ${input}\n  Output: ${output}`)
  build(input, output, options)
}