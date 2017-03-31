import React from 'react';
import KtHeaderComp from '../components/ktheadercomp';
class Customer extends React.Component{
    render(){
        return(
            <div>
            <KtHeaderComp active="customer"/>
            <h1>这是客户须知</h1>
            </div>
        );
    }
}

export default Customer;