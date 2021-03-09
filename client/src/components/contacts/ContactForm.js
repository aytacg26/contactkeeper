import React, { useContext, useState, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const { addContact, current, clearCurrent, updateContact } = contactContext;

  const btnColor = current ? 'danger' : 'primary';

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        contactType: 'personal',
      });
    }
  }, [contactContext, current]);

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

    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }

    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className='text-primary'>
        {current ? 'Edit Contact' : 'Add Contact'}
      </h2>
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
          value={current ? 'Update Contact' : 'Add Contact'}
          className={`btn btn-${btnColor} btn-block`}
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
