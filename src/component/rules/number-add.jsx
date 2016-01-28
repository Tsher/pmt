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
const ruleNumberType = config.__URL + config.rule.number.type;

function cx(classNames) {
  if (typeof classNames === 'object') {
    return Object.keys(classNames).filter(function(className) {
      return classNames[className];
    }).join(' ');
  } else {
    return Array.prototype.join.call(arguments, ' ');
  }
}


const msg_error = function(d){
  var str = d || '数据验证错误,请检查后提交';
  message.error(str)
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
        IntegralRule_Name : {},
        Description : {},
        Bas_Integral : {},
        Effective_Time : {},
        Failure_Time : {},
        SalesRegion_Code:{},
        SalesRegion_Name:{},
      },
      formData : {
      	title : '新增积分规则',
        IntegralRule_Name : '',
        Description : '',
        Bas_Integral : '',
        Effective_Time : '',
        Failure_Time : '',
        SalesRegion_Code :'',
        SalesRegion_Name : '',
      },
      selesD:[],
      
    };
    this.setField = FieldMixin.setField.bind(this);
    this.handleValidate = FieldMixin.handleValidate.bind(this);
    this.onValidate = FieldMixin.onValidate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderValidateStyle = this.renderValidateStyle.bind(this);
    this.setValue = this.setValue.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    
    
  }

  // datepicker change
  onChange(field,value){
    var data = Object.assign({},this.state);
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

  componentDidMount(){
    var id = this.props.params.id;

    _G.ajax({
      url : ruleNumberType,
      type: "get",
      success:function(res){
        console.log(res.Data)
        this.setState({
          selesD : res.Data
        })
      }.bind(this)
    })

    
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
              IntegralRule_Name : res.IntegralRule_Name,
              Description : res.Description,
              Bas_Integral : res.Bas_Integral,
              Effective_Time : _G.timeFormat2(res.Effective_Time,'YYYY-MM-DD'),
              Failure_Time : _G.timeFormat2(res.Failure_Time,'YYYY-MM-DD'),
          };
          this.setState({
            formData:d,
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
      
      msg_success();
    });

    // 提交数据
      let u = this.props.params.id ? ruleNumberEdit : ruleNumberAdd;
      var fD = Object.assign({},this.state.formData);
      fD.Effective_Time = _G.timeFormat(fD.Effective_Time,'YYYY-MM-DD');
      fD.Failure_Time = _G.timeFormat(fD.Failure_Time,'YYYY-MM-DD');
      fD.REAL_Code = fD.SalesRegion_Code;
      fD = JSON.stringify(fD);
      _G.ajax({
        url  : u,
        data : {Bas_IntegralRule_Rule:fD},
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
    /*if (value && value.getTime() < Date.now()){
      callback(new Error('请选择正确时间!'));
    } else {
      callback();
    }*/
  }

  handleChange(value){
    console.log('changed'+value);
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
                  id="IntegralRule_Name"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}}
                  >
                    <Input name="IntegralRule_Name" value={formData.IntegralRule_Name} />
                </FormItem>

                <FormItem
                  label="规则类型："
                  id="SalesRegion_Name"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}}
                  >
                    <Validator rules={[{required: true, message: '选择销售区域',type:'string'}]}>
                      <Select defaultValue={formData.SalesRegion_Name} name="SalesRegion_Name" style={{width:156}} value={formData.SalesRegion_Code}  onChange={this.onChange.bind(this,'SalesRegion_Name')}>
                        {
                           this.state.selesD.map(function(d){
                              return <Option key={d.REAL_Code} value={d.REAL_Code} >{d.CODE_NM}</Option>
                           })
                        }
                      </Select>
                    </Validator>
                </FormItem>

                

                <FormItem
                  label="描述："
                  id="Description"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}}
                  
                  >
                    <Validator rules={[{required: true, message: '请描述'}]}>
                      <Input type="textarea" style={{height:90}} name="Description" value={formData.Description} />
                    </Validator>
                </FormItem>
            </Col>

            <Col span="8">
                <FormItem
                  label="获得积分："
                  id="Bas_Integral"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}}
                  >
                  <Input type="number" min="0" name="Bas_Integral" value={formData.Bas_Integral} />

                  
                </FormItem>

                <FormItem
                  label="计划生效时间："
                  id="Effective_Time"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}}
                  >
                    <DatePicker placeholder="" value={formData.Effective_Time} name="Effective_Time"  />
                </FormItem>

                <FormItem
                  label="计划失效时间："
                  id="Failure_Time"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}}
                  >
                    <DatePicker placeholder="" value={formData.Failure_Time} id="Failure_Time" name="Failure_Time" onChange={this.onChange.bind(this,'Failure_Time')} />
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