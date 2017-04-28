import React from 'react';
import KtHeaderComp from '../components/ktheadercomp';
import KtFooterComp from '../components/ktfootercomp';

class CTBSAdv extends React.Component{
    componentDidMount() {
        document.title='CTBS-深圳市沟通科技有限公司';
    }
    render(){
        return(
            <div>
            <KtHeaderComp theme='light' active="ctbsAdv"/>
            <h1>这是CTBS高级版详情页</h1>
            <KtFooterComp/>
            </div>
        );
    }
}

export default CTBSAdv;