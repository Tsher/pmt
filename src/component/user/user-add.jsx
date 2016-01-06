//  用户管理   企业用户管理  新增

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Checkbox from 'antd/lib/checkbox';
import message from 'antd/lib/message';
import Validation from 'antd/lib/validation';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import DatePicker from 'antd/lib/date-picker';
import InputNumber from 'antd/lib/input-number';

import Select from 'antd/lib/select';
import Radio from 'antd/lib/radio';

import { createHistory } from 'history';

const FormItem = Form.Item;
const Validator = Validation.Validator;
const Option = Select.Option;
const RadioGroup = Radio.Group;

const FieldMixin = Validation.FieldMixin;

const History = createHistory();

const goBack = History.goBack;

function cx(classNames) {
  if (typeof classNames === 'object') {
    return Object.keys(classNames).filter(function(className) {
      return classNames[className];
    }).join(' ');
  } else {
    return Array.prototype.join.call(arguments, ' ');
  }
}


const msg_error = function(){
  message.error('数据验证错误,请检查后提交')
}
const msg_success = function(){
  message.success('数据提交成功，等待后台处理')
}


class UserUserAdd extends React.Component{

  //mixins: [Validation.FieldMixin],

  constructor(props) {
  	super(props);
  	this.state = {
      status : {
        
        loginName : {}, // 登录名
        
        userName : {}, // 姓名
        
        email : {}, // 电子邮件
        mobile : {}, // 手机
        
        state : {} // 状态
        
      },
      formData: {
        id : undefined,
        title : '新增用户',
        loginName : undefined, // 登录名
        birthDay : undefined, // 生日
        part : undefined, // 隶属部门
        joinDate : undefined, //加入日期
        userName : undefined, // 姓名
        jiguan : undefined, // 籍贯
        email : undefined, // 电子邮件
        mobile : undefined, // 手机
        minzu : undefined , // 民族
        marry : undefined, // 婚姻
        state : undefined, // 状态
        sfzNo : undefined , // 身份证号
        homeTel : undefined // 家庭电话
      }
    };
    this.setField = FieldMixin.setField.bind(this);
    this.handleValidate = FieldMixin.handleValidate.bind(this);
    this.onValidate = FieldMixin.onValidate.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentDidMount(){
    // 编辑
    if(this.props.params.id){
      // ajax获取当前id的内容，变更state ****************************
      var state = _extends(this.state,{formData:{ id:this.props.params.id , title : '编辑用户' }});
      this.setState(state);
    }else{
      // 新增 *************
    }
  }


  renderValidateStyle(item) {

    const formData = this.state.formData;
    const status = this.state.status;
    console.log(item)
    const classes = cx({
      'error': status[item].errors,
      'validating': status[item].isValidating,
      'success': formData[item] && !status[item].errors && !status[item].isValidating
    });

    return classes;
  }

  handleReset(e) {
    // 返回***********************************
    goBack();

    // this.refs.validation.reset();
    // this.setState({
    //   status: {
    //     select: {},
    //     string:{},
    //     textarea:{}
    //   },
    //   formData: {
    //     select: undefined,
    //     string: undefined,
    //     textarea:undefined
    //   }
    // });
    e.preventDefault();
  }

  handleSubmit(e) {
    //***********************************等待ajax提交数据 ******** 区分 新增 或者 编辑
    e.preventDefault();
    // this.setState({
    //   isEmailOver: true
    // });
    const validation = this.refs.validation;
    validation.validate((valid) => {
      if (!valid) {
        console.log('error in form');
        msg_error()
        return;
      } else {
        console.log('submit');
      }
      console.log(this.state.formData);
      msg_success();
    });
  }

  checkUserState(rule, value, callback) {
    if (!value){
      callback(new Error('请选择用户状态!'));
    } else {
      callback();
    }
  }

  // checkRoleName(rule, value, callback) {
  //   if (!value) {
  //     callback(new Error('请输入角色名称'));
  //   } else {
  //     callback();
  //   }
  // }

  render() {
    const formData = this.state.formData;
    const status = this.state.status;

    return (
      <div className="m-form">
        <div className="m-form-title">{this.state.formData.title}</div>
        <div className="m-form-con">
      <Form horizontal>
        <Validation ref="validation" onValidate={this.handleValidate}>
          <Row>
            <Col span="8">
                <FormItem
                  label="登录名："
                  id="loginName"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}}
                  validateStatus={this.renderValidateStyle('loginName')}
                  help={status.loginName.errors ? status.loginName.errors.join(',') : null}
                  required>
                    <Validator rules={[{required: true, message: '请输入登录名',type:"string"}]}>
                      <Input name="loginName" value={formData.loginName} />
                    </Validator>
                </FormItem>
                <FormItem
                  label="姓名："
                  id="userName"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}}
                  validateStatus={this.renderValidateStyle('userName')}
                  help={status.userName.errors ? status.userName.errors.join(',') : null}
                  required>
                    <Validator rules={[{required: true, message: '请输入姓名',type:"string"}]}>
                      <Input name="userName" value={formData.userName} />
                    </Validator>
                </FormItem>
                <FormItem
                  label="手机："
                  id="mobile"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}}
                  validateStatus={this.renderValidateStyle('mobile')}
                  help={status.mobile.errors ? status.mobile.errors.join(',') : null}
                  required>
                    <Validator rules={[{required: true, message: '请输入手机号',type:"number"}]}>
                      <Input name="mobile" value={formData.mobile} />
                    </Validator>
                </FormItem>
                <FormItem
                  label="状态："
                  id="state"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}}
                  validateStatus={this.renderValidateStyle('state')}
                  help={status.state.errors ? status.state.errors.join(',') : null}
                  required>
                    <Validator rules={[{required: true, message: '请选择状态'},{validator: this.checkUserState}]}>
                      <Select size="large" placeholder="请选择状态" style={{width: '100%'}} name="state" value={formData.state}>
                        <Option value="type-1">在职</Option>
                        <Option value="type-2">离职</Option>
                        <Option value="type-3">不限</Option>
                      </Select>
                    </Validator>
                </FormItem>
                <FormItem
                  label="电子邮件："
                  id="email"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}}
                  validateStatus={this.renderValidateStyle('email')}
                  help={status.email.errors ? status.email.errors.join(',') : null}
                  required>
                    <Validator rules={[{required: true, message: '请输入电子邮件',type:"email"}]}>
                      <Input name="email" value={formData.email} />
                    </Validator>
                </FormItem>
            </Col>
            <Col span="8">
                <FormItem
                  label="生日："
                  id="birthDay"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}} >
                    <DatePicker name="birthDay" value={formData.birthDay} />
                </FormItem>
                <FormItem
                  label="籍贯："
                  id="jiguan"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}} >
                    <Input name="jiguan" value={formData.jiguan} />
                </FormItem>
                <FormItem
                  label="民族："
                  id="minzu"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}} >
                    <Select size="large" placeholder="请选择民族" style={{width: '100%'}} name="minzu" value={formData.minzu}>
                        <Option value="type-1">汉</Option>
                        <Option value="type-2">回</Option>
                        <Option value="type-3">藏</Option>
                      </Select>
                </FormItem>
                <FormItem
                  label="身份证号："
                  id="sfzNo"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}} >
                    <Input name="sfzNo" value={formData.sfzNo} />
                </FormItem>
            </Col>
            <Col span="8">
                <FormItem
                  label="隶属部门："
                  id="part"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}} >
                    <Select size="large" placeholder="请选择部门" style={{width: '100%'}} name="part" value={formData.part}>
                        <Option value="type-1">部门1</Option>
                        <Option value="type-2">部门2</Option>
                        <Option value="type-3">部门3</Option>
                      </Select>
                </FormItem>
                <FormItem
                  label="加入日期："
                  id="joinDate"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}} >
                    <DatePicker name="joinDate" value={formData.joinDate} />
                </FormItem>
                <FormItem
                  label="婚姻状况："
                  id="marry"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}} >
                    <Select size="large" placeholder="婚姻状况" style={{width: '100%'}} name="marry" value={formData.marry}>
                        <Option value="type-1">已婚</Option>
                        <Option value="type-2">未婚</Option>
                      </Select>
                </FormItem>
                <FormItem
                  label="家庭电话："
                  id="homeTel"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}} >
                    <Input name="homeTel" value={formData.homeTel} />
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
    );
  }
};



module.exports = {
  UserUserAdd : UserUserAdd
}


