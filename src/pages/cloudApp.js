import React from 'react';
import KtHeaderComp from '../components/ktheadercomp';
import KtFooterComp from '../components/ktfootercomp';
import "../styles/product.css";
class CloudApp extends React.Component{
    componentDidMount() {
        document.title='云桌面-深圳市沟通科技有限公司';
    }
    render(){
        return(
            <div>
            <KtHeaderComp theme='light' active='cloudApp'/>
            <div className="product-body">
                <div className="product-intrduction">
                    <h2>云桌面产品</h2>
                    <p>云桌面产品介绍</p>
                </div>
                <div className="product-img">
                      <img alt="沟通科技云桌面" src={require("../static/cloudapp.jpg")} />
                </div>
            </div>
            <KtFooterComp/>
            </div>
        );
    }
}

export default CloudApp;