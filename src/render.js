/* eslint-disable global-require, import/no-dynamic-require, no-console */
import invariant from 'invariant'
import path from 'path'
import decache from 'decache'
import chokidar from 'chokidar'
import createElement from './createElement'
import FileSystemRenderer from './FileSystemRenderer'

const defaultLogger = console.log

export const renderElement = (element, outputPath, appPath) => {
  invariant(
    typeof appPath !== 'undefined',
    'no appPath argument was passed to renderElement'
  )
  const container = createElement('ROOT', { path: outputPath, appPath })
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

export const render = (appFile, outputPath, options, log = defaultLogger) => {
  const app = require(appFile)
  const appPath = path.dirname(appFile)
  const element = app.default
  const state = renderElement(element, outputPath, appPath)

  if (options.watch) {
    log(`Watching... ${appPath}`)
    const watcher = chokidar.watch(appPath, {
      ignored: [/(^|[/\\])\../, outputPath],
    })
    watcher.on('change', changePath => {
      const displayPath = path.relative(process.cwd(), changePath)
      log(`\n\nRebuilding. Detected change in ${displayPath}}`)
      decache(appFile)
      const updatedApp = require(appFile)
      const updatedElement = updatedApp.default
      rerenderElement(updatedElement, state)
    })
  }
}
