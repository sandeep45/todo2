var React = require("react");
var TodoActions = require("../actions/TodoActions.js");

class TodoItemInput extends React.Component {

  constructor(props){
    super(props);
  };

  render(){
    return(
      <li>
        <input type="text" defaultValue={this.props.item.text} ref="textBox" />
        &nbsp; &nbsp;
        <input type="button" value="Save" onClick={this._update}></input>
        &nbsp; &nbsp;
        <input type="button" value="Cancel" onClick={this._cancel}></input>
      </li>
    );
  };

  _cancel = () => {
    console.log("updating todo item to: ", this.props.item.text);
    this.props.onEditingComplete();
  };

  _update = () => {
    console.log("updating todo item to: ", this.refs.textBox.value);
    TodoActions.update_todo(this.props.item.id, this.refs.textBox.value);
    this.props.onEditingComplete();
  }

};

TodoItemInput.propTypes = {
  item: React.PropTypes.object,
  onEditingComplete: React.PropTypes.func
};

TodoItemInput.defaultProps = {
  item: {},
  onEditingComplete: () => {}
}

module.exports = TodoItemInput;