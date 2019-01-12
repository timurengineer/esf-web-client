import React from 'react';
import { connect } from 'react-redux';
import { css } from 'emotion';
import { isEmpty } from 'lodash';
import Alert from 'react-s-alert';

import SectionContent from './common/SectionContent';
import PrivateComponent from './common/PrivateComponent';
import { apiCall } from './apiUtils';
import { SET_SEARCH_RESULT } from './store';
import Header from './common/Header';
import Spinner from './common/Spinner';


const container = {
}

const innerContainer = {
  display: 'flex',
  fontSize: '12px',
  justifyContent: 'center',
  marginTop: '2px',
  '@media(min-width: 400px)': {
    paddingTop: '17px',
  }
}

const sidebarContainer = {
  display: 'none',
  '@media(min-width: 768px)': {
    display: 'block',
    backgroundColor: 'transparent',
    flexBasis: '150px',
    marginTop: '20px',
  }
}

const sidebarItems = {
  color: '#262626',
  padding: '0px 15px',
  fontSize: '16px',
  fontWeight: '600',
  backgroundColor: 'transparent',
  borderRadius: '5px 0px 0px 5px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
}

const sidebarItemActive = {
  backgroundColor: '#f8f8f8',
}

const wrapperContainer = {
  backgroundColor: '#f8f8f8',
  flexGrow: '1',
  borderRadius: '5px',
}

const resultsContainer = {
  backgroundColor: '#ffffff',
  flexGrow: '1',
  borderRadius: '5px',
  margin: '15px',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.4)',
  '@media(min-width: 400px)': {
    margin: '30px',
  }
}

const itemContainer = {
  display: 'flex',
  paddingLeft: '15px',
  paddingRight: '15px',
  height: '48px',
  alignItems: 'center',
  borderBottom: 'solid 1px #dadce0',
  justifyContent: 'space-between',
}

const checkboxInput = {
  display: 'none',
  ':checked+div': {
    backgroundColor: '#327dd0',
    opacity: '1',
    border: '2px solid #327dd0',
  },
  ':checked+div:after': {
    transform: 'rotate(45deg)',
    content: '" "',
    position: 'absolute',
    left: '4',
    top: '0',
    width: '6px',
    height: '11px',
    border: '5px solid #ffffff',
    borderWidth: '0 2px 2px 0',
  }
}

const checkboxSubstitute = {
  cursor: 'pointer',
  height: '18px',
  width: '18px',
  position: 'relative',
  opacity: '0.54',
  border: '2px solid #010101',
  borderRadius: '2px',
}

const regNumber = {
  flexGrow: '1',
  marginLeft: '15px',
}

class Result extends React.Component {
  state = {
    isLoading: false,
  }

  componentDidMount() {
    const { sessionId, location: { search } } = this.props;

    if (search) {
      this.fetchInvoices({ search, sessionId })
    }
  }

  fetchInvoices = ({ search, sessionId }) => {
    const options = {
      headers: {
        'Session-ID': sessionId,
      }
    }

    this.setState({ isLoading: true })

    return apiCall(`/invoices/queryinvoice${search}`, options)
      .then(this.setSearchResult)
      .catch(this.onFetchFail)
      .finally(() => this.setState({ isLoading: false }))
  }

  setSearchResult = (searchResult) => (
    this.props.dispatch({ type: SET_SEARCH_RESULT, searchResult })
  )

  onFetchFail = (error) => {
    if (error.name === 'ApiError') {
      return this.handleApiError(error)
    }
    return this.handleUnknownError(error)
  }

  handleApiError = (error) => {
    Alert.info(error.body.soapError.faultstring)
  }

  handleUnknownError = (error) => {
    if (error.response) {
      return Alert.info(`${error.response.status} ${error.response.statusText}`)
    }
    return Alert.info(`${error.name}: ${error.message}`)
  }

  render() {
    const { searchResult, locale, onLocaleChange, onMenuClick } = this.props

    return (
      <PrivateComponent>
        <div className={css(container)}>
          <Header
            localeValue={locale}
            onLocaleChange={onLocaleChange}
            burgerClassName={css({ fill: '#697EFF' })}
            onMenuClick={onMenuClick}
          />
          <SectionContent>
            <div className={css(innerContainer)}>
              <div className={css(sidebarContainer)}>
                <div className={css(sidebarItems)}>
                  Search
                </div>
                <div className={css(sidebarItems, sidebarItemActive)}>
                  Result
                </div>
              </div>
              <div className={css(wrapperContainer)}>
                {this.state.isLoading &&
                  <Spinner
                    size={12}
                    color="#697EFF"
                    className={css({ margin: '24px 0' })}
                  />
                }
                {!isEmpty(searchResult) && !this.state.isLoading &&
                  <div className={css(resultsContainer)}>
                    <div className={css(itemContainer)}>
                      <div>
                        <label>
                          <input type="checkbox" className={css(checkboxInput)} />
                          <div className={css(checkboxSubstitute)}></div>
                        </label>
                      </div>
                      <div className={css(regNumber)}>
                        Reg number
                      </div>
                      <div>
                        Status
                      </div>
                    </div>
                    {searchResult.invoiceInfoList && searchResult.invoiceInfoList.invoiceInfo &&
                      searchResult.invoiceInfoList.invoiceInfo.map((item) => (
                        <div className={css(itemContainer)} key={item.invoiceId}>
                          <div>
                            <label>
                              <input type="checkbox"  className={css(checkboxInput)} />
                              <div className={css(checkboxSubstitute)}></div>
                            </label>
                          </div>
                          <div className={css(regNumber)}>
                            {item.registrationNumber}
                          </div>
                          <div>
                            {item.invoiceStatus}
                          </div>
                        </div>
                      ))
                    }
                  </div>
                }
              </div>
            </div>
          </SectionContent>
        </div>
      </PrivateComponent>
    );
  }
}

const mapStateToProps = (state) => ({
  searchResult: state.searchResult,
  sessionId: state.sessionId,
})

export default connect(mapStateToProps)(Result);
