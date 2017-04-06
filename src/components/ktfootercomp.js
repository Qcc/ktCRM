import React from 'react';
import '../styles/footer.css';
class KtFooterComp extends React.Component{
    render(){
        return(
            <div className='footer'>
                <div className='about'>
                    <span>关于我们</span>
                    <span>商务合作</span>
                    <span>合作案例</span>
                    <span>商务联系</span>
                    <span>注册协议</span>
                </div>
                <div>
                    <span>Copyright © kouton.com All Rights Reserved. 2000-2018 粤ICP备06069852号</span>
                </div>
            </div>
        );
    } 
}

export default KtFooterComp;
