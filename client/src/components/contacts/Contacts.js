import React, { useContext, Fragment, useEffect, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactContext from '../../context/contact/contactContext';
import Spinner from '../layout/Spinner';
import ContactItem from './ContactItem';

const Contacts = () => {
  const { contacts, filtered, getContacts, loading } = useContext(
    ContactContext
  );

  const nodeRef = useRef(null);

  useEffect(() => {
    getContacts();

    console.log(contacts);
    //eslint-disable-next-line
  }, []);

  if (contacts !== null && contacts.length === 0 && !loading) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h4>Please add a contact</h4>
      </div>
    );
  }

  return (
    <Fragment>
      {contacts !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map((contact) => (
                <CSSTransition
                  key={contact._id}
                  timeout={200}
                  classNames='item'
                  nodeRef={nodeRef}
                >
                  <ContactItem contact={contact} nodeRef={nodeRef} />
                </CSSTransition>
              ))
            : contacts.map((contact) => (
                <CSSTransition
                  key={contact._id}
                  timeout={500}
                  classNames='item'
                  nodeRef={nodeRef}
                >
                  <ContactItem contact={contact} nodeRef={nodeRef} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Contacts;
