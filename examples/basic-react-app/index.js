import React from 'react'
import { spawn } from 'child_process'
import { Code } from '../../src'

const processPromise = (command, args = [], { cwd, logData, logError }) =>
  new Promise((resolve, reject) => {
    const proc = spawn(command, args, { cwd })
    logData(`Starting \`${command} ${args.join(' ')}\``)
    proc.on('error', error => {
      logError(`Failed to start subprocess. Error: ${error}`)
      reject(error)
    })
    proc.stdout.on('data', logData)
    proc.stderr.on('data', logError)
    proc.on('close', code => {
      if (!code) {
        logData('Successfuly Exited')
        resolve(code)
      } else {
        logError(`Process Failed with exit code: ${code}`)
        reject(code)
      }
    })
  })

const makeLogger = prefix => data =>
  console.log(`\n_| ${prefix} |_____________________________________\n${data}`)

const install = outputPath =>
  processPromise('npm', ['install'], {
    cwd: outputPath,
    logData: makeLogger('Install Process'),
    logError: data => console.log(`${data}`),
  })

const start = outputPath =>
  processPromise('npm', ['start'], {
    cwd: outputPath,
    logData: makeLogger('Server Process'),
    logError: data => console.log(`${data}`),
  })

class App extends React.Component {
  installThenStart(outputPath) {    
    install(outputPath).then(() => {
      start(outputPath)
    })
  }

  render() {
    return (
      <project didRender={this.installThenStart}>
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

              const data = ['red', 'green', 'blue', 'not green']

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
