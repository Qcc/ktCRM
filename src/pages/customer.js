import React from 'react';
import KtHeaderComp from '../components/ktheadercomp';
import KtFooterComp from '../components/ktfootercomp';

class Customer extends React.Component{
    componentDidMount() {
        document.title='用户须知-深圳市沟通科技有限公司';
    }
    render(){
        return(
            <div>
            <KtHeaderComp theme='light' active="customer"/>
            <h1>这是客户须知</h1>
            <KtFooterComp/>
            </div>
        );
    }
}

export default Customer;