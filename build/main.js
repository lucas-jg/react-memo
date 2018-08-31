"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _morgan = require("morgan");

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _expressSession = require("express-session");

var _expressSession2 = _interopRequireDefault(_expressSession);

var _routes = require("./routes");

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// HTTP REQUEST LOGGER
var app = (0, _express2.default)(); // PARSE HTML BODY

var port = 3000;

/* mongodb connection */
var db = _mongoose2.default.connection;
db.on("error", console.error);
db.once("open", function () {
  console.log("Connected to mongodb server");
});
// mongoose.connect('mongodb://username:password@host:port/database=');
_mongoose2.default.connect("mongodb://readyq.tv:27017/database=admin");

/* use session */
app.use((0, _expressSession2.default)({
  secret: "CodeLab1$1$234",
  resave: false,
  saveUninitialized: true
}));

app.use((0, _morgan2.default)("dev"));
app.use(_bodyParser2.default.json());

app.use("/", _express2.default.static(_path2.default.join(__dirname, "./../public")));
app.use("/api", _routes2.default);

app.get("/hello", function (req, res) {
  return res.send("Hello CodeLab");
});

app.listen(port, function () {
  console.log("Express is listening on port", port);
});