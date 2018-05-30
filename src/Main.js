import React from 'react';

import './Main.css';
import SectionContent from './SectionContent';
import LoginInitial from './LoginInitial';

const Main = () => (
  <section className="main">
    <SectionContent>
      <div className="main-inner">
        <div className="description">
          <div className="description-title">Export invoices to PDF with ease. One invoice or in bulk</div>
          <div className="description-body">Get what the official app is missing absolutely FREE</div>
        </div>
        <LoginInitial />
      </div>
    </SectionContent>
  </section>
);

export default Main;
