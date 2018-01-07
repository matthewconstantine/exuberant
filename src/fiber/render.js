import fs from 'fs'
import path from 'path'
import decache from 'decache'
import chokidar from 'chokidar'
import { createElement } from './createElement'
import FileSystemRenderer from './FileSystemRenderer'

const logger = console.log

const render = (appPath, outputPath, options, log = logger) => {
  const element = require(appPath)
  const container = createElement('ROOT', { path: outputPath })
  const node = FileSystemRenderer.createContainer(container)
  FileSystemRenderer.updateContainer(element, node, null)
  container.render() 

  if (options.watch) {
    log(`Watching... ${path.dirname(appPath)}`)
    const watcher = chokidar.watch(
      path.dirname(appPath), 
      { ignored: [/(^|[\/\\])\../, outputPath] }
    )
    watcher.on('change', changePath => {
      log(`Rebuilding. Detected change in ${path.relative(process.cwd(), changePath)}`)
      decache(appPath)
      const updatedElement = require(appPath)
      FileSystemRenderer.updateContainer(updatedElement, node, null)
      container.render()
    })
  }
}

export default render