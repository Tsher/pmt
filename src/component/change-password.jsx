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
const Validator = Validation.Validator;
const FormItem = Form.Item;
import Tree from 'antd/lib/tree';
const TreeNode = Tree.TreeNode;

import Modal from 'antd/lib/modal';
const FieldMixin = Validation.FieldMixin;

const confirm = Modal.confirm;

const History = createHistory();

const goBack = History.goBack;

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


class ChangePassword extends React.Component{
	constructor(){
		super();
	    this.state = {
        status:{
          old_password:{},
          new_password:{},
          re_password:{}
        },
        formData:{
  	      old_password : undefined,
          new_password : undefined,
          re_password : undefined,
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
    if (this.state.formData.old_password) {
      this.refs.validation.forceValidate(['re_password']);
    }

    callback();
  }

  checkPass2(rule, value, callback) {
    console.log(rule,value,this.state.formData.new_password,callback)
    if (value && value !== this.state.formData.new_password) {
      callback('两次输入密码不一致！');
    } else {
      callback();
    }
  }

  
  handleSubmit(){
    
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
      <Form horizontal>
        <Validation ref="validation" onValidate={this.handleValidate}>
          <Row>
            <Col span="8">
                <FormItem
                  label="旧密码："
                  id="old_password"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}}
                  validateStatus={this.renderValidateStyle('old_password')}
                  help={status.old_password.errors ? status.old_password.errors.join(',') : null}
                  required>
                    <Validator rules={[{required: true, message: '请输入旧密码',type:"string"}]}>
                      <Input type="password" name="old_password" value={formData.old_password} onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop} autoComplete="off" onChange={this.onChange} />
                    </Validator>
                </FormItem>
                <FormItem
                  label="新密码："
                  id="new_password"
                  hasFeedback
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}}
                  validateStatus={this.renderValidateStyle('new_password')}
                  help={status.new_password.errors ? status.new_password.errors.join(',') : null}
                  required>
                    <Validator rules={[{required: true, whitespace: true,message: '请输入新密码',type:"string"}, {validator: this.checkPass}]}>
                      <Input type="password" name="new_password" value={formData.new_password} onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop} autoComplete="off" onChange={this.onChange} />
                    </Validator>
                </FormItem>
                <FormItem
                  label="确认新密码："
                  id="re_password"
                  hasFeedback
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}}
                  validateStatus={this.renderValidateStyle('re_password')}
                  help={status.re_password.errors ? status.re_password.errors.join(',') : null}
                  required>
                    <Validator rules={[{required: true, whitespace: true,message: '请再次输入密码',type:"string"}, {validator: this.checkPass2}]}>
                      <Input type="password" name="re_password" value={formData.re_password} onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop} autoComplete="off" onChange={this.onChange} />
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