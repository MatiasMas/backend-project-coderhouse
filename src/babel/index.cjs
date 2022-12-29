"use strict";

exports.__esModule = true;
exports.currentPassport = void 0;
var _express = _interopRequireDefault(require("express"));
var _http = _interopRequireDefault(require("http"));
var _path = _interopRequireDefault(require("path"));
var _url = require("url");
var _dotenv = _interopRequireDefault(require("dotenv"));
var _productsRouter = _interopRequireDefault(require("C:\\Users\\User\\Documents\\WebstormProjects\\backend-project-coderhouse\\src\\routers\\products.router.js"));
var _cartsRouter = _interopRequireDefault(require("C:\\Users\\User\\Documents\\WebstormProjects\\backend-project-coderhouse\\src\\routers\\carts.router.js"));
var _loginRouter = _interopRequireDefault(require("C:\\Users\\User\\Documents\\WebstormProjects\\backend-project-coderhouse\\src\\routers\\login.router.js"));
var _cors = _interopRequireDefault(require("cors"));
var _serverSetup = require("C:\\Users\\User\\Documents\\WebstormProjects\\backend-project-coderhouse\\src\\websockets\\server.setup.js");
var _messagesSocket = require("C:\\Users\\User\\Documents\\WebstormProjects\\backend-project-coderhouse\\src\\websockets\\messages.socket.js");
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _connectFirestore = require("@google-cloud/connect-firestore");
var _firestore = require("firebase-admin/firestore");
var _connectMongo = _interopRequireDefault(require("connect-mongo"));
var _passport = _interopRequireDefault(require("passport"));
var _passportSettings = require("C:\\Users\\User\\Documents\\WebstormProjects\\backend-project-coderhouse\\src\\passport\\passport.settings.js");
var _registerRouter = _interopRequireDefault(require("C:\\Users\\User\\Documents\\WebstormProjects\\backend-project-coderhouse\\src\\routers\\register.router.js"));
var _utilsRouter = _interopRequireDefault(require("C:\\Users\\User\\Documents\\WebstormProjects\\backend-project-coderhouse\\src\\routers\\utils.router.js"));
var _cluster = _interopRequireDefault(require("cluster"));
var _os = _interopRequireDefault(require("os"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
//Creating server
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
var app = (0, _express["default"])();
var server = _http["default"].createServer(app);
var io = (0, _serverSetup.createIOServer)(server);
var messagesSocket = new _messagesSocket.MessagesSocket(io);

//Linking .env file
_dotenv["default"].config();

/////////////////////////
messagesSocket.establishConnectionWithClientAndSendInformation();
/////////////////////////

//App middlewares
app.use((0, _cors["default"])({
    origin: "http://localhost:3000",
    // <-- location of the react app were connecting to
    credentials: true
}));
app.use((0, _cookieParser["default"])());
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
    extended: true
}));

// //Session Firestore
// app.use(session({
//     store: new FirestoreStore({
//         dataset: getFirestore(),
//         kind: "express-sessions"
//     }),
//     secret: "secretKey",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         maxAge: 60 * 10 * 1000
//     }
// }));

//Session Mongo local
app.use((0, _expressSession["default"])({
    store: _connectMongo["default"].create({
        mongoUrl: process.env.MONGODB_URI
    }),
    secret: "secretKey",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 10 * 1000
    }
}));

//Passport settings
app.use(_passport["default"].initialize());
app.use(_passport["default"].session());
(0, _passportSettings.setPassport)(_passport["default"]);
var currentPassport = _passport["default"];

//Routers setup
exports.currentPassport = currentPassport;
app.use("/api/products", _productsRouter["default"]);
app.use("/api/carts", _cartsRouter["default"]);
app.use("/", _loginRouter["default"]);
app.use("/", _registerRouter["default"]);
app.use("/", _utilsRouter["default"]);

//Server port setup
var PORT = process.argv[2] || process.env.PORT;
var serverMode = process.argv[4] || process.env.SERVER_MODE;
var subprocessesNumber = _os["default"].cpus().length;
if (serverMode.toLowerCase() === "cluster" && _cluster["default"].isPrimary) {
    for (var i = 0; i < subprocessesNumber; i++) {
        _cluster["default"].fork();
    }
    _cluster["default"].on("exit", function (worker, error) {
        console.log("The subprocess with PID: " + worker.process.pid + " has stopped working.");
        _cluster["default"].fork();
    });
} else {
    server.listen(PORT, function () {
        console.log("Server has initiated on port http://localhost:" + PORT + ", PID: " + process.pid + ".");
    });
    server.on("error", function (err) {
        return console.log(err);
    });
}