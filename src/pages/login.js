import React from 'react';
import {Link} from 'react-router-dom';
import { Form} from 'antd';
import KtHeaderComp from '../components/ktheadercomp';
import LoginForm from '../components/LoginForm';
import '../styles/login.css'; 

    let urlRoot = 'http://localhost:8080/dinghuo-kouton/';
    let loginURL = urlRoot + "public/user/login.api";
    let loginSuccessURL = urlRoot + "protected/main.html";
    let validateCodeURL = urlRoot + "public/useralidateCode.api";
    const WrappedNormalLoginForm = Form.create()(LoginForm);

class Login extends React.Component{
 
    render(){
        return(
            <div>
              <KtHeaderComp active='login'/>
              <WrappedNormalLoginForm 
              loginURL={loginURL} 
              loginSuccessURL={loginSuccessURL} 
              validateCodeURL={validateCodeURL} />            
              <Link to="/main">登录</Link>
            </div>
        );
    }
}

export default Login;