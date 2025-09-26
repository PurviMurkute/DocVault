import express from 'express';
import { getCurrentUser, loginUser, registerUser } from '../controllers/user.js';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import verifyJwt from '../middlewares/jwt.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

userRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  (req, res) => {
    try {
      const token = jwt.sign(
        { _id: req.user._id, fullname: req.user.username, email: req.user.email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
      res.redirect(`${process.env.CLIENT_URL}/google-success?token=${token}`);
    } catch (error) {
      res.redirect(`${process.env.CLIENT_URL}/login`);
    }
  }
);

userRouter.get('/current-user', verifyJwt, getCurrentUser );

export default userRouter;