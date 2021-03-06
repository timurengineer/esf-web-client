import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import { Provider } from 'react-redux'
import { css } from 'emotion'
import Alert from 'react-s-alert'

import store from './store'

import ProvideIntl from './common/ProvideIntl'
import Home from './Home'
import Search from './Search'
import Result from './Result'
import Sidebar from './Sidebar'
import Header from './common/Header'
import PrivateRoute from './common/PrivateRoute'

const container = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
}

class App extends Component {
  state = {
    showSidebar: false,
  }

  onMenuClick = () => this.setState({ showSidebar: true })

  onOverlayClick = () => this.setState({ showSidebar: false })

  render() {
    const { showSidebar } = this.state

    return (
      <Provider store={store}>
        <ProvideIntl>
          <Router>
            <div className={css(container)}>
              {showSidebar && (
                <Sidebar onOverlayClick={this.onOverlayClick} />
              )}
              <Header onMenuClick={this.onMenuClick} />
              <Route exact path="/" component={Home} />
              <PrivateRoute path="/search" component={Search} />
              <PrivateRoute path="/result" component={Result} />
              <Alert
                stack={{ limit: 3 }}
                effect="stackslide"
                position="top"
                timeout={5000}
              />
            </div>
          </Router>
        </ProvideIntl>
      </Provider>
    )
  }
}

export default App
