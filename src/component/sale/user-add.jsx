//  促销数据   促销人员信息  编辑

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
const areaData = {
    '浙江': ['杭州', '宁波', '温州'],
    '江苏': ['南京', '苏州', '镇江']
};

class SaleUserAdd extends React.Component {

    //mixins: [Validation.FieldMixin],
    constructor(props) {
        super(props);
        this.state = {
            status: {
                name: {},
                mobile: {},
                email: {},
                sfz: {}
            },
            formData: {
                title: '添加促销人员',
                SalesPerson_Name: '', // 姓名
                SalesPerson_SName: '', // 昵称
                Card_Code: '', // 身份证
                SalesPerson_Sex: '', // 性别
                Phone: '', // 手机
                RegisterTime: _G.timeFormat2(new Date().getTime()), // 注册日期
                Email: '', // Email
                Region_Code: '', // 行政区域
                SalesPerson_Address: '', // 详细信息
                Province: '', // 省
                City: '',
                Area: '',
            }

        };

        this.handleValidate = FieldMixin.handleValidate.bind(this);
        this.onValidate = FieldMixin.onValidate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleProvinceChange = this.handleProvinceChange.bind(this);
        this.onSecondCityChange = this.onSecondCityChange.bind(this);
        this.onSecondAreaChange = this.onSecondAreaChange.bind(this);
        this.renderValidateStyle = this.renderValidateStyle.bind(this);
    }

    componentDidMount() {
        // var opts = {
        //   SalesPerson_Code: this.props.params.id
        // }
        // _G.ajax({
        //     url: config.__URL + config.sale.user.info,
        //     type: "get",
        //     data: opts,
        //     success: function(res) {
        //       var state = Object.assign({}, this.state);
        //       state.formData.title = '编辑促销人员信息';

        //       var data = res.Data
        //       state.formData.SalesPerson_Code = data.SalesPerson_Code
        //       state.formData.SalesPerson_Name = data.SalesPerson_Name
        //       state.formData.SalesPerson_SName = data.SalesPerson_SName
        //       state.formData.SalesPerson_SalesPerson_Sex = data.SalesPerson_SalesPerson_Sex
        //       state.formData.Card_Code = data.Card_Code
        //       state.formData.RegisterTime = data.RegisterTime
        //       state.formData.Phone = data.Phone
        //       state.formData.Email = data.Email
        //       state.formData.Province = data.Province
        //       state.formData.City = data.City
        //       state.formData.Area = data.Area
        //       state.formData.SalesPerson_Address = data.SalesPerson_Address
        //       this.setState(state)
        //     }.bind(this)
        // })
    }

    handleProvinceChange(value) {
        value = value.split('/')[0];
        var state = Object.assign({}, this.state);
        state.formData.cities = cityData[value];
        state.formData.secondCity = cityData[value][0];
        this.setState(state);
    }

    onSecondCityChange(value) {
        value = value.split('/')[0];
        var state = Object.assign({}, this.state);
        state.formData.secondCity = value;
        this.setState(state);
    }

    onSecondAreaChange(value) {
        // value = value.split('/')[0];
        // var state = Object.assign({}, this.state);
        // state.formData.secondCity = value;
        // this.setState(state);
    }

    handleReset(e) {
        e.preventDefault();
        goBack();
    }

