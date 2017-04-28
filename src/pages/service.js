import React from 'react';
import KtHeaderComp from '../components/ktheadercomp';
import KtFooterComp from '../components/ktfootercomp';

class Service extends React.Component{
    componentDidMount() {
        document.title='原厂服务-深圳市沟通科技有限公司';
    }
    render(){
        return(
            <div>
            <KtHeaderComp theme='light' active='service'/>
            <h1>这是服务页面</h1>
            <KtFooterComp/>
            </div>
        );
    }
}

export default Service;