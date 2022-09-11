const jwt = require("jsonwebtoken");
const { User } = require("../models");
require("dotenv").config();

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ result: false, error: "로그인이 필요합니다1." });

    return;
  }
  console.log("토큰", token);
  console.log("테스트", jwt.verify(token, process.env.MYSECRET_KEY));
  try {
    const { userId } = jwt.verify(token, process.env.MYSECRET_KEY); // userId 는 jwt.sign(userId : user._id)의 user._id가 할당된다.

    User.findByPk(userId).then((user) => {
      res.locals.user = user;

      next();
    });
  } catch (error) {
    res.status(401).json({ result: false, error: "로그인이 필요합니다2." });

    return;
  }
};
