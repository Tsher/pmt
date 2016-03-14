//  用户管理   企业用户管理  新增

var _extends = _G.assign || function (target) { 
  for (var i = 1; i < arguments.length; i++) { 
    var source = arguments[i]; 
    for (var key in source) { 
      if (Object.prototype.hasOwnProperty.call(source, key)) { 
        target[key] = source[key]; 
       } 
     } 
   } 
   return target; 
 };

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
import Tree from 'antd/lib/tree';
const TreeNode = Tree.TreeNode;
import Select from 'antd/lib/select';
import Radio from 'antd/lib/radio';

import { createHistory } from 'history';

const FormItem = Form.Item;
const Validator = Validation.Validator;
const Option = Select.Option;
const OptGroup = Select.OptGroup;

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


const msg_error = function(text){
  message.error(text || '数据错误,请检查后重新提交')
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
const urlUserNation = config.__URL + config.user.user.nation;
const urlUserStatus = config.__URL + config.user.user.status;
const urlUserPart = config.__URL + config.user.user.part;

class UserUserAdd extends React.Component{

  //mixins: [Validation.FieldMixin],

  constructor(props) {
  	super(props);
  	this.state = {
      status : {
        
        Login_Name : {}, // 登录名
        
        User_Name : {}, // 姓名
        
        Email : {}, // 电子邮件
        Phone_Code : {}, // 手机
        
        User_Status : {}, // 状态
        User_IDCard : {} // 身份证
        
      },
      formData: {
        User_Code : undefined,
        title : '新增用户',
        Login_Name : undefined, // 登录名
        User_Birthday : undefined, // 生日
        Depart_Code : undefined, // 隶属部门
        Organization_Name : undefined, // 部门名称
        Register_On : undefined, //加入日期
        User_Name : undefined, // 姓名
        User_Hometown : undefined, // 籍贯
        Email : undefined, // 电子邮件
        Phone_Code : undefined, // 手机
        User_Nation : undefined , // 民族编码
        NationName : undefined, // 民族名称
        Marital_Status : undefined, // 婚姻
        User_Status : undefined, // 状态
        User_IDCard : undefined , // 身份证号
        User_Sex : undefined, // 性别
        Home_Phone : undefined // 家庭电话
      },
      treeData : [],
      left: 0,
      top:-1000,
      width:100,
    };
    this.setField = FieldMixin.setField.bind(this);
    this.handleValidate = FieldMixin.handleValidate.bind(this);
    this.onValidate = FieldMixin.onValidate.bind(this);
    this.setValue = this.setValue.bind(this);
    this.onChange = this.onChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.departCheck = this.departCheck.bind(this);
    this.checkhandle = this.checkhandle.bind(this);
  }

  // 插入到dom之后执行
  componentDidMount(){
    var that = this;

    // 获取民族
    _G.get_data(config['user']['user']['nation'],'user_nation',{},function(res){
      const doms = res.Data.map( (item,index) => {
        return <Option key={index} value={item['REAL_Code']}>{item['CODE_NM']}</Option>
      } )
      that.setState({
        user_nation : doms
      })
    }); 

    // 获取用户状态
    _G.get_data(config['user']['user']['status'],'user_status',{},function(res){
      const doms = res.Data.map( (item,index)=>{
        return <Option key={index} value={item['REAL_Code']}>{item['CODE_NM']}</Option>
      } )
      that.setState({
        user_status : doms
      })
    }); 

    // 获取部门
    _G.ajax({
      url : urlUserPart,
      type : 'get',
      success : function(res){

        const loop = (data) => {
          return data.map( (item) => {
            if(item.Children){
              return (<TreeNode title={item.Name} key={item.Code}>{loop(item.Children)}</TreeNode>);
            }else{
              return (<TreeNode title={item.Name} key={item.Code}></TreeNode>);
            }
          } )
        }
        const parseTree = (data) => loop(data);
        let treeNodes = parseTree(res.Data);

        this.setState({
          treeNodes : treeNodes
        })
      }.bind(this)
    })

    

    // 编辑
    if(this.props.params.id){
      // ajax获取当前id的内容，变更state ****************************
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
          res = res.Data;
          console.log(res)
          
          res.User_Birthday = res.User_Birthday || '-NaN-';
          res.Register_On = res.Register_On || '-NaN-';

          var d = {
              User_Code : this.props.params.id,
              title : '编辑用户',
              Login_Name : res.Login_Name, // 登录名
              User_Birthday : res.User_Birthday.indexOf('-NaN-') > -1 ? '' :  _G.timeFormat2(res.User_Birthday, 'YYYY-MM-DD'), // 生日
              Depart_Code : res.Depart_Code, // 隶属部门
              Depart_Name : res.Organization_Name, // 隶属部门名称
              Register_On : res.Register_On.indexOf('-NaN-') > -1 ? '' :  _G.timeFormat2(res.Register_On,'YYYY-MM-DD'), //加入日期
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

            console.log('d',d)
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
    // 返回 ***********************************
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
    // ***********************************等待ajax提交数据 ******** 区分 新增 或者 编辑
    e.preventDefault();
    // this.setState({
    //   isEmailOver: true
    // });
    const validation = this.refs.validation;
    if(!/^(\d{18})$/.test(this.state.User_IDCard) && !this.state.User_IDCard ){
        msg_error('请输入正确的身份证号！');
        return;
      }
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
      var data = _G.assign({},this.state.formData);
      data.User_Birthday = data.User_Birthday ? _G.timeFormat( new Date(data.User_Birthday), 'YYYY-MM-DD')  : '';
      data.Register_On = data.Register_On ? _G.timeFormat( new Date(data.Register_On), 'YYYY-MM-DD') : '' ; 
      _G.ajax({
        url  : u,
        data : data,
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


    });
  }

  // 点击树菜单
  checkhandle(info){
    // 根据 eventKey 查询 相关信息 展示右侧详细信息
    console.log(info)
    var state = _G.assign({},this.state);
    state.formData.Depart_Code = info.node.props.eventKey;
    state.formData.Depart_Name = info.node.props.title;
    this.setState({
      top:-1000,
      formData : state.formData
    })
    // 根据选中的 key ，获取 相关数据 ,更新state，展示再右侧
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
    console.log(name,value)
    var data = _G.assign( {}, this.state.formData );

    data[name] = value;

    this.setState({
      formData : data
    });
  }

  departCheck(e){
    var tar = e.target;
    var size = $(tar).offset();
    this.setState({
      left : size.left,
      top : size.top + tar.offsetHeight,
      width : tar.offsetWidth
    })
  }

  // datepicker change
  onChange(field,value){
    if(field == 'User_Sex'){
      value = value.target.value;
    }
    console.log(value)
   var data = _G.assign({},this.state);
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
                    <Validator rules={[{required: true, message: '请输入正确手机号',pattern:/^1[356789](\d){9}$/}]}>
                      <Input name="Phone_Code" value={formData.Phone_Code} />
                    </Validator>
                </FormItem>
                <FormItem
                  label="状态："
                  id="User_Status"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}}
                  validateStatus={this.renderValidateStyle('User_Status')}
                  help={status.User_Status.errors ? status.User_Status.errors.join(',') : null}
                  required>
                    <Validator rules={[{required: true, message: '请选择状态'}]}>
                      <Select size="large"  placeholder="请选择状态" style={{width: '100%'}} name="User_Status" value={formData.User_Status}>
                        {this.state.user_status}
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
                      {this.state.user_nation}
                    </Select>
                </FormItem>
                <FormItem
                  label="身份证号："
                  id="User_IDCard"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}} 
                  >
                    <Validator rules={[{ required: false, message: '请输入正确的身份证号', pattern : /\d{18}/ }]}>
                      <Input name="User_IDCard" value={formData.User_IDCard} onChange={this.setValue} />
                    </Validator>
                </FormItem>
                <FormItem
                  label="性别："
                  id="User_Sex"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}} 
                  >
                    <RadioGroup name="User_Sex" value={formData.User_Sex} onChange={this.onChange.bind(this,'User_Sex')} >
                        <Radio value="1">男</Radio>
                        <Radio value="2">女</Radio>
                        <Radio value="0">神秘</Radio>
                    </RadioGroup>
                </FormItem>
            </Col>
            <Col span="8">
                <FormItem
                  label="隶属部门："
                  id="Depart_Code"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}} >
                    <Input name="Depart_Name" value={formData.Depart_Name} onClick={this.departCheck} />
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
      <div id="fixedTree" className="fixedTree" style={{left:this.state.left,top:this.state.top,width:this.state.width}}>
        <Tree multiple={false} onSelect={this.checkhandle}>
            {this.state.treeNodes}
        </Tree>
      </div>
      </div>
    );
  }
};



module.exports = {
  UserUserAdd : UserUserAdd
}


