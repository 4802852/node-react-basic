const express = require("express");
const app = express();
const port = 3000;

const { User } = require("./models/User");
const { auth } = require("./middleware/auth");

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const cookieParser = require("cookie-parser");

app.use(cookieParser());

const config = require("./config/key");

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/users/register", (req, res) => {
  // 회원 가입 할때 필요한 정보들을 client 에서 가져오면, 그것들을 데이터 베이스에 넣어준다.
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.post("/api/users/login", (req, res) => {
  // 요청된 이메일이 데이터 베이스에 있는지 확인
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) return res.json({ loginSucess: false, message: "이메일을 확인해주세요." });

    // 요청된 이메일이 있다면, 비밀번호가 일치하는지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) return res.json({ loginSucess: false, message: "비밀번호가 틀렸습니다." });

      // 비밀번호가 일치하면, 토큰 생성
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        // 토큰을 쿠키에 저장
        res.cookie("x_auth", user.token).status(200).json({ loginSucess: true, userId: user._id });
      });
    });
  });
});

app.get("/api/users/auth", auth, (req, res) => {
  // 미들웨어를 거치고 여기까지 왔다는 것은 Authentification 이 true 라는 뜻
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({ success: true });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});