import React from 'react';
import {Link} from 'react-router-dom';
import reqwest from 'reqwest';

import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd';
const FormItem = Form.Item;


class LoginForm extends React.Component {
    // constructor(props) { super(props); }

    state = {
        loading: false,
        validateMode: 0 //用户连续3次输错密码，进入校验码模式
    };

    //props参数校验
    static propTypes = {
        //Topics: React.PropTypes.object.isRequired,
        //PubSub: React.PropTypes.object.isRequired,
        actionURL: React.PropTypes.string.isRequired,
        loginSuccessURL: React.PropTypes.string.isRequired,
        validateCodeImgURL: React.PropTypes.string.isRequired,
        checkValidateCodeURL: React.PropTypes.string.isRequired
    };

    componentDidMount() {
        //document.getElementById('validateCode');
    }

    loginRequest = (paras) => {
        var that = this;
        reqwest({
            url: this.props.actionURL,
            type: 'json',
            method: 'post',
            contentType: "application/x-www-form-urlencoded", //必须用这个格式，否则spring mvc接收不到post参数
            crossDomain: true,                  //跨域
            withCredentials: true,              //跨域时带Cookie
            data: {
                user: paras.userName,
                passwd: paras.password
            },
            error: function (err) {
                console.dir(err);
                that.leaveLoading();
                alert("连接服务器失败");
            },
            success: function (resp) {
                that.leaveLoading();
                console.dir(resp);
                if(resp.errorCode === 0) {
                    window.location.href = that.props.loginSuccessURL;
                }
                else {
                    alert(resp.message);
                    if(resp.errorCode === 102 || resp.errorCode === 103) {
                        if(resp.entity > 3) {
                            if(that.state.validateMode === 0) {
                                that.setState({validateMode:1});
                            }
                        }
                    }
                }
            }
        });
    }

    handleSubmit = (e) => {
        e.preventDefault(); //阻止form跳转
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.loginRequest(values);
            }
        });
    }

    refreshValidateCode = (e) => {
        var a = document.getElementById('validateCode');
        console.dir(a);
    }

    validateCodeFormItem = () => {
        if(this.state.validateMode === 0)
            return;
        const { getFieldDecorator } = this.props.form;
        return (<FormItem>
                          {getFieldDecorator('validateCode', {
                              rules: [{ message: '请输入验证码!' }],
                          })(
                              <Row gutter={8}>
                                  <Col span={12}>
                          {getFieldDecorator('captcha', {
                              rules: [{ required: true, message: '请输入验证码!' }],
                          })(
                              <Input prefix={<Icon type="question" style={{ fontSize: 13 }} />} placeholder="验证码" />
                          )}
                                  </Col>
                                  <Col span={12}>
                                      <img src={this.props.validateCodeImgURL} id="validateCode" alt="验证码" title="点击刷新验证码" style={{cursor: "pointer"}} onclick={this.refreshValidateCode} />
                                  </Col>
                              </Row>
                          )}
            </FormItem>);
    }

    enterLoading = () => {
        this.setState({ loading: true, validateMode: this.state.validateMode });
    }
    leaveLoading = () => {
        this.setState({ loading: false, validateMode: this.state.validateMode });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            
            <Form action={this.props.actionURL} onSubmit={this.handleSubmit} className="login-form">
                <span className='login-welcome'>欢迎回来</span>
                <span className='login-register'>还没有账户？ <Link to="/register">注册</Link></span>
                <FormItem>
              {getFieldDecorator('userName', {
                  rules: [{ required: true, message: '请输入用户名!' }],
              })(
                  <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
              )}
                </FormItem>
                <FormItem>
              {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入密码!' }],
              })(
                  <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
              )}
                </FormItem>
            {this.validateCodeFormItem()}
                <FormItem>
              {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
              })(
                  <Checkbox>记住用户名</Checkbox>
              )}<br/>
                    <Button type="primary" htmlType="submit" loading={this.state.loading} onClick={this.enterLoading} className="login-form-button">
                    登录
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

//导出组件
export default LoginForm;
