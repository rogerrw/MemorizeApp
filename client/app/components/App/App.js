import React, { Component } from 'react';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';


const App = ({ children }) => (
  <div>
    <Header />

    <main>
      {children}
    </main>

    <Footer />
  </div>
);



export default App;