    handleSubmit(e) {
        //***********************************等待ajax提交数据 ******** 区分 新增 或者 编辑
        e.preventDefault();

        const validation = this.refs.validation;
        validation.validate((valid) => {
            // if (!valid) {
            //     console.log('error in form');
            //     msg_error()
            //     return;
            // } else {
            //     console.log('submit');
            // }
            _G.ajax({
                url: config.__URL + config.sale.user.edit,
                type: "post",
                data: this.state.formData,
                success: function(res) {
                  msg_success();
                }.bind(this)
            })
        });


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

    render() {
        const status = this.state.status;

        const provinceOptions = provinceData.map(function(province) {
            return <Option key={province}>{province}</Option>;
        });
        const cityOptions = cityData['浙江'].map(function(city) {
            return <Option key={city}>{city}</Option>;
        });
        const areaOptions = areaData['浙江'].map(function(city) {
            return <Option key={city}>{city}</Option>;
        });

        return (
          <div className="m-form">
              <div className="m-form-title">{this.state.formData.title}</div>
              <div className="m-form-con">
                  <Form horizontal>
                      <Validation ref="validation" onValidate={this.handleValidate}>
                          <Row>
                              <Col span="8">
                                  <FormItem label="名称：" id="SalesPerson_Name" labelCol={{span: 8}} wrapperCol={{span: 12}} validateStatus={this.renderValidateStyle( 'name')} help={status.name.errors ? status.name.errors.join( ',') : null} required>
                                      <Validator rules={[{required: true, message: '请输入名称'}]}>
                                          <Input name="SalesPerson_Name" value={this.state.formData.SalesPerson_Name} />
                                      </Validator>
                                  </FormItem>
                                  <FormItem label="昵称：" id="SalesPerson_SName" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                                      <Input name="SalesPerson_SName" value={this.state.formData.SalesPerson_SName} />
                                  </FormItem>
                                  <FormItem label="身份证号：" id="Card_Code" labelCol={{span: 8}} wrapperCol={{span: 12}} validateStatus={this.renderValidateStyle( 'sfz')} help={status.sfz.errors ? status.sfz.errors.join( ',') : null} required>
                                      <Validator rules={[{required: true, message: '请输入身份证',type: 'string',min:18,max:18}]}>
                                          <Input name="Card_Code" value={this.state.formData.Card_Code} />
                                      </Validator>
                                  </FormItem>
                                  <FormItem label="性别：" id="SalesPerson_Sex" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                                      <RadioGroup name="SalesPerson_Sex" value={this.state.SalesPerson_Sex}>
                                          <Radio value="male">男</Radio>
                                          <Radio value="female">女</Radio>
                                          <Radio value="none">神秘</Radio>
                                      </RadioGroup>
                                  </FormItem>
                                  <FormItem label="手机：" id="Phone" labelCol={{span: 8}} wrapperCol={{span: 12}} validateStatus={this.renderValidateStyle( 'mobile')} help={status.mobile.errors ? status.mobile.errors.join( ',') : null} required>
                                      <Validator rules={[{required: true, message: '请输入电话号码',type: 'string',pattern:/^1\d{10}/}]}>
                                          <Input name="Phone" value={this.state.formData.Phone} />
                                      </Validator>
                                  </FormItem>
                              </Col>
                              <Col span="12">
                                  <FormItem label="注册日期：" id="RegisterTime" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                                      <Input name="RegisterTime" value={this.state.formData.RegisterTime} disabled />
                                  </FormItem>
                                  <FormItem label="电子邮箱：" id="Email" labelCol={{span: 8}} wrapperCol={{span: 12}} validateStatus={this.renderValidateStyle( 'email')} help={status.email.errors ? status.email.errors.join( ',') : null} required>
                                      <Validator rules={[{required: true, message: '请输入电子邮箱',type: 'email'}]}>
                                          <Input name="Email" value={this.state.formData.Email} />
                                      </Validator>
                                  </FormItem>
                                  <FormItem label="行政区域："  labelCol={{span: 8}} wrapperCol={{span: 12}}>
                                      <Select defaultValue={this.state.formData.Province} style={{width:100}} onChange={this.handleProvinceChange}>
                                          {provinceOptions}
                                      </Select>
                                      <Select value={this.state.formData.City} style={{width:100}} onChange={this.onSecondCityChange}>
                                          {cityOptions}
                                      </Select>
                                      <Select value={this.state.formData.Area} style={{width:100}} onChange={this.onSecondAreaChange}>
                                          {areaOptions}
                                      </Select>
                                  </FormItem>
                                  <FormItem label="地址：" id="SalesPerson_Address" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                                      <Input name="SalesPerson_Address" value={this.state.formData.SalesPerson_Address} />
                                  </FormItem>
                              </Col>
                          </Row>
                      </Validation>
                  </Form>
              </div>
              <div className="m-form-btns">
                  <Row>
                      <Col span="8" offset="2">
                          &nbsp;&nbsp;&nbsp;&nbsp;
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
    SaleUserAdd: SaleUserAdd
}