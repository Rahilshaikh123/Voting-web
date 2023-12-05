const { createToken } = require("../jwt");
const User = require("../model/usermodel");
const registerUser = async (req, res, next) => {
  try {
    const user = req.body;
    const userExist = await User.find({ email: user.email });
    if (userExist.length) {
      throw new Error("User alredy Exist ");
    }
    if (!user.name || !user.email || !user.password || !user.phonenumber) {
      throw new Error("please enter full detail");
    }
    const firstUser = await User.find({});
    if (!firstUser.length) {
      user.role = "admin";
    }
    const createdUser = await User.create(user);
    const tokenData = await createToken({
      name: createdUser.name,
      id: createdUser._id,
      email: createdUser.email,
      role: createdUser.role,
    });
    res.cookie("token", tokenData, {
      httpOnly: true,
      expire: new Date(Date.now() + 22222222222),
    });
    res.json({
      name: createdUser.name,
      id: createdUser._id,
      email: createdUser.email,
      role: createdUser.role,
    });
  } catch (error) {
    next(error);
  }
};
const loginUser = async (req, res, next) => {
  try {
    const user = req.body;
    if (!user.email || !user.password) {
      throw new Error("Please provide all detail");
    }
    const findUser = await User.findOne({ email: user.email });

    if (!findUser) {
      throw new Error("This Email Does not belong to any use ");
    }
    const passCheck = await findUser.checkpassword(user.password);
    if (!passCheck) {
      throw new Error("Password is incorrect");
    }

    const tokenData = await createToken({
      name: findUser.name,
      id: findUser._id,
      email: findUser.email,
      role: findUser.role,
    });

    res
      .cookie("token", tokenData, {
        expires: new Date(Date.now() + 2222222222222),
        httpOnly: true,
      })
      .json({
        name: findUser.name,
        id: findUser._id,
        email: findUser.email,
        role: findUser.role,
      });
  } catch (error) {
    next(error);
  }
};
const logoutUser = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expire: new Date(Date.now),
  });
  res.json({ user: "Sucessfully logged out" });
};
module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
