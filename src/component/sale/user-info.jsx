//  促销数据   促销人员信息

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

const provinceData = ['浙江', '江苏'];
const cityData = {
    '浙江': ['杭州', '宁波', '温州'],
    '江苏': ['南京', '苏州', '镇江']
};

class SaleUserInfo extends React.Component {

    //mixins: [Validation.FieldMixin],
    constructor(props) {
        super(props);
        this.state = {
            SalesPerson_Code: '', // 会员id
            title: '促销人员信息',
            SalesPerson_Name: '', // 姓名
            SalesPerson_SName: '', // 昵称
            Card_Code: '', // 身份证
            Sex: '', // 性别
            Phone: '', // 手机
            RegisterTime: '', // 注册日期
            Email: '', // Email
            Region_Code: '', // 行政区域
            SalesPerson_Address: '', // 详细信息
            cities: cityData[provinceData[0]], // 省
            secondCity: cityData[provinceData[0]][0], // 市
        };

        this.handleResetPwd = this.handleResetPwd.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleProvinceChange = this.handleProvinceChange.bind(this);
        this.onSecondCityChange = this.onSecondCityChange.bind(this);
    }

    componentDidMount() {
      var opts = {
          SalesPerson_Code: this.props.params.id
      }
      _G.ajax({
          url: config.__URL + config.sale.user.info,
          type: "get",
          data: opts,
          success: function(res) {
              console.log(res.Data)
              this.setState(Object.assign({}, res.Data))
          }.bind(this)

      })
    }

    handleProvinceChange(value) {
        console.log(value)
        this.setState({
            cities: cityData[value],
            secondCity: cityData[value][0]
        });
    }

    onSecondCityChange(value) {
        console.log(value)
        this.setState({
            secondCity: value
        });
    }

    handleResetPwd(e) {
        // 重置密码***********************************
      e.preventDefault();
      var opts = {
          SalesPerson_Code: this.props.params.id
      }

      _G.ajax({
          url: config.__URL + config.sale.user.resetPwd,
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

        const provinceOptions = provinceData.map(function(province) {
            return <Option key={province}>{province}</Option>;
        });
        const cityOptions = this.state.cities.map(function(city) {
            return <Option key={city}>{city}</Option>;
        });

        return (
            <div className="m-form">
              <div className="m-form-title">{this.state.title}</div>
              <div className="m-form-con">
                  <Form horizontal>
                      <Row>
                          <Col span="8">
                              <FormItem label="会员名称：" id="SalesPerson_Name" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                                  <Input name="SalesPerson_Name" value={this.state.SalesPerson_Name} disabled />
                              </FormItem>
                              <FormItem label="昵称：" id="SalesPerson_SName" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                                  <Input name="SalesPerson_SName" value={this.state.SalesPerson_SName} disabled />
                              </FormItem>
                              <FormItem label="身份证号：" id="Card_Code" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                                  <Input name="Card_Code" value={this.state.Card_Code} disabled />
                              </FormItem>
                              <FormItem label="性别：" id="Sex" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                                  <RadioGroup name="Sex" value={this.state.Sex} disabled>
                                      <Radio value="male">男</Radio>
                                      <Radio value="female">女</Radio>
                                      <Radio value="none">神秘</Radio>
                                  </RadioGroup>
                              </FormItem>
                              <FormItem label="手机：" id="Phone" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                                  <Input name="Phone" value={this.state.Phone} disabled />
                              </FormItem>
                          </Col>
                          <Col span="12">
                              <FormItem label="注册日期：" id="RegisterTime" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                                  <Input name="RegisterTime" value={this.state.RegisterTime} disabled />
                              </FormItem>
                              <FormItem label="电子邮箱：" id="Email" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                                  <Input name="Email" value={this.state.Email} disabled />
                              </FormItem>
                              <FormItem label="行政区域：" id="Region_Code" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                                  <Select defaultValue={provinceData[0]} style={{width:100}} onChange={this.handleProvinceChange}>
                                      {provinceOptions}
                                  </Select>
                                  <Select value={this.state.secondCity} style={{width:100}} onChange={this.onSecondCityChange}>
                                      {cityOptions}
                                  </Select>
                              </FormItem>
                              <FormItem label="地址：" id="SalesPerson_Address" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                                  <Input name="SalesPerson_Address" value={this.state.SalesPerson_Address} disabled />
                              </FormItem>
                          </Col>
                      </Row>
                  </Form>
              </div>
              <div className="m-form-btns">
                  <Row>
                      <Col span="8" offset="2">
                          <Button type="primary" onClick={this.handleResetPwd}>重置密码</Button>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <Button type="primary" onClick={this.handleSubmit}>确定</Button>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <Button type="primary" onClick={this.handleSubmit}>取消</Button>
                      </Col>
                  </Row>
              </div>
          </div>
        );
    }
};

module.exports = {
    SaleUserInfo: SaleUserInfo
}

