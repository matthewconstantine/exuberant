import React from 'react'
import { Code } from '../../src'
import LocalServer from './LocalServer'

class App extends React.Component {
  render() {
    return (
      <LocalServer port={9100}>
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
      </LocalServer>
    )
  }
}

export default <App />
