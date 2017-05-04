import React from 'react';
import KtHeaderComp from '../components/ktheadercomp';
import KtFooterComp from '../components/ktfootercomp';
import "../styles/customer.css";

class Customer extends React.Component{
    componentDidMount() {
        document.title='用户须知-深圳市沟通科技有限公司';
    }
    render(){
        return(
            <div>
            <KtHeaderComp theme='light' active="customer"/>
            <div className="customer-body">
                <div className="customer-nav">
                    <ul>
                        <li>关于商品11</li>
                        <li>关于发货</li>
                        <li>关于配送及验收</li>
                        <li>关于退换货</li>
                        <li>关于发票</li>
                        <li>关于售后服务</li>                                                           
                    </ul>
                </div>
                <div className="customer-content">
                fgfhfg <br/>
                fgfhfg <br/>
                fgfhfg <br/>
                fgfhfg <br/>
                
                </div>
            </div>
            <KtFooterComp/>
            </div>
        );
    }
}

export default Customer;