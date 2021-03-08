import express from 'express';

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
AuthRouter.post('/', (req, res) => {
  res.send('Login user...');
});

export default AuthRouter;
