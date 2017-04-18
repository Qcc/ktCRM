import React from 'react';
import {Icon,Steps,Input,Modal,Button } from 'antd';
import '../../styles/usermod.css';
const Step = Steps.Step;

//第一步校验密码
class StepFrist extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            pwdInputValue: '', //input 框的 value
        };
    }
      //清空密码框
    emitEmpty = () => {
        this.pwdInput.focus();
        this.setState({ pwdInputValue: '' });
    }
    //绑定state与input的value
    onChangePwdValue = (e) => {
        this.setState({ pwdInputValue: e.target.value });
    } 
    
    render(){
        const { pwdInputValue } = this.state;
        const suffix = pwdInputValue ? <Icon className='anticon-close-circle' type="close-circle" onClick={this.emitEmpty} /> : null;
        return(
            <div>
                <p style={{fontSize:16}}>需要验证当前密码才能继续:</p>
                <Input
                    style={{marginTop:5,marginBottom:5}}
                    placeholder="请输入密码"
                    type='password'
                    prefix={<Icon type="unlock" />}
                    suffix={suffix}
                    value={pwdInputValue}
                    onChange={this.onChangePwdValue}
                    ref={node => this.pwdInput = node}
                />
          </div>
        );
    }
}
//第二步，输入新密码并确认
class StepSecond extends React.Component{
   constructor(props) {
        super(props);
        this.state = {
            pwdInputValue: '', //input 框的 value
            newPwdInputValue: '', //input 框的 value
        };
    }
      //清空密码框
    emitEmpty = () => {
        this.pwdInput.focus();
        this.setState({ pwdInputValue: '' });
    }
    //清空密码框
    newEmitEmpty = () => {
        this.newPwdInput.focus();
        this.setState({ newPwdInputValue: '' });
    }
    //绑定state与input的value
    onChangePwdValue = (e) => {
        this.setState({ pwdInputValue: e.target.value });
    }
    //绑定state与input的value
    onChangeNewPwdValue = (e) => {
        this.setState({ newPwdInputValue: e.target.value });
    }
    
    render(){
        const { pwdInputValue,newPwdInputValue } = this.state;
        const suffix = pwdInputValue ? <Icon className='anticon-close-circle' type="close-circle" onClick={this.emitEmpty} /> : null;
        const newSuffix = newPwdInputValue ? <Icon className='anticon-close-circle' type="close-circle" onClick={this.newEmitEmpty} /> : null;
        return(
            <div>
                <p style={{fontSize:16}}>输入新密码:</p>
                <Input
                    style={{marginTop:5,marginBottom:5}}
                    placeholder="请输入新密码"
                    type='password'
                    prefix={<Icon type="unlock" />}
                    suffix={suffix}
                    value={pwdInputValue}
                    onChange={this.onChangePwdValue}
                    ref={node => this.pwdInput = node}
                />
                <p style={{fontSize:16}}>确认新密码:</p>
                <Input
                    style={{marginTop:5,marginBottom:5}}
                    placeholder="请确认密码"
                    type='password'
                    prefix={<Icon type="unlock" />}
                    suffix={newSuffix}
                    value={newPwdInputValue}
                    onChange={this.onChangeNewPwdValue}
                    ref={node => this.newPwdInput = node}
                />
          </div>
        );
    }
}
//修改完成
class StepThird extends React.Component{
    render(){
        return(
        <p>步骤三</p>
        )
    }
}

//步骤条三种状态
const steps = [{
                content: <StepFrist />,
            }, 
            {
                content: <StepSecond/>,
            }, 
            {
                content: <StepThird/>,
            }];
//修改密码模态框
class UserModPwdModal extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            current: 0, //修改密码步骤条位置
            modPwdVisible:false, //整个模态框是否可见
        };
    }
  
    //关闭修改密码模态框
    modPwdCancel=(e)=>{this.setState({modPwdVisible:false})}
    //打开修改密码模态框，父组件调用
    modPwdOpen=(e)=>{this.setState({modPwdVisible:true})}
    
     //修改密码下一步handle，需校验密码
    next() {
        const current = this.state.current + 1;
        this.setState({ current });
        //需要校验密码继续
        //todo
    }
    prev(e) {
        console.log(e);
    }

    render(){
        return(
        <Modal title="修改密码"
           maskClosable={false} //点击遮罩层不允许关闭模态框 
           visible={this.state.modPwdVisible} //模态框是否可见
           onCancel={this.modPwdCancel} //关闭按钮handle
           footer={null}> 
           <Steps  current={this.state.current}>
             <Step  title="验证密码" />
             <Step  title="修改密码" />
             <Step  title="完成" />
           </Steps>
           <br />
           <div className="steps-content">{steps[this.state.current].content}</div>
           <div className="steps-action"> 
              {this.state.current < steps.length - 1 && <Button type="primary" onClick={() => this.next()}>下一步</Button>}
              {this.state.current === steps.length - 1 && 
                 <Button type="primary" loading onClick={() => Modal.success({title: '完成！',content: '密码修改成功。'})}>完成</Button>}
              {this.state.current > 0 && <Button style={{ marginLeft: 8 }}  onClick={() => this.rest()}> 重新输入 </Button>}
           </div>
        </Modal>
        );
    }
}


export default UserModPwdModal;

/*
class UserModPwdModal extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            modPwdSteps:0,//修改密码步骤条位置
            modPwdVisible:false,
            pwdInputValue: '',
        };
    }
    //清空密码框
    emitEmpty = () => {
        this.pwdInput.focus();
        this.setState({ pwdInputValue: '' });
    }
    //绑定state与input的value
    onChangePwdValue = (e) => {
        this.setState({ pwdInputValue: e.target.value });
    } 
    //关闭修改密码模态框
    modPwdCancel=(e)=>{this.setState({modPwdVisible:false})}
    //打开修改密码模态框，父组件调用
    modPwdOpen=(e)=>{this.setState({modPwdVisible:true})}
     //修改密码模态框下一步handle，需校验密码
    modPwdNext=(e)=>{
        console.log(this.state.pwdInputValue);
        //校验密码继续下一步
        this.setState({
            modPwdSteps:1
        });
    }
     
    render(){
        const { pwdInputValue } = this.state;
        const suffix = pwdInputValue ? <Icon className='anticon-close-circle' type="close-circle" onClick={this.emitEmpty} /> : null;
        return(
        <Modal title="修改密码"
           maskClosable={false} //点击遮罩层不允许关闭模态框 
           visible={this.state.modPwdVisible} //模态框是否可见
           onCancel={this.modPwdCancel} //关闭按钮handle
           footer={<Button onClick={this.modPwdNext}  type="primary">下一步</Button>}> 
          <Steps  current={this.state.modPwdSteps}>
            <Step title="验证密码" />
            <Step title="修改密码" />
            <Step title="完成" />
          </Steps>
          <br />
          <p style={{fontSize:16}}>需要验证当前密码才能继续:</p>
          <Input
                placeholder="请输入密码"
                type='password'
                prefix={<Icon type="unlock" />}
                suffix={suffix}
                value={pwdInputValue}
                onChange={this.onChangePwdValue}
                ref={node => this.pwdInput = node}
          />
        </Modal>
        );
    }
}


export default UserModPwdModal;
*/