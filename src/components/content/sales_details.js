import React from 'react';
import { Table,Tabs,Modal} from 'antd';
import {query,getLicActPager,fetch} from '../../utils/connect'; //库存数量Url
import '../../styles/inven.css';
const TabPane = Tabs.TabPane;


class Inventory extends React.Component{
    state={
        cloudAppCount:0, //云桌面库存
        ctbsAdvCount:0, //CTBS高级版库存
        ctbsEnterpriseCount:0, //CTBS 企业版库存
        cashAccount:0, //现金账户
        privilegeAccount:0, //优惠账户
    }
    //库存 请求回调
  upState=(data)=>{
           if(data === null){
    Modal.error({title: '错误！',content:'网络错误，请刷新（F5）后重试。'});  
    return;    
    };
    if(data.errorCode !== 0){
        Modal.error({title: '错误！',content:'服务器错误,'+data.message});
        return;
    }
    if(data.entity !== null){
        //成功拿到数据
        let stock =data.entity.part1;
        for (var key in stock) {
          if(stock[key].product.productId === 1){
              this.setState({
                ctbsAdvCount:stock[key].points,              
              });
          }else if(stock[key].product.productId === 2){
              this.setState({
                ctbsEnterpriseCount:stock[key].points,              
              });
          }else if(stock[key].product.productId === 3){
              this.setState({
              cloudAppCount:stock[key].points,              
              });
          };
        }
        //现金库存
        this.setState({
              cashAccount:data.entity.part2.balance,              
              });
      }
  }
    //表格组件加载时加载数据
  componentDidMount() {
    fetch(query,this.upState);
  }
  //根据是否有库存显示库存
  invenList=(item,state)=>{
       if(state){
          return(<span className='inven-count'>{item}(<span style={{color:30 >state?"#f00":"#77c34f"}}>{state}</span>)</span>);
       }else{
         return null;
       }
  }
    //库存小于30个站点红色显示 账户余额 = 现金账户 + 优惠账户 
    render(){
        return(<div>
            {this.invenList('云桌面库存',this.state.cloudAppCount)}
            {this.invenList('CTBS高级版库存',this.state.ctbsAdvCount)}
            {this.invenList('CTBS企业版库存',this.state.ctbsEnterpriseCount)}
            {this.invenList('账户余额',this.state.cashAccount)} 
            </div>);
    }
}

//数据表
class SalesTable extends React.Component {
  constructor(){
    super();
    this.state = {
      data: [], //表数据
      pagination: {
                    current:1, //当前第几页？
                    pageSize:10, //每页条数
                    total:0, //总数据 条数
                    showSizeChanger:true,
                    pageSizeOptions:['10','50','150','500'],
                    showQuickJumper:true,
                  }, //分页器
      loading: true, //表格加载状态
    };
  }

    //表格变化后重新加载数据
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    pager.pageSize = pagination.pageSize;    
    this.setState({
      pagination: pager,
      loading:true,
    });
    let params = {
                  "pageNO":pagination.current,
                  "size":pagination.pageSize,
                  "product.productId":this.props.productId,
                };
   fetch(getLicActPager,this.tableUpdata,params);
    
  }
  //表格数据填充回调
  tableUpdata=(data)=>{
        if(data === null){
    Modal.error({title: '错误！',content:'网络错误，请刷新（F5）后重试。'});  
    return;    
    };
    if(data.errorCode !== 0){
        Modal.error({title: '错误！',content:'服务器错误,'+data.message});
        return;
    }
    if(data.entity !== null){
        //成功拿到数据
    let list = data.entity.list;
    let tempDate =[];
    let tempPagination = this.state.pagination;
    for (let i=0;i<list.length;i++) {
      tempDate.push({ 
                      "key":i,
                      "cdKey":list[i].key,
                      "endUserCompany":list[i].customer && list[i].customer.company,
                      "userNumber":list[i].userNumber,
                      "type":list[i].type===1?'新客户':'老客户加点',
                      "actionDatetime":list[i].actionDatetime,
                  });
    }
    tempPagination.total = data.entity.count;
    this.setState({
      loading:false,
      data:tempDate,
      pagination:tempPagination,
    });
    }
  }

  //表格组件加载时加载数据
  componentDidMount() {
    fetch(getLicActPager,this.tableUpdata,{pageNO:1,size:10,"product.productId":this.props.productId});
  }

  render() {
    //筛选input后缀，清除数据
    const columns = [{
      title: '授权码',
      dataIndex: 'cdKey',
      key: 'cdKey',
      sorter: (a, b) => a.amount > b.amount,
    }, {
      title: '客户',
      dataIndex: 'endUserCompany',
      key: 'priendUserCompanyce',
      sorter: (a, b) => a.price > b.price,
    }, {
      title: '用户数',
      dataIndex: 'userNumber',
      key: 'userNumber',
      sorter: (a, b) => a.sum > b.sum,
    }, {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    }, {
      title: '日期',
      dataIndex: 'actionDatetime',
      key: 'actionDatetime',
      sorter: (a, b) => a.date > b.date,
    }];

    
    return (

        <div>
          <Table 
              columns={columns} 
              dataSource={this.state.data} 
              size="small"
              pagination={this.state.pagination}   //分页器，配置项参考 pagination，设为 false 时不展示和进行分页
              loading={this.state.loading}   //页面是否加载中
              onChange={this.handleTableChange} /> 
        </div>
    );
  }
}




class SalesDetails extends React.Component{

    render(){
      return(
        <div className='warp'>
          <Tabs tabBarExtraContent={<Inventory/>} type="card">
            <TabPane tab="沟通云桌面" key="1"><SalesTable productId={3}/></TabPane>
            <TabPane tab="CTBS高级版" key="2"><SalesTable productId={1}/></TabPane>
            <TabPane tab="CTBS企业版" key="3"><SalesTable productId={2}/></TabPane>
          </Tabs>
        </div>
        );
    }
}

 
export default SalesDetails;