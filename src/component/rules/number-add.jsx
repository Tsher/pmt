// 营销规则 积分规则


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

import '../../entry/config';

const ruleNumberAdd = config.__URL + config.rule.number.add;
const ruleNumberEdit = config.__URL + config.rule.number.edit;
const ruleNumberEditList = config.__URL + config.rule.number.editList;

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





class RuleNumberAdd extends React.Component{

  //mixins: [Validation.FieldMixin],

  constructor(props) {
  	super(props);
  	this.state = {
      status : {
        userName : {},
        remark : {},
        userNumber : {},
        startTime : {},
        endTime : {}
      },
      formData : {
      	title : '新增积分规则',
        userName : '',
        remark : '',
        userNumber : '',
        startTime : '',
        endTime : ''
      }
      
    };

    this.handleValidate = FieldMixin.handleValidate.bind(this);
    this.onValidate = FieldMixin.onValidate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderValidateStyle = this.renderValidateStyle.bind(this);
    this.setValue = this.setValue.bind(this);
    this.onChange = this.onChange.bind(this);
    
  }

  // datepicker change
  onChange(field,value){
    var data = Object.assign({},this.state);
    data.formData[field] = value;
    this.setState(data)
  }

  componentDidMount(){
    var id = this.props.params.id;

    
    if(id){
      // 编辑
      // ajax 请求当前id的数据 ********************************
      _G.ajax({
        url : ruleNumberEditList,
        type : 'get',
        data : {
          IntegralRule_Code : this.props.params.id
        },
        success:function(res){

          if(res.ReturnOperateStatus == 'False' || res.ReturnOperateStatus == 'NULL'){
            msg_error();
            // 跳转回列表页
            return;
          }
          res = res.Data;
          var d = {
              IntegralRule_Code : this.props.params.id,
              userName : res.IntegralRule_Name,
              remark : res.Description,
              userNumber : res.Bas_Integral,
              startTime : res.Effective_Time,
              endTime : res.Failure_Time,
            };
            console.log(d)
          this.setState({
            formData:d
          })

        }.bind(this)
      })

    }else{
      console.log('add')
    }
    
    
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

    // 提交数据
      let u = this.props.params.id ? ruleNumberEdit : ruleNumberAdd;
      console.log(this.state.formData)
      _G.ajax({
        url  : u,
        data : this.state.formData,
        method : 'post',
        success:function(res){
          if(res.ReturnOperateStatus == 'True'){
            msg_success();
            // 调转到列表页
            goBack();
            return;
          }
          if(res.ReturnOperateStatus == 'False' || res.ReturnOperateStatus == 'NULL'){
            msg_error();
            return
          }
        },
        fail:function(res){
          msg_error();
        }
      })
    
    
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

  checkBirthday(rule, value, callback) {
    if (value && value.getTime() < Date.now()){
      callback(new Error('请选择正确时间!'));
    } else {
      callback();
    }
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
          <Row>
            <Col span="8">
                <FormItem
                  label="规则名称："
                  id="userName"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}}
                  validateStatus={this.renderValidateStyle('userName')}
                  help={status.userName.errors ? status.userName.errors.join(',') : null}
                  required>
                    <Validator rules={[{required: true, message: '请输入则名称'}]}>
                      <Input name="userName" value={formData.userName} />
                    </Validator>
                </FormItem>
                <FormItem
                  label="描述："
                  id="remark"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}}
                  validateStatus={this.renderValidateStyle('remark')}
                  help={status.remark.errors ? status.remark.errors.join(',') : null}
                  required>
                    <Validator rules={[{required: true, message: '请描述'}]}>
                      <Input type="textarea" style={{height:90}} name="remark" value={formData.remark} />
                    </Validator>
                </FormItem>
            </Col>

            <Col span="8">
                <FormItem
                  label="获得积分："
                  id="userNumber"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}}
                  validateStatus={this.renderValidateStyle('userNumber')}
                  help={status.userNumber.errors ? status.userNumber.errors.join(',') : null}
                  required>
                    <Validator rules={[{required: true, message: '请输入积分'}]}>
                      <Input type="number" min="0" name="userNumber" value={formData.userNumber} />
                    </Validator>
                </FormItem>

                <FormItem
                  label="计划生效时间："
                  id="startTime"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}}
                  validateStatus={this.renderValidateStyle('startTime')}
                  help={status.startTime.errors ? status.startTime.errors.join(',') : null}
                  required>
                    <Validator rules={[{required: true,type: 'date', message: '请选择计划生效时间'}, {validator: this.checkBirthday}]}>
                      <DatePicker placeholder="" value={formData.startTime} name="startTime"  />
                    </Validator>
                      
                </FormItem>

                <FormItem
                  label="计划失效时间："
                  id="endTime"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}}
                  validateStatus={this.renderValidateStyle('endTime')}
                  help={status.endTime.errors ? status.endTime.errors.join(',') : null}
                  required>
                    <Validator rules={[{required: true,type: 'date', message: '请选择计划生效时间'}, {validator: this.checkBirthday}]}>
                      <DatePicker placeholder="" value={formData.endTime} id="endTime" name="endTime" onChange={this.onChange.bind(this,'endTime')} />
                    </Validator>
                      
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
	RuleNumberAdd : RuleNumberAdd
}