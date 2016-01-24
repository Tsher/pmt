// 登录页

import React from 'react';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import {Link} from 'react-router';
import { createHistory } from 'history';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Table from 'antd/lib/table';
import Popover from 'antd/lib/popover';

const FormItem = Form.Item;
import Tree from 'antd/lib/tree';
const TreeNode = Tree.TreeNode;

import Modal from 'antd/lib/modal';


const confirm = Modal.confirm;

const history = createHistory();

import '../entry/config';

const urlLogin = config.__URL + config.login;
const ValCode  = config.__URL + config.valCode;
const CheckCode = config.__URL + config.checkValCode;

class Login extends React.Component{ 
	constructor(){
		super();
    this.state = {
      Login_Name : '', // 用户名
      User_PW : '', // 密码
      ValidateCode : '', // 验证码
      ValidateCodePic : '', // 验证码图片
    };
	   _G.ajax({
      url : ValCode,
      type : 'get',
      success:function(res) {
        console.log(res)
        this.setState({
          ValidateCodePic : res.Data
        })
      }.bind(this)
    })
	}

  componentDidMount(){
    _G.ajax({
      url : ValCode,
      type : 'get',
      success:function(res) {
        console.log(res)
        this.setState({
          ValidateCodePic : res.Data
        })
      }
    })
  }

  componentWillUnmount(){
    
  }

  
  handleOk(e){
    
  }
  handleCancel(e){
   
  }
  
  render(){
  
	return(
			<div className="fixedLogin">
        <Row className="m-header">
          <Col span="6" className="logo">
            <div>O2O营销平台</div>
          </Col>
        </Row>
        <div className="m-content clearfix">
          <div className="login">
            <h2>登录</h2>
            <div className="login-form">
              <Form horizontal style={{width:'100%'}}>
                  <FormItem
                    id="Login_Name"
                    label="用户名："
                    labelCol={{span:6}}
                    wrapperCol={{span:12}}
                    required>
                    <Input name="Login_Name" id="Login_Name" />
                  </FormItem>
                  <FormItem
                    id="User_PW"
                    label="密码："
                    labelCol={{span:6}}
                    wrapperCol={{span:12}}
                    required>
                    <Input type="password" id="User_PW" />
                  </FormItem>
                  <FormItem
                    id="ValidateCode"
                    label="验证码："
                    labelCol={{span:6}}
                    wrapperCol={{span:12}}
                    required>
                    <Input name="ValidateCode" id="ValidateCode" />
                    <img src={this.state.ValidateCodePic} className="login-code"/>
                  </FormItem>
                  <Row>
                    <Col span="12" offset="6">
                      <Button htmlType="submit" style={{width:'100%'}} type="primary">确定</Button>
                    </Col>
                  </Row>
              </Form>
              
            </div>
            <div className="login-icon"></div>
          </div>
        </div>
        
      </div>
		)
	}
}
module.exports = {
	Login : Login
}