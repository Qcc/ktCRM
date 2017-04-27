import React from 'react';
import {Button,Table, Input,InputNumber ,DatePicker, 
        Icon,Modal,Form,Radio,Tooltip} from 'antd';
import '../../styles/lictemp.css';
import {licenseCount,licensePager,generateTrail,fetch} from '../../utils/connect';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
//修改授权码模态框
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6},
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

//复制申请的临时授权码，小按钮
class CopyIcon extends React.Component{
    state={text:'复制CDK'}

    handleCopy(e){this.setState({text:'复制成功'})}
    onMouseOut(){this.setState({text:'复制CDK'})} 
    render(){
      return(
         <Tooltip placement="rightTop" 
            title={this.state.text}
            onClick={(e)=>this.handleCopy(e)}
            onMouseLeave={()=>this.onMouseOut()} 
          >
           <span>{this.props.cdk} </span>
          <Button type='dashed' shape="circle" icon="copy"/>
        </Tooltip>
      );
    }
}


//申请临时授权界面
class AskTemlLicModal extends React.Component{
  constructor(){
    super()
    this.state={
      askTempLoading: false, //修改申请授权模态框加载状态
      askTempVisible: false, //修改申请模态框是否可见
      productId:3,// 1.CTBS高级版 2.CTBS企业版 3.云桌面
      endUserCompany:'',//终端用户公司名称
      endUserEmail:'',//终端用户邮箱
      endUserName:'',//终端用户联系人
      endUserPhone:'',//终端用户电话
      endUserAddress:'',//终端用户地址
    };
  }
  
  //表单input数据映射到state
  endUserCompany=(e)=>{this.setState({endUserCompany:e.target.value});}
  endUserEmail=(e)=>{this.setState({endUserEmail:e.target.value});}
  endUserName=(e)=>{this.setState({endUserName:e.target.value});}
  endUserPhone=(e)=>{this.setState({endUserPhone:e.target.value});}
  endUserAddress=(e)=>{this.setState({endUserAddress:e.target.value});}

