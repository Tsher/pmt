//  用户管理   企业用户管理  角色管理

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
import Tabs from 'antd/lib/tabs';
import Transfer from 'antd/lib/transfer';

import Select from 'antd/lib/select';
import Radio from 'antd/lib/radio';

import { createHistory } from 'history';

const TabPane = Tabs.TabPane;
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




class UserUserRole extends React.Component{

  //mixins: [Validation.FieldMixin],

  constructor(props) {
  	super(props);
  	this.state = {
      userName : null,
      loginName : null,
      part : null,
      userNo : null,
      mockData: [],
      targetKeys: [],
      mockData2: [],
      targetKeys2: [],
      id : null,
    };
    this.setField = FieldMixin.setField.bind(this);
    this.handleValidate = FieldMixin.handleValidate.bind(this);
    this.onValidate = FieldMixin.onValidate.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 =this.handleChange2.bind(this);
  }

  componentDidMount(){
    // 根据id 获取 用户信息
    

    // 模拟获取数据，等待真实接口
    this.getMock()
    this.getMock2();
  }

  renderValidateStyle(item) {

    const formData = this.state.formData;
    const status = this.state.status;
    console.log(item)
    const classes = cx({
      'error': status[item].errors,
      'validating': status[item].isValidating,
      'success': formData[item] && !status[item].errors && !status[item].isValidating
    });

    return classes;
  }

  handleReset(e) {
    // 返回***********************************
    goBack();

    // this.refs.validation.reset();
    // this.setState({
    //   status: {
    //     select: {},
    //     string:{},
    //     textarea:{}
    //   },
    //   formData: {
    //     select: undefined,
    //     string: undefined,
    //     textarea:undefined
    //   }
    // });
    e.preventDefault();
  }

  handleSubmit(e) {
    //***********************************等待ajax提交数据 ******** 区分 新增 或者 编辑
    e.preventDefault();
    // this.setState({
    //   isEmailOver: true
    // });
    console.log(this.state.targetKeys,this.state.targetKeys2);
    msg_success();
    // const validation = this.refs.validation;
    // validation.validate((valid) => {
    //   if (!valid) {
    //     console.log('error in form');
    //     msg_error()
    //     return;
    //   } else {
    //     console.log('submit');
    //   }
    //   console.log(this.state.formData);
    //   msg_success();
    // });
  }

  getMock() {
    let targetKeys = [];
    let mockData = [];
    for (let i = 0; i < 20; i++) {
      const data = {
        key: i,
        title: '内容' + (i + 1),
        description: '内容' + (i + 1) + '的描述',
        chosen: Math.random() * 2 > 1
      };
      if (data.chosen) {
        targetKeys.push(data.key);
      }
      mockData.push(data);
    }
    this.setState({
      mockData: mockData,
      targetKeys: targetKeys,
    });
  }
  getMock2() {
    let targetKeys = [];
    let mockData = [];
    for (let i = 0; i < 20; i++) {
      const data = {
        key: i,
        title: '2内容' + (i + 1),
        description: '2内容' + (i + 1) + '的描述',
        chosen: Math.random() * 2 > 1
      };
      if (data.chosen) {
        targetKeys.push(data.key);
      }
      mockData.push(data);
    }
    this.setState({
      mockData2: mockData,
      targetKeys2: targetKeys,
    });
  }

  handleChange(targetKeys) {
    this.setState({
      targetKeys: targetKeys,
    });
  }
  handleChange2(targetKeys) {
    this.setState({
      targetKeys2: targetKeys,
    });
  }

  // checkRoleName(rule, value, callback) {
  //   if (!value) {
  //     callback(new Error('请输入角色名称'));
  //   } else {
  //     callback();
  //   }
  // }

  render() {
    const formData = this.state.formData;
    const status = this.state.status;

    return (
      <div className="m-form">
        <div className="m-form-title">设置用户角色</div>
        <div className="m-form-con">

      <Form horizontal>

        <Row>
          <Col span="6">
            <FormItem
              label="登录名："
              id="loginName"
              labelCol={{span: 6}}
              wrapperCol={{span: 12}}
              >
                <Input name="loginName" value={this.state.loginName} disabled />
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem
                  label="姓名："
                  id="userName"
                  labelCol={{span: 6}}
                  wrapperCol={{span: 12}}
                  >
                    <Input name="userName" value={this.state.userName} disabled />
                </FormItem>
          </Col>
          <Col span="6">
            <FormItem
                  label="编号："
                  id="userNo"
                  labelCol={{span: 6}}
                  wrapperCol={{span: 12}}
                  >
                    <Input name="userNo" value={this.state.userNo} disabled />
                </FormItem>
          </Col>
          <Col span="6">
            <FormItem
                  label="隶属部门："
                  id="userNo"
                  labelCol={{span: 6}}
                  wrapperCol={{span: 12}}
                  >
                    <Input name="part" value={this.state.part} disabled />
                </FormItem>
          </Col>
        </Row>
        
        <Tabs defaultActiveKey="1" onChange={this.callback}>
          
          <TabPane tab="操作角色" key="1">
            
              <Transfer
                dataSource={this.state.mockData}
                titles={['全部角色','当前用户角色']}
                showSearch
                className="userSetRole"
                targetKeys={this.state.targetKeys}
                onChange={this.handleChange}
                render={(item) => { return item.title;}} />
            
          </TabPane>
          

          <TabPane tab="产品数据角色" key="2">
              <Transfer
                dataSource={this.state.mockData2}
                titles={['全部角色','当前用户角色']}
                showSearch
                className="userSetRole"
                targetKeys={this.state.targetKeys2}
                onChange={this.handleChange2}
                render={(item) => { return item.title;}} />
          </TabPane>
        </Tabs>
        
      </Form>
      </div>
      <div className="m-form-btns">
      <Row>
        <Col span="4" offset="2">
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
  UserUserRole : UserUserRole
}


