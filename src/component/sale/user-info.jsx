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

class SaleUserInfo extends React.Component {

     constructor(props) {
         super(props);
         this.state = {
             title: '促销人员信息',
             SalesPerson_Name: '', // 姓名
             SalesPerson_SName: '', // 昵称
             Card_Code: '', // 身份证
             SalesPerson_Sex: '', // 性别
             Phone: '', // 手机
             RegisterTime: '', // 注册日期
             Email: '', // Email
             SalesPerson_Address: '', // 详细信息
             Province: '',
             Province_Name: "",
             City: '',
             City_Name: "",
             Area: '',
             Area_Name: ""
         };
         this.handleReset = this.handleReset.bind(this);
         this.getProvince = this.getProvince.bind(this);
         this.getCity = this.getCity.bind(this);
         this.getArea = this.getArea.bind(this);
     }

     getProvince() {
         _G.ajax({
             url: config.__URL + config.sale.user.province,
             type: "get",
             success: function(res) {
                 provinceData = res.Data
                 var code = this.state.Province ? this.state.Province : provinceData[0].Region_Code
                 var name
                 res.Data.map(function(elem) {
                     if (elem.Region_Code == code) {
                         name = elem.Region_Name
                     }
                 })

                 this.setState({
                     Province: code,
                     Province_Name: name
                 })
                 this.getCity()
             }.bind(this)
         })
     }
     getCity() {
         var a = this.state.Province;
         _G.ajax({
             url: config.__URL + config.sale.user.city,
             type: "get",
             data: {
                 Region_Code: a
             },
             success: function(res) {
                 cityData[a] = res.Data
                 var code = this.state.City ? this.state.City : cityData[a][0].Region_Code
                 var name
                 res.Data.map(function(elem) {
                     if (elem.Region_Code == code) {
                         name = elem.Region_Name
                     }
                 })

                 this.setState({
                     City: code,
                     City_Name: name
                 })
                 this.getArea()
             }.bind(this)
         })
     }
     getArea() {
         var a = this.state.City;
         _G.ajax({
             url: config.__URL + config.sale.user.area,
             type: "get",
             data: {
                 Region_Code: a
             },
             success: function(res) {
                 areaData[a] = res.Data
                 var code = this.state.Area ? this.state.Area : areaData[a][0].Region_Code
                 var name
                 res.Data.map(function(elem) {
                     if (elem.Region_Code == code) {
                         name = elem.Region_Name
                     }
                 })
                 this.setState({
                     Area: code,
                     Area_Name: name
                 })
             }.bind(this)
         })
     }

     componentWillMount() {
        var opts = {
          SalesPerson_Code: this.props.params.id
        }
        _G.ajax({
            url: config.__URL + config.sale.user.info,
            type: "get",
            data: opts,
            success: function(res) {
              this.setState(_G.assign(res.Data,{RegisterTime:_G.timeFormat2(res.Data.RegisterTime)}))
              this.getProvince()
            }.bind(this)
        })
     }


     handleReset(e) {
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
                            <FormItem label="会员名称：" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                                <Input name="SalesPerson_Name" value={this.state.SalesPerson_Name} disabled />
                            </FormItem>
                            <FormItem label="昵称：" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                                <Input name="SalesPerson_SName" value={this.state.SalesPerson_SName} disabled />
                            </FormItem>
                            <FormItem label="身份证号：" id="Card_Code" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                                <Input name="Card_Code" value={this.state.Card_Code} disabled />
                            </FormItem>
                            <FormItem label="性别：" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                                <RadioGroup name="SalesPerson_Sex" value={this.state.SalesPerson_Sex} disabled>
                                    <Radio value="男">男</Radio>
                                    <Radio value="女">女</Radio>
                                    <Radio value="神秘">神秘</Radio>
                                </RadioGroup>
                            </FormItem>
                            <FormItem label="手机：" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                                <Input name="Phone" value={this.state.Phone} disabled />
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="注册日期：" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                                <Input name="RegisterTime" value={this.state.RegisterTime} disabled />
                            </FormItem>
                            <FormItem label="电子邮箱：" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                                <Input name="Email" value={this.state.Email} disabled />
                            </FormItem>
                            <FormItem label="行政区域：" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                                <Input name="Province_Name" value={this.state.Province_Name} disabled style={{width:"33%"}}  />
                                <Input name="City_Name" value={this.state.City_Name} disabled style={{width:"33%"}}  />
                                <Input name="Area_Name" value={this.state.Area_Name} disabled style={{width:"33%"}}  />
                            </FormItem>
                            <FormItem label="地址：" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                                <Input name="SalesPerson_Address" value={this.state.SalesPerson_Address} disabled />
                            </FormItem>
                          </Col>
                      </Row>
                  </Form>
              </div>
              <div className="m-form-btns">
                  <Row>
                      <Col span="8" offset="2">
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <Button type="primary" onClick={this.handleReset}>确定</Button>
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
    SaleUserInfo: SaleUserInfo
}