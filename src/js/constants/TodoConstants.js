var keyMirror = require("keymirror");

var todoConstants = keyMirror({
  TODO_INDEX: null,
  TODO_CREATE: null,
  TODO_DELETE: null,
  TODO_UPDATE: null,
  TODO_TOGGLE_STATUS: null
});

module.exports = todoConstants;