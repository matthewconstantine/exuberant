const React = require('react')
const exuberant = require('../../src/fiber/index')

const { Dir, File } = exuberant

class Foo extends React.Component {
  componentWillMount() {
    console.log('Foo componentWillMount')
  }

  render() {
    return this.props.contents
  }
}

const Text = props => props.contents || props.children

const Wrapper = ({ children }) => children

const MakeSomeDirs = ({ names }) =>
  names.map(name => <Dir key={name} name={name} />)

// const App = (
//   <File key="file-key" name="file">
//     Contents as String 18
//     <Text contents="Contents as attr to Text 10"/>
//     Second Contents as string 11
//   </File>
// )

const App = (
  <Dir key="outer-dir-key" name="outer_directory">
    <Dir key="inner-dir-key" name="inner_directory">
      <File key="file-key" name="file3.js">
        Contents as String
        <Text contents="Contents as attr to Text" />
        More contents in a string
      </File>
      <Dir key="extra" name="extra" />
      <Dir key="extra2" name="extra2" />
      <Dir key="extra3" name="extra3" />
      <Dir key="extra7" name="extra7" />
    </Dir>
  </Dir>
)

// const App = (
//   <Dir key="outer-dir-key" name="outer_directory">
//     <Dir key="inner-dir-key" name="inner_directory">
//       <File key="file-key" name="file">
//         Contents as String
//         <Foo key="foo-key" contents="Content from Component" />
//         <Text key="text-key" contents="Content from stateless Component" />
//         <Wrapper key="wrapper-key">
//           <Text>Some fooooooo text within some JSX</Text>
//         </Wrapper>
//       </File>
//       <MakeSomeDirs key="makedirs-key" names={ ['one', 'two', 'three'] } />
//     </Dir>
//   </Dir>
// )

module.exports = App

// module.exports = buildTree(
//   <Project>
//     <File name="package.json">
//       <Code>
//         {`
//           {
//             "name": "basic-exuberant-react-app",
//             "version": "0.1.0",
//             "description": "",
//             "main": "index.js",
//             "scripts": {
//               "start": "webpack-dev-server --progress --colors --config ./webpack.config.js",
//               "test": "echo \\"Error: no test specified\\" && exit 1"
//             },
//             "dependencies": {
//               "react": "^16.1.1",
//               "react-dom": "^16.1.1"
//             },
//             "devDependencies": {
//               "babel-core": "^6.26.0",
//               "babel-loader": "^7.1.2",
//               "babel-preset-env": "^1.6.1",
//               "babel-preset-react": "^6.24.1",
//               "babel-preset-stage-2": "^6.24.1",
//               "webpack": "^3.8.1",
//               "webpack-dev-server": "^2.9.4"
//             },
//             "author": "",
//             "license": "ISC",
//             "babel": {
//               "presets": [
//                 "env",
//                 "react",
//                 "stage-2"
//               ]
//             }
//           }
//         `}
//       </Code>
//     </File>
//     <File name="webpack.config.js">
//       <Code>
//         {`
//           module.exports = {
//             entry: [
//               './src/index.js'
//             ],
//             module: {
//               loaders: [{
//                 test: /\.jsx?$/,
//                 exclude: /node_modules/,
//                 loader: 'babel-loader'
//               }]
//             },
//             resolve: {
//               extensions: ['.js', '.jsx']
//             },
//             output: {
//               path: __dirname + '/dist',
//               publicPath: '/',
//               filename: 'bundle.js'
//             },
//             devServer: {
//                 contentBase: './dist',
//             }
//           };
//         `}
//       </Code>
//     </File>
//     <Dir name="dist">
//       <File name="index.html">
//         <Code>
//           {`
//             <!DOCTYPE html>
//             <html>
//                 <head>
//                     <title>Minimal App Produced by Exuberant</title>
//                 </head>
//                 <body>
//                     <div id="app"></div>
//                     <script src="bundle.js"></script>
//                 </body>
//             </html>
//           `}
//         </Code>
//       </File>
//     </Dir>
//     <Dir name="src">
//       <File name="index.js">
//         <Code>
//           {`
//           import React from 'react'
//           import ReactDOM from 'react-dom'
//           import List from './components/List'
//           import Item from './components/Item'

//           const data = ['red', 'green', 'blue', 'mauve']

//           const App = () =>
//             <List name="Colors">
//               {data.map((item) =>
//                 <li key={item}>{item}</li>
//               )}
//             </List>

//           ReactDOM.render(<App />, document.getElementById('app'));
//           `}
//         </Code>
//       </File>
//       <Dir name="components">
//         <File name="List.js">
//           <Code>
//             {`
//               import React from 'react'

//               export default (props) =>
//                 <div>
//                   <h1>List of {props.name}</h1>
//                   <ul>
//                     {props.children}
//                   </ul>
//                 </div>
//             `}
//           </Code>
//         </File>
//         <File name="Item.js">
//           <Code>
//             {`
//               import React from 'react'

//               export default (props) =>
//                 <li>
//                   {props.children}
//                 </li>
//             `}
//           </Code>
//         </File>
//       </Dir>
//     </Dir>
//   </Project>
// )