  //显示申请临时授权模态框界面
  showModal = () => {
    this.setState({
      askTempVisible: true,
    });
  }
 //申请临时授权回调
  trailUpdate=(data)=>{
    console.log("申请临时授权码："+JSON.stringify(data,null,4));
    this.setState({ askTempLoading: false, askTempVisible: false });
    if(data.status !== 200){
      Modal.error({title: '错误！',content:'网络错误，请刷新（F5）后重试。'});  
      return;    
    };
    if(data.errorCode !== 0){
     Modal.error({title: '错误！',content:'服务器错误,'+data.message});
     return;
    }
     Modal.success({title: '错误！',content:<CopyIcon cdk={data.entity.key}/>});
     //申请成功，清除表单数据。
     this.setState({
      endUserCompany:'',//终端用户公司名称
      endUserEmail:'',//终端用户邮箱
      endUserName:'',//终端用户联系人
      endUserPhone:'',//终端用户电话
      endUserAddress:'',//终端用户地址
     });    
  }
  //确认申请临时授权
  handleOk = () => {
    let {productId,
      endUserCompany,
      endUserEmail,
      endUserName,
      endUserPhone}=this.state;
    this.setState({ askTempLoading: true });
    let params = {productId:productId,
      endUserCompany:endUserCompany,
      endUserEmail:endUserEmail,
      endUserName:endUserName,
      endUserPhone:endUserPhone,}
      //请求数据
    fetch(generateTrail,this.trailUpdate,params);
  }
  //取消申请临时授权
  handleCancel = () => {
    this.setState({ askTempVisible: false });
  }
  //选择申请授权的产品
  handleProductChange = (e)=>{
    this.setState({
      productId: e.target.value,
    });
  }
  render() {
    return (
       <Modal
        visible={this.state.askTempVisible}
              title="申请临时授权"
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              footer={[
                <Button key="back" size="large" onClick={this.handleCancel}>取消</Button>,
                <Button key="submit" type="primary" size="large" loading={this.state.askTempLoading} onClick={this.handleOk}>
                  申请
                </Button>,
              ]}>
               <Form>
                   <FormItem
                     {...formItemLayout}
                     label="产品"
                     required
                     validateStatus="success"
                   >
                       <RadioGroup onChange={this.handleProductChange} value={this.state.productId}>
                          <Radio value={3}>沟通云桌面</Radio>
                          <Radio value={1}>CTBS高级版</Radio>
                          <Radio value={2}>CTBS企业版</Radio>
                        </RadioGroup>
                   </FormItem>
                 
                   <FormItem
                     {...formItemLayout}
                     required
                     label="站点数"
                     hasFeedback
                     validateStatus="success"
                   >
                     <InputNumber disabled defaultValue={3} min={1} max={100}  id="validating" />
                   </FormItem>
                 
                   <FormItem
                     {...formItemLayout}
                     label="试用时间(天)"
                     required
                     hasFeedback
                     validateStatus="success"
                   >
                     <InputNumber disabled defaultValue={15} min={1} max={15}  id="validating" />
                   </FormItem>
                   
                   <FormItem
                     {...formItemLayout}
                     label="公司名称"
                   >
                     <Input onChange={this.endUserCompany} value={this.state.endUserCompany} placeholder="客户公司名称" id="error" />
                   </FormItem>
                   
                   <FormItem
                     {...formItemLayout}
                     label="邮箱"
                     hasFeedback
                   >
                     <Input onChange={this.endUserEmail} value={this.state.endUserEmail} placeholder="客户邮箱" id="warning" />
                   </FormItem>

                   <FormItem
                     {...formItemLayout}
                     label="联系人"
                     hasFeedback
                   >
                     <Input onChange={this.endUserName} value={this.state.endUserName} placeholder="客户联系人" id="error" />
                   </FormItem>
                   
                   <FormItem
                     {...formItemLayout}
                     label="手机"
                     hasFeedback
                   >
                     <Input onChange={this.endUserPhone} value={this.state.endUserPhone} placeholder="客户手机" id="error" />
                   </FormItem>

                    <FormItem
                     {...formItemLayout}
                     label="地址"
                     hasFeedback
                   >
                     <Input onChange={this.endUserAddress} value={this.state.endUserAddress} placeholder="客户地址" id="error" />
                   </FormItem>
             </Form>
             <div className='temp-lic-tips'>
                <p><span>提示 ：</span>请务必将信息正确填写完整，当前填写信息将作为以后找回授权码、解除绑定等重要操作的依据。</p>
             </div>
        </Modal>
    );
  }
}



class ModCdkModal extends React.Component{

  state={
    modCdkloading: false, //修改授权模态框加载状态
    modCdkvisible: false, //修改授权模态框是否可见
    cdk:{}, //每行CDK数据
  }

  //显示修改cdkey模态框界面
  showModal = (cdk) => {
    this.setState({
      modCdkvisible: true,
      cdk:cdk,
    });
    console.log(this.state.cdk.active);
  }
  //修改完成后，当点击保存按钮时，更新cdkey
  handleOk = () => {
    this.setState({ modCdkloading: true });
    setTimeout(() => {
      this.setState({ modCdkloading: false, modCdkvisible: false });
    }, 3000);
  }
  //取消修改
  handleCancel = () => {
    this.setState({ modCdkvisible: false });
  }

