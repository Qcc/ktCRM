import React from 'react';
import {Link} from 'react-router-dom';
import {Menu,Icon} from 'antd';
import '../styles/header.css';

const SubMenu = Menu.SubMenu;
class KtHeaderComp extends React.Component{
    // state = {
    //         current: this.props.active,
    // }
    static propTypes ={
        active:React.PropTypes.string,
        theme:React.PropTypes.string,
        loginOut:React.PropTypes.func,
    }

 
    render(){
          
        return(
            <Menu
                 selectedKeys={[this.props.active]}   
                theme={this.props.theme}
                mode="horizontal"
                style={{ lineHeight: '64px'}}
                onClick={(item)=>{if(item.key === "main")this.props.loginOut()}} 
                className='header'
            >   
                
                <Menu.Item key="logo"><Icon className='logo' /></Menu.Item>                
                <Menu.Item key="home"><Link to="/">首页</Link></Menu.Item>
                <SubMenu className='head-submenu' title={<span>应用虚拟化产品  </span>}>                     
                       <Menu.Item className='head-submenu-item' key="ctbsAdv"><Link to="/ctbsAdv">CTBS高级版</Link></Menu.Item>
                       <Menu.Item className='head-submenu-item' key="ctbsEnterprise"><Link to="/ctbsEnterprise"></Link>CTBS企业版</Menu.Item>
                       <Menu.Item className='head-submenu-item ' key="cloudApp"><Link to="/cloudApp"></Link>沟通云桌面</Menu.Item>
                 </SubMenu>
                <Menu.Item key="service"><Link to="/service">原厂服务</Link></Menu.Item>
                <Menu.Item key="customer"><Link to="/customer">购买须知</Link></Menu.Item>
                {this.props.loginOut?
                                <Menu.Item  key="main" style={{float:'right'}}>
                                    <Icon type="logout" />退出
                                </Menu.Item>
                                :
                                <Menu.Item className='logonin' key="login" style={{float:'right'}}>
                                    <Link to="/login">登录</Link>
                                </Menu.Item>}
            </Menu>
        );
    }
}

export default KtHeaderComp;