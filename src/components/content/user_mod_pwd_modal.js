import React from 'react';
import {Icon,Steps,Input,Modal,Button } from 'antd';
import {modifyPassword,fetch} from '../../utils/connect';
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

    //props参数校验
    static propTypes = {
        disabled: React.PropTypes.bool.isRequired,
    };

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
    //清空两个密码框，父组件 重新输入 按钮调用
    emptyAll(){
        this.pwdInput.focus();
        this.setState({ pwdInputValue: '' });
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
                    disabled={this.props.disabled}
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
                    disabled={this.props.disabled}
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
// 修改完成
// class StepThird extends React.Component{
//     render(){
//         return(
//         <p>步骤三</p>
//         )
//     }
// }

//清空密码框对象引用
const pwdInput={}
//步骤条三种状态
const steps = [{
                content: <StepFrist />, //第一步，确认密码
            }, 
            {
                content: <StepSecond disabled={false} ref={node => pwdInput.restPwd = node}/>, //修改新密码,restPwdinput为回调子组件引用
            }, 
            {
                content: <StepSecond disabled={true}/>, // 禁用input 完成
            }];
//修改密码模态框
class UserModPwdModal extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            current: 0, //修改密码步骤条位置
            modPwdVisible:false, //整个模态框是否可见
            loading:false,//提交按钮 加载中
        };
    }

    //关闭修改密码模态框
    modPwdCancel=(e)=>{this.setState({modPwdVisible:false})}
    //打开修改密码模态框，父组件调用
    modPwdOpen=(e)=>{this.setState({modPwdVisible:true})}
    
     //修改密码下一步handle，需校验密码
    next(e) {
        this.setState({ current:1 });
        //需要校验密码继续
        console.log('下一步-当前是：'+this.state.current);
    }
    //第二步 重新输入 按钮回调
    rest(e) {pwdInput.restPwd.emptyAll();}

    //确认修改密码，需要确认密码是否一致，密码是否符合要求
    modify(e){
        console.log('确认-当前是：'+this.state.current);
        this.setState({
            loading:true,
            current:2,
        });
        setTimeout(()=>{
            this.setState({
            loading:true,
            modPwdVisible:false,
            current:0
                }); 
            Modal.success({title: '完成！',content: '密码修改成功。'});
            },3000);
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
              {this.state.current === 0 && <Button type="primary" onClick={() => this.next()}>下一步</Button>}
              {this.state.current === 1 && <span>
                <Button type="primary" onClick={()=>this.modify()} >确认修改</Button>
                <Button style={{ marginLeft: 8 }}  onClick={() => this.rest()}> 重新输入 </Button></span>}
              {this.state.current === 2 && <Button type="primary" loading={this.state.loading} >完成</Button>}
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