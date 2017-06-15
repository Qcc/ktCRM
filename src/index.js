import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter,Route} from 'react-router-dom';
import HomePage from './pages/home';
import Main from './pages/main';
import CTBSEnterprise from './pages/ctbsEnterprise';
import CTBSAdv from './pages/ctbsAdv';
import CloudApp from './pages/cloudApp';
import Service from './pages/service';
import Customer from './pages/customer';
import Register from './pages/register';
import Login from './pages/login';
import FindPwd from './pages/findPwd';
import './index.css';

ReactDOM.render(
    <HashRouter>
      <div>
        <Route exact path="/" component={HomePage}/>
        <Route path="/protected/main" component={Main}/>  
        {/*<Route path="/main" component={Main}/>          */}
        <Route path="/ctbsEnterprise" component={CTBSEnterprise}/>
        <Route path="/ctbsAdv" component={CTBSAdv}/>        
        <Route path="/cloudApp" component={CloudApp}/> 
        <Route path="/service" component={Service}/>
        <Route path="/customer" component={Customer}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/findPwd" component={FindPwd}/>
      </div>
    </HashRouter>,
  document.getElementById('root')
);