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

// import parse from './parse'

// // Renders the input component
// async function render(element, filePath) {
//   // Create root container instance
//   const container = createElement('ROOT');

//   // Returns the current fiber (flushed fiber)
//   const node = FileSystemRenderer.createContainer(container);
    
//   // Schedules a top level update with current fiber and a priority level (depending upon the context)
//   FileSystemRenderer.updateContainer(element, node, null);

//   // FileSystemRenderer.injectIntoDevTools({
//   //   bundleType: 1,
//   //   version: '0.1.0',
//   //   rendererPackageName: 'custom-renderer',
//   //   findHostInstanceByFiber: FileSystemRenderer.findHostInstance
//   // })

//   // Parse the input component and return the output
//   const output = parse(container).toBuffer();

//   // Officegen generates a output stream and not a file
//   const stream = fs.createWriteStream(filePath);

//   await new Promise((resolve, reject) => {
//     // Generate a word document
//     // output.doc.generate(stream, Events(filePath, resolve, reject));
//   });
// }

// // Handle docx events (optional)
// function Events(filePath, resolve, reject) {
//   return {
//     finalize: () => {
//       console.log(`✨  Project created at ${path.resolve(filePath)}.`);
//       resolve();
//     },
//     error: () => {
//       console.log('An error occurred while generating the document.');
//       reject();
//     },
//   };
// }

export default render