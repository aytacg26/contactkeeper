import React, { useContext, useState } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    contactType: 'personal',
  });

  const { name, email, phone, contactType } = contact;

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    /**
     * @TODO : addContact will be added to ContactState
     */
    contactContext.addContact(contact);
    setContact({
      name: '',
      email: '',
      phone: '',
      contactType: 'personal',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className='text-primary'>Add Contact</h2>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={handleChange}
      />
      <input
        type='email'
        placeholder='Email'
        name='email'
        value={email}
        onChange={handleChange}
      />
      <input
        type='text'
        placeholder='Phone'
        name='phone'
        value={phone}
        onChange={handleChange}
      />
      <h5>Contact Type</h5>
      <input
        type='radio'
        name='contactType'
        value='personal'
        checked={contactType === 'personal'}
        onChange={handleChange}
      />{' '}
      Personal{' '}
      <input
        type='radio'
        name='contactType'
        value='professional'
        checked={contactType === 'professional'}
        onChange={handleChange}
      />{' '}
      Professional{' '}
      <div>
        <input
          type='submit'
          value='Add Contact'
          className='btn btn-primary btn-block'
        />
      </div>
    </form>
  );
};

export default ContactForm;
