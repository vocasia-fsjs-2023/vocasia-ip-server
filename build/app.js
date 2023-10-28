"use strict";

var _express = _interopRequireDefault(require("express"));
var _user = _interopRequireDefault(require("./routes/user.js"));
var _auth = require("./controllers/auth.js");
var _auth2 = _interopRequireDefault(require("./middlewares/auth.js"));
var _kanban = _interopRequireDefault(require("./routes/kanban.js"));
var _kanbanColumn = _interopRequireDefault(require("./routes/kanbanColumn.js"));
var _kanbanNote = _interopRequireDefault(require("./routes/kanbanNote.js"));
var _member = _interopRequireDefault(require("./routes/member.js"));
var _auth3 = _interopRequireDefault(require("./routes/auth.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();
var port = process.env.PORT || 3000;
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use("/auth", _auth3["default"]);
app.use("/user", _auth2["default"], _user["default"]);
app.use("/kanban", _auth2["default"], _kanban["default"]);
app.use("/column", _auth2["default"], _kanbanColumn["default"]);
app.use("/note", _auth2["default"], _kanbanNote["default"]);
app.use("/member", _auth2["default"], _member["default"]);
app.listen(port, function () {
  console.log("Server listening on port " + port);
});