import express from 'express';
import { check, validationResult } from 'express-validator';
import ContactsController from '../controllers/contactsController.js';
import AuthMW from '../middleware/authMiddleware.js';

const ContactsRouter = express.Router();

/**
 * @route           GET api/contacts
 * @description     Get all users' contacts
 * @access          Private
 */
ContactsRouter.get('/', AuthMW, (req, res) => {
  ContactsController.getUserContacts(req, res);
});

/**
 * @route           POST api/contacts
 * @description     Add new contact
 * @access          Private
 */
ContactsRouter.post(
  '/',
  [
    AuthMW,
    [
      check('name', 'Please add Contact Name').not().isEmpty(),
      check('name', 'Please enter a valid name').isLength({ min: 2, max: 80 }),
      check('email', 'Please enter a valid email').isEmail().optional(),
      check('phone', 'Please enter a valid phone number')
        .isLength({
          min: 4,
          max: 15,
        })
        .optional(),
      check('contactType', 'Please enter a valid contact type')
        .isLength({ max: 20 })
        .isIn(['personal', 'professional', 'friend', 'business'])
        .optional(),
    ],
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    ContactsController.addNewContact(req, res);
  }
);

/**
 * @route           PUT api/contacts/:id
 * @description     Update a contact
 * @access          Private
 */
ContactsRouter.put('/:id', AuthMW, (req, res) => {
  ContactsController.updateContact(req, res);
});

/**
 * @route           DELETE api/contacts/:id
 * @description     Delete a contact
 * @access          Private
 */
ContactsRouter.delete('/:id', AuthMW, (req, res) => {
  ContactsController.deleteContact(req, res);
});

export default ContactsRouter;
