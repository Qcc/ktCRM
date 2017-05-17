import React from 'react';
import { Table,Tabs} from 'antd';
import {query,getOrderPagerByPartner,fetch} from '../../utils/connect'; //库存数量Url
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
      if(data.entity){
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
          return(
          <span className='inven-count'>{item}-(<span style={{color:30 >state?"#f00":"#77c34f"}}>{state}</span>)</span>);
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
class InvenTable extends React.Component {
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
   fetch(getOrderPagerByPartner,this.tableUpdata,params);
    
  }
  orderStates=(status)=>{
    let s ='';
    switch(status){
      case -2: s='审核失败';
        break;
      case 1: s='待审核';
        break;
      case 2: s='待付款';
        break;
      case 3: s='待发货';
        break;
      case 4: s='已完成';
        break;
      default : s=null;
    }
    return s;
  }
  //表格数据填充回调
  tableUpdata=(data)=>{
    console.log(data);
    if(data.status !== 200 || data.errorCode !== 0){
      return;
    }
    let list = data.entity.list;
    let tempDate =[];
    let tempPagination = this.state.pagination;
    for (let i=0;i<list.length;i++) {
      tempDate.push({ 
                      "key":i,
                      "points":list[i].points,
                      "money":list[i].money,
                      "state":this.orderStates(list[i].state),
                      "date":list[i].createDatetime,
                  });
    }
    tempPagination.total = data.entity.count;
    this.setState({
      loading:false,
      data:tempDate,
      pagination:tempPagination,
    });
 
  }

  //表格组件加载时加载数据
  componentDidMount() {
    fetch(getOrderPagerByPartner,this.tableUpdata,{pageNO:1,size:10,"product.productId":this.props.productId,ifGetCount:1});
  }

  render() {
    //筛选input后缀，清除数据
    const columns = [{
      title: '采购数量',
      dataIndex: 'points',
      key: 'points',
      sorter: (a, b) => a.amount > b.amount,
    },{
      title: '采购总价',
      dataIndex: 'money',
      key: 'money',
      sorter: (a, b) => a.money > b.money,
    }, {
      title: '订单状态',
      dataIndex: 'state',
      key: 'state',
    }, {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
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




class InvenDetails extends React.Component{

    render(){
      return(
        <div className='warp'>
          <Tabs tabBarExtraContent={<Inventory/>} type="card">
            <TabPane tab="沟通云桌面" key="1"><InvenTable productId={3}/></TabPane>
            <TabPane tab="CTBS高级版" key="2"><InvenTable productId={1}/></TabPane>
            <TabPane tab="CTBS企业版" key="3"><InvenTable productId={2}/></TabPane>
          </Tabs>
        </div>
        );
    }
}

export default InvenDetails;