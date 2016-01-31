//  促销数据   促销人员信息  编辑

var _extends = _G.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

var provinceData = []
var cityData = {}
var areaData = {}

class SaleUserEdit extends React.Component {

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
                 SalesPerson_Address: '', // 详细信息
                 Province: '',
                 Province_Name: "",
                 City: '',
                 City_Name: "",
                 Area: '',
                 Area_Name: "",
             }
         };

         this.handleValidate = FieldMixin.handleValidate.bind(this);
         this.onValidate = FieldMixin.onValidate.bind(this);
         this.handleSubmit = this.handleSubmit.bind(this);
         this.handleProvinceChange = this.handleProvinceChange.bind(this);
         this.handleCityChange = this.handleCityChange.bind(this);
         this.handleAreaChange = this.handleAreaChange.bind(this);
         this.renderValidateStyle = this.renderValidateStyle.bind(this);
         this.getProvince = this.getProvince.bind(this);
         this.getCity = this.getCity.bind(this);
         this.getArea = this.getArea.bind(this);
         this.onChange = this.onChange.bind(this);
         this.setValue = this.setValue.bind(this);
     }

     onChange(e) {
         var state = _G.assign({}, this.state);
         state.formData.SalesPerson_Sex = e.target.value;
         this.setState(state)
     }

     setValue(e) {
         var name = e.target.name;
         var value = e.target.value;
         var data = _G.assign({}, this.state.formData);
         data[name] = value;
         this.setState({
             formData: data
         });
     }
     getProvince() {
         _G.ajax({
             url: config.__URL + config.sale.user.province,
             type: "get",
             success: function(res) {
                 provinceData = res.Data
                 var code = this.state.formData.Province ? this.state.formData.Province : provinceData[0].Region_Code
                 var name
                 res.Data.map(function(elem) {
                     if (elem.Region_Code == code) {
                         name = elem.Region_Name
                     }
                 })

                 this.setState({
                     formData: _G.assign(this.state.formData, {
                         Province: code,
                         Province_Name: name
                     })
                 })
                 this.getCity()
             }.bind(this)
         })
     }
     getCity() {
         var a = this.state.formData.Province;
         _G.ajax({
             url: config.__URL + config.sale.user.city,
             type: "get",
             data: {
                 Region_Code: a
             },
             success: function(res) {
                 cityData[a] = res.Data
                 var code = this.state.formData.City ? this.state.formData.City : cityData[a][0].Region_Code
                 var name
                 res.Data.map(function(elem) {
                     if (elem.Region_Code == code) {
                         name = elem.Region_Name
                     }
                 })

                 this.setState({
                     formData: _G.assign(this.state.formData, {
                         City: code,
                         City_Name: name
                     })
                 })
                 this.getArea()
             }.bind(this)
         })
     }
     getArea() {
         var a = this.state.formData.City;
         _G.ajax({
             url: config.__URL + config.sale.user.area,
             type: "get",
             data: {
                 Region_Code: a
             },
             success: function(res) {
                 areaData[a] = res.Data
                 var code = this.state.formData.Area ? this.state.formData.Area : areaData[a][0].Region_Code
                 var name
                 res.Data.map(function(elem) {
                     if (elem.Region_Code == code) {
                         name = elem.Region_Name
                     }
                 })
                 this.setState({
                     formData: _G.assign(this.state.formData, {
                         Area: code,
                         Area_Name: name
                     })
                 })
             }.bind(this)
         })
     }

     componentWillMount() {
         this.getProvince()
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
              var state = _G.assign({}, this.state);
              state.formData.title = '编辑促销人员信息';
              // for(var key in res.Data ){
              //   state.formData[key] = res.Data[key]?res.Data[key]:""
              // }
              var data = res.Data
              state.formData.SalesPerson_Code = data.SalesPerson_Code
              state.formData.SalesPerson_Name = data.SalesPerson_Name
              state.formData.SalesPerson_SName = data.SalesPerson_SName
              state.formData.SalesPerson_Sex = data.SalesPerson_Sex
              state.formData.Card_Code = data.Card_Code
              state.formData.RegisterTime = _G.timeFormat2(data.RegisterTime)
              state.formData.Phone = data.Phone
              state.formData.Email = data.Email
              state.formData.Province = data.Province
              state.formData.City = data.City
              state.formData.Area = data.Area
              state.formData.SalesPerson_Address = data.SalesPerson_Address
              this.setState(state)
            }.bind(this)
        })
     }

     handleProvinceChange(value, name) {
         this.setState({
             formData: _G.assign(this.state.formData, {
                 Province: value,
                 Province_Name: name,
                 City: null,
                 Area: null
             })
         })
         this.getCity()
     }

     handleCityChange(value, name) {
         this.setState({
             formData: _G.assign(this.state.formData, {
                 City: value,
                 Area: null,
             })
         })
         this.getArea()
     }

     handleAreaChange(value, name) {
         this.setState({
             formData: _G.assign(this.state.formData, {
                 Area: value,
                 Area_Name: name
             })
         })
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
             if (!valid) {
                 console.log('error in form');
                 msg_error()
                 return;
             } else {
                 console.log('submit');
             }
             _G.ajax({
                 url: config.__URL + config.sale.user.edit + '?SalesPerson_Code=' + this.state.formData.SalesPerson_Code,
                 type: "post",
                 data: this.state.formData,
                 success: function(res) {
                     msg_success();
                     setTimeout(goBack,2000)
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

        var provinceOptions = provinceData? provinceData.map(function(elem) {
            return <Option value={elem.Region_Code} title={elem.Region_Name}>{elem.Region_Name}</Option>;
        }) : []

        var cityOptions = cityData[this.state.formData.Province] ? cityData[this.state.formData.Province].map(function(elem) {
            return <Option value={elem.Region_Code} title={elem.Region_Name}>{elem.Region_Name}</Option>;
        }) : []

        var areaOptions = areaData[this.state.formData.City] ? areaData[this.state.formData.City].map(function(elem) {
            return <Option value={elem.Region_Code} title={elem.Region_Name}>{elem.Region_Name}</Option>;
        }) : []

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
                                      <Input name="SalesPerson_SName" value={this.state.formData.SalesPerson_SName} onChange={this.setValue} />
                                  </FormItem>
                                  <FormItem label="身份证号：" id="Card_Code" labelCol={{span: 8}} wrapperCol={{span: 12}} validateStatus={this.renderValidateStyle( 'sfz')} help={status.sfz.errors ? status.sfz.errors.join( ',') : null} required>
                                      <Validator rules={[{required: true, message: '请输入身份证',type: 'string',min:18,max:18}]}>
                                          <Input name="Card_Code" value={this.state.formData.Card_Code} />
                                      </Validator>
                                  </FormItem>
                                  <FormItem label="性别：" id="SalesPerson_Sex" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                                      <RadioGroup name="SalesPerson_Sex" value={this.state.formData.SalesPerson_Sex} onChange={this.onChange} >
                                          <Radio value="男">男</Radio>
                                          <Radio value="女">女</Radio>
                                          <Radio value="神秘">神秘</Radio>
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
                                      <Select value={this.state.formData.Province_Name} style={{width:"33%"}} onChange={this.handleProvinceChange}>
                                          {provinceOptions}
                                      </Select>
                                      <Select value={this.state.formData.City_Name} style={{width:"33%"}} onChange={this.handleCityChange}>
                                          {cityOptions}
                                      </Select>
                                      <Select value={this.state.formData.Area_Name} style={{width:"33%"}} onChange={this.handleAreaChange}>
                                          {areaOptions}
                                      </Select>
                                  </FormItem>
                                  <FormItem label="地址：" id="SalesPerson_Address" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                                      <Input name="SalesPerson_Address" value={this.state.formData.SalesPerson_Address} onChange={this.setValue} />
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
    SaleUserEdit: SaleUserEdit
}