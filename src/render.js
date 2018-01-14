/* eslint-disable global-require, import/no-dynamic-require, no-console */
import path from 'path'
import decache from 'decache'
import chokidar from 'chokidar'
import createElement from './createElement'
import FileSystemRenderer from './FileSystemRenderer'

const defaultLogger = console.log

export const renderElement = (element, outputPath) => {
  const container = createElement('ROOT', { path: outputPath })
  const node = FileSystemRenderer.createContainer(container)
  FileSystemRenderer.updateContainer(element, node, null)
  container.render()
  return { container, node }
}

export const rerenderElement = (element, state) => {
  const { container, node } = state
  FileSystemRenderer.updateContainer(element, node, null)
  container.render()
}

export const render = (appPath, outputPath, options, log = defaultLogger) => {
  const app = require(appPath)
  const element = app.default
  const state = renderElement(element, outputPath)

  if (options.watch) {
    log(`Watching... ${path.dirname(appPath)}`)
    const watcher = chokidar.watch(path.dirname(appPath), {
      ignored: [/(^|[/\\])\../, outputPath],
    })
    watcher.on('change', changePath => {
      const displayPath = path.relative(process.cwd(), changePath)
      log(`\n\nRebuilding. Detected change in ${displayPath}}`)
      decache(appPath)
      const updatedApp = require(appPath)
      const updatedElement = updatedApp.default
      rerenderElement(updatedElement, state)
    })
  }
}
