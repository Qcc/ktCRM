import React from 'react';
import {Button,Icon } from 'antd';
import UserModPwdModal from './user_mod_pwd_modal';
import UserModMailModal from './user_mod_mail_modal';
import UserModSecurityModal from './user_mod_security_modal';
import '../../styles/usermod.css';
const modal = {};
class UserMod extends React.Component{
    state = {
        company:'深圳市沟通科技有限公司', //代理商公司名称
        phone:'1588877878',
        contact:'张三',
        avatar:require('../../static/avatar.jpg'), //用户头像
        level:'金牌代理',
    }
    //将modal子组件回调存储Modal对象备用   
    handleRefPwd=(obj)=>{modal.UserModPwdModal=obj;}
    handleRefMail=(obj)=>{modal.UserModMailModal=obj;}
    handleRefSecurity=(obj)=>{modal.UserModSecurityModal=obj;}

    //弹出修改密码模态框
    modPwdClick=(e)=>{modal.UserModPwdModal.modPwdOpen();}
    //弹出修改邮箱模态框
    modMailClick=(e)=>{modal.UserModMailModal.modMailOpen();}
    //弹出修改安全问题模态框
    securityQuestionClick=(e)=>{modal.UserModSecurityModal.modSecurityOpen();}

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
                    <UserModPwdModal  ref={this.handleRefPwd}></UserModPwdModal>
                    <UserModMailModal  ref={this.handleRefMail}></UserModMailModal>
                    <UserModSecurityModal  ref={this.handleRefSecurity}></UserModSecurityModal>
                    </div>
        );
    }
}

export default UserMod;