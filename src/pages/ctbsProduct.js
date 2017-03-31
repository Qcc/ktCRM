import React from 'react';
import KtHeaderComp from '../components/ktheadercomp';
class Product extends React.Component{
    render(){
        return(
            <div>
            <KtHeaderComp active="ctbs"/>
            <h1>这是CTBS详情页</h1>
            </div>
        );
    }
}

export default Product;