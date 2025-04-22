import { comparePassword, hashPassword } from "../helpers/auth.js";
import User from "./../model/user.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const signup = async (req, res) => {
  //console.log(req.body);
  const { name, email, password, role } = req.body;
  if (!name || !name.length > 2) {
    return res.status(400).json({ error: "Name is required" });
  }
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: "Incorrect email" });
  }
  if (!password || !password.length > 6) {
    return res
      .status(400)
      .json({ error: "Password is required and should be at least 6letters" });
  }
  const userExist = await User.findOne({ email }).exec();
  //console.log(userExist);
  if (userExist) {
    return res.status(400).json({ error: "Email already exists" });
  }

  const hashedPassword = await hashPassword(password);
  const user = new User({ name, email, password: hashedPassword, role });
  await user.save();
  return res.json({
    message: "User created successfully",
    id: user._id,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  const user = await User.findOne({ email }).exec();
  if (!user) {
    return res.status(400).json({ error: "Incorrect credentials" });
  }
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ error: "Incorrect password" });
  }

  const token = jwt.sign(
    { userId: user._id, userRole: user.role[0] },
    process.env.JWTSECRET,
    { expiresIn: "10d" }
  );
  return res.json({ token, userId: user._id, userRole: user.role[0] });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email }).exec();
  if (!user) {
    return res.status(400).json({ error: "Email not found" });
  }
  // Creation of a transporter object using nodemailer to send the email
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAILID,
      pass: process.env.EMAILPASSWORD,
    },
  });
  // Define the email options (who it's from, who it's going to, subject, and body
  var mailOptions = {
    from: process.env.EMAILID,
    to: email,
    subject: "Reset Password",
    text: `${user._id}`, //will be changed later
  };
  // Send the email using transporter
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return res.status(400).json({ error: "Error sending email" });
    }
    return res.json({ message: "Email sent successfully" });
  });
};

export const resetPassword = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body; //new password
  const hashedPassword = await hashPassword(password); //utils
  User.findByIdAndUpdate({ _id: id }, { password: hashedPassword })
    .then(() => res.status(200).json({ msg: "Password updated" }))
    .catch((err) => res.status(400).json({ error: err.message }));
};
