import React from 'react';
import {Steps,Modal,Button } from 'antd';

const Step = Steps.Step;
class UserModMailModal extends React.Component{

    state = {
        modMailSteps:0,//修改密码步骤条位置
        modMailVisible:false,
    }

    componentDidMount(e){
    }
    //关闭修改邮箱模态框
    modMailCancel=(e)=>{this.setState({modMailVisible:false})}
    //打开修改邮箱模态框，父组件调用
    modMailOpen=(e)=>{this.setState({modMailVisible:true})}
     //修改密码模态框下一步handle
    modMailNext=(e)=>{}

    render(){
        return(
        <Modal title="修改邮箱"   
          maskClosable={false}
          visible={this.state.modMailVisible} //模态框是否可见
          onCancel={this.modMailCancel}
          footer={<Button type="primary">下一步</Button>}>
          <Steps current={this.state.modMailSteps}>
              <Step title="验证密码" />
              <Step title="填写验证码" />
              <Step title="填写新邮箱" />                            
              <Step title="新邮箱验证" />
          </Steps>
       </Modal>
        );
    }
}

export default UserModMailModal;