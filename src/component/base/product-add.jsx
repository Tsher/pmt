//  基础管理   产品管理  新增、编辑

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
  message.error('数据错误,请检查后重新提交')
}
const msg_success = function(){
  message.success('数据提交成功，等待后台处理')
}




import '../../entry/config';


// 用户列表api  http://172.31.0.49:8088/api/SUser/GetUsers?EntityCode=DEFAULT&page=0&pagesize=100
// page ：当前请求页
// pageSize : 每页条数
// EntityCode : DEFAULT 

const urlUserAdd = config.__URL + config.user.user.add;
const urlUserEdit = config.__URL + config.user.user.edit;
const urlUserInfo = config.__URL + config.user.user.info;



class UserProductAdd extends React.Component{

  //mixins: [Validation.FieldMixin],

  constructor(props) {
  	super(props);
  	this.state = {
      status : {
        
        Login_Name : {}, // 登录名
        
        User_Name : {}, // 姓名
        
        Email : {}, // 电子邮件
        Phone_Code : {}, // 手机
        
        User_Status : {} // 状态
        
      },
      formData: {
        User_Code : undefined,
        title : '新增用户',
        Login_Name : undefined, // 登录名
        User_Birthday : undefined, // 生日
        Depart_Code : undefined, // 隶属部门
        Register_On : undefined, //加入日期
        User_Name : undefined, // 姓名
        User_Hometown : undefined, // 籍贯
        Email : undefined, // 电子邮件
        Phone_Code : undefined, // 手机
        User_Nation : undefined , // 民族
        Marital_Status : undefined, // 婚姻
        User_Status : undefined, // 状态
        User_IDCard : undefined , // 身份证号
        Home_Phone : undefined // 家庭电话
      }
    };
    this.setField = FieldMixin.setField.bind(this);
    this.handleValidate = FieldMixin.handleValidate.bind(this);
    this.onValidate = FieldMixin.onValidate.bind(this);
    this.setValue = this.setValue.bind(this);
    this.onChange = this.onChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentDidMount(){
    // 编辑
    if(this.props.params.id){
      // ajax获取当前id的内容，变更state ****************************
      $.ajax({
        url : urlUserInfo,
        type : 'get',
        data : {
          User_Code : this.props.params.id
        },
        success:function(res){

          if(res == 'False' || res == 'NULL'){
            msg_error();
            // 跳转回列表页
            return;
          }
          var d = {
              User_Code : this.props.params.id,
              title : '编辑用户',
              Login_Name : res.Login_Name, // 登录名
              User_Birthday : _G.timeFormat(res.User_Birthday), // 生日
              Depart_Code : res.Depart_Code, // 隶属部门
              Register_On : _G.timeFormat(res.Register_On), //加入日期
              User_Name : res.User_Name, // 姓名
              User_Hometown : res.User_Hometown, // 籍贯
              Email : res.Email, // 电子邮件
              Phone_Code : res.Phone_Code, // 手机
              User_Nation : res.User_Nation , // 民族
              Marital_Status : res.Marital_Status, // 婚姻
              User_Status : res.User_Status, // 状态
              User_IDCard : res.User_IDCard , // 身份证号
              Home_Phone : res.Home_Phone // 家庭电话
            };
          console.log(d,res)
          this.setState({
            formData:d
          })

        }.bind(this)
      })
    }else{
      // 新增 *************
    }
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
    const validation = this.refs.validation;
    validation.validate((valid) => {
      if (!valid) {
        console.log('error in form');
        msg_error()
        return;
      } else {
        console.log('submit');
      }
      

      // 提交数据
      let u = this.props.params.id ? urlUserEdit : urlUserAdd;
      let t = this.props.params.id ? 'PUT' : 'POST';
      $.ajax({
        url  : u,
        data : this.state.formData,
        method : 'post',
        success:function(res){
          if(res == 'True'){
            msg_success();
            // 调转到列表页
            return;
          }
          if(res == 'False' || res == 'NULL'){
            msg_error();
            return
          }
        },
        fail:function(res){
          msg_error();
        }
      })


    });
  }

  checkUserState(rule, value, callback) {
    if (!value){
      callback(new Error('请选择用户状态!'));
    } else {
      callback();
    }
  }

  // 文本框的值 同步到 state
  setValue(e){

    var name = e.target.id || e.target.name;
    var value = e.target.value;

    var data = Object.assign( {}, this.state.formData );

    data[name] = value;

    this.setState({
      formData : data
    });
  }

  // datepicker change
  onChange(field,value){
   var data = Object.assign({},this.state);
    data.formData[field]=value;
    this.setState(data)
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
        <div className="m-form-title">{this.state.formData.title}</div>
        <div className="m-form-con">
      <Form horizontal>
        <Validation ref="validation" onValidate={this.handleValidate}>
          <Row>
            <Col span="8">
                <FormItem
                  label="登录名："
                  id="Login_Name"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}}
                  validateStatus={this.renderValidateStyle('Login_Name')}
                  help={status.Login_Name.errors ? status.Login_Name.errors.join(',') : null}
                  required>
                    <Validator rules={[{required: true, message: '请输入登录名',type:"string"}]}>
                      <Input name="Login_Name" value={formData.Login_Name} />
                    </Validator>
                </FormItem>
                <FormItem
                  label="姓名："
                  id="User_Name"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}}
                  validateStatus={this.renderValidateStyle('User_Name')}
                  help={status.User_Name.errors ? status.User_Name.errors.join(',') : null}
                  required>
                    <Validator rules={[{required: true, message: '请输入姓名',type:"string"}]}>
                      <Input name="User_Name" value={formData.User_Name} />
                    </Validator>
                </FormItem>
                <FormItem
                  label="手机："
                  id="Phone_Code"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}}
                  validateStatus={this.renderValidateStyle('Phone_Code')}
                  help={status.Phone_Code.errors ? status.Phone_Code.errors.join(',') : null}
                  required>
                    <Validator rules={[{required: true, message: '请输入手机号'}]}>
                      <Input name="Phone_Code" value={formData.Phone_Code} />
                    </Validator>
                </FormItem>
                <FormItem
                  label="状态："
                  id="state"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}}
                  validateStatus={this.renderValidateStyle('User_Status')}
                  help={status.User_Status.errors ? status.User_Status.errors.join(',') : null}
                  required>
                    <Validator rules={[{required: true, message: '请选择状态'},{validator: this.checkUserState}]}>
                      <Select size="large" placeholder="请选择状态" style={{width: '100%'}} name="User_Status" value={formData.User_Status}>
                        <Option value="0">在职</Option>
                        <Option value="1">离职</Option>
                        <Option value="2">不限</Option>
                      </Select>
                    </Validator>
                </FormItem>
                <FormItem
                  label="电子邮件："
                  id="Email"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}}
                  validateStatus={this.renderValidateStyle('Email')}
                  help={status.Email.errors ? status.Email.errors.join(',') : null}
                  required>
                    <Validator rules={[{required: true, message: '请输入电子邮件',type:"email"}]}>
                      <Input name="Email" value={formData.Email} />
                    </Validator>
                </FormItem>
            </Col>
            <Col span="8">
                <FormItem
                  label="生日："
                  id="User_Birthday"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}} >
                    <DatePicker name="User_Birthday" value={formData.User_Birthday} onChange={this.onChange.bind(this,'User_Birthday')} />
                </FormItem>
                <FormItem
                  label="籍贯："
                  id="User_Hometown"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}} >
                    <Input name="User_Hometown" value={formData.User_Hometown} onChange={this.setValue} />
                </FormItem>
                <FormItem
                  label="民族："
                  id="User_Nation"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}} >
                    <Select size="large" placeholder="请选择民族" style={{width: '100%'}} id="User_Nation" name="User_Nation" value={formData.User_Nation}  onChange={this.onChange.bind(this,'User_Nation')}>
                        <Option value="1">汉</Option>
                        <Option value="2">回</Option>
                        <Option value="3">藏</Option>
                      </Select>
                </FormItem>
                <FormItem
                  label="身份证号："
                  id="User_IDCard"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}} >
                    <Input name="User_IDCard" value={formData.User_IDCard} onChange={this.setValue} />
                </FormItem>
            </Col>
            <Col span="8">
                <FormItem
                  label="隶属部门："
                  id="Depart_Code"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}} >
                    <Select size="large" placeholder="请选择部门" style={{width: '100%'}} name="Depart_Code" value={formData.Depart_Code} onChange={this.onChange.bind(this,'Depart_Code')} >
                        <Option value="1">部门1</Option>
                        <Option value="2">部门2</Option>
                        <Option value="3">部门3</Option>
                      </Select>
                </FormItem>
                <FormItem
                  label="加入日期："
                  id="Register_On"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}} >
                    <DatePicker name="Register_On" value={formData.Register_On} onChange={this.onChange.bind(this,'Register_On')} />
                </FormItem>
                <FormItem
                  label="婚姻状况："
                  id="Marital_Status"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}} >
                    <Select size="large" placeholder="婚姻状况" style={{width: '100%'}} name="Marital_Status" value={formData.Marital_Status}  onChange={this.onChange.bind(this,'Marital_Status')}>
                        <Option value="1">已婚</Option>
                        <Option value="2">未婚</Option>
                      </Select>
                </FormItem>
                <FormItem
                  label="家庭电话："
                  id="Home_Phone"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}} >
                    <Input name="Home_Phone" value={formData.Home_Phone} onChange={this.setValue} />
                </FormItem>
            </Col>
          </Row>
          
        </Validation>
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
  UserProductAdd : UserProductAdd
}


