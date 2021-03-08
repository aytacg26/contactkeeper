import express from 'express';

const UsersRouter = express.Router();

/**
 * @route           POST api/users
 * @description     Register a user
 * @access          Public
 */
UsersRouter.post('/', (req, res) => {
  res.send('Registers a user...');
});

export default UsersRouter;
