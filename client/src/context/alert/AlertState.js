import React, { useReducer } from 'react';
import { v4 as uuid } from 'uuid';
import alertReducer from './alertReducer';
import AlertContext from './alertContext';
import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = (props) => {
  const initialState = [];

  const [state, dispatch] = useReducer(alertReducer, initialState);

  //Add Actions
  //We will have multiple alerts, for this reason we will add unique id to each of them by using uuid
  const setAlert = (message, type, timeout = 5000) => {
    const id = uuid();
    dispatch({ type: SET_ALERT, payload: { id, message, type } });

    //Set time for alert :
    const alertTimer = setTimeout(() => {
      dispatch({ type: REMOVE_ALERT, payload: id });
      clearTimeout(alertTimer);
    }, timeout);
  };

  return (
    <AlertContext.Provider value={{ alerts: state, setAlert }}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
