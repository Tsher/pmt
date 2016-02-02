//  用户管理   组织机构管理  新增

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

import '../../entry/config';
const groupTypes = config.__URL + config.user.group.types;
const groupInfo = config.__URL + config.user.group.info;
const groupAdd = config.__URL + config.user.group.add;
const groupEdit = config.__URL + config.user.group.edit;


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


class UserGroupAdd extends React.Component{

  //mixins: [Validation.FieldMixin],

  constructor(props) {
  	super(props);
  	this.state = {
      status: {
        Organization_Name:{}, // 新增部门的名称
      },
      formData: {
        id : undefined, // 新增 or 编辑 识别
        no : undefined, // 编辑状态 部门编号
        key : undefined, // 选中的部门id
        parent : '', // 上级部门名称
        Organization_Name: '', // 新增部门的名称
        PY : '', // 新增部门的缩写
        Description : '', // 新增部门的描述
        OAttributes : '', // 新增部门的属性
        title : '新增部门',
        show : 'none', // 新增= none  编辑=block
      },
      selesD:[],
    };
    this.setField = FieldMixin.setField.bind(this);
    this.handleValidate = FieldMixin.handleValidate.bind(this);
    this.onValidate = FieldMixin.onValidate.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.onChange = this.onChange.bind(this);
    this.checkGroupName = this.checkGroupName.bind(this);
  }

  componentDidMount(){

    var id = this.props.params.id;
    var isEdit = id.split(',')[1]||'';
    var code = id.split(',')[0];
    var name = id.split(',')[1]||'';

    

    _G.ajax({
      url : groupTypes,
      type: "get",
      success:function(res){
        console.log(res.Data)
        this.setState({
          selesD : res.Data
        })
        if(isEdit == 'edit'){
          // 编辑
          // ajax 请求当前id的数据 ********************************


          _G.ajax({
            url : groupInfo,
            type: "get",
            data : {Organization_Code:code},
            success:function(res){
              var d = res;
              console.log(d);
              var json = d.Data;
              json.parent = d.Parent_Name;
              json.PY = '';
              json.OAttributes = '';
              this.setState({
                 formData:json,
              })
            }.bind(this)

          })
          
        }else{

          var fD = _G.assign({},this.state.formData);
          if (name != 'add') {
              fD.parent = name;
              this.setState({
                formData : fD
              })
          };

        }

      }.bind(this)

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

        var id = this.props.params.id;
        var isEdit = id.split(',')[1]||'';
        var code = id.split(',')[0];
        
        // 提交数据
        
        var fD = _G.assign({},this.state.formData);
        var Parent_Code = fD.Parent_Code;
        if (isEdit != 'edit') {
          Parent_Code = code;
        };
        var d = {
            Organization_Name:fD.Organization_Name,
            Description:fD.Description,
            PY:fD.PY,
            Parent_Code:Parent_Code,
            Organization_Code:fD.Organization_Code,
            OAttributes:fD.REAL_Code,
        };

        //JsonValue:JSON.stringify(d)
        let u = isEdit == 'edit' ? groupEdit+'?Organization_Code='+fD.Organization_Code : groupAdd;
        _G.ajax({
          url  : u,
          data : d,
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

  onChange(field,value){
    var data = _G.assign({},this.state);
    if (field == 'CODE_NM') {
      var sD = this.state.selesD;
      var name = '';
      for(var i=0;i<sD.length;i++){
        if (sD[i].REAL_Code == value) {
           name = sD[i].CODE_NM;
        };
      }
      data.formData[field] = name;
      data.formData['REAL_Code'] = value;
    }else{
      data.formData[field] = value;
    }
    
    this.setState(data)
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
                label="上级部门："
                id="parent"
                labelCol={{span: 2}}
                wrapperCol={{span: 4}}
                >
                  <Input name="parent" value={formData.parent} disabled />
              </FormItem>
              <FormItem
                label="部门名称："
                id="Organization_Name"
                labelCol={{span: 2}}
                wrapperCol={{span: 4}}
                validateStatus={this.renderValidateStyle('Organization_Name')}
                help={status.Organization_Name.errors ? status.Organization_Name.errors.join(',') : null}
                required>
                  <Validator rules={[{required: true, message: '请输入部门名称'}]}>
                    <Input  name="Organization_Name" value={formData.Organization_Name} />
                  </Validator>
              </FormItem>

              <FormItem
                label="缩写："
                id="PY"
                labelCol={{span: 2}}
                wrapperCol={{span: 4}}
                >
                  <Validator rules={[{required: false, message: ''}]}>
                      <Input  name="PY" value={formData.PY} />
                    </Validator>
              </FormItem>
              <FormItem
                label="描述："
                id="Description"
                labelCol={{span: 2}}
                wrapperCol={{span: 4}}
                >
                <Validator rules={[{required: false, message: ''}]}>
                  <Input type="textarea" name="Description" value={formData.Description} />
                </Validator>
              </FormItem>
              <FormItem
                label="属性："
                id="CODE_NM"
                labelCol={{span: 2}}
                wrapperCol={{span: 4}}
                >
                <Select size="large" placeholder="请选择" style={{width: '100%'}} name="CODE_NM" value={formData.REAL_Code} onChange={this.onChange.bind(this,'CODE_NM')} defaultValue={formData.CODE_NM} >
                  {
                     this.state.selesD.map(function(d){
                        return <Option key={d.REAL_Code} value={d.REAL_Code} >{d.CODE_NM}</Option>
                     })
                  }
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


