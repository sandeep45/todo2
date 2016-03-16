console.log("this is app.js");

require("jquery");
require("bootstrap/dist/css/bootstrap.css");
require("bootstrap/dist/css/bootstrap-theme.css");
require("bootstrap");

var React = require("react");
var ReactDOM = require("react-dom");
var TodoApp = require("./components/TodoApp.js");

ReactDOM.render(
  <TodoApp />,
  document.getElementById("app")
);

