import React from 'react';
import {Button,Icon,Input,Table,message} from 'antd';
import {querylicense,fetch} from '../../utils/connect'; //库存数量Url
import '../../styles/licquery.css';
message.config({
  top: 70,
  duration: 2,
});

const columns = [{
  title: '项目',
  dataIndex: 'project',
}, {
  title: '状态',
  dataIndex: 'status',
}, {
  title: '结果',
  dataIndex: 'checked',
}];



class LicQuery extends React.Component{
    constructor(props) {
            super(props);
            this.state = {
            cdKey: '',
            data:[{
                  key: '1',
                  project: '客户',
                  status: '-',//status: 'Ok',
                  checked: '-',//checked: '深圳市沟通科技有限公司',
                },{
                  key: '2',
                  project: '授权码',
                  status: '-',//
                  checked: '-',//checked: 'BY05-7109-8A90-01F0',
                },{
                  key: '3',
                  project: '产品',
                  status: '-',     //status: 'Ok',
                  checked: '-',//checked: '云桌面V2.1',
                },{
                  key: '4',
                  project: '授权',
                  status: '-',//status: 'Ok',
                  checked: '-',//checked: '正式版',
                }, {
                  key: '5',
                  project: '到期时间',
                  status: '-',//status: 'Ok',
                  checked: '-',//checked: '2017年5月19日 15:38:32',
                }, {
                  key: '6',
                  project: '授权数',
                  status: '-',//status: 'Ok','Failed',
                  checked: '-',//checked: 15,
                },{
                  key: '7',
                  project: '激活',
                  status: '-',//status: 'Ok',
                  checked: '-',  // checked: '已激活', 
                }],
            }
        }

    //清空授权码输入框
    emitEmpty = () => {
            this.userNameInput.focus();
            this.setState({ cdKey: '' });
        }
    //将input 的value 绑定到state
    onChangeUserName = (e) => {
            this.setState({ cdKey: e.target.value.toUpperCase() });
        }
    //测试cdkey格式是否正常
    test(cdKey){
        if(cdKey.length === 0 ) return '请输入授权码！'
        if(cdKey.length !== 19) return '授权码不正确，请检查后重新查询。';
        if(cdKey.charAt(4) !=='-' || cdKey.charAt(9) !=='-' || cdKey.charAt(14) !=='-') return '授权码格式不正确，请检查后重新查询。';
        return false;
    }
    //查询授权码
    query(e){
        let checked = this.test(this.state.cdKey);
        if(checked){
            message.error(checked);
            return;
        }
        console.log(checked);
        fetch(querylicense,this.upState.bind(this),'GET',{licKey:this.state.cdKey})
    }
    //展示查询结果，回调
    upState(data){
      if(!data){
         message.error('网络发生错误，请刷新(F5)重试！');
         return;
      }
      let nowDate = new Date().getTime(); 
      let expirationDate = new Date(data.entity.expirationDate).getTime();
    this.setState({
        data:[{
                  key: '1',
                  project: '客户',
                  status: 'Ok',//status: 'Ok',
                  checked: data.entity.endUserCompany,//checked: '深圳市沟通科技有限公司',
                },{
                  key: '2',
                  project: '授权码',
                  status: 'Ok',//
                  checked: data.entity.key,//checked: 'BY05-7109-8A90-01F0',
                },{
                  key: '3',
                  project: '产品',
                  status: 'Ok',     //status: 'Ok',
                  checked: data.entity.product.productName,//checked: '云桌面V2.1',
                },{
                  key: '4',
                  project: '授权',
                  status: 'Ok',//status: 'Ok',
                  checked: data.entity.type?'正式版':'试用版',//checked: '正式版',
                }, {
                  key: '5',
                  project: '到期时间',
                  status: expirationDate>nowDate?'Ok':'已过期',//status: 'Ok',
                  checked: data.entity.expirationDate,//checked: '2017年5月19日 15:38:32',
                }, {
                  key: '6',
                  project: '授权数',
                  status: 'Ok',//status: 'Ok','Failed',
                  checked: data.entity.userNumber,//checked: 15,
                },{
                  key: '7',
                  project: '激活',
                  status: data.entity.activation?'Ok':'未激活',//status: 'Ok',
                  checked:  data.entity.activation?'已激活':'未激活',  // checked: '已激活', 
                }]
    });
  }
 
    render(){
        const { cdKey } = this.state;
        const suffix = cdKey ? <Icon type="close-circle"  onClick={this.emitEmpty} /> : null;
        const queryButton = <Button onClick={()=>this.query()} type="primary">查询(Enter)</Button>
        return(
            <div>
                <div className='userquery-title'>
                    <h2>授权查询</h2> 
                </div>
                <div className='query-input'>
                    <Input
                    addonAfter={queryButton}
                    onPressEnter={()=>this.query()}
                    size='large' 
                    placeholder="XXXX-XXXX-XXXX-XXXX"
                    prefix={<Icon type="key" />}
                    suffix={suffix}
                    value={cdKey}
                    onChange={this.onChangeUserName}
                    ref={node => this.userNameInput = node}
                        />
                </div>
                <div>
                    <h4>查询结果</h4>
                     <Table style={{fontSize : 26}} columns={columns} dataSource={this.state.data} size="middle" />
                </div>
            </div>
                
        );
    }
}

export default LicQuery;