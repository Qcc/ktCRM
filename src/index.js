import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter,Route} from 'react-router-dom';
import HomePage from './pages/home';
import MainPage from './pages/main';
import CTBSProduct from './pages/ctbsProduct';
import CloudProduct from './pages/cloudProduct';
import Service from './pages/service';
import Customer from './pages/customer';
import Register from './pages/register';
import Login from './pages/login';
import FindPwd from './pages/findPwd';
import './index.css';

ReactDOM.render((
    <HashRouter>
      <div>
        <Route exact path="/" component={HomePage}/>
        <Route path="/main" component={MainPage}/>
        <Route path="/ctbsProduct" component={CTBSProduct}/>
        <Route path="/cloudProduct" component={CloudProduct}/>
        <Route path="/service" component={Service}/>
        <Route path="/customer" component={Customer}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/findPwd" component={FindPwd}/>
      </div>
    </HashRouter>
  ),
  document.getElementById('root')
);