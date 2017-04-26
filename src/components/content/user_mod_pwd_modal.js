import React from 'react';
import {Icon,Input,Modal,Button,Row,Col,Form } from 'antd';
import {modifyPassword,validateCodeImgURL,fetch} from '../../utils/connect';
import '../../styles/usermod.css';
const FormItem = Form.Item;

//修改密码模态框
class UserModPwdModal extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            modPwdVisible:false, //整个模态框是否可见
            loading:false,//提交按钮 加载中
            oldPwdInputValue: '', //旧密码
            newPwdInputValue: '', //新密码
            newRepPwdInputValue: '', //重复新密码
            validateMode: 0, //修改密码错误超过3次需要验证码
            //修改密码表单组件状态
            formValid:{oldpwdValidateStatus:'',
                       oldpwHelp:'',
                       newPwdValidateStatus:'',
                       newPwdHelp:'',
                       repPwdValidateStatus:'',
                       repPwdHelp:'',
                       validateCodeValidateStatus:'',
                       validateCodeHelp:'',
                    }
        };
    }

    //关闭修改密码模态框
    modPwdCancel=(e)=>{this.setState({modPwdVisible:false,loading:false})}
    //打开修改密码模态框，父组件调用
    modPwdOpen=(e)=>{
        this.setState({modPwdVisible:true});
        this.oldPwdInput.focus();
    }
   /* //删除当前输入input内容
    emitEmptyOldInput = () => {
        this.oldPwdInput.focus();
        this.setState({ oldPwdInputValue: '' });
    }
    emitEmptyNewInput = () => {
        this.newPwdInput.focus();
        this.setState({ newPwdInputValue: '' });
    }
    emitEmptyRepNewInput = () => {
        this.newRepPwdInput.focus();
        this.setState({ newRepPwdInputValue: '' });
    }*/
    //清空三个密码框
    emptyAll=()=>{
        this.oldPwdInput.focus();
        this.setState({ 
            oldPwdInputValue: '',
            newPwdInputValue: '',
            newRepPwdInputValue: '' 
                    });             
    }
    //绑定state与input的value
    onChangeOldPwdValue = (e) => {
        this.setState({ oldPwdInputValue: e.target.value });
        if(this.state.oldPwdInputValue){
            this.setState({
                formValid:{
                       oldpwdValidateStatus:'success',
                       oldpwHelp:'',
                    }
            });
        }
        console.log("旧密码-----",this.state.oldPwdInputValue);
    }
    //绑定state与input的value
    onChangeNewPwdValue = (e) => {
        this.setState({ newPwdInputValue: e.target.value });
        if(this.state.newPwdInputValue.length<6){
            this.setState({
                formValid:{
                       newPwdValidateStatus:'warning',
                       newPwdHelp:'密码密码不够安全，建议6~14位',
                    }
            });
        }
        if(this.state.newPwdInputValue.length>6){
            this.setState({
                formValid:{
                       newPwdValidateStatus:'success',
                       newPwdHelp:'',
                    }
            });
        }
        console.log("新密码-----",this.state.newPwdInputValue);
    }
    //绑定state与input的value
    onChangeNewRepPwdValue = (e) => {
        this.setState({ newRepPwdInputValue: e.target.value });
        if(this.state.newRepPwdInputValue !== this.state.newPwdInputValue){
            this.setState({
                formValid:{
                       repPwdValidateStatus:'error',
                       repPwdHelp:'两次输入的密码不一致，请检查后重新输入。',
                    }
            });
        };
        if(this.state.newRepPwdInputValue === this.state.newPwdInputValue){
            this.setState({
                formValid:{
                       repPwdValidateStatus:'success',
                       repPwdHelp:'',
                       newPwdValidateStatus:'success',
                       newPwdHelp:'',
                    }
            });
        }
        console.log("重复新密码-----",this.state.newRepPwdInputValue);
        console.log("this.state.newRepPwdInputValue=",this.state.newRepPwdInputValue,"this.state.newPwdInputValue = ",this.state.newPwdInputValue);
    } 
    //修改密码回调处理函数
    update =(data)=>{
        this.setState({
            modPwdVisible:false,
            loading:false,
        });
        if(data.status !== 200 || data.errorCode !== 0){
            Modal.error({title: '错误！',content: '密码未修改，请稍后再试！'});
            this.setState({
                    validateMode:this.state.validateMode+1,
                });
            console.log('this.state.validateMode ',this.state.validateMode);
            return;
        }else{
            Modal.success({title: '完成！',content: '密码修改成功。'});            
        }
    }
    //确定修改密码
    makeModPwd=(e)=>{
        const {oldPwdInputValue,newPwdInputValue,newRepPwdInputValue} = this.state;
        if(!oldPwdInputValue || !newPwdInputValue|| !newRepPwdInputValue){
            this.setState({
                formValid:{
                       oldpwdValidateStatus:'error',
                       oldpwHelp:'请输入密码',
                       newPwdValidateStatus:'error',
                       newPwdHelp:'请输入新密码',
                       repPwdValidateStatus:'error',
                       repPwdHelp:'请确认密码',
                       validateCodeValidateStatus:'error',
                       validateCodeHelp:'请输入验证码',
                    }
            });
            return;
        }
        this.setState({
            loading:true,
        });
        let params ={oldPassword:oldPwdInputValue,newPassword:newRepPwdInputValue}
        fetch(modifyPassword,this.update,'post',params);
    }
    //刷新验证码
    refreshValidateCode = (e) => {
        var img = document.getElementById('validate-code-img');
        if(img){
            img.src = validateCodeImgURL + "?nocache=" + new Date().getTime();
        }
    }
    //验证码Form.Item 输入密码错误三次 需要输入验证码
    visibaleValidateCode=()=>{
        if(this.state.validateMode<3)return;
        return(
            <FormItem
               label="验证码"
               hasFeedback
               validateStatus={this.state.formValid.validateCodeValidateStatus}
               help={this.state.formValid.validateCodeHelp}
               >
                <Row gutter={8}>
                    <Col span={12}>  
                        <Input prefix={<Icon type="question-circle-o" style={{ fontSize: 13 }} />} placeholder="验证码" />
                    </Col>
                    <Col span={12}>
                        <img src={validateCodeImgURL} id="validate-code-img" title="点击刷新验证码" alt="验证码" style={{cursor: "pointer"}} onClick={this.refreshValidateCode} />
                    </Col>
                </Row>
            </FormItem>
                );
    }
    render(){
        const { oldPwdInputValue,newPwdInputValue,newRepPwdInputValue} = this.state;
        //const suffixOldInput = oldPwdInputValue ? <Icon type="close-circle" onClick={this.emitEmptyOldInput} /> : null;
        //const suffixNewInput = newPwdInputValue ? <Icon type="close-circle" onClick={this.emitEmptyNewInput} /> : null;
        //const suffixNewRepInput = newRepPwdInputValue ? <Icon type="close-circle" onClick={this.emitEmptyRepNewInput} /> : null;
        return(
        <Modal title="需要验证当前密码才能继续"
           maskClosable={false} //点击遮罩层不允许关闭模态框 
           visible={this.state.modPwdVisible} //模态框是否可见
           onCancel={this.modPwdCancel}
           footer={<div>
                     <Button size='large' onClick={this.modPwdCancel}>取消</Button>
                     <Button size='large'  type="dashed" onClick={this.emptyAll}>重置</Button>
                     <Button size='large'  type="primary" loading={this.state.loading} onClick={this.makeModPwd}>确定</Button></div>}
           > 
           <Form>
                <FormItem
                    label="旧密码"
                    hasFeedback
                    validateStatus={this.state.formValid.oldpwdValidateStatus}
                    help={this.state.formValid.oldpwHelp}
                    >
                    <Input
                        style={{marginTop:5,marginBottom:5}}
                        placeholder="请输入密码"
                        type='password'
                        prefix={<Icon type="unlock" />}
                        //suffix={suffixOldInput}
                        value={oldPwdInputValue}
                        onChange={this.onChangeOldPwdValue}
                        ref={node => this.oldPwdInput = node}
                />
                </FormItem>
                <FormItem
                    label="新密码"
                    hasFeedback
                    validateStatus={this.state.formValid.newPwdValidateStatus}
                    help={this.state.formValid.newPwdHelp}
                    >
                    <Input
                        style={{marginTop:5,marginBottom:5}}
                        placeholder="请输入新密码,建议6~14位"
                        type='password'
                        prefix={<Icon type="unlock" />}
                        //suffix={suffixNewInput}
                        value={newPwdInputValue}
                        onChange={this.onChangeNewPwdValue}
                        ref={node => this.newPwdInput = node}
                />
                </FormItem>
                <FormItem
                    label="确认密码"
                    hasFeedback
                    validateStatus={this.state.formValid.repPwdValidateStatus}
                    help={this.state.formValid.repPwdHelp}
                    >
                <Input
                    //disabled={this.state.validateMode<4?true:false}
                    style={{marginTop:5,marginBottom:5}}
                    placeholder="请确认密码，6~14位"
                    type='password'
                    prefix={<Icon type="unlock" />}
                    //suffix={suffixNewRepInput}
                    value={newRepPwdInputValue}
                    onChange={this.onChangeNewRepPwdValue}
                    ref={node => this.newRepPwdInput = node}
                />
                </FormItem>
                    {this.visibaleValidateCode()} 
            </Form>
        </Modal>
        );
    }
}


export default UserModPwdModal;