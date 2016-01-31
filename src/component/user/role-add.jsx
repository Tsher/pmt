//  用户管理   企业角色管理  新增

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

import '../../entry/config';

const urlRoleGet = config.__URL + config.user.role.get;
const urlRoleType = config.__URL + config.user.role.type;
const urlRoleUpdate = config.__URL + config.user.role.update;
const urlRoleAdd = config.__URL + config.user.role.add;

class UserRoleAdd extends React.Component{

  //mixins: [Validation.FieldMixin],

  constructor(props) {
  	super(props);
  	this.state = {
      status: {
        Role_Type: {},
        Role_Name:{},
        Role_Description:{}
      },
      formData: {
        Role_Type: '',
        Role_Name:'',
        Role_Description:'',
        id : undefined,
        title : '新增角色'
      },
      role_all_type:undefined,
    };
    this.setField = FieldMixin.setField.bind(this);
    this.handleValidate = FieldMixin.handleValidate.bind(this);
    this.onValidate = FieldMixin.onValidate.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  componentDidMount(){
    // 获取所有角色类型
    var that = this;
    _G.get_data(config['user']['role']['type'],'user_role_type',{},function(res){
      
      const doms = res.Data.map( (item,index)=>{
        return <Option key={index} value={item['REAL_Code']}>{item['CODE_NM']}</Option>
      } )
      that.setState({
        role_all_type : doms
      })
    }); 

    // 编辑
    if(this.props.params.id){
      // ajax获取当前id的内容，变更state ****************************
      var data = this.props.params.id;
      var formData = _extends(this.state.formData,{ id:this.props.params.id , title : '编辑角色' });
      _G.ajax({
        url : urlRoleGet,
        type : 'get',
        data : {
          Role_Code :  data
        },
        success:function(res){

          if(res.ReturnOperateStatus == 'False' || res.ReturnOperateStatus == 'NULL'){
            msg_error();
            // 跳转回列表页
            return;
          }
          res = res.Data;
          formData.Role_Type = res.Role_Type;
          formData.Role_Name = res.Role_Name;
          formData.Role_Description = res.Role_Description;
          
          this.setState({
            formData:formData
          })

        }.bind(this)
      })
    }else{
      // 新增 *************
    }
  }

  handleSelectChange(field,value){
    var formData = _G.assign({},this.state.formData);
    formData[field] = value;
    this.setState({
      formData : formData
    })
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
      console.log(this.state.formData);
      var url = this.props.params.id ? urlRoleUpdate : urlRoleAdd;
      var formData = this.state.formData;
      _G.ajax({
        url : url,
        type : 'post',
        data : {
          Role_Name : formData.Role_Name,
          Role_Type : formData.Role_Type,
          Role_Description : formData.Role_Description,
          Role_Code : this.props.params.id
        },
        success:function(res){

          if(res.ReturnOperateStatus == 'False' || res.ReturnOperateStatus == 'NULL'){
            msg_error('数据异常，请联系管理员');
            // 跳转回列表页
            return;
          }
          goBack();

        }.bind(this)
      })

    });
  }

  checkRoleType(rule, value, callback) {
    if (!value){
      callback(new Error('请选择角色类型!'));
    } else {
      callback();
    }
  }

  checkRoleName(rule, value, callback) {
    if (!value) {
      callback(new Error('请输入角色名称'));
    } else {
      callback();
    }
  }

  render() {
    const formData = this.state.formData;
    const status = this.state.status;

    return (
      <div className="m-form">
        <div className="m-form-title">{this.state.formData.title}</div>
        <div className="m-form-con">
      <Form horizontal>
        <Validation ref="validation" onValidate={this.handleValidate}>
          <FormItem
            label="角色类型："
            id="roleType"
            labelCol={{span: 2}}
            wrapperCol={{span: 4}}
            validateStatus={this.renderValidateStyle('Role_Type')}
            help={status.Role_Type.errors ? status.Role_Type.errors.join(',') : null}
            required>
              <Validator rules={[{required: true, message: '请选择角色类型'},{validator: this.checkRoleType}]}>
                <Select onChange={this.handleSelectChange.bind(this,'Role_Type')} size="large" placeholder="请选择角色类型" style={{width: '100%'}} name="Role_Type" value={formData.Role_Type}>
                  {this.state.role_all_type}
                </Select>
              </Validator>
          </FormItem>

          <FormItem
            label="角色名称："
            id="roleName"
            labelCol={{span: 2}}
            wrapperCol={{span: 4}}
            validateStatus={this.renderValidateStyle('Role_Name')}
            help={status.Role_Name.errors ? status.Role_Name.errors.join(',') : null}
            required>
              <Validator rules={[{required: true, message: '请输入角色名称'},{validator: this.checkRoleName}]}>
                <Input name="Role_Name" value={formData.Role_Name} />
              </Validator>
          </FormItem>

          <FormItem
            label="角色描述："
            id="Role_Description"
            labelCol={{span: 2}}
            wrapperCol={{span: 4}}
            help={status.Role_Description.errors ? status.Role_Description.errors.join(',') : null}
            >
              <Validator rules={[{required: false}]}>
                <Input type="textarea" name="Role_Description" value={formData.Role_Description} />
              </Validator>
          </FormItem>

          
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
  UserRoleAdd : UserRoleAdd
}


