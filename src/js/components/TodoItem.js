var React = require("react");
var TodoActions = require("../actions/TodoActions.js");
var TodoItemInput = require("./TodoItemInput.js");

class TodoItem extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      isEditing: false
    };
  };

  render() {
    if(this.state.isEditing == true){
      return(
        <TodoItemInput item={this.props.item} onEditingComplete={this._onEditingComplete} />
      );
    }else{

      var checked = this.props.item.status == "pending" ? false : true;

      return (
        <li>
          {this.props.item.text}
          &nbsp; &nbsp;
          <button onClick={this._startEditing}>edit</button>
          &nbsp; &nbsp;
          <button onClick={this._delete}>delete</button>
          &nbsp; &nbsp;
          <input type="checkbox" checked={checked} onChange={this._statusChange}/>
        </li>
      );
    }
  };

  _delete = () => {
    console.log(`asked to delete ${this.props.item.id}`);
    TodoActions.remove_todo(this.props.item.id);
  };

  _startEditing = () => {
    console.log(`asked to edit ${this.props.item.id}`);
    this.setState({isEditing: true});
  };

  _onEditingComplete = () => {
    this.setState({
      isEditing: false
    })
  };

  _statusChange = () => {
    TodoActions.toggle_status(this.props.item.id);
  };

}

TodoItem.propTypes = {
  item: React.PropTypes.object
};

TodoItem.defaultProps = {
  item: {}
}

module.exports = TodoItem;