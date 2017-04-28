import React from 'react';
import KtHeaderComp from '../components/ktheadercomp';
import KtFooterComp from '../components/ktfootercomp';

class Register extends React.Component{
    componentDidMount() {
        document.title='注册-深圳市沟通科技有限公司';
    }
    render(){
        return(
            <div>
            <KtHeaderComp theme='light' active='register'/>
            <h1>这是注册页面</h1>
            <KtFooterComp/>
            </div>
        );
    }
}

export default Register;