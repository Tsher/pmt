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


const msg_error = function() {
    message.error('数据验证错误,请检查后提交')
}
const msg_success = function() {
    message.success('数据提交成功，等待后台处理')
}


class SaleVipInfo extends React.Component{
  //mixins: [Validation.FieldMixin],
  constructor(props) {
      super(props);
      this.state = {
          Member_Code: undefined, // 会员id
          title: '会员信息',
          Member_SName: undefined, // 昵称
          Member_Level: undefined, // 会员级别
          Member_Sex: undefined, // 会员性别
          Member_Phone: undefined, // 会员手机
          Member_Status: undefined, // 会员状态
          RegisterTime: undefined, //注册日期
          Member_Email: undefined, // 电子邮件
          SortNo: undefined, // 行政区域
          Member_Address: undefined, // 详细地址
      };
      this.handleResetPwd = this.handleResetPwd.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
      var opts = {
          Member_Code: this.props.params.id
      }
      _G.ajax({
          url: config.__URL + config.sale.vip.info,
          type: "get",
          data: opts,
          success: function(res) {
              this.setState(Object.assign(res.Data,{RegisterTime:_G.timeFormat2(res.Data.RegisterTime)}))
              RegisterTime
          }.bind(this)
      })
  }

  handleResetPwd(e) {
      // 重置密码***********************************
      e.preventDefault();
      var opts = {
          Member_Code: this.props.params.id
      }
      _G.ajax({
          url: config.__URL + config.sale.vip.resetPwd,
          type: "get",
          data: opts,
          success: function(res) {
              msg_success();
          }.bind(this)
      })
  }

  handleSubmit(e) {
      //***********************************等待ajax提交数据 ******** 区分 新增 或者 编辑
      e.preventDefault();
      goBack();
  }

  render() {
    return (
      <div className="m-form">
          <div className="m-form-title">{this.state.title}</div>
          <div className="m-form-con">
              <Form horizontal>
                  <Row>
                      <Col span="8">
                          <FormItem label="会员ID：" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                              <Input name="Member_Code" value={this.state.Member_Code} disabled />
                          </FormItem>
                          <FormItem label="昵称：" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                              <Input name="Member_SName" value={this.state.Member_SName} disabled />
                          </FormItem>
                          <FormItem label="会员级别：" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                              <Input name="Member_Level" value={this.state.Member_Level} disabled />
                          </FormItem>
                          <FormItem label="性别：" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                              <Input name="Member_Sex" value={this.state.Member_Sex} disabled />
                          </FormItem>
                          <FormItem label="手机：" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                              <Input name="Member_Phone" value={this.state.Member_Phone} disabled />
                          </FormItem>
                      </Col>
                      <Col span="8">
                          <FormItem label="会员状态：" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                              <Input name="Member_Status" value={this.state.Member_Status} disabled />
                          </FormItem>
                          <FormItem label="注册日期：" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                              <Input name="RegisterTime" value={this.state.RegisterTime} disabled />
                          </FormItem>
                          <FormItem label="电子邮箱：" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                              <Input name="Member_Email" value={this.state.Member_Email} disabled />
                          </FormItem>
                          <FormItem label="行政区域：" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                              <Input name="SortNo" value={this.state.SortNo} disabled />
                          </FormItem>
                          <FormItem label="地址：" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                              <Input name="Member_Address" value={this.state.Member_Address} disabled />
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


