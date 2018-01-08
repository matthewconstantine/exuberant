import React from 'react'
import fs from 'fs-extra'
import { renderElement, rerenderElement, Dir, File } from '../'

const renderChange = (oldElement, newElement) =>
  rerenderElement(newElement, renderElement(oldElement, 'output'))

const Text = ({ children }) => (children.join ? children.join('\n') : children)

describe('Render', () => {
  beforeEach(() => fs.resetMock())

  describe('Dir', () => {
    it('Creates itself', () => {
      const element = <Dir name="shasta" />
      renderElement(element, 'output')
      expect(fs.snapshot()).toMatchSnapshot()
    })

    it('Renames itself', () => {
      const first = <Dir name="shasta" />
      const second = <Dir name="faye" />
      renderChange(first, second)
      expect(fs.snapshot()).toMatchSnapshot()
    })

    it('Deletes itself', () => {
      const first = (
        <Dir name="wrapper">
          <Dir name="deleteMe" />
        </Dir>
      )
      const second = <Dir name="wrapper" />
      renderChange(first, second)
      expect(fs.snapshot()).toMatchSnapshot()
    })

    it('Throws when no name is provided', () => {
      const element = <Dir />
      const shouldError = () => {
        renderElement(element, 'output')
      }
      expect(shouldError).toThrowErrorMatchingSnapshot()
    })
  })

  describe('File', () => {
    it('Creates a file', () => {
      const element = <File name="Sportello" />
      renderElement(element, 'output')
      expect(fs.snapshot()).toMatchSnapshot()
    })

    it('Renames a file', () => {
      const first = <File name="Doc" />
      const second = <File name="Sportello" />
      renderChange(first, second)
      expect(fs.snapshot()).toMatchSnapshot()
    })

    it('Deletes a file', () => {
      const first = (
        <Dir name="wrapper">
          <File name="deleteMe" />
        </Dir>
      )
      const second = <Dir name="wrapper" />
      renderChange(first, second)
      expect(fs.snapshot()).toMatchSnapshot()
    })

    it('Throws when no name is provided', () => {
      const element = <File />
      const shouldError = () => {
        renderElement(element, 'output')
      }
      expect(shouldError).toThrowErrorMatchingSnapshot()
    })

    it('Renders plain text', () => {
      const element = <File name="Sportello">Ahhh!</File>
      renderElement(element, 'output')
      expect(fs.getPath('output/Sportello')).toMatchSnapshot()
    })

    it('Mutates plain text', () => {
      const first = <File name="Sportello">Ahhh!</File>
      const second = <File name="Sportello">Whats that?</File>
      renderChange(first, second)
      expect(fs.getPath('output/Sportello')).toMatchSnapshot()
    })

    it('Deletes plain text', () => {
      const first = <File name="Sportello">Ahhh!</File>
      const second = <File name="Sportello" />
      renderChange(first, second)
      expect(fs.getPath('output/Sportello')).toMatchSnapshot()
    })

    it('Deletes multi-child text', () => {
      const first = (
        <File name="Sportello">
          <Text>Text</Text>
          <Text>deleteMe</Text>
        </File>
      )
      const second = (
        <File name="Sportello">
          <Text>Text</Text>
        </File>
      )
      renderChange(first, second)
      expect(fs.getPath('output/Sportello')).toMatchSnapshot()
    })

    it('Reorders multi-child text', () => {
      const first = (
        <File name="Sportello">
          <Text>First</Text>
          <Text>Second</Text>
          <Text>Third</Text>
        </File>
      )
      const second = (
        <File name="Sportello">
          <Text>First</Text>
          <Text>Third</Text>
          <Text>Second</Text>
        </File>
      )
      renderChange(first, second)
      expect(fs.getPath('output/Sportello')).toMatchSnapshot()
    })
  })
})
