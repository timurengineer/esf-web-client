import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'emotion'

import Pin from './Pin'
import Password from './Password'

const container = {
  position: 'fixed',
  left: 0,
  right: 0,
  transition: 'all 300ms ease-out',
}

class Auth extends React.Component {
  state = {
    p12decrypted: null,
    position: {
      bottom: '-100vh',
      top: '100vh',
    },
  }

  componentDidMount() {
    const { show } = this.props

    if (show) {
      this.setState({
        position: {
          bottom: 0,
          top: 0,
        },
      })
    }
  }

  componentDidUpdate(prevProps) {
    const { show } = this.props

    if (!show && prevProps.show) {
      this.setPosition({
        bottom: '-100vh',
        top: '100vh',
      })
    }
    if (show && !prevProps.show) {
      this.setPosition({
        bottom: 0,
        top: 0,
      })
    }
  }

  setPosition = ({ top, bottom }) => {
    this.setState({
      position: {
        bottom,
        top,
      },
    })
  }

  onDecrypt = p12decrypted => this.setState({ p12decrypted })

  onCancel = (event) => {
    const { onCancel } = this.props

    this.setState({ p12decrypted: null })
    if (onCancel) {
      onCancel(event)
    }
  }

  render() {
    const { p12decrypted, position } = this.state
    const { p12base64, isDemo } = this.props

    return (
      <div className={css(container, position)}>
        {!p12decrypted
          && (
          <Pin
            onDecrypt={this.onDecrypt}
            onCancel={this.onCancel}
            p12base64={p12base64}
            isDemo={isDemo}
          />
          )
        }
        {!!p12decrypted
          && (
          <Password
            onCancel={this.onCancel}
            p12decrypted={p12decrypted}
            isDemo={isDemo}
          />
          )
        }
      </div>
    )
  }
}

Auth.propTypes = {
  p12base64: PropTypes.string,
  onCancel: PropTypes.func,
  show: PropTypes.bool,
  isDemo: PropTypes.bool,
}

Auth.defaultProps = {
  p12base64: '',
  onCancel: () => {},
  show: false,
  isDemo: true,
}

export default Auth
