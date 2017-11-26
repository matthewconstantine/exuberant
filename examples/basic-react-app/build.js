#!/usr/bin/env node
require('babel-core/register')({  presets: ['es2015', 'react'] })
const path = require('path')
const exuberant = require('../../src/index')
const { build } = exuberant

build(
  path.join(__dirname, 'index'), 
  path.join(__dirname, 'output'),
  { 
    watch: process.argv.includes('--watch'),
    debug: process.argv.includes('--debug'),
  }
)
