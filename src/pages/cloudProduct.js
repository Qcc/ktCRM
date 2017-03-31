import React from 'react';
import KtHeaderComp from '../components/ktheadercomp';
class Product extends React.Component{
    render(){
        return(
            <div>
            <KtHeaderComp active='cloud'/>
            <h1>这是云桌面详情页</h1>
            </div>
        );
    }
}

export default Product;