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


class SaleUserAdd extends React.Component {

     constructor(props) {
         super(props);
         this.state = {
              check : {
                  SalesPerson_Name: {
                    reg : /[\w\W]+/,
                    error : '名称不正确'
                  },
                  Card_Code: {
                    reg : function(cardNumber) {
                            var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1] // 加权因子;
                            var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2] // 身份证验证位值，10代表X;

                            if (cardNumber.length == 15) {
                              return isValidityBrithBy15IdCard(cardNumber)
                            } else if (cardNumber.length == 18) {
                              var a_idCard = cardNumber.split("") // 得到身份证数组   
                              if (isValidityBrithBy18IdCard(cardNumber) && isTrueValidateCodeBy18IdCard(a_idCard)) {
                                return true
                              }
                              return false
                            }
                            return false

                            function isTrueValidateCodeBy18IdCard(a_idCard) {
                              var sum = 0; // 声明加权求和变量   
                              if (a_idCard[17].toLowerCase() == 'x') {
                                a_idCard[17] = 10 // 将最后位为x的验证码替换为10方便后续操作   
                              }
                              for (var i = 0; i < 17; i++) {
                                sum += Wi[i] * a_idCard[i] // 加权求和   
                              }
                              if (a_idCard[17] == ValideCode[sum % 11]) {
                                return true
                              }
                              return false
                            }

                            function isValidityBrithBy18IdCard(idCard18) {
                              var year = idCard18.substring(6, 10)
                              var month = idCard18.substring(10, 12)
                              var day = idCard18.substring(12, 14)
                              var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day))
                                // 这里用getFullYear()获取年份，避免千年虫问题   
                              if (temp_date.getFullYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
                                return false
                              }
                              return true
                            }

                            function isValidityBrithBy15IdCard(idCard15) {
                              var year = idCard15.substring(6, 8)
                              var month = idCard15.substring(8, 10)
                              var day = idCard15.substring(10, 12)
                              var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day))
                                // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法   
                              if (temp_date.getYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
                                return false
                              }
                              return true
                            }

                          },
                    error : '身份证号不正确'
                  },
                  Phone: {
                    reg : /^1[3|4|5|7|8][0-9]{9}$/,
                    error : '手机不正确'
                  }, // 手机
                  Email: {
                    reg : /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
                    error : '邮箱不正确'
                  }, // Email
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
         this.getProvince = this.getProvince.bind(this);
         this.getCity = this.getCity.bind(this);
         this.getArea = this.getArea.bind(this);
         this.onChange = this.onChange.bind(this);
         this.setValue = this.setValue.bind(this);
         this.chekValue = this.chekValue.bind(this);
         this.handleBlur = this.handleBlur.bind(this);
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
         console.log(this.state)
         var _isok = true;
         var data = this.state;
         for(var key in data.formData){
            if(!this.chekValue(key)&&_isok){
              _isok = false;
            }
         }
         console.log(_isok)
         if(_isok){
            _G.ajax({
               url: config.__URL + config.sale.user.add,
               type: "post",
               data: this.state.formData,
               success: function(res) {
                   msg_success();
                   setTimeout(goBack,2000)
               }.bind(this)
            })
        }
     }

     handleBlur(e){
      this.chekValue(e.target.name)
     }

     chekValue(key){
        var item = this.state.check[key]
        var isok = true
        if(item){
          var reg = item.reg
          var result
          var status = ''
          var help = ''
          var state = _G.assign({},this.state)
          if(typeof(reg) =='function'){
            result = reg(this.state.formData[key])
          }else{
            result = reg.test(this.state.formData[key])
          }

          if(!result){
            status = 'error'
            help =  item.error
            isok = false
          }
          state.check[key+'_status'] = status
          state.check[key+'_help'] = help
          this.setState(state);
        }
        return isok
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
                                  <FormItem label="名称：" labelCol={{span: 8}} wrapperCol={{span: 12}} 
                                    validateStatus={this.state.check.SalesPerson_Name_status}
                                    help={this.state.check.SalesPerson_Name_help} required>
                                      <Input name="SalesPerson_Name" value={this.state.formData.SalesPerson_Name} onChange={this.setValue} onBlur={this.handleBlur}/>
                                  </FormItem>
                                  <FormItem label="昵称：" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                                      <Input name="SalesPerson_SName" value={this.state.formData.SalesPerson_SName} onChange={this.setValue} />
                                  </FormItem>
                                  <FormItem label="身份证号：" labelCol={{span: 8}} wrapperCol={{span: 12}}  
                                    validateStatus={this.state.check.Card_Code_status}
                                    help={this.state.check.Card_Code_help}  required>
                                      <Input name="Card_Code" value={this.state.formData.Card_Code} onChange={this.setValue}  onBlur={this.handleBlur} />
                                  </FormItem>
                                  <FormItem label="性别：" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                                      <RadioGroup name="SalesPerson_Sex" value={this.state.formData.SalesPerson_Sex} onChange={this.onChange} >
                                          <Radio value="男">男</Radio>
                                          <Radio value="女">女</Radio>
                                          <Radio value="神秘">神秘</Radio>
                                      </RadioGroup>
                                  </FormItem>
                                  <FormItem label="手机：" labelCol={{span: 8}} wrapperCol={{span: 12}}   
                                    validateStatus={this.state.check.Phone_status}
                                    help={this.state.check.Phone_help}  required>
                                        <Input name="Phone" value={this.state.formData.Phone} onChange={this.setValue} onBlur={this.handleBlur}/>
                                  </FormItem>
                              </Col>
                              <Col span="12">
                                  <FormItem label="注册日期：" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                                      <Input name="RegisterTime" value={this.state.formData.RegisterTime} disabled />
                                  </FormItem>
                                  <FormItem label="电子邮箱：" labelCol={{span: 8}} wrapperCol={{span: 12}}   
                                    validateStatus={this.state.check.Email_status}
                                    help={this.state.check.Email_help}  required>
                                          <Input name="Email" value={this.state.formData.Email} onChange={this.setValue} onBlur={this.handleBlur} />
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
                                  <FormItem label="地址：" labelCol={{span: 8}} wrapperCol={{span: 12}}>
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
    SaleUserAdd: SaleUserAdd
}