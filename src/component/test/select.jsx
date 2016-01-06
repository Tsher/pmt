import React from 'react';
import Tabs from 'antd/lib/tabs';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Checkbox from 'antd/lib/checkbox';
import message from 'antd/lib/message';
import Validation from 'antd/lib/validation';
//import {Form, Input, Button, Checkbox, message, Validation} from 'antd';
import {Link} from 'react-router';
const TabPane = Tabs.TabPane;

const FormItem = Form.Item;

const TabItemContents = ([
	<span>选项卡一</span>,
	<span>选项卡二</span>,
	<span>选项卡三</span>,
])



// import {Validation, Select, Radio, Button, Datepicker, InputNumber, Form} from 'antd';
import Select from 'antd/lib/select';
import Radio from 'antd/lib/radio';
import Datepicker from 'antd/lib/datepicker'
import InputNumber from 'antd/lib/input-number';


const Validator = Validation.Validator;
const Option = Select.Option;
const RadioGroup = Radio.Group;
// const FormItem = Form.Item;


function cx(classNames) {
  if (typeof classNames === 'object') {
    return Object.keys(classNames).filter(function(className) {
      return classNames[className];
    }).join(' ');
  } else {
    return Array.prototype.join.call(arguments, ' ');
  }
}

//const reactMixin = require('react-mixin');
//import reactMixin from 'react-mixin';

//console.log(Validation.FieldMixin);

//import mixin from 'es6-react-mixins';

function merge() {
  var ret = {};
  var args = [].slice.call(arguments, 0);
  args.forEach(function (a) {
    Object.keys(a).forEach(function (k) {
      ret[k] = a[k];
    });
  });
  return ret;
}

const FieldMixin = Validation.FieldMixin;

const msg_error = function(){
  message.error('数据验证错误,请检查后提交')
}
const msg_success = function(){
  message.success('数据提交成功，等待后台处理')
}

class Demo extends React.Component{

  //mixins: [Validation.FieldMixin],

