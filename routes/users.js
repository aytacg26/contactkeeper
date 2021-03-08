import express from 'express';
import UserController from '../controllers/userController.js';
import { check, validationResult } from 'express-validator';

const UsersRouter = express.Router();

/**
 * @route           POST api/users
 * @description     Register a user
 * @access          Public
 */
UsersRouter.post(
  '/',
  [
    check('name', 'name is required').not().isEmpty(),
    check('name', 'Please enter a valid name').isLength({ min: 2, max: 80 }),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters. Maximum character size must not be more than 30'
    ).isLength({ min: 6, max: 30 }),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    UserController.registerUser(req, res);
  }
);

export default UsersRouter;
