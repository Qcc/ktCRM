import React from 'react';
import KtHeaderComp from '../components/ktheadercomp';



class Home extends React.Component{
    render(){
        return(
           <div>
            <KtHeaderComp active='home'/>
            
            <h1>这是主页面</h1>
            </div>
        );
    }
}

export default Home;