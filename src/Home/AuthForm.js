import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'emotion'

import Button from '../common/Button'
import Spinner from '../common/Spinner'
import { FormattedMessage } from 'react-intl'

const buttonContainer = {
  display: 'flex',
  justifyContent: 'space-between',
  paddingTop: '30px',
  flexShrink: '0',
}

const button = {
  width: '48%',
}

const cancelButton = {
  color: '#697eff',
  backgroundColor: '#ffffff',
  ':hover': {
    backgroundColor: '#F1F3FF',
  },
}

const AuthForm = ({
  children, onCancel, isLoading, ...other
}) => (
  <form {...other}>
    {children}
    <div className={css(buttonContainer)}>
      <Button
        className={css(button, cancelButton)}
        type="button"
        onClick={onCancel}
        disabled={isLoading}
      >
        Cancel
      </Button>
      <Button className={css(button)} type="submit" disabled={isLoading}>
        {isLoading
          ? <Spinner size={12} color="#FFF" />
          : (
            <FormattedMessage
              id="AuthForm.ContinueButton"
              defaultMessage="Continue"
            />
          )
        }
      </Button>
    </div>
  </form>
)

AuthForm.propTypes = {
  children: PropTypes.node,
  onCancel: PropTypes.func,
  isLoading: PropTypes.bool,
}

AuthForm.defaultProps = {
  children: null,
  onCancel: () => {},
  isLoading: false,
}

export default AuthForm
