var React = require("react");
var TodoActions = require("../actions/TodoActions.js");
var TodoItem = require("./TodoItem.js");

class MainSection extends React.Component{
  constructor(props){
    super(props);
  };

  render() {
    return (
      <div>
        <h3> This is the main section where we list all the notes </h3>
        <button onClick={this._load_all}>LoadAll</button>
        <button onClick={this._create}>Create New Todo</button>
        <ul>
          {this.props.allTodos.map(todoItem => <TodoItem key={todoItem.id} item={todoItem} />)}
        </ul>
      </div>
    );
  };

  _load_all = () => {
    console.log("in load all user click button. will fire an action");
    TodoActions.get_all_todos();
  };

  _create = () => {
    TodoActions.create("New Item");
  };

};

MainSection.propTypes = {
  allTodos: React.PropTypes.array
};

MainSection.defaultProps = {
  allTodos: []
}

module.exports = MainSection;