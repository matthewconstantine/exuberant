import React from 'react'
import { spawn } from 'child_process'
import { Code } from '../../src'

// function resize(req, resp) {
//     const args = [
//         "-", // use stdin
//         "-resize", "640x", // resize width to 640
//         "-resize", "x360<", // resize height if it's smaller than 360
//         "-gravity", "center", // sets the offset to the center
//         "-crop", "640x360+0+0", // crop
//         "-" // output to stdout
//     ];
//     const proc = spawn('convert', args);
//     proc.stdout.pipe(resp);
// }

class App extends React.Component {
  constructor() {
    super()
    this.install = this.install.bind(this)
  }

  state = {
    installing: false,
  }

  install(outputPath) {
    console.log("this.state", this.state)
    
    if (!this.state.installing) {
      this.setState({ installing: true })
      // const proc = spawn('npm', ['install'], {
      //   cwd: outputPath,
      // })
      // proc.stdout.on('data', data => {
      //   console.log(`proc stdout:\n${data}`)
      // })
    }
  }

  render() {
    return (
      <project didRender={this.install}>
        <copy from="boilerplate/package.json" key="package.json" />
        <copy from="boilerplate/webpack.config.js" key="webpack.config" />
        <dir name="dist" key="dist">
          <copy from="boilerplate/index.html" key="index.html" />
        </dir>
        <dir name="src" key="src">
          <file name="index.js" key="index.js">
            <Code>
              {`
              import React from 'react'
              import ReactDOM from 'react-dom'
              import List from './components/List'
              import Item from './components/Item'

              const data = ['red', 'green', 'blue', 'cyan']

              const App = () =>
                <List key="Colors" name="Colors">
                  {data.map((item) =>
                    <li key={item}>{item}</li>
                  )}
                </List>

              ReactDOM.render(<App />, document.getElementById('app'));
              `}
            </Code>
          </file>
          <dir name="components" key="components">
            <file key="List.js" name="List.js">
              <Code>
                {`
                  import React from 'react'

                  export default (props) =>
                    <div>
                      <h1>List of {props.name}</h1>
                      <ul>{props.children}</ul>
                    </div>
                `}
              </Code>
            </file>
            <file name="Item.js" key="Item.js">
              <Code>
                {`
                  import React from 'react'

                  export default (props) => <li>{props.children}</li>
                `}
              </Code>
            </file>
          </dir>
        </dir>
      </project>
    )
  }
}

export default <App />
