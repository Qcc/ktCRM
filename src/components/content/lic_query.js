import React from 'react';
import {Button,Icon,Input,Table,message} from 'antd';
import '../../styles/licquery.css';
message.config({
  top: 70,
  duration: 2,
});
class LicTable extends React.Component{
        
        
    render() {
        
        return (
        <p>1</p>
        );
  }
}

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
const data = [{
  key: '1',
  project: '客户',
  status: 'Ok',
  checked: '深圳市沟通科技有限公司',
},{
  key: '2',
  project: '授权码',
  status: 'Ok',
  checked: 'BY05-7109-8A90-01F0',
},{
  key: '3',
  project: '授权',
  status: 'Ok',
  checked: '正式版',
}, {
  key: '4',
  project: '到期时间',
  status: 'Ok',
  checked: '2017年5月19日 15:38:32',
}, {
  key: '5',
  project: '授权数',
  status: 'Ok',
  checked: 15,
},{
  key: '6',
  project: '激活',
  status: 'Ok',
  checked: '已激活',  
}];


class LicQuery extends React.Component{
    constructor(props) {
            super(props);
            this.state = {
            cdKey: '',
            };
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
        if(cdKey.length != 19) return false;
        if(cdKey.charAt(4) !='-' && cdKey.charAt(9) !='-' && cdKey.charAt(14) !='-') return false;
        return true;
    }
    query(e){
        if(!this.test(this.state.cdKey)){
            message.error('授权码不正确，请检查后重新查询。');
            return;
        }
        console.log('授权码正确');
    }
    render(){
        const { cdKey } = this.state;
        const suffix = cdKey ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
        const queryButton = <Button onClick={()=>this.query()} type="primary">查询(Enter)</Button>
        return(
            <div>
                <div className='userquery-title'>
                    <h2>授权查询</h2> 
                </div>
                <div className='query-input'>
                    <Input
                    addonAfter={queryButton}
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
                     <Table style={{fontSize : 26}} columns={columns} dataSource={data} size="middle" />
                </div>
            </div>
                
        );
    }
}

export default LicQuery;