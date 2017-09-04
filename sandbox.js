const React = require('react');
const Exuberant = require('./stack');

const render = Exuberant.render;

const toJSON = (props) => {
  if (props.children) {
    let childRoutes;
    if (Array.isArray(props.children)) {
      childRoutes = props.children.map(child => (
        typeof child.props.toJSON === 'function'
        ? child.props.toJSON(child.props)
        : toJSON(child.props)
      ));
    } else {
      childRoutes = {};
    }
    return {path: props.path, childRoutes};
  }

  return {path: props.path};
};

// const Route = (path, component, children) =>  
//   React.createElement('Route', {path: path, component: component, key: path}, children);

// const Rte = (path, component, children) =>
//   React.createElement('Route', {path: path, component: component, key: path, toJSON: toJSON}, children);


// const Base = () => <div className="foo"/>;
// const Page1 = () => React.createElement('div');
// const Page2 = () => React.createElement('div');

const Dir = () => React.createElement('div');
const File = () => React.createElement('div');

// const McWrap = () => (<div name='foooo'>Hey</div>)

class McWrap extends React.Component {
  render() {
    return <div name="classfoooo">Class Foo!</div>
  }
}


const element = render(
  <div name="outerdiv">
    <McWrap name="mcwrap" />
  </div>
);

console.log("elementttt", element)
// console.log("<div name='foo'/>", <McWrap key='1' name='foo'/>);


