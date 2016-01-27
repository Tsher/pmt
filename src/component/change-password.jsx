// 修改密码

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
import Validation from 'antd/lib/validation';
import message from 'antd/lib/message';
const Validator = Validation.Validator;
const FormItem = Form.Item;
import Tree from 'antd/lib/tree';
const TreeNode = Tree.TreeNode;

import Modal from 'antd/lib/modal';
const FieldMixin = Validation.FieldMixin;

const confirm = Modal.confirm;

const History = createHistory();

const goBack = History.goBack;

const msg_error = function(text){
  message.error(text||'数据错误,请检查后重新提交')
}
const msg_success = function(text){
  message.success(text||'数据提交成功，等待后台处理')
}

const noop = function(){
  return false
}

function cx(classNames) {
  if (typeof classNames === 'object') {
    return Object.keys(classNames).filter(function(className) {
      return classNames[className];
    }).join(' ');
  } else {
    return Array.prototype.join.call(arguments, ' ');
  }
}

import '../entry/config';

const updatePWD = config.__URL + config.updatePWD;


class ChangePassword extends React.Component{
	constructor(){
		super();
	    this.state = {
        status:{
          originalPwd:{},
          newPwd:{},
          PwdAgain:{}
        },
        formData:{
  	      originalPwd : undefined,
          newPwd : undefined,
          PwdAgain : undefined,
        }
	    };
      this.checkPass = this.checkPass.bind(this);
      this.checkPass2 = this.checkPass2.bind(this);
	    this.onChange = this.onChange.bind(this);
      this.handleValidate = FieldMixin.handleValidate.bind(this);
      this.onValidate = FieldMixin.onValidate.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleReset = this.handleReset.bind(this);
	}
  renderValidateStyle(item) {

    const formData = this.state.formData;
    const status = this.state.status;
    const classes = cx({
      'error': status[item].errors,
      'validating': status[item].isValidating,
      'success': formData[item] && !status[item].errors && !status[item].isValidating
    });

    return classes;
  }

  componentDidMount(){
    
  }

  componentWillUnmount(){
    
  }

  onChange(e){
    let formData = Object.assign({},this.state.formData);
    formData[e.target.name]=e.target.value;
    console.log(e.target.name,e.target.value)
    this.setState({
      formData:formData
    })
  }

  checkPass(rule, value, callback) {
    if (this.state.formData.originalPwd) {
      this.refs.validation.forceValidate(['PwdAgain']);
    }

    callback();
  }

  checkPass2(rule, value, callback) {
    console.log(rule,value,this.state.formData.newPwd,callback)
    if (value && value !== this.state.formData.newPwd) {
      callback('两次输入密码不一致！');
    } else {
      callback();
    }
  }

  
  handleSubmit(e){
    e.preventDefault();
    var data = Object.assign({},this.state.formData);
    data.Token = _G.Token;
    // 修改密码
    _G.ajax({
      url : updatePWD,
      data : data,
      type : 'get',
      success : function(res){
        msg_success('密码修改成功,请重新登录');
        _G.Token = '';
        Cookie.dispose('Token');
        var url = location.href;
        url = url.split('#');
        location.href = url[0]+'#/login';
      }.bind(this),
      errors:function(){
        msg_error('密码修改失败,请重试');
      }
    })

  }
  handleReset(){
   goBack();
  }
  
  render(){
  let formData = this.state.formData;
  let status = this.state.status;
	return(
			<div className="m-form">
        <div className="m-form-title">修改密码</div>
        <div className="m-form-con">
      <Form horizontal onSubmit={this.handleSubmit}>
        <Validation ref="validation" onValidate={this.handleValidate}>
          <Row>
            <Col span="8">
                <FormItem
                  label="旧密码："
                  id="originalPwd"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}}
                  validateStatus={this.renderValidateStyle('originalPwd')}
                  help={status.originalPwd.errors ? status.originalPwd.errors.join(',') : null}
                  required>
                    <Validator rules={[{required: true, message: '请输入旧密码',type:"string"}]}>
                      <Input type="password" name="originalPwd" value={formData.originalPwd} onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop} autoComplete="off" onChange={this.onChange} />
                    </Validator>
                </FormItem>
                <FormItem
                  label="新密码："
                  id="newPwd"
                  hasFeedback
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}}
                  validateStatus={this.renderValidateStyle('newPwd')}
                  help={status.newPwd.errors ? status.newPwd.errors.join(',') : null}
                  required>
                    <Validator rules={[{required: true, whitespace: true,message: '请输入新密码',type:"string"}, {validator: this.checkPass}]}>
                      <Input type="password" name="newPwd" value={formData.newPwd} onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop} autoComplete="off" onChange={this.onChange} />
                    </Validator>
                </FormItem>
                <FormItem
                  label="确认新密码："
                  id="PwdAgain"
                  hasFeedback
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}}
                  validateStatus={this.renderValidateStyle('PwdAgain')}
                  help={status.PwdAgain.errors ? status.PwdAgain.errors.join(',') : null}
                  required>
                    <Validator rules={[{required: true, whitespace: true,message: '请再次输入密码',type:"string"}, {validator: this.checkPass2}]}>
                      <Input type="password" name="PwdAgain" value={formData.PwdAgain} onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop} autoComplete="off" onChange={this.onChange} />
                    </Validator>
                </FormItem>
                
            </Col>
            
          </Row>
          
        </Validation>
      </Form>
      </div>
      <div className="m-form-btns">
      <Row>
        <Col span="4" offset="2">
        <Button type="primary" onClick={this.handleSubmit}>确定</Button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button type="primary" onClick={this.handleReset}>取消</Button>
        </Col>
      </Row>
        
      </div>
      </div>
		)
	}
}
module.exports = {
	ChangePassword : ChangePassword
}