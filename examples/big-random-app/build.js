#!/usr/bin/env node

require('babel-core/register')({  presets: ['es2015', 'react'] })
const exuberant = require('../../src/index')
const { saveToFileSystem } = exuberant
const tree = require('./index')

console.log(JSON.stringify(tree));

saveToFileSystem(tree.toJSON(), './output');
