import createError from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";
import connectMongoDB from "./connectDB/connectToMongo";
import authRouter from "./routes/auth";
// Import routers
// import indexRouter from "./routes/index";
// import usersRouter from "./routes/users";
// Load environment variables from .env file
dotenv.config();
const app = express();

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// Middleware setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// Routes
// app.use("/", indexRouter);
// app.use("/users", usersRouter);
app.use("/api/auth", authRouter);
// Catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction): void => {
  next(createError(404));
});

// Error handler
app.use((err: any, req: Request, res: Response, next: NextFunction): void => {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render("error");
});
connectMongoDB();
// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app for testing or further usage
export default app;
