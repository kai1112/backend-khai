const User = require("../models/user.model");
const Role = require("../models/role.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// login
module.exports.login = async (req, res) => {
  try {
    const data = await User.findOne({
      email: req.body.email,
    });
    if (data) {
      const checkPassword = await bcrypt.compare(
        req.body.password,
        data.password
      );
      if (checkPassword) {
        const UserID = data._id;
        const token = jwt.sign(`${UserID}`, "khai");
        await User.updateOne({ _id: data._id }, { token: token });
        res.cookie("user", token, {
          expires: new Date(Date.now() + 60 * 60 * 24 * 60),
        });
        let user = await User.findOne({ email: req.body.email });
        res.json({ role: user.role });
      } else {
        res.json({ message: " incorrect password" });
      }
    } else {
      res.json({ message: "login failed", status: 400, err: false });
    }
  } catch (err) {
    res.json({ status: 500, data: err });
  }
};

// register
module.exports.register = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user)
          return res.json({ status: 404, message: "Email user is already!!!" });
        if (user && user.phone === req.body.phone)
          return res.json({ status: 404, message: "Phone user is already!!!" });
        let role = await Role.findOne({ name: "user" });
        const password = await bcrypt.hash(req.body.password, 10);
    
        // console.log(req.body.dateOfBirth);
    
        let newUser = await User.create({
          username: req.body.username,
          password: password,
          name: req.body.name,
          dateOfBirth: req.body.dateOfBirth,
          email: req.body.email,
          role: role._id,
        });
        if (!newUser)
          return res.json({ status: 404, message: "Create new User failed!!!" });
        res.json({
          status: 200,
          message: "Register success!!!",
        });
      } catch (err) {
        createLogger.error(err);
      }
};
