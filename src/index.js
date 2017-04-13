import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter,Route} from 'react-router-dom';
import HomePage from './pages/home';

import UserInfo from './pages/user_info';
import UserMod from './pages/user_mod';

import LicTemp from './pages/lic_temp';
import LicGenu from './pages/lic_genu';

import InvenQuery from './pages/inven_query';
import InvenDetails from './pages/inven_details';

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
        <Route path="/user_info" component={UserInfo}/>
        <Route path="/user_mod" component={UserMod}/>     

        <Route path="/lic_temp" component={LicTemp}/>        
        <Route path="/lic_genu" component={LicGenu}/>        

        <Route path="/inven_query" component={InvenQuery}/>        
        <Route path="/inven_details" component={InvenDetails}/>        
           
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