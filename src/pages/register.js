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
            <div style={{height:550,textAlign:"center",padding: 100,fontSize:16}}>功能暂未开放...</div>
            <KtFooterComp/>
            </div>
        );
    }
}

export default Register;