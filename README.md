# Exuberant
What if we could create directories and files just as easily as we create DOM elements? 

## A React Renderer for File Systems

This is a proof-of-concept library which uses React to target the filesystem instead of DOM elements. 

```javascript
const you = "World"
const App = (
  <project>
    <dir name="src">
      <file name="index.js">
        <code>
        {`
          export default () => "Hello ${you}"
        `}
        </code>
      </file>
    </dir>
  </project>
)
```

### Why?

React is a powerful tool for creating and managing arbitrarily large hierarchies. The DOM is just one such hierarchy. File systems are hierarchical too, so why not target those? That's what Exuberant does.

What if we could create directories and files just as easily as we create DOM elements? 

### Running the Example

1. Clone this repo
2. Install the dependencies with `npm install` (yarn works too).
3. Run the example with `npm run watch:example`

With the example running, you're free to edit the template and see the changes reflected automatically. 

4. In another tab, launch the example: `npm run launch:example`
5. Open `http://localhost:8080` in your browser.

Now when you edit the App's exuberant template, exuberant will update just the files that change, which in turn triggers the sample app to do the same, rendering the new results to the page.

### What's it good for?

#### Code Generators

Scaffolding tools are often overly complex, too restrictive, or lack a good developer experience for authors. As we start new projects, rather than develop our own generators, we often simply copy the last thing that worked.

Some scaffolding tools allow composability but often at the cost of learning complicated tooling. 

Exuberant aims to provide a new foundation for code generators. One which is rooted in the tools and techniques React programmers are already familiar with. 

Exuberant frees code generators from predetermined directory structures. Rework the files and directories in real-time using the same React knowledge you already have. 

#### Static Site Generators

Exuberant could work as a foundation for building a static site. While different from React's Server Side Rendering, Exuberant may prove to be a simpler option.

#### Dev Ops 

What if we can act upon the files Exuberant generates? React components already have lifecycle hooks. What if we use those hooks to automatically run, launch and even deploy servers? I'm still exploring this but I hope to have a proof-of-concept like this:

```javascript
class App extends React.Component {
  onBuildComplete({ server }) {
    this.props.log(`Server Built: ${server.name}`)
  }

  onBuildComplete({ server }) {
    this.props.log(`Server Started: ${server.name}`)
  }

  render() {
    return (
      <Server 
        name="one" 
        port="8000" 
        onBuild={this.onBuildComplete} 
        onStart={this.onServerStart} 
      />
      <Server 
        name="two" 
        port="8001" 
        onBuild={this.onBuildComplete}
        onStart={this.onServerStart}
      />
    )
  }
}
```

#### What could you do with it?
* Create multiple apps at once, each configured differently
* Writing a library? Run it against multiple versions of common dependencies at once
* Scaffold out your next massive app without locking yourself into a particular directory structure.
* Write an app in two languages or frameworks at once. I'll leave it to you to decide how :)
* Refactor existing apps (without slowing your team down) by importing the files into a data structure and re-exporting them with Exuberant.
* If the above `<Server>` tag pans out, make your own blockchain simulator.

### How does it work?

Exuberant uses React's Fiber Reconciler, the core or React, to create, modify, rename and delete files in real-time. 

With React Fiber, Exuberant makes it painless to interact with the filesystem with just React code. And it does it in real-time, modifying only the files necessary. 

### Thanks

Much thanks to [Nitin Tulswani](https://github.com/nitin42) for the wonderful [Making a Custom React Renderer](https://github.com/nitin42/Making-a-custom-React-renderer) tutorial which I used to build this.
