import React from 'react';
import {Steps,Modal,Button } from 'antd';

const Step = Steps.Step;
class UserModSecurityModal extends React.Component{

    state = {
        modSecuritySteps:0,//修改密码步骤条位置
        modSecurityVisible:false,
    }

    
    

    //关闭修改邮箱模态框
    modSecurityCancel=(e)=>{this.setState({modSecurityVisible:false})}
    //打开修改邮箱模态框，父组件调用
    modSecurityOpen=(e)=>{this.setState({modSecurityVisible:true})}
     //修改密码模态框下一步handle
    modSecurityNext=(e)=>{}

    render(){
        return(
        <Modal title="修改密保问题"
          maskClosable={false}  //点击遮罩层不允许关闭模态框 
          visible={this.state.modSecurityVisible} //模态框是否可见
          onCancel={this.modSecurityCancel}
          footer={<Button type="primary">下一步</Button>}>
          <Steps current={this.state.modSecuritySteps}>
              <Step title="验证密码" />
              <Step title="修改密保问题" />
              <Step title="修改成功" />
          </Steps>
                        
      </Modal>
        );
    }
}

export default UserModSecurityModal;