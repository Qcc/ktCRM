import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import KtHeaderComp from './ktheadercomp';

import UserInfo from './content/user_info';
import UserMod from './content/user_mod';

import LicQuery from './content/lic_query';
import LicTemp from './content/lic_temp';
import LicGenu from './content/lic_genu';

import InvenQuery from './content/inven_query';
import InvenDetails from './content/inven_details';

import '../styles/main.css';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const childComponent = {
      userInfo:UserInfo,
      userMod:UserMod,
      licQuery:LicQuery,
      licTemp:LicTemp,
      licGenu:LicGenu,
      invenQuery:InvenQuery,
      invenDetails:InvenDetails};
class MenuComp extends React.Component{
    //加载页面时修改title
    componentDidMount() {
        document.title='订货系统-深圳市沟通科技有限公司';
    }
    state = {
      currentComponent:childComponent.licTemp,
    }
    //点击切换菜单
    handleClick = (e) => {
      //通过state重新渲染子组件
      this.setState({
        currentComponent:childComponent[e.key],
      });
      //window.location.hash = e.key;//将页面切换到点击菜单页面
    }
   
    render(){
        return(
    <Layout>
      <Header> 
        <KtHeaderComp active='main' theme='drak'/>
      </Header>
    <Layout>
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['licTemp']} //默认选中的菜单Item
          defaultOpenKeys={['lic']}  //默认打开的菜单组
          onClick={this.handleClick} //菜单点击handle
          style={{ height: '100%' }}
        > 
          <SubMenu key="user" title={<span><Icon type="user" />客户中心</span>}>
            <Menu.Item key="userInfo">我的信息</Menu.Item>
            <Menu.Item key="userMod">修改资料</Menu.Item>
          </SubMenu>
          <SubMenu key="lic" title={<span><Icon type="idcard" />授权管理</span>}>
            <Menu.Item key="licQuery">授权查询</Menu.Item>            
            <Menu.Item key="licTemp">临时授权</Menu.Item>
            <Menu.Item key="licGenu">正式授权</Menu.Item>
          </SubMenu>
          <SubMenu key="inven" title={<span><Icon type="home" />库存管理</span>}>
            <Menu.Item key="invenQuery">库存查询</Menu.Item>
            <Menu.Item key="invenDetails">出货明细</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '12px 0' }}>
          <Breadcrumb.Item>首页</Breadcrumb.Item>
          <Breadcrumb.Item>伙伴</Breadcrumb.Item>
          <Breadcrumb.Item>客户中心</Breadcrumb.Item>
        </Breadcrumb>
        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
          <this.state.currentComponent/>
        </Content>
      </Layout>
    </Layout>
  </Layout>
        );
    }
} 

export default MenuComp;