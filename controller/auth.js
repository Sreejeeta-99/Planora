import { hashPassword } from "../helpers/auth.js";
import User from "./../model/user.js";

export const signup = async (req, res) => {
  //console.log(req.body);
  const { name, email, password } = req.body;
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
  const user = new User({ name, email, password: hashedPassword });
  await user.save();
  return res.json({
    message: "User created successfully",
    id: user._id,
  });
};
