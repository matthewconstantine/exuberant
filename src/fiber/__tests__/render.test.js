import fs from 'jest-plugin-fs'

describe('Render', () => {
  beforeEach(() => fs.mock())
  afterEach(() => fs.restore())

  describe('Dir', () => {
    it('Creates itself', () => {
      
    })
    it('Renames itself')
    it('Deletes itself')
    it('Throws when no name is provided')
  })
  
  describe('File', () => {
    it('Creates a file')
    it('Renames a file')
    it('Deletes a file')
    it('Throws when no name is provided')
    it('Renders plain text')
    it('Renders plain class based components')
    it('Renders plain function based components')
    it('Mutates plain text')
    it('Mutates class based text')
    it('Mutates function based text')
  })
})
