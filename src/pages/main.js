import React from 'react';
import MenuComp from '../components/menuComp';
import KtFooterComp from '../components/ktfootercomp';
class Main extends React.Component{

    render(){
        return(
            <div>
                <MenuComp/>
                <KtFooterComp/>
            </div>
        );
    }
}

export default Main;