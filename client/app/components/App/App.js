// import Footer from '../Footer/Footer';
//
// import Header from '../Header/Header';
// import React, { Component } from 'react';


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
