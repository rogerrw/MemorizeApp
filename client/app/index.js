import './styles/styles.scss';

import {
// Link,
// Route,
// BrowserRouter as Router,
// Switch
} from 'react-router-dom';

// import App from './components/App/App';
import HelloWorld from './components/HelloWorld/HelloWorld';
import Home from './components/Home/Home';
import NotFound from './components/App/NotFound';
// import React from 'react';
import { render } from 'react-dom';

render((
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/helloworld" component={HelloWorld}/>
        <Route component={NotFound}/>
      </Switch>
    </App>
  </Router>
), document.getElementById('app'));
