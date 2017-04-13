import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import KtHeaderComp from './ktheadercomp';
import '../styles/main.css';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class MenuComp extends React.Component{
    //加载页面时修改title
    componentDidMount() {
        document.title='订货系统-深圳市沟通科技有限公司';
    }
    state = {
      //当前菜单的key
      activeItem: 'user_info',
      openKeys:[],
    }
    //点击切换菜单
    handleClick = (e) => {
      console.log('click ', e);
      window.location.hash = e.key;//将页面切换到点击菜单页面
      this.setState({
        activeItem: e.key,
        openKeys: e.keyPath.slice(1),
        });
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
          defaultOpenKeys={this.state.openKeys} //默认打开的菜单
          selectedKeys={[this.state.activeItem]} //默认选中的菜单
          onClick={this.handleClick} //菜单点击handle
          style={{ height: '100%' }}
        > 
          <SubMenu key="user" title={<span><Icon type="user" />客户中心</span>}>
            <Menu.Item key="user_info">我的信息</Menu.Item>
            <Menu.Item key="user_mod">修改资料</Menu.Item>
          </SubMenu>
          <SubMenu key="lic" title={<span><Icon type="idcard" />授权管理</span>}>
            <Menu.Item key="lic_temp">临时授权</Menu.Item>
            <Menu.Item key="lic_genu">正式授权</Menu.Item>
          </SubMenu>
          <SubMenu key="inven" title={<span><Icon type="home" />库存管理</span>}>
            <Menu.Item key="inven_query">库存查询</Menu.Item>
            <Menu.Item key="inven_details">发货明细</Menu.Item>
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
          {this.props.children}
        </Content>
      </Layout>
    </Layout>
  </Layout>
        );
    }
} 

export default MenuComp;