import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  name: {
    type: String,
    required: true,
    maxLength: 80,
  },
  email: {
    type: String,
    maxLength: 80,
  },
  phone: {
    type: String,
    maxLength: 15,
  },
  contactType: {
    type: String,
    default: 'personal',
    maxLength: 20,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Contact = mongoose.model('contacts', ContactSchema);

export default Contact;
