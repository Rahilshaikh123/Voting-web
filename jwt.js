const Jwt = require("jsonwebtoken");

const createToken = async (userdetail) => {
  const token = Jwt.sign(userdetail, process.env.JWT_SECRET);
  return token;
};

module.exports = { createToken };
