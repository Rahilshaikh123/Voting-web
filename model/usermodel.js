const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /^([a-zA-Z0-9]+@+[a-zA-Z]+\.+[a-z]{2,3})/,
  },
  password: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
});
UserSchema.pre("save", async function () {
  let salt = await bcrypt.genSalt(10);
  this.password = bcrypt.hashSync(this.password, salt);
});
UserSchema.methods.checkpassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};
module.exports = mongoose.model("User", UserSchema);
