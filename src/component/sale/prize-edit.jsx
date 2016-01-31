//  促销数据   奖品  新增 and 编辑

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
import Upload from 'antd/lib/upload';
import Icon from 'antd/lib/icon';

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

var kinds = [];

class SalePrizeEdit extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
          status: {
              Prize_Name: {},
              Prize_Type: {},
              RegisterOn: {},
              Brand: {}
          },
          formData: {
              id: '', // 奖品id
              title: '奖品信息',
              Prize_Name: '', // 奖品名称
              Unit: '', // 单位
              Prize_Type: '', // 奖品类别
              Image: [], // 奖品图片
              Brand: '', // 品牌
              RegisterOn: '', // 入网日期
              Spec: '' // 规格
          }
      };

      this.handleValidate = FieldMixin.handleValidate.bind(this);
      this.onValidate = FieldMixin.onValidate.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.renderValidateStyle = this.renderValidateStyle.bind(this);
      this.uploadCallback = this.uploadCallback.bind(this);
      this.setValue = this.setValue.bind(this);
      this.onChange = this.onChange.bind(this);
      this.getSource = this.getSource.bind(this);
      this.handlePrizeType = this.handlePrizeType.bind(this);
  }

  // datepicker change
  onChange(field, value) {
      var data = Object.assign({}, this.state);
      data.formData[field] = value;
      this.setState(data)
  }

  getSource(){
    var opts = {
          Prize_Code: this.props.params.id
      }
      _G.ajax({
          url: config.__URL + config.sale.prize.info,
          type: "get",
          data: opts,
          success: function(res) {
              this.setState({
                  formData: Object.assign(res.Data, {
                      Image: res.Image,
                      RegisterOn: _G.timeFormat2(res.Data.RegisterOn)
                  })
              })
          }.bind(this)
      })
  }

  componentDidMount() {
      _G.ajax({
          url: config.__URL + config.sale.prize.kinds,
          type: "get",
          data: {Prize_Name:''},
          success: function(res) {
              kinds = res.Data
              this.getSource()
          }.bind(this)
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
          console.log(this.state.formData);
          msg_success();
      });
  }

  // 文本框的值 同步到 state
  setValue(e) {
      var name = e.target.id;
      var data = Object.assign({}, this.state);
      data.formData[name] = e.target.value;
      this.setState(data);
  }

  // 图片上传回调
  uploadCallback(info) {
      console.log(info)
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

  handlePrizeType(value) {
     this.setState({
         formData: Object.assign(this.state.formData, {
             Prize_Type: value
         })
     })
  }

  render() {
    const status = this.state.status;
    var renderPic = this.state.formData.Image.map(function(elem) {
        return <img src={elem.Image} style={{width: '100%'}} />
    })

    var renderKinds = kinds.map(function(elem) {
      return <Option key={elem.Prize_Type}>{elem.Prize_Type}</Option>;
    })
    
    return (
        <div className="m-form">
            <div className="m-form-title">{this.state.formData.title}</div>
            <div className="m-form-con">
                <Form horizontal>
                    <Validation ref="validation" onValidate={this.handleValidate}>
                        <Row>
                            <Col span="8">
                                <FormItem label="单位：" id="Unit" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                                    <Input name="Unit" id="Unit" value={this.state.formData.Unit} onChange={this.setValue} />
                                </FormItem>
                                <FormItem label="入网日期：" id="RegisterOn" labelCol={{span: 8}} wrapperCol={{span: 12}} validateStatus={this.renderValidateStyle( 'RegisterOn')} help={status.RegisterOn.errors ? status.RegisterOn.errors.join( ',') : null} required>
                                    <DatePicker placeholder="入网日期" value={this.state.formData.RegisterOn} id="RegisterOn" name="RegisterOn" onChange={this.onChange.bind(this, 'RegisterOn')} />
                                </FormItem>
                                <FormItem label="品牌：" id="Brand" labelCol={{span: 8}} wrapperCol={{span: 12}} validateStatus={this.renderValidateStyle( 'Brand')} help={status.Brand.errors ? status.Brand.errors.join( ',') : null} required>
                                    <Validator rules={[{required: true, message: '请输入品牌'}]}>
                                        <Input name="Brand" value={this.state.formData.Brand} />
                                    </Validator>
                                </FormItem>
                                <FormItem label="规格：" id="Spec" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                                    <Input id="Spec" name="Spec" value={this.state.formData.Spec} onChange={this.setValue} />
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem label="奖品名称：" id="Prize_Name" labelCol={{span: 8}} wrapperCol={{span: 12}} validateStatus={this.renderValidateStyle( 'Prize_Name')} help={status.Prize_Name.errors ? status.Prize_Name.errors.join( ',') : null} required>
                                    <Validator rules={[{required: true, message: '请输入奖品名称'}]}>
                                        <Input name="Prize_Name" value={this.state.formData.Prize_Name} />
                                    </Validator>
                                </FormItem>
                                <FormItem label="奖品类别：" id="Prize_Type" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                                    <Select name="Prize_Type" style={{width: '100%'}} value={this.state.formData.Prize_Type} onChange={this.handlePrizeType}>
                                        {renderKinds}
                                    </Select>
                                </FormItem>
                                <FormItem label="奖品图片：" id="pic" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                                    <Input type="hidden" name="pic" value={this.state.formData.Image} />
                                    <Upload name="file" action="/upload.do" onChange={this.uploadCallback.bind(this)}>
                                        <Button type="ghost">
                                            <Icon type="upload" /> 点击上传
                                        </Button>
                                    </Upload>
                                    {renderPic}
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
  SalePrizeEdit : SalePrizeEdit
}


