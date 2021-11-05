const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
// const login_github = require("./login_github");
const connection = require("./public/db/configmongoose");
const passport = require("passport");
const session = require("cookie-session");
const server = require("http").createServer(app);
const PORT = process.env.PORT || 4000;
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
const useRouter = require("./routes/usersInfo");
const photoRouter = require("./routes/photo");
const AttrachmentRouter = require("./routes/Attachments")
// view engine setup
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
connection();
app.use(
  session({
    secret: "zxzxczcasd",
    resave: false,
    saveUninitialized: true,
    cookie: { expires: 10000 * 60 },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use('/user' ,useRouter )
app.use("/Attrachment", AttrachmentRouter);
app.use("/photo", photoRouter);
// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });
server.listen(PORT, () => console.log("server is running at port " + PORT));
