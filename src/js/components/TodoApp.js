console.log("in TodoApp.js");

var React = require("react");
var ReactDOM = require("react-dom");
var MainSection = require("./MainSection");
var DevSection = require("./DevSection");
var TodoStore = require("../stores/TodoStore.js");
var TodoActions = require("../actions/TodoActions.js");

var getDataFromTodoStore = () => {
  return {
    allTodos: TodoStore.getAll()
  };
};

class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      allTodos : []
    }
  };

  componentDidMount = () => {
    TodoStore.addChangeListener(this._onChange);
    TodoActions.get_all_todos();
  };

  componentWillUnmount = () => {
    TodoStore.removeChangeListener(this._onChange);
  };

  render() {
    return (
      <div>
        <h2> Notes - {this.props.blurb} </h2>
        <MainSection allTodos={this.state.allTodos} />
        <DevSection data={this.state.allTodos} />
      </div>
    );
  };

  _onChange = () => {
    this.setState(getDataFromTodoStore());
  };
}

App.propTypes = {
  blurb: React.PropTypes.string
};

App.defaultProps = {
  blurb: "this is cool"
};

module.exports = App;