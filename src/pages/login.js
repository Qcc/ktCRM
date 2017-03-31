import React from 'react';
import {Link} from 'react-router-dom';
import KtHeaderComp from '../components/ktheadercomp';
class Login extends React.Component{
    render(){
        return(
            <div>
            <KtHeaderComp active='login'/>
            <h1>这是登录页面</h1>
            <Link to="/main">登录</Link>
            </div>
        );
    }
}

export default Login;