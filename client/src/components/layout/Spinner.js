import React, { Fragment } from 'react';
import spinner from '../../images/spinnerblue.gif';

const Spinner = () => {
  return (
    <Fragment>
      <img
        src={spinner}
        style={{ width: '120px', margin: 'auto', display: 'block' }}
        alt='loading'
      />
    </Fragment>
  );
};

export default Spinner;
