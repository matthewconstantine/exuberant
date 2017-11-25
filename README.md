# Exuberant

## A React Renderer for filesystems

This is a proof-of-concept which shows how React can be used to output directories and files instead of DOM elements. 

What if we could create directories and files just as easily as we create DOM elements? 

```javascript
const project = buildTree(
  <Project>
    <Dir name="src">
      <File name="index.js">
        <Code>{helloWorld('dude')}</Code>
      </File>
      <Dir name="components">
        <File name="List.js"/>
        <File name="Item.js"/>
      </Dir>
    </Dir>
  </Project>
)

saveToFileSystem(project.toJSON(), './output');
```

### Why?

React is powerful tool for creating hierarchical content. JSX, in particular, provides a powerful way of creating and managing arbitrarily large hierarchies. The DOM is just one such hierarchy. Filesystems are hierarchical too, so why not target those? That's what Exuberant does.

### What's it good for?

#### Code Generators

Code Generators typically rely on code templates within example directory structures. Those templates often use handlebars or something similar. Creating code generators requires special knowledge of how to create and manage those templates and their directory structure. 

Exuberant makes it easier. You already know React and ES6 template literals are more than adequate for templating. Just use `<Dir>` and `<File>` and make something interesting.

### How does it work?

Currently Exuberant is a write-only library. It works in a similar way to [AirBnb's React Sketch.app](https://github.com/airbnb/react-sketchapp) which, a the time of writing, uses [React's Test Renderer](https://www.npmjs.com/package/react-test-renderer) to create a object hierarchy. Exuberant uses that object hierarchy to create directories and files in the same way React Sketch.app outputs Sketch files.

#### Future

In the future, this could use react's Fiber library to create a high performance read/write filesystem renderer. It could have interesting uses as a project build tool. 

It might also make filesystem aware codemods easier to write. Codemods typically work on just code only, Exuberant could make it easier to transform entire project structures.

### Why does this exist?

I wanted to explore architectural patterns for large-scale apps and found existing code-generators solutions to be lacking. I need a more flexible solution that can generate thousands of files with arbitrary directory structures. With all the react custom renderers out there I was surprised no-one had made one that targets the file system, one of the most fundamental hierarchies we deal with. 
