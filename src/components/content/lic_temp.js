import React from 'react';
import reqwest from 'reqwest';
import {Button,Table, Input, Icon,message,Popconfirm,Modal } from 'antd';
import '../../styles/lictemp.css';
import {licTemp} from '../../utils/connect';


class ModCdkModal extends React.Component {
  state = {
    loading: false,
    visible: false,
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }
  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Open modal dialog
        </Button>
        <Modal
          visible={this.state.visible}
          title="Title"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" size="large" onClick={this.handleCancel}>Return</Button>,
            <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk}>
              Submit
            </Button>,
          ]}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }
}

class FilterTable extends React.Component {
  state = {
    filterCdkVisible:false, //cdk筛选input 是否可见
    filterCustomerVisible: false,  //客户名称筛选input是否可见
    searchCdkText: '', //筛选CDK input value
    searchCustomerText: '',  //筛选客户名称 input value  
    cdkFiltered: false, //cdk筛选icon 颜色
    customerFiltered: false, //客户名称筛选icon 颜色
    data: [], //表数据
    pagination: {}, //分页器
    loading: false, //加载状态
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
  fetch = (method='GET',params = {}) => {
    console.log('licTemp',licTemp,'method',method,'params:', params);
    this.setState({ loading: true });
    reqwest({
      url: licTemp,
      method: method,
      data: {
        //results: 10,
        ...params,
      },
      type: 'json',
    }).then((data) => {
      //发生网络错误时，清空不可靠的数据
      if(data.errorCode){
        console.log("errorCode:",data.errorCode,"message:",data.message );
        message.error('网络发生错误，请刷新(F5)重试！');
        data.entity=[];
        data.allRecord=[];
      }
      const pagination = { ...this.state.pagination };
      // Read total count from server
      pagination.total = data.allRecord;
      //pagination.total = 200;
      this.setState({
        loading: false,
        data: data.entity,
        pagination,
      });
      console.log(data.entity);
    });
  }
  //表格组件加载时加载数据
  componentDidMount() {
    this.fetch();
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
  //显示 模态框 修改授权，加站，延期



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
      render: (text, record, index) => {              
        return(
              //弹出模态框，修改记录，加站 延期
               
                <a href="#">{text}</a>
               
        );
      },
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
        value: true,
      }, {
        text: '未激活',
        value: false,
      }],
      onFilter: (value, record) => record.active.indexOf(value) === 0,
    }];

    
    return <Table 
              columns={columns} 
              dataSource={this.state.data} 
              size="small"
              rowKey={record => record.registered}  //表格行 key 的取值，可以是字符串或一个函数
              pagination={this.state.pagination}   //分页器，配置项参考 pagination，设为 false 时不展示和进行分页
              loading={this.state.loading}   //页面是否加载中
              onChange={this.handleTableChange} />; //分页、排序、筛选变化时触发
              //修改cdk模态框
              <ModCdkModal ref={node=>this.modCdkModal = node}></ModCdkModal>
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