// 积分规则  批次区域管理  添加页面

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import InputNumber from 'antd/lib/input-number';
import Select from 'antd/lib/select';
import Form from 'antd/lib/form';
import message from 'antd/lib/message';
import Table from 'antd/lib/table';
import {Link} from 'react-router';
import { createHistory } from 'history';
import Modal from 'antd/lib/modal';
import Popover from 'antd/lib/popover';
import DatePicker from 'antd/lib/date-picker';
import Radio from 'antd/lib/radio';
import Validation from 'antd/lib/validation';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Validator = Validation.Validator;
const Option = Select.Option;
const FieldMixin = Validation.FieldMixin;

const confirm = Modal.confirm;
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

function noop() {
  return false;
}


class SelectForm extends React.Component{
	//mixins: [Form.ValueMixin],

  constructor() {
  	super();
    this.state =  {
      status: {
        batchNumStart: {},
        batchNumEnd: {},
        boxNumStart: {},
        boxNumEnd: {},
        saleRegion: {}
      },
      formData: {
        title : '新增批次区域',
        batchNumStart: undefined,
        batchNumEnd: undefined,
        boxNumStart: undefined,
        boxNumEnd: undefined,
        saleRegion: undefined
      }
    };
    this.handleValidate = FieldMixin.handleValidate.bind(this);
    this.onValidate = FieldMixin.onValidate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderValidateStyle = this.renderValidateStyle.bind(this);
    this.setValue = this.setValue.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  
  // 文本框的值 同步到 state
  setValue(e){
    var name = e.target.id;
    var data = Object.assign({},this.state);
    data.formData[name] = e.target.value;
    this.setState(data);
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

  // datepicker change
  onChange(field,value){
    var data = Object.assign({},this.state);
    data.formData[field] = value;
    this.setState(data)
  }

  handleReset(e) {
    e.preventDefault();
    goBack();
  }
  

  disabledEndDate(endValue){
    if (!endValue || !this.state.startTime) {
      return false;
    }
    return endValue.getTime() <= this.state.startTime.getTime();
  }

 
  render() {
    const formData = this.state.formData;
    const status = this.state.status;
    return (
      <div className="m-form">
          <div className="m-form-title">{formData.title}</div>
          <div className="m-form-con">
               <Form horizontal>
                <Validation ref="validation" onValidate={this.handleValidate}>
                <ul className="do-add-time clearfix">
                    <li className="fleft">
                        <label className="do-add-time-title">起始批次号：</label>
                        <span className="timepicker">
                          <FormItem
                                label=""
                                id="batchNumStart"
                                validateStatus={this.renderValidateStyle('batchNumStart')}
                                help={status.batchNumStart.errors ? status.batchNumStart.errors.join(',') : null}
                                required>
                                  <Validator rules={[{required: true, message: '请输入起始批次号'}]}>
                                    <Input placeholder="" id="batchNumStart" name="batchNumStart" onChange={this.setValue} value={formData.batchNumStart} />
                                  </Validator>
                            </FormItem>
                        </span>
                        <span className="timepicker-space"> 至 </span>
                        <span className="timepicker">
                          <FormItem
                          label=""
                          id="batchNumEnd"
                          validateStatus={this.renderValidateStyle('batchNumEnd')}
                          help={status.batchNumEnd.errors ? status.batchNumEnd.errors.join(',') : null}
                          required>
                            <Validator rules={[{required: true, message: '请输入结束批次号'}]}>
                              <Input placeholder="" id="batchNumEnd" name="batchNumEnd" onChange={this.setValue} value={formData.batchNumEnd} />
                            </Validator>
                        </FormItem>
                        </span>
                            
                    </li>
                </ul>
                <ul className="do-add-time clearfix">
                    <li className="fleft">
                        <label className="do-add-time-title">起始箱号：</label>
                        <span className="timepicker">
                          <FormItem
                                label=""
                                id="boxNumStart"
                                validateStatus={this.renderValidateStyle('boxNumStart')}
                                help={status.boxNumStart.errors ? status.boxNumStart.errors.join(',') : null}
                                required>
                                  <Validator rules={[{required: true, message: '请输入起始箱号'}]}>
                                    <Input placeholder="" id="boxNumStart" name="boxNumStart" onChange={this.setValue} value={formData.boxNumStart} />
                                  </Validator>
                            </FormItem>
                        </span>
                        <span className="timepicker-space"> 至 </span>
                        <span className="timepicker">
                          <FormItem
                                label=""
                                id="boxNumEnd"
                                validateStatus={this.renderValidateStyle('boxNumEnd')}
                                help={status.boxNumEnd.errors ? status.boxNumEnd.errors.join(',') : null}
                                required>
                                  <Validator rules={[{required: true, message: '请输入结束箱号'}]}>
                                    <Input placeholder="" id="boxNumEnd" name="boxNumEnd" onChange={this.setValue} value={formData.boxNumEnd} />
                                  </Validator>
                            </FormItem>
                        </span>
                            
                    </li>
                </ul>
                <ul className="do-add-time clearfix">
                    <li className="fleft">
                        <label className="do-add-time-title">销售区域：</label>
                        <span className="timepicker">
                          <FormItem
                            label=""
                            id="saleRegion"
                            validateStatus={this.renderValidateStyle('saleRegion')}
                            help={status.saleRegion.errors ? status.saleRegion.errors.join(',') : null}
                            required>
                              <Validator rules={[{required: true, message: '选择销售区域',type:'string'}]}>
                                <Select name="saleRegion" style={{width:200}} value={formData.saleRegion}>
                                  <Option value="华南">华南</Option>
                                  <Option value="华北">华北</Option>
                                  <Option value="西南">西南</Option>
                                  <Option value="西北">西北</Option>
                                </Select>
                              </Validator>
                          </FormItem>

                        </span>
                            
                    </li>
                </ul>
                <ul className="do-add-time clearfix">
                    <li className="fleft">
                        <label className="do-add-time-title"></label>
                        <span className="timepicker">
                          <Button type="primary" onClick={this.handleSubmit}>确定</Button>
                          <Button style={{marginLeft:10}} type="primary" onClick={this.handleReset}>取消</Button>
                        </span>
                            
                    </li>
                </ul>
                  </Validation>
                </Form>
          </div>
      </div>
      
    );
  }
}


class RuleAreaAdd extends React.Component{
	constructor(){
		super();
    this.state = {
    }
	}
	render(){
		return(
			<div className="m-list">
				<Row>
					<SelectForm />
				</Row>
			</div>
		)
	}
}
module.exports = {
	RuleAreaAdd : RuleAreaAdd
}