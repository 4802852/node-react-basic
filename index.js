const express = require("express");
const app = express();
const port = 3000;

const { User } = require("./models/User");

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

app.post("/register", (req, res) => {
  // 회원 가입 할때 필요한 정보들을 client 에서 가져오면, 그것들을 데이터 베이스에 넣어준다.
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.post("/login", (req, res) => {
  // 요청된 이메일이 데이터 베이스에 있는지 확인
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) return res.json({ loginSucess: false, message: "이메일을 확인해주세요." });

    // 요청된 이메일이 있다면, 비밀번호가 일치하는지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) return res.json({ loginSucess: false, message: "비밀번호가 틀렸습니다." });

      // 비밀번호가 일치하면, 토큰 생성
      user.generateToken((err, user) => {});
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
