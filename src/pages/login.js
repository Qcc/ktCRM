import React from 'react';
import {Link} from 'react-router-dom';
import { Form} from 'antd';
import KtHeaderComp from '../components/ktheadercomp';
import LoginForm from '../components/LoginForm';
import KtFooterComp from '../components/ktfootercomp';
import '../styles/login.css'; 
import '../styles/common.css'; 


    let urlRoot = 'http://192.168.200.104:8080/dinghuo/';
    let actionURL = urlRoot + "public/user/login.api";
    // let loginSuccessURL = urlRoot + "protected/main.html";
    let loginSuccessURL = "http://192.168.200.176:3000/#/main";   
    let validateCodeURL = urlRoot + "public/user/validateCodeImg.api";
                                    
    const WrappedNormalLoginForm = Form.create()(LoginForm);

class Login extends React.Component{
    
    componentDidMount() {
        document.title='登录-深圳市沟通科技有限公司';
    }
    render(){
        return(
            <div>
              <KtHeaderComp theme='light' active='login'/>
              <div className='login-continner'>
                 <div className='login-title'>
                    <span className='login-welcome'>欢迎回来</span>
                    <span className='login-register'>还没有账户？ <Link to="/register">注册</Link></span>
                 </div>
                 <WrappedNormalLoginForm 
                 actionURL={actionURL} 
                 loginSuccessURL={loginSuccessURL} 
                 validateCodeImgURL={validateCodeURL} />            
               </div>
               <KtFooterComp />
            </div>
        );
    }
}

export default Login;