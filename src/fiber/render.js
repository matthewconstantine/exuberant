/* eslint-disable global-require, import/no-dynamic-require, no-console */
import path from 'path'
import decache from 'decache'
import chokidar from 'chokidar'
import createElement from './createElement'
import FileSystemRenderer from './FileSystemRenderer'

const defaultLogger = console.log

const renderElement = (element, outputPath) => {
  const container = createElement('ROOT', { path: outputPath })
  const node = FileSystemRenderer.createContainer(container)
  FileSystemRenderer.updateContainer(element, node, null)
  container.render()
  return { container, node }
}

const rerenderElement = (element, container, node) => {
  FileSystemRenderer.updateContainer(element, node, null)
  container.render()
}

const exuberantRender = (appPath, outputPath, options, log = defaultLogger) => { 
  const element = require(appPath)
  const { container, node } = renderElement(element, outputPath)

  if (options.watch) {
    log(`Watching... ${path.dirname(appPath)}`)
    const watcher = chokidar.watch(path.dirname(appPath), {
      ignored: [/(^|[/\\])\../, outputPath],
    })
    watcher.on('change', changePath => {
      const displayPath = path.relative(process.cwd(), changePath)
      log(`\n\nRebuilding. Detected change in ${displayPath}}`)
      decache(appPath)
      const updatedElement = require(appPath)
      rerenderElement(updatedElement, container, node)
    })
  }
}

export default exuberantRender
