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
import message from 'antd/lib/message';
const FormItem = Form.Item;
import Tree from 'antd/lib/tree';
const TreeNode = Tree.TreeNode;

import Modal from 'antd/lib/modal';


const confirm = Modal.confirm;

const history = createHistory();


const msg_error = function(text){
  message.error(text||'数据错误,请检查后重新提交')
}
const msg_success = function(text){
  message.success(text||'数据提交成功，等待后台处理')
}




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
	  this.handleSubmit = this.handleSubmit.bind(this);
    this.setValue = this.setValue.bind(this);


    


	}

  componentDidMount(){
    var Token = Cookie.read('Token');
    if(Token){
      location.href = 'http://'+ location.hostname + ':'+ location.port;
      return;
    }
    _G.ajax({
      url : ValCode,
      type : 'get',
      success:function(res) {
        this.setState({
          ValidateCodePic : 'data:'+ res.Data
        })
      }.bind(this)
    })
  }

  componentWillUnmount(){
    
  }

  handleSubmit(e){
    e.preventDefault();
    
    var data = {};
    data.Login_Name = this.state.Login_Name;
    data.User_PW = this.state.User_PW;
    data.ValidateCode = this.state.ValidateCode;
    if(!data.ValidateCode.length){
      msg_error('请填写验证码');
      return;
    }
    // 登录
    _G.ajax({
      url : urlLogin,
      data : data,
      type : 'get',
      success : function(res){
        _G.Token = res.Data.Token; 
        console.log(res)
        Cookie.write({
          name : 'Token',
          value : _G.Token || '' 
        })
        var url = location.href;
        url = url.split('#');
        location.href = url[0]+'#';
      }.bind(this)
    })
    
  }

  // 文本框的值 同步到 state
  setValue(e){

    var name = e.target.id || e.target.name;
    var value = e.target.value;

    var data = Object.assign( {}, this.state );

    data[name] = value;


    this.setState(data);
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
            <div>PMT平台</div>
          </Col>
        </Row>
        <div className="m-content clearfix">
          <div className="login">
            <h2>登录</h2>
            <div className="login-form">
              <Form horizontal style={{width:'100%'}} onSubmit={this.handleSubmit}>
                  <FormItem
                    id="Login_Name"
                    label="用户名："
                    labelCol={{span:6}}
                    wrapperCol={{span:12}}
                    required>
                    <Input name="Login_Name" id="Login_Name" value={this.state.Login_Name} onChange={this.setValue} />
                  </FormItem>
                  <FormItem
                    id="User_PW"
                    label="密码："
                    labelCol={{span:6}}
                    wrapperCol={{span:12}}
                    required>
                    <Input type="password" id="User_PW" value={this.state.User_PW} onChange={this.setValue} />
                  </FormItem>
                  <FormItem
                    id="ValidateCode"
                    label="验证码："
                    labelCol={{span:6}}
                    wrapperCol={{span:12}}
                    required>
                    <Input name="ValidateCode" id="ValidateCode" value={this.state.ValidateCode} onChange={this.setValue} />
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