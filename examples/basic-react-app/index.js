import React from 'react'
import { Code } from '../../src'

const App = (
  <project>
    <file key="package.json" name="package.json">
      <Code>
        {`
          {
            "name": "basic-exuberant-react-app",
            "version": "0.1.0",
            "description": "",
            "main": "index.js",
            "scripts": {
              "start": "webpack-dev-server --progress --colors --config ./webpack.config.js",
              "test": "echo \\"Error: no test specified\\" && exit 1"
            },
            "dependencies": {
              "react": "^16.1.1",
              "react-dom": "^16.1.1"
            },
            "devDependencies": {
              "babel-core": "^6.26.0",
              "babel-loader": "^7.1.2",
              "babel-preset-env": "^1.6.1",
              "babel-preset-react": "^6.24.1",
              "babel-preset-stage-2": "^6.24.1",
              "webpack": "^3.8.1",
              "webpack-dev-server": "^2.9.4"
            },
            "author": "",
            "license": "ISC",
            "babel": {
              "presets": [
                "env",
                "react",
                "stage-2"
              ]
            }
          }
        `}
      </Code>
    </file>
    <file key="webpack.config.js" name="webpack.config.js">
      <Code>
        {`
          module.exports = {
            entry: [
              './src/index.js'
            ],
            module: {
              loaders: [{
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
              }]
            },
            resolve: {
              extensions: ['.js', '.jsx']
            },
            output: {
              path: __dirname + '/dist',
              publicPath: '/',
              filename: 'bundle.js'
            },
            devServer: {
                contentBase: './dist',
            }
          };
        `}
      </Code>
    </file>
    <dir key="dist" name="dist">
      <file key="index.html" name="index.html">
        <Code>
          {`
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Minimal App Produced by Exuberant</title>
                </head>
                <body>
                    <div id="app"></div>
                    <script src="bundle.js"></script>
                </body>
            </html>
          `}
        </Code>
      </file>
    </dir>
    <dir key="src" name="src">
      <file key="index.js" name="index.js">
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
      <dir key="components" name="components">
        <file key="List.js" name="List.js">
          <Code>
            {`
              import React from 'react'

              export default (props) =>
                <div>
                  <h1>List of {props.name}</h1>
                  <ul>
                    {props.children}
                  </ul>
                </div>
            `}
          </Code>
        </file>
        <file key="Item.js" name="Item.js">
          <Code>
            {`
              import React from 'react'

              export default (props) =>
                <li>
                  {props.children}
                </li>
            `}
          </Code>
        </file>
      </dir>
    </dir>
  </project>
)

export default App