  render(){
    return(
      <Modal
              visible={this.state.modCdkvisible}
              title="修改CDKEY"
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              footer={[
                <Button key="back" size="large" onClick={this.handleCancel}>取消</Button>,
                <Button key="submit" type="primary" size="large" loading={this.state.modCdkloading} onClick={this.handleOk}>
                  保存
                </Button>,
              ]}>
               
              <Form>
                 <FormItem
                   {...formItemLayout}
                   label="用户"
                   hasFeedback
                   validateStatus="success"
                   required
                 >
                   <Input id="user" disabled defaultValue={this.state.cdk.customer} />
                 </FormItem>
            
                 <FormItem
                    {...formItemLayout}
                    label="产品"
                    hasFeedback
                    validateStatus="success"
                    required
                  >
                    <Input id="product" disabled defaultValue={this.state.cdk.product} />
                  </FormItem>
                  
                  <FormItem
                   {...formItemLayout}
                   label="授权码"
                   hasFeedback
                   validateStatus="success"
                   required
                 >
                   <Input id="cdk" disabled defaultValue={this.state.cdk.cdkey}/>
                 </FormItem>

                  <FormItem
                    {...formItemLayout}
                    label="站点数"
                    hasFeedback
                    validateStatus="warning"
                    required
                  >
                    <InputNumber min={1} max={100} id="license" defaultValue={this.state.cdk.license} />
                  </FormItem>

                  <FormItem
                    {...formItemLayout}
                    label="过期时间"
                    hasFeedback
                    validateStatus="warning"
                    required
                  >
                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                  </FormItem>
                  <FormItem
                   {...formItemLayout}
                   label="激活状态"
                   required
                 >
                     <Radio.Group defaultValue={this.state.cdk.active}>
                      <Radio value="已激活">已激活</Radio>
                      <Radio value="未激活">未激活</Radio>
                    </Radio.Group>
                 </FormItem>
               </Form>
               <div className='temp-lic-tips'><p><span>提示 ：</span>临时授权站点数最多授权100个站点最少1个，每个授权只能延期2次，每次最多7天！</p></div>
            </Modal>
    );
  }
}

// ===================================================================================================
//数据表
class FilterTable extends React.Component {
  state = {
    filterCdkVisible:false, //cdk筛选input 是否可见
    filterCustomerVisible: false,  //客户名称筛选input是否可见
    searchCdkText: '', //筛选CDK input value
    searchCustomerText: '',  //筛选客户名称 input value  
    cdkFiltered: false, //cdk筛选icon 颜色
    customerFiltered: false, //客户名称筛选icon 颜色
    loading: false, //表格加载状态
    doubleClick:false,//模拟表格双击事件
    pagination: { //分页器
                  showSizeChanger:true, //是否可设置每页显示多少行
                  defaultCurrent:1, //默认页码
                  defaultPageSize:10,//默认每页显示多少行
                  total:0, //总行数
                  showQuickJumper:true, //可快速跳转到指定页码
                  onChange:this.paginationOnChange,//页面改变后的回调函数
                  onShowSizeChange:this.paginationOnShowSizeChange, //pageSize 变化的回调
                  pageSizeOptions:[10,20,40,60,100]//每页可显示多少行
                }, //分页器
    data: [] //表数据
    
  };
  //页面改变后的回调函数
  paginationOnChange(page, pageSize){
    
      console.log("page,pageSize",page,pageSize);
  }
  //pageSize 变化的回调
  paginationOnShowSizeChange(current, size){
    console.log("current, size",current, size);
  }

