import React, { useReducer } from 'react';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import { v4 as uuid } from 'uuid';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from '../types';

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Aytac Güley',
        phone: '0548 888 88 26',
        email: 'aytacg26@gmail.com',
        contactType: 'personal',
      },
      {
        id: 2,
        name: 'Steve Jobs',
        phone: '0549 999 99 18',
        email: 'sjobs@apple.com',
        contactType: 'professional',
      },
      {
        id: 3,
        name: 'Elon Musk',
        phone: '0549 991 94 18',
        email: 'elonmusk@tesla.com',
        contactType: 'professional',
      },
    ],
    current: null,
    filtered: null,
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  //ACTIONS :
  //Add Contact
  const addContact = (contact) => {
    //Before submitting to MongoDB, we will create id by using uuid to test  action methods
    contact.id = uuid();
    dispatch({ type: ADD_CONTACT, payload: contact });
  };

  //Delete Contact
  const deleteContact = (contactId) => {
    dispatch({ type: DELETE_CONTACT, payload: contactId });
  };

  //Set Current Contact
  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  //Clear Current Contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };
  //Update Contact
  const updateContact = (contact) => {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  };

  //Filter Contacts
  const filterContacts = (text) => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };

  //Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
