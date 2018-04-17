import { Link } from 'react-router-dom';
import React from 'react';

const Header = () => (
  <header>
    <Link to="/">Home</Link>

    <nav>
      <Link to="/helloworld">Hello World</Link>
    </nav>

  </header>
);

export default Header;
