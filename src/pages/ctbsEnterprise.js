import React from 'react';
import KtHeaderComp from '../components/ktheadercomp';
import KtFooterComp from '../components/ktfootercomp';

class CTBSEnterprise extends React.Component{
    componentDidMount() {
        document.title='CTBS-深圳市沟通科技有限公司';
    }
    render(){
        return(
            <div>
            <KtHeaderComp active="ctbsAdv"/>
            <h1>这是CTBS企业版详情页</h1>
            <KtFooterComp/>
            </div>
        );
    }
}

export default CTBSEnterprise;