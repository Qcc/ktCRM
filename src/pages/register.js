import React from 'react';
import KtHeaderComp from '../components/ktheadercomp';
class Register extends React.Component{
    render(){
        return(
            <div>
            <KtHeaderComp active='register'/>
            <h1>这是注册页面</h1>
            </div>
        );
    }
}

export default Register;