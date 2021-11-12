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
const RoomMeetingRouter = require("./routes/RoomMeeting");
const photoRouter = require("./routes/photo");
const AttrachmentRouter = require("./routes/Attachments");
const users = [];
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
app.use("/user", useRouter);
app.use("/Attrachment", AttrachmentRouter);
app.use("/photo", photoRouter);
app.use("/MeetingRoom", RoomMeetingRouter);
io.on("connection", (socket) => {
  console.log("socket connection");
  socket.on("create_room", (data, UserRoom) => {
    // console.log(data);
    socket.idUser = data.UserRoom;
    socket.room_id = data.RoomId;

    users.push({ Room: data.RoomId, Data: "Host", idUser: data.UserRoom });
    socket.join(data.RoomId);
  });

  socket.on("join_room", (data) => {
    socket.join(data.room_id);
    socket.idUser = data.ownerId;
    socket.room_id = data.room_id;
    // if (data.ownerId != users[0].idUser && data.room_id != users[0].Room) {
    let index = users.findIndex((user) => user.idUser === socket.idUser);
    if (index == -1) {
      users.push({
        RoomJoin: data.room_id,
        idUser: data.ownerId,
      });
    }
    // }
    io.to(data.room_id).emit("SomeOneJoin", users);

    io.to(data.room_id).emit("newUserJoin", {
      RoomJoin: data.room_id,
      message: data.userInfo + " Vừa Join vào room",
      userName: data.userInfo,
      idUser: data.ownerId,
    });
  });

  // socket.on("sendMessage", (message) => {
  //   console.log(message + socket.room_id);

  //   io.to(socket.room_id).emit("newMessages", message);
  // });

  socket.on("disconnect", () => {
    console.log("disconnect call");
    let index = users.findIndex((user) => user.idUser === socket.idUser);
    users[
      ({
        ...users.slice(0, index),
      },
      {
        ...users.slice(index + 1),
      })
    ];
    let infoSomeOneDisconnect = socket.idUser;
    io.to(socket.room_id).emit("someOneDisconnect", users);
  });
});

server.listen(PORT, () => console.log("server is running at port " + PORT));
