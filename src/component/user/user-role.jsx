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

import '../../entry/config';

const urlUserInfo = config.__URL + config.user.user.info;
const urlUserRole = config.__URL + config.user.user.role;


let userRole=[]; // 用户角色信息

class UserUserRole extends React.Component{

  //mixins: [Validation.FieldMixin],

  constructor(props) {
  	super(props);
  	this.state = {
      User_Code : undefined,
      User_Name : null,
      Login_Name : null,
      Depart_Code : null,
      Depart_Name : null,
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
    if(this.props.params.id){
      // 用户信息
    _G.ajax({
        url : urlUserInfo,
        type : 'get',
        data : {
          User_Code : this.props.params.id
        },
        success:function(res){

          if(res.ReturnOperateStatus == 'False' || res.ReturnOperateStatus == 'NULL'){
            msg_error();
            // 跳转回列表页
            return;
          }
          console.log('用户信息',res.Data)
          var d = {
              User_Code : this.props.params.id,
              Login_Name : res.Login_Name, // 登录名
              Depart_Code : res.Depart_Code, // 隶属部门
              User_Name : res.User_Name, // 姓名
            };
            console.log(d)
          d = Object.assign({},d);
          this.setState(d)

        }.bind(this)
      });

    // 用户角色信息
    _G.ajax({
      url : urlUserRole,
      type : 'get',
      data : {
        User_Code : this.props.params.id
      },
      success : function(res){
          if(res.ReturnOperateStatus == 'False' || res.ReturnOperateStatus == 'NULL'){
            msg_error();
            // 跳转回列表页
            return;
          }
          console.log('用户角色信息',res.Data)
          userRole = res.Data;
          this.getMock()
      }.bind(this)
    })
    
    }

    // 模拟获取数据，等待真实接口
    
    //this.getMock2();
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

  // 操作角色
  getMock() {
    let targetKeys = [];
    let mockData = [];
    mockData = _G.user_role_all;
    for (let i = 0; i < _G.user_role_all.length; i++) {
      // role_type : 0 = 操作角色
      if(_G.user_role_all[i].Role_Type == 0){
        const data = {
          key: _G.user_role_all[i].Role_Code,
          title: _G.user_role_all[i].Role_Name,
          description: '',
          chosen : _G.user_role_all[i].Role_Code in userRole
        };
        if (data.chosen) {
          targetKeys.push(data.key);
        }
      }
      mockData.push(data);
    }

    this.setState({
      mockData: mockData,
      targetKeys: targetKeys,
    });
  }
  getMock2() {
    //产品角色数据，暂时隐藏了。
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
              id="Login_Name"
              labelCol={{span: 6}}
              wrapperCol={{span: 12}}
              >
                <Input name="Login_Name" value={this.state.Login_Name} disabled />
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem
                  label="姓名："
                  id="User_Name"
                  labelCol={{span: 6}}
                  wrapperCol={{span: 12}}
                  >
                    <Input name="User_Name" value={this.state.User_Name} disabled />
                </FormItem>
          </Col>
          <Col span="6">
            <FormItem
                  label="编号："
                  id="User_Code"
                  labelCol={{span: 6}}
                  wrapperCol={{span: 12}}
                  >
                    <Input name="User_Code" value={this.state.User_Code} disabled />
                </FormItem>
          </Col>
          <Col span="6">
            <FormItem
                  label="隶属部门："
                  id="Depart_Code"
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

/**
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
**/

module.exports = {
  UserUserRole : UserUserRole
}


