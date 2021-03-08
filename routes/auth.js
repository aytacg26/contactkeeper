import express from 'express';
import { check, validationResult } from 'express-validator';
import AuthController from '../controllers/authController.js';

const AuthRouter = express.Router();

/**
 * @route           GET api/auth
 * @description     Get logged in user
 * @access          Private
 */
AuthRouter.get('/', (req, res) => {
  res.send('Get logged in user...');
});

/**
 * @route           POST api/auth
 * @description     Auth user & get token
 * @access          Public
 */
AuthRouter.post(
  '/',
  [
    check('email', 'Please enter a valid email address.').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    AuthController.login(req, res);
  }
);

export default AuthRouter;
