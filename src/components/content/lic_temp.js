import React from 'react';
import {Button,Table, Input, Icon } from 'antd';
import '../../styles/lictemp.css';

const data = [{
  key: '1',
  cdkey: 'KT05-87DD-3D04-B39F',
  customer: '深圳市沟通科技有限公司',
  product:'云桌面',
  trial: '2017年4月20日 14:43:25',
  license:10,
  active:'已激活',
}, {
  key: '2',
  cdkey: 'KT05-87FD-3AS4-B39F',
  customer: '深圳市沟通科技有限公司',
  product:'CTBS高级版',
  trial: '2017年4月20日 14:49:45',
  license:3,
  active:'已激活',
}, {
  key: '3',
  cdkey: 'KT05-87AD-3DS4-B39F',
  customer: '深圳市沟通科技有限公司',
  product:'云桌面',
  trial: '2017年4月20日 14:49:50',
  license:14,
  active:'已激活',
}, {
  key: '4',
  cdkey: 'KT15-87DD-3D04-B39F',
  customer: '深圳市沟通科技有限公司',
  product:'CTBS企业版',
  trial: '2017年4月20日 14:49:55',
  license:4,
  active:'已激活',
}];
//===============================================================
class FilterTable extends React.Component {
  state = {
    filterCdkVisible:false, //cdk筛选input 是否可见
    filterCustomerVisible: false,  //客户名称筛选input是否可见
    data, //表格数据
    searchCdkText: '', //筛选CDK input value
    searchCustomerText: '',  //筛选客户名称 input value  
    cdkFiltered: false, //cdk筛选icon 颜色
    customerFiltered: false, //客户名称筛选icon 颜色
  };

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
      console.log(e);
    const { searchCdkText } = this.state;
    const reg = new RegExp(searchCdkText, 'gi');
    this.setState({
      filterCdkVisible: false,
      cdkFiltered: !!searchCdkText,
      data: data.map((record) => {
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
    console.log("onCustomerSearch(1)"+searchCustomerText);
    const reg = new RegExp(searchCustomerText, 'gi');
    console.log("onCustomerSearch(2)"+this.state.customerFiltered);    
    this.setState({
      filterCustomerVisible: false,
      customerFiltered: !!searchCustomerText,
      data: data.map((record) => {
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
    console.log("onCustomerSearch(3)"+this.state.customerFiltered);            
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
      title: '产品',
      dataIndex: 'product',
      key: 'product',
      filters: [{ //表头的筛选菜单
        text: 'CTBS高级版',
        value: 'CTBS高级版',
      }, {
        text: 'CTBS企业版',
        value: 'CTBS企业版',
      },{
        text: '云桌面',
        value: '云桌面',
      }],
      onFilter: (value, record) => record.product.indexOf(value) === 0,
    }, {
      title: '试用到期',
      dataIndex: 'trial',
      key: 'trial',
    }, {
      title: '站点数',
      dataIndex: 'license',
      key: 'license',
    }, {
      title: '激活状态',
      dataIndex: 'active',
      key: 'active',
      filters: [{ //表头的筛选菜单
        text: '已激活',
        value: '已激活',
      }, {
        text: '未激活',
        value: '未激活',
      }],
      onFilter: (value, record) => record.active.indexOf(value) === 0,
    }];
    return <Table columns={columns} dataSource={this.state.data} size="small" />;
  }
}

class LicTemp extends React.Component{

    render(){
        return(
            <div>
                <div className='lictemp-title'>
                    <h2>临时授权</h2> 
                    <Button className='lictemp-apply-button' type="primary">申请临时授权</Button>
                </div>
                <FilterTable />
            </div>
        );
    }
}

export default LicTemp;