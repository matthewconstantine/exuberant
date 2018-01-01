#!/usr/bin/env node
require('babel-core/register')({  presets: ['es2015', 'react'] })
const path = require('path')
const exuberant = require('../../src/fiber/index')
const { render } = exuberant
const App = require('./index')

render(
  App,
  path.join(__dirname, 'output'),
  { 
    watch: process.argv.includes('--watch'),
    debug: process.argv.includes('--debug'),
  }
)
