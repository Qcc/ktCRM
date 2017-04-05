import React from 'react';
import KtHeaderComp from '../components/ktheadercomp';
import KtFooterComp from '../components/ktfootercomp';

class Product extends React.Component{
    componentDidMount() {
        document.title='云桌面-深圳市沟通科技有限公司';
    }
    render(){
        return(
            <div>
            <KtHeaderComp active='cloud'/>
            <h1>这是云桌面详情页</h1>
            <KtFooterComp/>
            </div>
        );
    }
}

export default Product;