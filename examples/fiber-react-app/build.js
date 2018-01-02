#!/usr/bin/env node
// TODO: figure out how to not put this here
require('babel-core/register')({  presets: ['env', 'react', 'stage-2'] })
const path = require('path')
const exuberant = require('../../src/fiber/index')
const { render } = exuberant

render(
  path.join(__dirname, 'index'), 
  path.join(__dirname, 'output'),
  { 
    watch: process.argv.includes('--watch'),
    debug: process.argv.includes('--debug'),
  }
)
