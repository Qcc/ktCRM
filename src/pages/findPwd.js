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
            <h1>这是找回密码</h1>
            <KtFooterComp/>
            </div>
        );
    }
}

export default Customer;