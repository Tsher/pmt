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



class Login extends React.Component{
	constructor(){
		super();
	    this.state = {
	      userName : undefined,
        password : undefined,
        code : '../common/login-code.png',
	    };
	    
	}

  componentDidMount(){
    
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
                    id="userName"
                    label="用户名："
                    labelCol={{span:6}}
                    wrapperCol={{span:12}}
                    required>
                    <Input name="userName" id="userName" />
                  </FormItem>
                  <FormItem
                    id="password"
                    label="密码："
                    labelCol={{span:6}}
                    wrapperCol={{span:12}}
                    required>
                    <Input type="password" id="password" />
                  </FormItem>
                  <FormItem
                    id="code"
                    label="验证码："
                    labelCol={{span:6}}
                    wrapperCol={{span:12}}
                    required>
                    <Input name="code" id="code" />
                    <img src={this.state.code} className="login-code"/>
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