import React from 'react';
import { Layout, Menu,Modal,Breadcrumb ,Icon} from 'antd';
import KtHeaderComp from '../components/ktheadercomp';
import KtFooterComp from '../components/ktfootercomp';
import UserMod from '../components/content/user_mod';
import LicQuery from '../components/content/lic_query';
import LicTemp from '../components/content/lic_temp';
import LicGenu from '../components/content/lic_genu';
import InvenDetails from '../components/content/inven_details';
import SalesDetails from '../components/content/sales_details';
import {logout,fetch} from '../utils/connect';
import '../styles/main.css';

const { SubMenu } = Menu;
const confirm = Modal.confirm;
const { Header, Content, Sider } = Layout;
const childComponent = {
      userMod:UserMod,
      licQuery:LicQuery,
      licTemp:LicTemp,
      licGenu:LicGenu,
      invenDetails:InvenDetails,
      salesDetails:SalesDetails,
    };
class Main extends React.Component{

    //加载页面时修改title
    componentDidMount() {
        document.title='订货系统-深圳市沟通科技有限公司';
    }
    state = {
      currentComponent:childComponent.userMod,
    }
    //点击切换菜单
    handleClick = (e) => {
      //通过state重新渲染子组件
      this.setState({
        currentComponent:childComponent[e.key],
      });
      //window.location.hash = e.key;//将页面切换到点击菜单页面
    }
   
    //确认是否退出
    showConfirm=()=>{
      confirm({
        title: '请确认',
        content: '要退出当前登录的账户吗？',
      onOk() {
        fetch(logout,(data)=>{
          if(data.status === 200 && data.errorCode === 0){
              window.location.hash ='/';       
            }
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    }); 
    }
    //登录状态
    loginStatus=()=>{
      return '已登录';
    }
   
    render(){
        return(
           <div> 
              <Layout>
                <Header> 
                  <KtHeaderComp active='main' login={this.loginStatus()}/>
                </Header>
              <Layout>
                <Sider width={200} style={{ background: '#fff' }}>
                  <Menu
                    mode="inline"
                    defaultSelectedKeys={['userMod']} //默认选中的菜单Item
                    defaultOpenKeys={['user']}  //默认打开的菜单组
                    onClick={this.handleClick} //菜单点击handle
                    style={{ height: '100%' }}
                  > 
                    <SubMenu key="user" title={<span><Icon type="user" />客户中心</span>}>
                      <Menu.Item key="userMod">修改资料</Menu.Item>
                    </SubMenu>
                    <SubMenu key="lic" title={<span><Icon type="idcard" />授权管理</span>}>
                      <Menu.Item key="licQuery">授权查询</Menu.Item>            
                      <Menu.Item key="licTemp">临时授权</Menu.Item>
                      <Menu.Item key="licGenu">正式授权</Menu.Item>
                    </SubMenu>
                    <SubMenu key="inven" title={<span><Icon type="home" />库存管理</span>}>
                      <Menu.Item key="invenDetails">采购库存</Menu.Item>
                      <Menu.Item key="salesDetails">销售明细</Menu.Item>                      
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
    <KtFooterComp/>
  </div> 
        );
    }
}
  
export default Main;
