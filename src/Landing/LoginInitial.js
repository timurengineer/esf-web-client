import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { css } from 'emotion';

import './LoginInitial.css';

import FileInput from '../common/FileInput';
import Button from '../common/Button';

const signInButton = {
  backgroundColor: 'transparent',
  border: '2px solid white',
  color: 'white',
  ':hover': {
    backgroundColor: 'transparent',
    border: '2px solid white',
  },
}

export const demoButton = {
  backgroundColor: 'white',
  border: '2px solid white',
  color: '#744fc6',
  ':hover': {
    backgroundColor: 'white',
  },
};

const LoginInitial = ({ onDemoClick }) => (
  <div className="login-form">
    <div className="browse-button-container">
      <FileInput className={css(signInButton)}>
        <FormattedMessage
          id="LoginInitial.SignIn"
          defaultMessage="Sign In"
        />
      </FileInput>
    </div>
    <div className="browse-button-container">
      <Button
        className={css(demoButton)}
        onClick={onDemoClick}
      >
        <FormattedMessage
          id="LoginInitial.Demo"
          defaultMessage="Try Demo"
        />
      </Button>
    </div>
  </div>
);

LoginInitial.propTypes = {
  onDemoClick: PropTypes.func,
}

export default LoginInitial;
