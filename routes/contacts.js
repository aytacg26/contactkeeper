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

/**
 * @route           POST api/contacts
 * @description     Add new contact
 * @access          Private
 */
ContactsRouter.post('/', (req, res) => {
  res.send('Add a new contact');
});

/**
 * @route           PUT api/contacts/:id
 * @description     Update a contact
 * @access          Private
 */
ContactsRouter.put('/:id', (req, res) => {
  res.send('update a contact');
});

/**
 * @route           DELETE api/contacts/:id
 * @description     Delete a contact
 * @access          Private
 */
ContactsRouter.delete('/:id', (req, res) => {
  res.send('delete a contact');
});

export default ContactsRouter;
