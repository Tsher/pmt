//  用户管理   组织机构管理  新增

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


class UserGroupAdd extends React.Component{

  //mixins: [Validation.FieldMixin],

  constructor(props) {
  	super(props);
  	this.state = {
      status: {
        name:{}, // 新增部门的名称
      },
      formData: {
        id : undefined, // 新增 or 编辑 识别
        no : undefined, // 编辑状态 部门编号
        key : undefined, // 选中的部门id
        parent : undefined, // 选中的部门名称
        name: undefined, // 新增部门的名称
        shortName : undefined, // 新增部门的缩写
        desc : undefined, // 新增部门的描述
        prototype : undefined, // 新增部门的属性
        title : '新增部门',
        show : 'none', // 新增= none  编辑=block
      }
    };
    this.setField = FieldMixin.setField.bind(this);
    this.handleValidate = FieldMixin.handleValidate.bind(this);
    this.onValidate = FieldMixin.onValidate.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);

    this.checkGroupName = this.checkGroupName.bind(this);
  }

  componentDidMount(){
    // 编辑
    if(this.props.params.id){
      // ajax获取当前id的内容，变更state ****************************
      var state = _extends(this.state,{formData:{ id:this.props.params.id , title : '编辑部门', show : 'block' }});
      this.setState(state);

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
      console.log(this.state.formData);
      msg_success();
    });
  }

  checkGroupName(rule, value, callback) {
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
                label="部门编号："
                id="no"
                labelCol={{span: 2}}
                wrapperCol={{span: 4}}
                style={{ display : formData.show }}
                >
                  <Input name="no" value={formData.no} disabled />
              </FormItem>
              <FormItem
                label="上级部门："
                id="parent"
                labelCol={{span: 2}}
                wrapperCol={{span: 4}}
                >
                  <Input name="parent" value={formData.parent} disabled />
              </FormItem>
              <FormItem
                label="部门名称："
                id="name"
                labelCol={{span: 2}}
                wrapperCol={{span: 4}}
                validateStatus={this.renderValidateStyle('name')}
                help={status.name.errors ? status.name.errors.join(',') : null}
                required>
                  <Validator rules={[{required: true, message: '请输入部门名称'},{validator: this.checkGroupName}]}>
                    <Input  name="name" value={formData.name} />
                  </Validator>
              </FormItem>
              <FormItem
                label="缩写："
                id="shortName"
                labelCol={{span: 2}}
                wrapperCol={{span: 4}}
                >
                  <Input  name="shortName" value={formData.shortName} />
              </FormItem>
              <FormItem
                label="描述："
                id="desc"
                labelCol={{span: 2}}
                wrapperCol={{span: 4}}
                >
                  <Input type="textarea" name="desc" value={formData.desc} />
              </FormItem>
              <FormItem
                label="属性："
                id="prototype"
                labelCol={{span: 2}}
                wrapperCol={{span: 4}}
                >
                <Select size="large" placeholder="请选择" style={{width: '100%'}} name="prototype" value={formData.prototype}>
                  <Option value="type-1">部门</Option>
                  <Option value="type-2">集团</Option>
                  <Option value="type-3">公司</Option>
                  <Option value="type-4">项目组</Option>
                </Select>
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
  UserGroupAdd : UserGroupAdd
}


