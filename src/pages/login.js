import React from 'react';
import {Link} from 'react-router-dom';
import { Form} from 'antd';
import KtHeaderComp from '../components/ktheadercomp';
import LoginForm from '../components/LoginForm';
import KtFooterComp from '../components/ktfootercomp';
import '../styles/login.css'; 
import '../styles/common.css'; 


    let urlRoot = 'http://localhost:8080/dinghuo-kouton/';
    let loginURL = urlRoot + "public/user/login.api";
    let loginSuccessURL = urlRoot + "protected/main.html";
    let validateCodeURL = urlRoot + "public/useralidateCode.api";
    const WrappedNormalLoginForm = Form.create()(LoginForm);

class Login extends React.Component{
    
    componentDidMount() {
        document.title='登录-深圳市沟通科技有限公司';
    }
    render(){
        return(
            <div>
              <KtHeaderComp active='login'/>
              <div className='login-continner'>
                 <div className='login-title'>
                    <span className='login-welcome'>欢迎回来</span>
                    <span className='login-register'>还没有账户？ <Link to="/register">注册</Link></span>
                 </div>
                 <WrappedNormalLoginForm 
                 loginURL={loginURL} 
                 loginSuccessURL={loginSuccessURL} 
                 validateCodeURL={validateCodeURL} />            
               </div>
               <KtFooterComp />
            </div>
        );
    }
}

export default Login;