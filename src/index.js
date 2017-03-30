import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter,Route} from 'react-router-dom';
import HomePage from './pages/home';
import MainPage from './pages/main';
import Product from './pages/product';
import Service from './pages/service';
import Customer from './pages/customer';

import './index.css';

ReactDOM.render((
    <HashRouter>
      <div>
        <Route exact path="/" component={HomePage}/>
        <Route path="/main" component={MainPage}/>
        <Route path="/product" component={Product}/>
        <Route path="/service" component={Service}/>
        <Route path="/customer" component={Customer}/>
      </div>
    </HashRouter>
  ),
  document.getElementById('root')
);
