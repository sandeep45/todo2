var AppDispatcher = require("../dispatcher/AppDispatcher.js");
var TodoConstants = require("../constants/TodoConstants.js");

var TodoActions = {

  get_all_todos: () => {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_INDEX
    });
  },

  create: (text) => {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_CREATE,
      text: text
    });
  },

  remove_todo: (id) => {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_DELETE,
      id: id
    });
  },

  update_todo: (id, newText) => {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_UPDATE,
      id: id,
      newText: newText
    });
  },

  toggle_status: (id, newText) => {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_TOGGLE_STATUS,
      id: id
    });
  }

};

window.TodoActions = TodoActions;
module.exports = TodoActions;
