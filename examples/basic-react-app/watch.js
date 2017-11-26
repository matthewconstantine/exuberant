#!/usr/bin / env node

// TODO: make this part of exuberant core somehow

require('babel-core/register')({ presets: ['es2015', 'react'] })

const jsome = require('jsome')
const chokidar = require('chokidar')
const decache = require('decache')
const exuberant = require('../../src/index')
const { saveToFileSystem } = exuberant

const build = () => {
  decache('./index');
  const tree = require('./index')
  console.log(jsome(tree))
  saveToFileSystem(tree.toJSON(), './output')
}

const watcher = chokidar.watch(__dirname, { ignored: [/(^|[\/\\])\../] })
watcher.on('all', (event, path) => {
  console.log(event, path)
})

build()
watcher.on('change', (path, stats) => {
  build()
})

 
