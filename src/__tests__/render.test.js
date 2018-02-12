import React from 'react'
import fs from 'fs-extra'
import { renderElement, rerenderElement } from '../'
import createElement from '../createElement'

const renderChange = (oldElement, newElement) =>
  rerenderElement(newElement, renderElement(oldElement, 'output'))

const Text = ({ children }) => (children.join ? children.join('\n') : children)

describe('Render', () => {
  beforeEach(() => fs.resetMock())

  describe('<root>', () => {
    it('Throws when no path is provided', () => {
      const element = <root />
      const shouldError = () => {
        createElement(element, 'output')
      }
      expect(shouldError).toThrowErrorMatchingSnapshot()
    })

    it('Renames children', () => {
      const before = <file name="Sportello" />
      const after = <file name="Doc" />
      renderChange(before, after)
      expect(fs.snapshot()).toMatchSnapshot()
    })

    it('Removes children', () => {
      const before = <file name="Sportello" />
      const after = null
      renderChange(before, after)
      expect(fs.snapshot()).toMatchSnapshot()
    })
  })

  describe('<project>', () => {
    it('Creates itself', () => {
      const element = <project />
      renderElement(element, 'output')
      expect(fs.snapshot()).toMatchSnapshot()
    })

    it('Adds children', () => {
      const before = (
        <project>
          <file name="Sportello" />
        </project>
      )
      const after = (
        <project>
          <file name="Sportello" />
          <file name="Shasta" />
        </project>
      )
      renderChange(before, after)
      expect(fs.snapshot()).toMatchSnapshot()
    })

    it('Renames children', () => {
      const before = (
        <project>
          <file name="Sportello" />
        </project>
      )
      const after = (
        <project>
          <file name="Doc" />
        </project>
      )
      renderChange(before, after)
      expect(fs.snapshot()).toMatchSnapshot()
    })

    it('Removes children', () => {
      const before = (
        <project>
          <file name="Sportello" />
        </project>
      )
      const after = <project />
      renderChange(before, after)
      expect(fs.snapshot()).toMatchSnapshot()
    })
  })

  describe('<dir>', () => {
    it('Creates itself', () => {
      const element = <dir name="shasta" />
      renderElement(element, 'output')
      expect(fs.snapshot()).toMatchSnapshot()
    })

    it('Renames itself', () => {
      const first = <dir name="shasta" />
      const second = <dir name="faye" />
      renderChange(first, second)
      expect(fs.snapshot()).toMatchSnapshot()
    })

    it('Deletes itself', () => {
      const first = (
        <dir name="wrapper">
          <dir name="deleteMe" />
        </dir>
      )
      const second = <dir name="wrapper" />
      renderChange(first, second)
      expect(fs.snapshot()).toMatchSnapshot()
    })

    it('Throws when no name is provided', () => {
      const element = <dir />
      const shouldError = () => {
        renderElement(element, 'output')
      }
      expect(shouldError).toThrowErrorMatchingSnapshot()
    })

    it('Adds children', () => {
      const before = (
        <dir name="channel-estates">
          <file name="Sportello" />
        </dir>
      )
      const after = (
        <dir name="channel-estates">
          <file name="Sportello" />
          <file name="Shasta" />
        </dir>
      )
      renderChange(before, after)
      expect(fs.snapshot()).toMatchSnapshot()
    })

    it('Renames children', () => {
      const before = (
        <dir name="channel-estates">
          <file name="Sportello" />
        </dir>
      )
      const after = (
        <dir name="channel-estates">
          <file name="Doc" />
        </dir>
      )
      renderChange(before, after)
      expect(fs.snapshot()).toMatchSnapshot()
    })

    it('Removes children', () => {
      const before = (
        <dir name="channel-estates">
          <file name="Sportello" />
        </dir>
      )
      const after = <dir name="channel-estates" />
      renderChange(before, after)
      expect(fs.snapshot()).toMatchSnapshot()
    })
  })


  describe('<file>', () => {
    it('Creates a file', () => {
      const element = <file name="Sportello" />
      renderElement(element, 'output')
      expect(fs.snapshot()).toMatchSnapshot()
    })

    it('Renames a file', () => {
      const first = <file name="Doc" />
      const second = <file name="Sportello" />
      renderChange(first, second)
      expect(fs.snapshot()).toMatchSnapshot()
    })

    it('Renames a file and retains the correct name', () => {
      const first = <file name="Doc" />
      const second = <file name="Sportello" />
      renderChange(first, second)
      renderElement(second, 'output')
      renderElement(second, 'output')
      expect(fs.snapshot()).toMatchSnapshot()
    })

    it('Deletes a file', () => {
      const first = (
        <dir name="wrapper">
          <file name="deleteMe" />
        </dir>
      )
      const second = <dir name="wrapper" />
      renderChange(first, second)
      expect(fs.snapshot()).toMatchSnapshot()
    })

    it('Throws when no name is provided', () => {
      const element = <file />
      const shouldError = () => {
        renderElement(element, 'output')
      }
      expect(shouldError).toThrowErrorMatchingSnapshot()
    })

    it('Renders plain text', () => {
      const element = <file name="Sportello">Ahhh!</file>
      renderElement(element, 'output')
      expect(fs.getPath('output/Sportello')).toMatchSnapshot()
    })

    it('Mutates plain text', () => {
      const first = <file name="Sportello">Ahhh!</file>
      const second = <file name="Sportello">Whats that?</file>
      renderChange(first, second)
      expect(fs.getPath('output/Sportello')).toMatchSnapshot()
    })

    it('Deletes plain text', () => {
      const first = <file name="Sportello">Ahhh!</file>
      const second = <file name="Sportello" />
      renderChange(first, second)
      expect(fs.getPath('output/Sportello')).toMatchSnapshot()
    })

    it('Deletes multi-child text', () => {
      const first = (
        <file name="Sportello">
          <Text>Text</Text>
          <Text>deleteMe</Text>
        </file>
      )
      const second = (
        <file name="Sportello">
          <Text>Text</Text>
        </file>
      )
      renderChange(first, second)
      expect(fs.getPath('output/Sportello')).toMatchSnapshot()
    })

    it('Reorders multi-child text', () => {
      const first = (
        <file name="Sportello">
          <Text>First</Text>
          <Text>Second</Text>
          <Text>Third</Text>
        </file>
      )
      const second = (
        <file name="Sportello">
          <Text>First</Text>
          <Text>Third</Text>
          <Text>Second</Text>
        </file>
      )
      renderChange(first, second)
      expect(fs.getPath('output/Sportello')).toMatchSnapshot()
    })
  })
})
