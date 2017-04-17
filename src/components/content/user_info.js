import React from 'react';
import { Icon,Timeline } from 'antd';
import '../../styles/userinfo.css';

class UserInfo extends React.Component{

    state = {
        company:'深圳市沟通科技有限公司', //代理商公司名称
        avatar:require('../../static/avatar.jpg'), //用户头像
        level:'金牌代理',
    }

    render(){

        return(
            <div>
                <div className='user'>
                    <div className='avatar'><img src={this.state.avatar} alt='头像'/></div>
                    <div><h2><Icon type="safety" style={{color:'#48ff48'}} /> {this.state.company}</h2></div>
                    <div><h3 style={{color:'#ccc'}}> <Icon type="trophy"style={{color:'#e7dd40'}}/> {this.state.level}</h3></div>                    
                </div>
                <Timeline className='timeline'>
                    <Timeline.Item color="red">
                        <h3>今天</h3>
                        <p>授权延期 2017年4月17日 11:46:46</p>
                        <p>发放正式授权 2017年4月17日 11:46:46</p>                        
                    </Timeline.Item>
                    <Timeline.Item color="green">
                        <h3>本周</h3>
                        <p>增加站点 2017年4月17日 11:46:30</p>
                        <p>订购了CTBS高级版产品 2017年4月17日 11:46:10</p>
                        <p>发放云桌面正式授权 2017年4月17日 11:45:41</p>
                    </Timeline.Item>
                    <Timeline.Item>
                        <h3>更早</h3> 
                        <p>修改了密码 2017年4月17日 11:45:02</p>
                        <p>发放临时授权 2017年4月17日 11:45:16</p>
                        <p>订购了云桌面产品 2017年4月17日 11:45:26</p>
                    </Timeline.Item>
                    <Timeline.Item >开通了账户 2017年4月17日 11:44:56</Timeline.Item>
                    <Timeline.Item >往下查看更多</Timeline.Item>
                    
                </Timeline>
            </div>
        );
    }
}

export default UserInfo;