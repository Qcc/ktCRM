import React from 'react';
import KtHeaderComp from '../components/ktheadercomp';
import KtFooterComp from '../components/ktfootercomp';

class Customer extends React.Component{
    componentDidMount() {
        document.title='找回密码-深圳市沟通科技有限公司';
    }
    render(){
        return(
            <div>
            <KtHeaderComp theme='light' active="customer"/>
            <div style={{height:550,textAlign:"center",padding: 100,fontSize:16}}>功能暂未开放...</div>
            <KtFooterComp/>
            </div>
        );
    }
}

export default Customer;