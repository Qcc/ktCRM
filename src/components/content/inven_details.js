import React from 'react';
import { Table,Tabs,message,Input,Button,Icon} from 'antd';
import {Inven,Inven1,fetch} from '../../utils/connect'; //库存数量Url
import '../../styles/inven.css';
const TabPane = Tabs.TabPane;


class Inventory extends React.Component{
    state={
        cloudAppCount:0,
        ctbsAdvCount:0,
        ctbsEnterpriseCount:0,
    }
  upState(data){
      if(!data){
         message.error('网络发生错误，请刷新(F5)重试！');
         return;
      }
    this.setState({
        cloudAppCount:data.entity.cloudAppCount,
        ctbsAdvCount:data.entity.ctbsAdvCount,
        ctbsEnterpriseCount:data.entity.ctbsEnterpriseCount,
    });
  }
    //表格组件加载时加载数据
  componentDidMount() {
    fetch(Inven1,this.upState.bind(this));
  }
    //库存小于30个站点红色显示
    render(){
        return( 
            <div className='inven-count'>
                云桌面-
                <span style={{color:30 > this.state.cloudAppCount?"#f00":"#77c34f"}}>({this.state.cloudAppCount})</span>
                CTBS高级版-
                <span style={{color:30 > this.state.ctbsAdvCount?"#f00":"#77c34f"}}>({this.state.ctbsAdvCount})</span>                
                CTBS企业版-
                <span style={{color:30 > this.state.ctbsEnterpriseCount?"#f00":"#77c34f"}}>({this.state.ctbsEnterpriseCount})</span>                                
            </div>);
    }
}


//数据表
class InvenTable extends React.Component {
  state = {
    filterCdkVisible:false, //cdk筛选input 是否可见
    filterCustomerVisible: false,  //客户名称筛选input是否可见
    searchCdkText: '', //筛选CDK input value
    searchCustomerText: '',  //筛选客户名称 input value  
    cdkFiltered: false, //cdk筛选icon 颜色
    customerFiltered: false, //客户名称筛选icon 颜色
    data: [], //表数据
    pagination: {}, //分页器
    loading: false, //表格加载状态
    
  };

