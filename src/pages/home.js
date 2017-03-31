import React from 'react';
import KtHeaderComp from '../components/ktheadercomp';
import {Api} from '../utils/connect';
import {Api1} from '../utils/connect';
  
class Home extends React.Component{
    render(){
        return(
           <div>
            <KtHeaderComp active='home'/>
            <h1>这是主页面</h1>
            {console.log(`${Api}--${Api1}`)}
            </div>
        );
    }
}

export default Home;