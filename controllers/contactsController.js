import User from '../models/User.js';
import Contact from '../models/Contact.js';

/**
 * @route           GET api/contacts
 * @description     Get all users' contacts
 * @access          Private
 */
const getUserContacts = async (req, res) => {
  const authUserId = req.user.id;

  try {
    const contacts = await Contact.find(
      { user: authUserId },
      { __v: 0, user: 0 }
    ).sort({
      date: -1,
    });

    res.json(contacts);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * @route           POST api/contacts
 * @description     Add new contact
 * @access          Private
 */
const addNewContact = async (req, res) => {
  const { name, email, phone, contactType } = req.body;
  const authUserId = req.user.id;

  try {
    const newContact = new Contact({
      name,
      email,
      phone,
      contactType,
      user: authUserId,
    });

    const contact = await newContact.save();

    res.json(contact);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * @route           PUT api/contacts/:id
 * @description     Update a contact
 * @access          Private
 */
const updateContact = async (req, res) => {
  const authUserId = req.user.id;
  const { name, email, phone, contactType } = req.body;

  //Build contact object:
  const contactFields = {};

  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (contactType) contactFields.contactType = contactType;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ message: 'Contact not found' });

    //Make sure user owns contact
    if (contact.user.toString() !== authUserId) {
      return res.status(401).json({ message: 'Not Authorized' });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        $set: contactFields,
      },
      { new: true }
    );

    res.json(contact);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * @route           DELETE api/contacts/:id
 * @description     Delete a contact
 * @access          Private
 */
const deleteContact = async (req, res) => {
  const authUserId = req.user.id;
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ message: 'Contact not found' });

    //Make sure user owns contact
    if (contact.user.toString() !== authUserId) {
      return res.status(401).json({ message: 'Not Authorized' });
    }

    await Contact.findByIdAndDelete(req.params.id);

    res.json({ message: 'Contact Removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const ContactsController = Object.freeze({
  getUserContacts,
  addNewContact,
  updateContact,
  deleteContact,
});

export default ContactsController;
