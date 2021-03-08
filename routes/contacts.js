import express from 'express';

const ContactsRouter = express.Router();

/**
 * @route           GET api/contacts
 * @description     Get all users' contacts
 * @access          Private
 */
ContactsRouter.get('/', (req, res) => {
  res.send('Registers a user...');
});

export default ContactsRouter;
