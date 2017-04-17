import React from 'react';
import {Button,Icon,Modal,Steps,Input } from 'antd';
import '../../styles/usermod.css';

const Step = Steps.Step;
class UserMod extends React.Component{

    state = {
        company:'深圳市沟通科技有限公司', //代理商公司名称
        phone:'1588877878',
        contact:'张三',
        avatar:require('../../static/avatar.jpg'), //用户头像
        level:'金牌代理',
        modPwdVisible:false,
        modMailVisible:false,
        modSecurityVisible:false,
        modPwdSteps:0,
    }
    //弹出修改密码模态框
    modPwdClick=(e)=>{
        console.log(e);
        this.setState({
            modPwdVisible:true,
        });
    }
    //弹出修改邮箱模态框
    modMailClick=(e)=>{
        console.log(e);        
        this.setState({
            modMailVisible:true,
        });
    }
    //弹出修改安全问题模态框
    securityQuestionClick=(e)=>{
        console.log(e);        
        this.setState({
            modSecurityVisible:true,
        });
    }
    //关闭修改密码模态框
    modPwdCancel=(e)=>{
        this.setState({
            modPwdVisible:false,
        });
    }
    //关闭修改邮箱模态框
    modMailCancel=(e)=>{
        this.setState({
            modMailVisible:false,
        });
    }
    //关闭修改安全问题模态框
    handleCancel=(e)=>{
        this.setState({
            modSecurityVisible:false,
        });
    }

    render(){
        return(
                <div>
                    <div className='usermod-title'>
                        <h2>账户信息</h2> 
                        <Button className='usermod-edit-button'><Icon type="edit" />编辑</Button>
                    </div>
                    <div className='usermod-avatar'>
                        <img src={this.state.avatar} alt='头像'/>
                    </div>
                    <div  className='usermod-info'>
                        <div><span className='usermod-info-title'>公司名称 : </span><span>{this.state.company}</span><br/></div>
                        <div><span className='usermod-info-title'>登录帐号/手机号 : </span><span>{this.state.phone}</span><br/></div>
                        <div><span className='usermod-info-title'>联系人 : </span><span>{this.state.contact}</span><br/></div>                                                
                    </div>
                    <div className='usermod-title'>
                        <h2>账户安全</h2>
                    </div>
                    <div>
                        <div className='usermod-safe-container'>
                            <Icon className='usermod-safe-icon' type="unlock" />
                            <div className='usermod-safe-title'>
                                <h3>帐号密码</h3>
                                <p>用于保护帐号信息和登录安全</p>
                            </div>
                            <Button onClick={this.modPwdClick}>修改</Button>
                        </div>
                        <div className='usermod-safe-container'>
                            <Icon className='usermod-safe-icon' type="mail" />
                            <div className='usermod-safe-title'>
                                <h3>邮箱安全</h3>
                                <p>安全邮箱可以用于登录，找回密码，修改其他密保信息，接收授权之用</p>
                            </div>
                            <Button onClick={this.modMailClick}>修改</Button>
                        </div>
                        <div className='usermod-safe-container'>
                            <Icon className='usermod-safe-icon' type="solution" />
                            <div className='usermod-safe-title'>
                                <h3>密保问题</h3>
                                <p>密保问题，可用于找回密码，验证身份之用</p>
                            </div>
                            <Button onClick={this.securityQuestionClick}>修改</Button>
                        </div>                                            
                    </div>
                    <Modal title="修改密码"  
                        visible={this.state.modPwdVisible}
                        onOk={this.handleOk} 
                        onCancel={this.modPwdCancel}
                        footer={<Button type="primary">下一步</Button>}>
                        <Steps  current={this.state.modPwdSteps}>
                            <Step title="验证密码" />
                            <Step title="修改密码" />
                            <Step title="完成" />
                        </Steps>
                        <br />
                        <p style={{fontSize:16}}>需要验证密码才能继续:</p>
                        <Input prefix={<Icon type="lock" style={{ fontSize: 14 }} />} type="password" placeholder="请输入密码" />
                    </Modal>
                    <Modal title="修改邮箱"   
                        visible={this.state.modMailVisible}
                        onOk={this.handleOk} 
                        onCancel={this.modMailCancel}
                        footer={<Button type="primary">下一步</Button>}>
                        <Steps current={this.state.modPwdSteps}>
                            <Step title="验证密码" />
                            <Step title="填写验证码" />
                            <Step title="填写新邮箱" />                            
                            <Step title="新邮箱验证" />
                        </Steps>
                    </Modal>
                    <Modal title="修改密保问题"  
                        visible={this.state.modSecurityVisible}
                        onOk={this.handleOk} 
                        onCancel={this.handleCancel}
                        footer={<Button type="primary">下一步</Button>}>
                        <Steps current={this.state.modPwdSteps}>
                            <Step title="验证密码" />
                            <Step title="修改密保问题" />
                            <Step title="修改成功" />
                        </Steps>
                        
                    </Modal>
                </div>
        );
    }
}

export default UserMod;