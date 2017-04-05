import React from 'react';
import KtHeaderComp from '../components/ktheadercomp';
import KtFooterComp from '../components/ktfootercomp';
class Customer extends React.Component{
    componentDidMount() {
        document.title='关于我们-深圳市沟通科技有限公司';
    }
    render(){
        return(
            <div>
            <KtHeaderComp active="customer"/>
            <h1>这是关于我们</h1>
            <KtFooterComp/>
            </div>
        );
    }
}

export default Us;