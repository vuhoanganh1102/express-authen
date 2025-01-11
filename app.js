"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const connectToMongo_1 = __importDefault(require("./connectDB/connectToMongo"));
const auth_1 = __importDefault(require("./routes/auth"));
// Import routers
// import indexRouter from "./routes/index";
// import usersRouter from "./routes/users";
// Load environment variables from .env file
dotenv_1.default.config();
const app = (0, express_1.default)();
// View engine setup
app.set("views", path_1.default.join(__dirname, "views"));
app.set("view engine", "jade");
// Middleware setup
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
// Routes
// app.use("/", indexRouter);
// app.use("/users", usersRouter);
app.use("/api/auth", auth_1.default);
// Catch 404 and forward to error handler
app.use((req, res, next) => {
    next((0, http_errors_1.default)(404));
});
// Error handler
app.use((err, req, res, next) => {
    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // Render the error page
    res.status(err.status || 500);
    res.render("error");
});
(0, connectToMongo_1.default)();
// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server is running on http://localhost:${PORT}`);
}));
// Export the app for testing or further usage
exports.default = app;
