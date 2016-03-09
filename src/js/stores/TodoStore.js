var AppDispatcher = require("../dispatcher/AppDispatcher.js");
var EventEmitter = require("events").EventEmitter;
var TodoConstants = require("../constants/TodoConstants.js");

var CHANGE_EVENT = "change";

var TodoStore = Object.assign({}, EventEmitter.prototype, {

  getAll: () => _todos,

  emitChange: function(){
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

});

AppDispatcher.register(function(action){

  console.log(`processing action ${action.actionType}`, action);

  switch(action.actionType){
    case TodoConstants.TODO_INDEX:
      console.log("processing index action");
      _todos = getAllTodoFromServer();
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_DELETE:
      console.log("processing delete action for: " + action.id);
      remove_a_todo(action.id);
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_CREATE:
      console.log("processing delete action for: " + action.id);
      add_a_todo(action.text);
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_UPDATE:
      console.log("processing update action for: " + action.id);
      update_a_todo(action.id, action.newText);
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_TOGGLE_STATUS:
      console.log("processing update action for: " + action.id);
      toggle_status_of_todo(action.id);
      TodoStore.emitChange();
      break;

    default:
      console.log(`as todo store i dont process this action ${action.actionType}`);
  }


});

var _todos = {};

function getAllTodoFromServer(){

  // make ajax
  var result = [
    {
      id: "1",
      text: "abc",
      status: "pending"
    },
    {
      id: "2",
      text: "xyz",
      status: "pending"
    },
    {
      id: "3",
      text: "Sandeep Arneja from Server",
      status: "complete"
    }
  ];

  return result;
};

function remove_a_todo(id){
  _todos = _todos.filter( obj => obj.id != id);
  // make ajax to persist on server
};

function add_a_todo(text){
  _todos.push({
    id: new Date().getTime(),
    text: text,
    status: "pending"
  });
};

function update_a_todo(id, newText){
  _todos = _todos.map( (obj) => {
    if(obj.id == id){
      obj["text"] = newText;
    }
    return obj;
  });
};

function toggle_status_of_todo(id){
  _todos = _todos.map( (obj) => {
    if(obj.id == id){
      if(obj.status == "pending"){
        obj["status"] = "complete";
      }else{
        obj["status"] = "pending";
      }
    }
    return obj;
  });
}

module.exports = TodoStore;