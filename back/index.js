const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const config = require("./config/key");
const userRouter = require("./routes/user");
const videoRouter = require("./routes/video");
const subscribeRouter = require("./routes/subscribe");
const commentRouter = require("./routes/comment");
const likeRouter = require("./routes/like");

const app = express();

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/video", videoRouter);
app.use("/api/subscribe", subscribeRouter);
app.use("/api/comment", commentRouter);
app.use("/api/like", likeRouter);
app.use("/back/uploads", express.static("back/uploads"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
