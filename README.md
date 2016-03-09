# Skelton of a Flux and App

While building my first TODO flux application I notitced a lot of boiler plate code. The same pattern of code being repeated. Here i want to document this skelton of the application. Hopefully this could be a good starting point for building other FLUX apps in the future.

## Initialize

I created a directory called `todo2` for my project and copied over an existing React project's `package.json`. I updated the name, description, scripts etc. and kept the dev dependencies like wepack, react, flux, babel etc.

Then `npm install` will install all required dependencies and get this project ready for building with flux, react and webpack.

## Directory Structure

1. Create two directory `src` and `dist`.

2. Within `src` I have two directories `js` and `templates`.

3. Inside `js` I have all my code broken into `actions`, `components`, `constants`, `dispatcher`, `stores` and an `app.js` file.

3. Within templates I have added a scaffold of an html file which has a div with id of `app` so I can build my app there. This template will be used by webpack, to inject the depencies and build the output file.

4. The `dist` folder remains empty and will hold the output build by webpack. We will be running code from this folder.

## Webpack

To build our code, resolve dependcies, package it and run it in development I am using webpack. To get started I just copied over an existing projects webpack.config.js. Its a good starting point and gets the project going.

At this point I can run my dev server like this:

````
webpack-dev-server --debug --inline --hot --progress --colors --display-reasons
````

and then I can browse to `http://localhost:8080/dist/app.html` and I will get the blank app.html page we had put in the `templates` folder.

Now that we have a structure setup and server running, lets start building the components of a flux app.

## app.js

This file `todo2\src\app.js` is the file which is the entry point setup in webpack's config. Code here will be build, resolved, compiled etc and put in to `app.html` and then run.  In my case this file looks like:

````
var React = require("react");
var ReactDOM = require("react-dom");
var TodoApp = require("./components/TodoApp.js");

ReactDOM.render(
  <TodoApp />,
  document.getElementById("app")
);
````

Here i am requiring `React` and `ReactDOM`, then I am requiring my main reactApp file and then instantiating it and putting it in to the `app` div. The content of this file seems pretty standard to me and could be used almost exactly in every Flux project.

## Dispatcher

It gets all the actions, and it then sends those actions to all the stores which have registered themselves with the dispatcher. It also has ability to manage dependencies between stores.

`\todo2\src\js\dispatcher\AppDispatcher.js`

````
var Dispatcher = require("flux").Dispatcher;

module.exports = new Dispatcher();
````

This is a basic implementation of the dispacher by using the facebook's implementation. Now in my code, i can require this this dispatcher and access its `disptach` method and pass in actions.

## TodoConstants.js

````
var keyMirror = require("keymirror");

var todoConstants = keyMirror({
  TODO_INDEX: null,
  TODO_CREATE: null,
  TODO_DELETE: null,
  TODO_UPDATE: null,
  TODO_TOGGLE_STATUS: null
});

module.exports = todoConstants;
````

I am using `keymirror and have build a json of all constants which represent different actions i will be triggering from my views by the actions helper and processing in my stores.

## TodoActions.js

````
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

  // etc. etc.
````

This is a helper file with a differnt actions we want to call. These are called from the views and all they do is call the dispatcher with the appropriate constant representing the action and it also passes in any other params needed.

## TodoStore.js

Store will be receving actions from the dispatcher, it will be processing the actions, registering views which want to listen to store changes, emitting changes to views and mainiting its internal state. Store's have more boiler plate code than the other items we have covered. so lets break it down in to smaller items.

#### Registering views

````
var EventEmitter = require("events").EventEmitter;

var CHANGE_EVENT = "change";

var _todos = {};

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
````

Now all views can register themselves to a store, by calling its `addChangeListener`. They can also access the internal state of the view by the public method `getAll`. We have also defined a method `emitChange` which can be called from other methods in the store to reflect that its internal state has changed.

#### Dispatcher Registration & Action Processings

````
var AppDispatcher = require("../dispatcher/AppDispatcher.js");
var TodoConstants = require("../constants/TodoConstants.js");

AppDispatcher.register(function(action){
  switch(action.actionType){
    case TodoConstants.TODO_INDEX:
      console.log("processing index action");
      _todos = getAllTodoFromServer();
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_CREATE:
      console.log("processing delete action for: " + action.id);
      add_a_todo(action.text);
      TodoStore.emitChange();
      break;

    default:
      console.log(`as todo store i dont process this action ${action.actionType}`);
  }
});
````

Here we have registered the store to the dispatcher so it can get all the actions. It also has a big switch statement to process all the actions it receives and then call internal methods for the actions it cares about.

#### Private methods

````
function add_a_todo(text){
  _todos.push({
    id: new Date().getTime(),
    text: text,
    status: "pending"
  });
};

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
````

#### Combine

Now we can combine all the above items and we will get the store object.


## Controller View

For every view aspect in our project we will build a controller view. This view, registers itself with the store, listens for changes, instantiates other react views, gets data from the store and passes it down all instantiated views. Again there is quite a bit of boiler plate code so we will break it down and go over them a few lines at a time.

First we require the react dependencies:

````
var React = require("react");
var ReactDOM = require("react-dom");
````

Then we require other react views we will be instantiating

`````
var MainSection = require("./MainSection");
var DevSection = require("./DevSection");
````

Then we require the store and action as we need to register oursleves with the store and call action helpers in response to user UI interactions.

````
var TodoStore = require("../stores/TodoStore.js");
var TodoActions = require("../actions/TodoActions.js");
````

Now we can build the React view and register with the store for events.

````
class App extends React.Component{

  constructor(props){
    super(props);
  };

  componentDidMount = () => {
    TodoStore.addChangeListener(this._onChange);
    TodoActions.get_all_todos();
  };

  componentWillUnmount = () => {
    TodoStore.removeChangeListener(this._onChange);
  };
}
````

We then define a private method

We then have the `render` method which instatiates the other React views and it passes the entire object down to them.

````
render() {
    return (
      <div>
        <h2> Notes - {this.props.blurb} </h2>
        <MainSection allTodos={this.state.allTodos} />
        <DevSection data={this.state.allTodos} />
      </div>
    );
  };
````

The controller view is storing the data it gets in its state and then pass it down to the other components. It has registered to the store so this data gets updated as the store gets updated.

## Views

These are regular React views. On user interaction they fire off actions.

````
var React = require("react");
var TodoActions = require("../actions/TodoActions.js");

class TodoItem extends React.Component{

  constructor(props){
    super(props);
  };

  render() {
      return (
        <li>
          {this.props.item.text}
          <button onClick={this._delete}>delete</button>
        </li>
      );
  };

  _delete = () => {
    TodoActions.remove_todo(this.props.item.id);
  };

}
````










