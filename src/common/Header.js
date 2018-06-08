import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import SectionContent from './SectionContent';
import './Header.css';
import Select from './Select';

const localeOptions = [
  { value: 'en', label: 'English' },
  { value: 'kk', label: 'Қазақша' },
  { value: 'ru', label: 'Русский' },
];

const Header = ({ localeValue, onLocaleChange }) => (
  <header className="header">
    <SectionContent>
      <div className="header-content">
        <div className="title">ESF Exporter</div>
        <div className="nav-bar">
          <div className="nav-item">
            <FormattedMessage
              id="Header.ContactUs"
              defaultMessage="Contact Us"
            />
          </div>
          <div className="nav-item nav-item-lang">
            <Select
              options={localeOptions}
              value={localeValue}
              onChange={onLocaleChange}
            />
          </div>
        </div>
      </div>
    </SectionContent>
  </header>
);

Header.propTypes = {
  localeValue: PropTypes.shape({
    value: PropTypes.string,
  }),
  onLocaleChange: PropTypes.func,
};

export default Header;