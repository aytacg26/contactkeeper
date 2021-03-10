import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Alerts = () => {
  const { alerts } = useContext(AlertContext);

  return (
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div id={alert.id} className={`alert alert-${alert.type}`}>
        <i className='fas fa-info-circ'></i> {alert.message}
      </div>
    ))
  );
};

export default Alerts;
