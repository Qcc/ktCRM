import React from 'react';
import {Link} from 'react-router-dom';
import {Layout,Menu} from 'antd';
import '../styles/header.css';

const { Header} = Layout;
const SubMenu = Menu.SubMenu;
 
class KtHeaderComp extends React.Component{

    state = {
        current: this.props.active,
    }
    static propTypes ={
        active:React.PropTypes.string.isRequired
    }
    render(){
        return(
          <Layout> 
            <Header className="header">
             <div className='logo'></div>
                <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={[this.state.current]}
                style={{ lineHeight: '64px' }}
                >
                {console.log("点击："+this.state.current)}
                <Menu.Item key="home"><Link to="/">首页</Link></Menu.Item>

                  <SubMenu title={<span>应用虚拟化产品</span>}>                     
                       <Menu.Item key="ctbsAdv"><Link to="/ctbsEnterprise">CTBS高级版</Link></Menu.Item>
                       <Menu.Item key="ctbsEnterprise"><Link to="/ctbsAdv"></Link>CTBS企业版</Menu.Item>
                       <Menu.Item key="cloudApp"><Link to="/cloudApp"></Link>沟通云桌面</Menu.Item>
                 </SubMenu>

                <Menu.Item key="service"><Link to="/service">原厂服务</Link></Menu.Item>
                <Menu.Item key="customer"><Link to="/customer">购买须知</Link></Menu.Item>
                <Menu.Item key="login" style={{float:'right'}}><Link to="/login">登录</Link></Menu.Item>
                <Menu.Item key="register" style={{float:'right'}}><Link to="/register">注册</Link></Menu.Item>
                </Menu>
              </Header>
            </Layout>
        );
    }
}

export default KtHeaderComp;