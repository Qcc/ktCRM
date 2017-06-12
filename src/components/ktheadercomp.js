import React from 'react';
import {Link} from 'react-router-dom';
import {Menu,Icon,Modal} from 'antd';
import {logout,isLoggedIn,fetch} from '../utils/connect';

import '../styles/header.css';

const SubMenu = Menu.SubMenu;
const confirm = Modal.confirm;
class KtHeaderComp extends React.Component{
     
    timer =()=> setInterval(()=>{fetch(isLoggedIn,this.isLoggedInUpdate);},600000);
    componentDidMount=()=>{
        if(window.isLoggedIn){
            this.timer();
        }
        
    }
    isLoggedInUpdate=(data)=>{
        if(!data){
            return;
        }
        if(data.entity === 1){
           window.isLoggedIn=true; 
        }
       if(data.entity === 0){
           window.isLoggedIn=false;               
        } 
    }
    
    static propTypes ={
        active:React.PropTypes.string,
        theme:React.PropTypes.string,
    }
     //确认是否退出
    showConfirm=()=>{
      confirm({
        title: '请确认',
        content: '要退出当前登录的账户吗？',
        onOk() {
          fetch(logout,(data)=>{
            if(data){
              window.isLoggedIn=false;                             
              window.location.hash ='/';       
            }
          });
        },
        onCancel() {
        },
      }); 
    }
     

 
    render(){
        return(
            <Menu
                 selectedKeys={[this.props.active]}   
                theme={this.props.theme}
                mode="horizontal"
                style={{ lineHeight: '64px'}}
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
                {window.isLoggedIn || this.props.isloged?
                        <Menu.Item   key="loginOut" style={{float:'right'}} >
                            <span onClick={this.showConfirm}>注销</span>
                        </Menu.Item>:''}
                {window.isLoggedIn || this.props.isloged? 
                         <Menu.Item   key="online" style={{float:'right'}} >
                            <Link to="/main"><Icon type="user" />已登录</Link>
                        </Menu.Item>:
                        <Menu.Item className='logonin' key="login" style={{float:'right'}} >
                            <Link to="/login">登录</Link>
                        </Menu.Item>}
                </Menu>
        );
    }
}

export default KtHeaderComp;