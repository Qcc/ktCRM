import React from 'react';
import {Button,Icon } from 'antd';
import UserModPwdModal from './user_mod_pwd_modal';
import UserModMailModal from './user_mod_mail_modal';
import UserModSecurityModal from './user_mod_security_modal';
import {AccountInfo,fetch} from '../../utils/connect';
import '../../styles/usermod.css';

class UserMod extends React.Component{
    state = {
        company:'', //代理商公司名称
        phone:'',
        contact:'',
        level:'',
        avatar:require('../../static/avatar.jpg'), //用户头像
    }

    infoUpdate=(data)=>{
        this.setState({
            contact:data.entity && data.entity.name,
            level: data.entity && data.entity.level,
            company:data.entity && data.entity.company,
            phone:data.entity&& data.entity.phone,
        });
    }
    componentDidMount() {
        fetch(AccountInfo,this.infoUpdate);        
    }
    //弹出修改密码模态框,以下三行调用的是同ref回调传入父组件中的 子组件的引用
    modPwdClick=(e)=>{this.userModPwdModal.modPwdOpen();}
    //弹出修改邮箱模态框
    modMailClick=(e)=>{this.userModMailModal.modMailOpen();}
    //弹出修改安全问题模态框
    securityQuestionClick=(e)=>{this.userModSecurityModal.modSecurityOpen();}

    render(){
        return(
                <div>
                    <div className='usermod-title'>
                        <h2>账户信息</h2> 
                        <Button disabled className='usermod-edit-button'><Icon type="edit" />编辑</Button>
                    </div>
                    <div className='usermod-avatar'>
                        <img src={this.state.avatar} alt='头像'/>
                    </div>
                    <div  className='usermod-info'>
                        <div><span className='usermod-info-title'>伙伴等级 : </span><span>{this.state.level}</span><br/></div>
                        <div><span className='usermod-info-title'>公司名称 : </span><span>{this.state.company}</span><br/></div>
                        <div><span className='usermod-info-title'>手机 : </span><span>{this.state.phone}</span><br/></div>
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
                            <Button disabled onClick={this.modMailClick}>修改</Button>
                        </div>
                        <div className='usermod-safe-container'>
                            <Icon className='usermod-safe-icon' type="solution" />
                            <div className='usermod-safe-title'>
                                <h3>密保问题</h3>
                                <p>密保问题，可用于找回密码，验证身份之用</p>
                            </div>
                            <Button disabled onClick={this.securityQuestionClick}>修改</Button>
                        </div>                                            
                    </div>
                    <UserModPwdModal  ref={node=>this.userModPwdModal=node}></UserModPwdModal>
                    <UserModMailModal  ref={node=>this.userModMailModal=node}></UserModMailModal>
                    <UserModSecurityModal  ref={node=>this.userModSecurityModal=node}></UserModSecurityModal>
                    </div>
                    // ref 属性为回调，将子组件的引用传回到父组件的一个属性中，这样父组件通过该属性就可以操作子组件了。
                    
        );
    }
}

export default UserMod;