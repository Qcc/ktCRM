import React from 'react';
import {Link} from 'react-router-dom';
import {Menu,Icon,Dropdown} from 'antd';
import '../styles/header.css';

const SubMenu = Menu.SubMenu;
class KtHeaderComp extends React.Component{
    state = {
            current: this.props.active,
            theme:this.props.theme,
    }
    static propTypes ={
        active:React.PropTypes.string,
        theme:React.PropTypes.string,
        login:React.PropTypes.node,
    }

    componentWillMount(){
         this.setState({
         theme:this.props.theme ? 'light' : 'dark',
         current:this.props.active ? this.props.active:'',
    });
    }

    render(){
          const menu = (
                <Menu>
                  <Menu.Item>
                    <a href="#"> <Icon type="logout" /> 注销</a>
                  </Menu.Item>
                </Menu>
            );
        return(
            <Menu
                selectedKeys={[this.state.current]}   
                mode="horizontal"
                theme={this.state.theme}
                style={{ lineHeight: '64px'}}
                className='header'
            >   
                <Icon className='logo' />
                <Menu.Item key="home"><Link to="/">首页</Link></Menu.Item>
                <SubMenu className='head-submenu' title={<span>应用虚拟化产品  </span>}>                     
                       <Menu.Item className='head-submenu-item' key="ctbsAdv"><Link to="/ctbsAdv">CTBS高级版</Link></Menu.Item>
                       <Menu.Item className='head-submenu-item' key="ctbsEnterprise"><Link to="/ctbsEnterprise"></Link>CTBS企业版</Menu.Item>
                       <Menu.Item className='head-submenu-item ' key="cloudApp"><Link to="/cloudApp"></Link>沟通云桌面</Menu.Item>
                 </SubMenu>
                <Menu.Item key="service"><Link to="/service">原厂服务</Link></Menu.Item>
                <Menu.Item key="customer"><Link to="/customer">购买须知</Link></Menu.Item>
                {this.props.login?
                                <div style={{float:"right"}} >
                                    <Dropdown overlay={menu}>
                                          <span>{this.props.login} <Icon type="down" /> </span>                                     
                                    </Dropdown>
                                </div>
                                :
                                <Menu.Item className='logonin' key="login" style={{float:'right'}}>
                                    <Link to="/login">登录</Link>
                                </Menu.Item>}
            </Menu>
        );
    }
}

export default KtHeaderComp;