  constructor(props) {
  	super(props);
  	this.state = {
      status: {
        select: {},
        multiSelect: {},
        radio: {},
        birthday: {},
        primeNumber: {}
      },
      formData: {
        select: undefined,
        multiSelect: undefined,
        radio: undefined,
        birthday: null,
        primeNumber: 9
      }
    };
    this.setField = FieldMixin.setField.bind(this);
    this.handleValidate = FieldMixin.handleValidate.bind(this);
    this.onValidate = FieldMixin.onValidate.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
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

  handleReset(e) {
    this.refs.validation.reset();
    this.setState({
      status: {
        select: {},
        multiSelect: {},
        radio: {},
        birthday: {},
        primeNumber: {}
      },
      formData: {
        select: undefined,
        multiSelect: undefined,
        radio: undefined,
        birthday: null,
        primeNumber: 9
      }
    });
    e.preventDefault();
  }

  handleSubmit(e) {
    
    e.preventDefault();
    // this.setState({
    //   isEmailOver: true
    // });
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

  checkBirthday(rule, value, callback) {
    if (value && value.getTime() >= Date.now()){
      callback(new Error('你不可能在未来出生吧!'));
    } else {
      callback();
    }
  }

  checkPrime(rule, value, callback) {
    if (value !== 11) {
      callback(new Error('8~12之间的质数明明是11啊!'));
    } else {
      callback();
    }
  }

  render() {
    const formData = this.state.formData;
    const status = this.state.status;

    return (
      <Form horizontal>
        <Validation ref="validation" onValidate={this.handleValidate}>
          <FormItem
            label="国籍："
            id="select"
            labelCol={{span: 7}}
            wrapperCol={{span: 12}}
            validateStatus={this.renderValidateStyle('select')}
            help={status.select.errors ? status.select.errors.join(',') : null}
            required>
              <Validator rules={[{required: true, message: '请选择您的国籍'}]}>
                <Select size="large" placeholder="请选择国家" style={{width: '100%'}} name="select" value={formData.select}>
                  <Option value="china">中国</Option>
                  <Option value="use">美国</Option>
                  <Option value="japan">日本</Option>
                  <Option value="korean">韩国</Option>
                  <Option value="Thailand">泰国</Option>
                </Select>
              </Validator>
          </FormItem>

          <FormItem
            label="喜欢的颜色："
            labelCol={{span: 7}}
            wrapperCol={{span: 12}}
            validateStatus={this.renderValidateStyle('multiSelect')}
            help={status.multiSelect.errors ? status.multiSelect.errors.join(',') : null}
            required>
            <Validator rules={[{required: true, message: '请选择您喜欢的颜色', type: 'array'}]}>
              <Select multiple size="large" placeholder="请选择颜色" style={{width: '100%'}} name="multiSelect" value={formData.multiSelect}>
                <Option value="red">红色</Option>
                <Option value="orange">橙色</Option>
                <Option value="yellow">黄色</Option>
                <Option value="green">绿色</Option>
                <Option value="blue">蓝色</Option>
              </Select>
            </Validator>
          </FormItem>

          <FormItem
            label="性别："
            id="radio"
            labelCol={{span: 7}}
            wrapperCol={{span: 12}}
            validateStatus={this.renderValidateStyle('radio')}
            help={status.radio.errors ? status.radio.errors.join(',') : null}
            required>
              <Validator rules={[{required: true, message: '请选择您的性别'}]}>
                <RadioGroup name="radio" value={formData.radio}>
                  <Radio value="male">男</Radio>
                  <Radio value="female">女</Radio>
                </RadioGroup>
              </Validator>
          </FormItem>

          <FormItem
            label="生日："
            id="birthday"
            labelCol={{span: 7}}
            wrapperCol={{span: 12}}
            validateStatus={this.renderValidateStyle('birthday')}
            help={status.birthday.errors ? status.birthday.errors.join(',') : null}
            required>
              <Validator rules={[{
                required: true,
                type: 'date',
                message: '你的生日是什么呢?'
              }, {validator: this.checkBirthday}]}>
                <Datepicker name="birthday" value={formData.birthday} />
              </Validator>
          </FormItem>

          <FormItem
            label="8~12间的质数："
            id="primeNumber"
            labelCol={{span: 7}}
            wrapperCol={{span: 12}}
            validateStatus={this.renderValidateStyle('primeNumber')}
            help={status.primeNumber.errors ? status.primeNumber.errors.join(',') : null}
            required>
              <Validator rules={[{validator: this.checkPrime}]}>
                <InputNumber name="primeNumber" min={8} max={12} value={formData.primeNumber} />
              </Validator>
          </FormItem>

          <FormItem
            wrapperCol={{span: 12, offset: 7}} >
            <Button type="primary" onClick={this.handleSubmit}>确定</Button>
            &nbsp;&nbsp;&nbsp;
            <Button type="ghost" onClick={this.handleReset}>重置</Button>
          </FormItem>
        </Validation>
      </Form>
    );
  }
};

//reactMixin(Demo.prototype,Validation.FieldMixin)


class TableList extends React.Component{
	constructor(props){
		super(props);

		this.state = {

		}

	}
	handleSubmit(e){

	}

	render(){
		return (
			<Form inline onSubmit={this.handleSubmit}>
				<FormItem id="username" label="账户">
					<Input placeholder="请输入用户名" id="username" name="username" />
				</FormItem>
			</Form>
		)
	}
}


import {TreeView} from './tree';
import {TableView } from './table';

class Info extends React.Component{
  render(){
    return (
    	<Tabs defaultActiveKey="1" >
			<TabPane tab={TabItemContents[0]} key="1">
				<Demo />
			</TabPane>
			<TabPane tab={TabItemContents[1]} key="2">
        <TreeView />
      </TabPane>
			<TabPane tab={TabItemContents[2]} key="3">
        <TableView />
      </TabPane>
		</Tabs>
    )
  }
}



module.exports = {
	Info : Info
}