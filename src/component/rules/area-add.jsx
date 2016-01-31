// 积分规则  批次区域管理  添加页面

var _extends = _G.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

import '../../entry/config';
const ruleAreaAdd = config.__URL + config.rule.area.add;
const ruleAreaEdit  = config.__URL + config.rule.area.edit;
const ruleAreaSeles  = config.__URL + config.rule.area.seles;
const ruleAreaSearch  = config.__URL + config.rule.area.search;
const ruleAreaListOne = config.__URL + config.rule.area.listOne;

var changeTableState;

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
        saleRegion: {},
        SalesRegion_Code:{},
        SalesRegion_Name:{},
      },
      formData: {
        title : '新增批次区域',
        batchNumStart: '',
        batchNumEnd: '',
        boxNumStart: '',
        boxNumEnd: '',
        saleRegion: '',
        SalesRegion_Code :'',
        SalesRegion_Name : '',
      },
      selesD:[],
    };
    this.handleValidate = FieldMixin.handleValidate.bind(this);
    this.onValidate = FieldMixin.onValidate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderValidateStyle = this.renderValidateStyle.bind(this);
    this.setValue = this.setValue.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount(){
    var id = this.props.params.id;

    _G.ajax({
      url : ruleAreaSeles,
      type: "get",
      success:function(res){

        this.setState({
          selesD : res.Data
        })

        if(id){
          // 编辑
          // ajax 请求当前id的数据 ********************************

          _G.ajax({
            url : ruleAreaListOne,
            type : 'get',
            data : {
              LotArea_Code : id
            },
            success:function(res){

              if(res.ReturnOperateStatus == 'False' || res.ReturnOperateStatus == 'NULL'){
                msg_error();
                // 跳转回列表页
                return;
              }
              res = res.Data[0];
              var sD = this.state.selesD;
              var code = '';
              for(var i=0;i<sD.length;i++){
                if (sD[i].SalesRegion_Name == res.SalesRegion_Name) {
                   code = sD[i].SalesRegion_Code;
                };
              }
              console.log(code)
              var d = {
                  title : '新增批次区域',
                  batchNumStart : res.Start_Batch_Code,
                  batchNumEnd : res.End_Batch_Code,
                  boxNumStart : res.Start_Box_Code,
                  boxNumEnd : res.End_Box_Code,
                  saleRegion : res.SalesRegion_Name,
                  SalesRegion_Name : res.SalesRegion_Name,
                  LotArea_Code : id,
                  SalesRegion_Code:code,
              };
              this.setState({
                formData:d,
              })

            }.bind(this)
          })
          
        }

      }.bind(this)

    })

    
    
    
  }


  
  // 文本框的值 同步到 state
  setValue(e){
    var name = e.target.id;
    var data = _G.assign({},this.state);
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
      msg_success();
    });

    // 提交数据
      let u = this.props.params.id ? ruleAreaEdit : ruleAreaAdd;
      var fD = _G.assign({},this.state.formData);
      var d = {
          Start_Batch_Code:fD.batchNumStart,
          End_Batch_Code:fD.batchNumEnd,
          Start_Box_Code:fD.boxNumStart,
          End_Box_Code:fD.boxNumEnd,
          SalesRegion_Code:fD.SalesRegion_Code,
          LotArea_Code :fD.LotArea_Code,
      };
      _G.ajax({
        url  : u+'?LotArea_Code='+fD.LotArea_Code,
        data : {JsonValue:JSON.stringify(d)},
        method : 'post',
        success:function(res){
          if(res.ReturnOperateStatus == 'True'){
            msg_success();
            // 调转到列表页
            goBack();
            return;
          }
          if(res.ReturnOperateStatus == 'False' || res.ReturnOperateStatus == 'NULL'){
            msg_error(res.Msg);
            return
          }
        },
        fail:function(res){
          msg_error();
        }
      })
    
    
  }

  // datepicker change
  onChange(field,value){
    var data = _G.assign({},this.state);
    if (field == 'SalesRegion_Name') {
      var sD = this.state.selesD;
      var name = '';
      for(var i=0;i<sD.length;i++){
        if (sD[i].SalesRegion_Code == value) {
           name = sD[i].SalesRegion_Name;
        };
      }
      data.formData[field] = name;
      data.formData['SalesRegion_Code'] = value;
    }else{
      data.formData[field] = value;
    }
    
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
                        <label className="do-add-time-title">批次号：</label>
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
                        <label className="do-add-time-title">箱号：</label>
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
                            id="SalesRegion_Name"
                            validateStatus={this.renderValidateStyle('SalesRegion_Name')}
                            help={status.SalesRegion_Name.errors ? status.SalesRegion_Name.errors.join(',') : null}
                            required>
                              <Validator rules={[{required: true, message: '选择销售区域',type:'string'}]}>
                                <Select defaultValue={formData.SalesRegion_Name} name="SalesRegion_Name" style={{width:200}} value={formData.SalesRegion_Code}  onChange={this.onChange.bind(this,'SalesRegion_Name')}>
                                  {
                                     this.state.selesD.map(function(d){
                                        return <Option key={d.SalesRegion_Code} value={d.SalesRegion_Code} >{d.SalesRegion_Name}</Option>
                                     })
                                  }
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
	RuleAreaAdd : SelectForm
}