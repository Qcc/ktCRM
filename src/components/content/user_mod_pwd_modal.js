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
            validCodeInputValue:'',//验证码
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
    }
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
    }
    //绑定state与input的value
    onChangeNewPwdValue = (e) => {
        this.setState({ newPwdInputValue: e.target.value });
    }
    //绑定state与input的value
    onChangeNewRepPwdValue = (e) => {
        this.setState({ newRepPwdInputValue: e.target.value });
    }
    //绑定验证码输入框
    onChangeValidCodeValue = (e)=>{
        this.setState({ validCodeInputValue: e.target.value });
    } 
    //修改密码回调处理函数
    update =(data)=>{
        this.setState({
            modPwdVisible:false,
            loading:false,
        });
        if(data.status !== 200 || data.errorCode !== 0){
            Modal.error({title: '错误！',content: '密码未修改,'+data.message});
            this.setState({
                    validateMode:this.state.validateMode+1,
                });
            return;
        }else{
            Modal.success({title: '完成！',content: '密码修改成功。'});            
        }
    }
    //确定修改密码
    makeModPwd=(e)=>{
        const {oldPwdInputValue,newPwdInputValue,newRepPwdInputValue,validCodeInputValue,validateMode} = this.state;
        if(!oldPwdInputValue){ //验证是否输入旧密码
            this.setState({
                formValid:{
                    oldpwdValidateStatus:'error',
                       oldpwHelp:'请输入密码',
                }});
            return;
        }else if(!newPwdInputValue){ //验证是否输入新密码
            this.setState({
                formValid:{
                       newPwdValidateStatus:'error',
                       newPwdHelp:'请输入新密码',
                }});
            return;
        }else if(!newRepPwdInputValue){ //验证是否输入确认新密码
            this.setState({
                formValid:{     
                       repPwdValidateStatus:'error',
                       repPwdHelp:'请确认密码',
                    }
            });
            return;
        }else if(this.state.newRepPwdInputValue !== this.state.newPwdInputValue){ //确定新密码两次输入是否一样
                this.setState({
                formValid:{
                       newPwdValidateStatus:'error',
                       newPwdHelp:'两次输入的密码不一致，请检查后重新输入。',
                       repPwdValidateStatus:'error',
                       repPwdHelp:'两次输入的密码不一致，请检查后重新输入。',
                }});
            return;
        }
        if(!(validateMode<3) && !validCodeInputValue){  // 如果有 验证是否输入验证码
            this.setState({
                formValid:{     
                       validateCodeValidateStatus:'error',
                       validateCodeHelp:'请输入验证码',
                    }
            });
            return;
        }
        //接口参数
        let params ={oldPassword:oldPwdInputValue,
                    newPassword:newRepPwdInputValue,
                    validateCode:validCodeInputValue}
        fetch(modifyPassword,this.update,'post',params);
        this.setState({
            loading:true,
            oldPwdInputValue: '', //旧密码
            newPwdInputValue: '', //新密码
            newRepPwdInputValue: '', //重复新密码
            validCodeInputValue:'',//验证码
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
        });
        this.refreshValidateCode();//刷新验证码
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
                        <Input 
                            value={this.state.validCodeInputValue}
                            onChange={this.onChangeValidCodeValue}
                            ref={node => this.validCodeInput = node}
                            prefix={<Icon type="question-circle-o" style={{ fontSize: 13 }} />} placeholder="验证码" />
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
        return(
        <Modal title="需要验证当前密码才能继续"
           maskClosable={false} //点击遮罩层不允许关闭模态框 
           visible={this.state.modPwdVisible} //模态框是否可见
           onCancel={this.modPwdCancel}
           footer={<div>
                     <Button size='large' onClick={this.modPwdCancel}>取消</Button>
                     <Button size='large'  type="dashed" onClick={this.emptyAll}>重置</Button>
                     <Button size='large'  type="primary" 
                        loading={this.state.loading} 
                        onClick={this.makeModPwd} >确定</Button></div>}
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
                    style={{marginTop:5,marginBottom:5}}
                    placeholder="请确认密码，6~14位"
                    type='password'
                    prefix={<Icon type="unlock" />}
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