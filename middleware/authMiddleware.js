const jwt = require("jsonwebtoken");

const authenticateUser = async (req, res, next) => {
  try {
    const usertoken = await req.cookies.token;
    const secrect = process.env.JWT_SECRET;
    const authuser = jwt.verify(usertoken, secrect);

    if (!authuser) {
      throw new Error("empty token");
    }

    req.user = authuser;
    next();
  } catch (error) {
    next(error);
  }
};
const autherizeUser = (...roless) => {
  return (req, res, next) => {
    try {
      if (!roless.includes(req.user.role)) {
        throw new Error("risticted route");
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = { authenticateUser, autherizeUser };