    //表格变化后重新加载数据
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  }
  
  //表格组件加载时加载数据
  componentDidMount() {
    
  }

  //表头筛选部分
  //清空授权码输入框
    emitEmpty = (e) => {
            e.target.focus();
            this.setState({ searchCdkText: '',searchCustomerText:'' });
    }
  //绑定搜索cdk input 
  onCdkChange = (e) => {
    this.setState({ searchCdkText: e.target.value });
  }
  //绑定搜索cdk button
  onCdkSearch = (e) => {
    const { searchCdkText } = this.state;
    const reg = new RegExp(searchCdkText, 'gi');
    //筛选后重新加载数据
    let params = `cdkey=${searchCdkText}`;
    this.fetch(params);

    this.setState({
      filterCdkVisible: false,
      cdkFiltered: !!searchCdkText,
      data: this.state.data.map((record) => {
        const match = record.cdkey.match(reg);
        if (!match) {
          return null;
        }
        return {
          ...record,
          cdkey: (
            <span>
              {record.cdkey.split(reg).map((text, i) => (
                i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
              ))}
            </span>
          ),
        };
      }).filter(record => !!record),
    });
  }
   //绑定搜索 Customer input
  onCustomerChange = (e) => {
    this.setState({ searchCustomerText: e.target.value });
  }
  //绑定搜索Customer button
  onCustomerSearch = (e) => {
    const { searchCustomerText } = this.state;
    const reg = new RegExp(searchCustomerText, 'gi');
    //筛选后重新加载数据
    let params = `cdkey=${searchCustomerText}`;
    this.fetch(params);

    this.setState({
      filterCustomerVisible: false,
      customerFiltered: !!searchCustomerText,
      data: this.state.data.map((record) => {
        const match = record.customer.match(reg);
        if (!match) {
          return null;
        }
        return {
          ...record,
          customer: (
            <span>
              {record.customer.split(reg).map((text, i) => (
                i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
              ))}
            </span>
          ),
        };
      }).filter(record => !!record),
    });
  }
  //单击行 显示 模态框 修改授权，加站，延期
  onRowClick(record){
      console.log('点击了行',record);  
  }
  

  render() {
    //筛选input后缀，清除数据
    const columns = [{
      title: '授权码',
      dataIndex: 'cdkey',
      key: 'cdkey',
      //搜索CDK筛选
      filterDropdown: (
        <div className="custom-filter-dropdown">
          <Input
            ref={ele => this.searchCdkInput = ele}
            placeholder="搜索授权码"
            value={this.state.searchCdkText}
            onChange={this.onCdkChange}
            onPressEnter={this.onCdkSearch}
          />
          <Button type="primary" onClick={this.onCdkSearch}>搜索</Button>
        </div>
      ),
      filterIcon: <Icon type="filter" style={{ color: this.state.cdkFiltered ? '#108ee9' : '#aaa' }} />,
      filterDropdownVisible: this.state.filterCdkVisible,
      onFilterDropdownVisibleChange: visible => this.setState({ filterCdkVisible: visible }, () => this.searchCdkInput.focus()),
    }, {
      title: '客户名称',
      dataIndex: 'customer',
      key: 'customer',
      //搜索客户名称筛选
      filterDropdown: (
        <div className="custom-filter-dropdown">
          <Input
            ref={ele => this.searchCustomerInput = ele}
            placeholder="搜索客户公司名"
            value={this.state.searchCustomerText}
            onChange={this.onCustomerChange}
            onPressEnter={this.onCustomerSearch}
          />
          <Button type="primary" onClick={this.onCustomerSearch}>搜索</Button>
        </div>
      ), // color: this.state.customerFiltered ? '#108ee9' : '#aaa' 
      filterIcon: <Icon type="filter" style={{ color: this.state.customerFiltered ? '#108ee9' : '#aaa' }} />,
      filterDropdownVisible: this.state.filterCustomerVisible,
      onFilterDropdownVisibleChange: visible => this.setState({ filterCustomerVisible: visible }, () => this.searchCustomerInput.focus()),
    }, {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      filters: [{ //表头的筛选菜单
        text: '销售',
        value: '销售',
      },{
        text: '采购',
        value: '采购',
      }],
      onFilter: (value, record) => record.product.indexOf(value) === 0,
    }, {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
    }, {
      title: '发放站点数',
      dataIndex: 'license',
      key: 'license',
    }, {
      title: '本次库存',
      dataIndex: 'invenCount',
      key: 'invenCount',
    }];

    
    return (

        <div>
          <Table 
              columns={columns} 
              onRowClick={(recode)=>this.onRowClick(recode)} // 单击行 修改cdk模态框
              dataSource={this.state.data} 
              size="small"
              rowKey={record => record.registered}  //表格行 key 的取值，可以是字符串或一个函数
              pagination={this.state.pagination}   //分页器，配置项参考 pagination，设为 false 时不展示和进行分页
              loading={this.state.loading}   //页面是否加载中
              onChange={this.handleTableChange} /> 
        </div>
    );
  }
}




class InvenDetails extends React.Component{

    callback(key) {
        console.log(key);
    }
    render(){
      return(
        <div>
          <Tabs tabBarExtraContent={<Inventory/>} onChange={this.callback} type="card">
            <TabPane tab="沟通云桌面" key="1"><InvenTable/></TabPane>
            <TabPane tab="CTBS高级版" key="2"><InvenTable/></TabPane>
            <TabPane tab="CTBS企业版" key="3"><InvenTable/></TabPane>
          </Tabs>
        </div>
        );
    }
}

export default InvenDetails;