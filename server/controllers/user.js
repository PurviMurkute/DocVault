import bcrypt from "bcrypt";
import User from "../models/User.js";
import passport from "passport";
import jwt from "jsonwebtoken";
import validator from "validator";

const registerUser = async (req, res) => {
  const { fullname, email, password } = req.body;

  if (!fullname || !email || !password) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "All fields are required",
    });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address",
    });
  }

  const isUserAlreadyExists = await User.findOne({ email });

  if (isUserAlreadyExists) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "User with this email already exists",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters long",
    });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullname,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    return res.status(201).json({
      success: true,
      data: savedUser,
      message: "Registered successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: null,
      message: error?.message,
    });
  }
};

const loginUser = async (req, res, next) => {
  try {
    passport.authenticate("local", { session: false }, (error, user, info) => {
      if (error) {
        return res.status(400).json({
          success: false,
          data: null,
          message: error?.message,
        });
      }

      if (!user) {
        return res.status(404).json({
          success: false,
          data: null,
          message: info?.message,
        });
      }

      const jwtToken = jwt.sign(
        {
          _id: user._id,
          fullname: user.fullname,
          email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      user.password = undefined;

      return res.status(201).json({
        success: true,
        data: user,
        jwtToken,
        message: "Login Successfull",
      });
    })(req, res, next);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error?.message,
    });
  }
};

export { registerUser, loginUser };