    //表格变化后重新加载数据
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    console.log("pagination, filters, sorter",pagination, filters, sorter);
  }
  //获取授权总数
  licCountUpdate=(data)=>{
    if(data.status !== 200){
      Modal.error({title: '错误！',content:'网络错误，请刷新（F5）后重试。'});  
      return;    
    };
    if(data.errorCode !== 0){
     Modal.error({title: '错误！',content:'服务器错误,'+data.message});
     return;
    }
    this.setState({
        pagination:{
            total:data.entity
        }
    });
    console.log("licCountUpdate ", data);
  }
  //获取表数据，填充数据
  licPagerUpdate=(data)=>{
    if(data.status !== 200){
      Modal.error({title: '错误！',content:'网络错误，请刷新（F5）后重试。'});  
      return;    
    };
    if(data.errorCode !== 0){
     Modal.error({title: '错误！',content:'服务器错误,'+data.message});
     return;
    }
    let entity = data.entity;
    let tableData=[];
    for(let i =0;i<data.entity.length;i++){
      // tableItem.key = entity[i].key;
      // tableItem.expirationDate = entity[i].expirationDate;
      // tableItem.userNumber = entity[i].userNumber;
      // tableItem.productName = entity[i].product.productName;
      // tableItem.activation = entity.activation?'已激活':'未激活';
      // tableItem.endUserCompany = entity.endUserCompany;
      tableData.push({key:entity[i].key,
                      expirationDate:entity[i].expirationDate,
                      userNumber:entity[i].userNumber,
                      productName:entity[i].product.productName,
                      activation:entity.activation?'已激活':'未激活',
                      endUserCompany:entity.endUserCompany,
                });
      console.log("tableItem "+{key:entity[i].key,
                      expirationDate:entity[i].expirationDate,
                      userNumber:entity[i].userNumber,
                      productName:entity[i].product.productName,
                      activation:entity.activation?'已激活':'未激活',
                      endUserCompany:entity.endUserCompany,
                });
    }
    console.log("licPagerUpdate 收到的数据 ",data);
    console.log("licPagerUpdate 整理后的state ",tableData);
    this.setState({
        data:tableData
    });
  }
  //表格组件加载时加载数据
  componentDidMount() {
    fetch(licenseCount,this.licCountUpdate,{type:0,});
    fetch(licensePager,this.licPagerUpdate,{type:0,pageNO:1,size:10});//默认    
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
    //let params = `cdkey=${searchCustomerText}`;
    //this.fetch(params);

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
  onRowClick=(record)=>{
      if(this.state.doubleClick){
        console.log('111',record);  
        this.refsModCdkModal.showModal(record);
      }
    this.setState({
      doubleClick:true
    });
    //模拟双击键
    setTimeout(()=>{this.setState({doubleClick:false})},300);
  }
  

  render() {
    //筛选input后缀，清除数据
    const columns = [{
      title: '授权码',
      dataIndex: 'key',
      key: 'key',
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
      dataIndex: 'endUserCompany',
      key: 'endUserCompany',
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
      dataIndex: 'productName',
      key: 'productName',
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
      dataIndex: 'expirationDate',
      key: 'expirationDate',
    }, {
      title: '站点数',
      dataIndex: 'userNumber',
      key: 'userNumber',
    }, {
      title: '激活状态',
      dataIndex: 'activation',
      key: 'activation',
      filters: [{ //表头的筛选菜单
        text: '已激活',
        value: 1,
      }, {
        text: '未激活',
        value: 0,
      }],
      onFilter: (value, record) => record.active.indexOf(value) === 0,
    }];

    
    return (

        <div>
          <Table 
              columns={columns} 
              onRowClick={this.onRowClick} // 点击行 修改cdk模态框
              dataSource={this.state.data} 
              size="small"
              rowKey={record => record.registered}  //表格行 key 的取值，可以是字符串或一个函数
              pagination={this.state.pagination}   //分页器，配置项参考 pagination，设为 false 时不展示和进行分页
              loading={this.state.loading}   //页面是否加载中
              onChange={this.handleTableChange} /> 
            <ModCdkModal ref={(node)=>this.refsModCdkModal=node}/>   
        </div>
    );
  }
}


 
class LicTemp extends React.Component{
    //申请临时授权
    handleAskTempLic(){
      this.refsAskTemlLicModal.showModal();
    }

    render(){
        return(
            <div>
                <div className='lictemp-title'>
                    <h2>临时授权</h2> 
                    <Button className='lictemp-apply-button' onClick={()=>{this.handleAskTempLic()}} type="primary">申请临时授权</Button>
                </div>
                <FilterTable />
                <AskTemlLicModal ref={(node)=>this.refsAskTemlLicModal=node}/>
            </div>
        );
    }
}

export default LicTemp;