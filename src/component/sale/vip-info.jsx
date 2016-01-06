//  促销数据   会员信息

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


class SaleVipInfo extends React.Component{

  //mixins: [Validation.FieldMixin],

  constructor(props) {
  	super(props);
  	this.state = {
      id : undefined, // 会员id
      title : '会员信息',
      vipName : undefined, // 昵称
      vipLevel : undefined, // 会员级别
      vipSex : undefined, // 会员性别
      vipMobile : undefined, // 会员手机
      vipState : undefined, // 会员状态
      vipJoinDate : undefined, //注册日期
      vipEmail : undefined, // 电子邮件
      vipArea : undefined, // 行政区域
      vipAddress : undefined , // 详细地址
    };

    this.handleResetPwd = this.handleResetPwd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    var id = this.props.params.id;
    // ajax 请求当前id的数据 ********************************
    this.setState({
      id : this.props.params.id
    })
  }


  

  handleResetPwd(e) {
    // 充值密码***********************************
   
    msg_success();
    e.preventDefault();
  }

  handleSubmit(e) {
    //***********************************等待ajax提交数据 ******** 区分 新增 或者 编辑
    e.preventDefault();
    goBack();
    
  }

  

  render() {
    const formData = this.state;

    return (
      <div className="m-form">
        <div className="m-form-title">{this.state.title}</div>
        <div className="m-form-con">
      <Form horizontal>
          <Row>
            <Col span="8">
                <FormItem
                  label="会员ID："
                  id="id"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}}>
                    <Input name="id" value={formData.id} disabled />
                </FormItem>
                <FormItem
                  label="昵称："
                  id="vipName"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}}
                  >
                    <Input name="vipName" value={formData.vipName} disabled />
                </FormItem>
                <FormItem
                  label="会员级别："
                  id="vipLevel"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}}
                  >
                    <Input name="vipLevel" value={formData.vipLevel} disabled />
                </FormItem>
                <FormItem
                  label="性别："
                  id="vipSex"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}}
                  >
                    <Input name="vipSex" value={formData.vipSex} disabled />
                </FormItem>
                <FormItem
                  label="手机："
                  id="vipMobile"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}}
                  >
                    <Input name="vipMobile" value={formData.vipMobile} disabled />
                </FormItem>
            </Col>
            <Col span="8">
                <FormItem
                  label="会员状态："
                  id="vipState"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}}>
                    <Input name="vipState" value={formData.vipState} disabled />
                </FormItem>
                
                <FormItem
                  label="注册日期："
                  id="vipJoinDate"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}}
                  >
                    <Input name="vipJoinDate" value={formData.vipJoinDate} disabled />
                </FormItem>
                <FormItem
                  label="电子邮箱："
                  id="vipEmail"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}}
                  >
                    <Input name="vipEmail" value={formData.vipEmail} disabled />
                </FormItem>
                <FormItem
                  label="行政区域："
                  id="vipArea"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}}
                  >
                    <Input name="vipArea" value={formData.vipArea} disabled />
                </FormItem>
                <FormItem
                  label="地址："
                  id="vipAddress"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}}
                  >
                    <Input name="vipAddress" value={formData.vipAddress} disabled />
                </FormItem>
            </Col>
            
          </Row>
          
        
      </Form>
      </div>
      <div className="m-form-btns">
      <Row>
        <Col span="4" offset="2">
        <Button type="primary" onClick={this.handleResetPwd}>重置密码</Button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button type="primary" onClick={this.handleSubmit}>确定</Button>
        </Col>
      </Row>
        
      </div>
      </div>
    );
  }
};



module.exports = {
  SaleVipInfo : SaleVipInfo
}


