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
import Icon from 'antd/lib/icon';
import Modal from 'antd/lib/modal';
import DatePicker from 'antd/lib/date-picker';
import InputNumber from 'antd/lib/input-number';
import Table from 'antd/lib/table';
import Upload from 'antd/lib/upload';
import Alert from 'antd/lib/alert';
const Dragger = Upload.Dragger;
const confirm = Modal.confirm;
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

const baseProductAdd = config.__URL + config.base.product.add;
const baseProductEdit = config.__URL + config.base.product.edit;
const baseProductInfo = config.__URL + config.base.product.info;


// 图片上传参数定义
const upload_props = {
  name: 'file',
  showUploadList: true,
  action: '/upload.do'
};




const columns = [{
  title: '序号',
  dataIndex: 'No',
  key: 'No',
  // render: function(text,record) {
  //  var href= '/sale/do/info/'+text;
  //   return <Link to={href}>{text}</Link>;
  // }
}, {
  title: '包装级数',
  dataIndex: 'levels',
  key: 'levels'
}, {
  title: '包装比例',
  dataIndex: 'sizes',
  key: 'sizes'
}, {
  title: '包装单位',
  dataIndex: 'unit',
  key: 'unit'
},{
  title: '操作',
  key: 'operation',
  render: function(text, record,index) {
    var  del = '/user/user/del/' + index;
    return <span><a href="#" onClick={showModal} data-index={index} >删除</a></span>;
  }
},];


let modalState;
function showModal(e){
  Event.stop(e);
  var tar = Event.target(e);
  var id = tar.getAttribute('data-id'),index=tar.getAttribute('data-index'),name = tar.getAttribute('data-name');
  modalState(id,index,name)
}


const data = [{
  key: '1',
  No : '1',
  levels: '3',
  sizes: '1:3',
  unit : '箱',
}, {
  key: '2',
  No : '2',
  levels: '3',
  sizes: '1:3',
  unit : '箱',
}, {
  key: '3',
  No : '3',
  levels: '3',
  sizes: '1:3',
  unit : '箱',
}, {
  key: '4',
  No : '4',
  levels: '3',
  sizes: '1:3',
  unit : '箱',
}];


const packing_cloumns = [
      {
        title: '包装级数',
        dataIndex: 'levels',
        key: 'levels',
        index:'levels'
      },
      {
        title: '计量单位',
        dataIndex: 'unit',
        key: 'unit',
        index : 'unit',
        render:function(text,record,index){
          return (
            <Select onChange={function(value,label){
              packingUnitChange(value,label,record,'unit')
            }} style={{width:'60px'}}>
              <Option value="箱">箱</Option>
              <Option value="包">包</Option>
              <Option value="支">支</Option>
            </Select>
          )
        }
      },
      {
        title: '下级包装数量',
        dataIndex: 'sizes',
        key: 'sizes',
        index : 'sizes',
        render : function(text,record,index){
          if(packing_data==0 || index==packing_data.length-1){
            return (<span></span>)
          }
          return (
            <InputNumber min={1} onChange={function(value,label){
              packingUnitChange(value,label,record,'sizes')
            }} />
          )
        }
      }, 
      ];

let packing_data=[]

function packingUnitChange(value,label,record){
  console.log(value,label,record)
}


class BaseProductAdd extends React.Component{

  //mixins: [Validation.FieldMixin],

  constructor(props) {
  	super(props);
  	this.state = {
      visible : false,
      title : '',
      ModalText : '',
      status : {
        
        Product_Short_Name : {}, // 产品简称
        
        desc : {}, // 描述
        unit : {}, // 规格
        
      },
      formData: {
        Product_Code : undefined,
        title : '新增产品',
        Product_Name : undefined, // 产品名称
        Product_Short_Name : undefined, // 产品简称
        Brand : undefined, // 品牌
        desc : undefined, // 描述
        unit : undefined, // 规格
        validity : undefined, // 有效期
        validity_year : undefined, // 有效期年份
        validity_month : undefined, // 有效期月份
        barcode : undefined, // 商品码
        pics : [], // 图片
        packing_proportion : [], // 比例
        addPacking : {
          level : undefined, // 级别
          data : []
        }
      }
    };
    this.setField = FieldMixin.setField.bind(this);
    this.handleValidate = FieldMixin.handleValidate.bind(this);
    this.onValidate = FieldMixin.onValidate.bind(this);
    this.setValue = this.setValue.bind(this);
    this.onChange = this.onChange.bind(this);
    this.showModal = this.showModal.bind(this);


    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.uploadChange = this.uploadChange.bind(this);

    this.rowSelection = this.rowSelection.bind(this);
    this.renderPackage = this.renderPackage.bind(this);
    this.onInputNumberChange = this.onInputNumberChange.bind(this);
    this.packingUnitChange = this.packingUnitChange.bind(this);
    this.packingSizeChange = this.packingSizeChange.bind(this);

    this.modalState = this.modalState.bind(this);
  }

  modalState(){
    console.log(...args)
  }

  componentDidMount(){
    packingUnitChange = this.packingUnitChange;
    modalState = this.modalState;
    // 编辑
    if(this.props.params.id){
      // ajax获取当前id的内容，变更state ****************************
      // $.ajax({
      //   url : urlUserInfo,
      //   type : 'get',
      //   data : {
      //     User_Code : this.props.params.id
      //   },
      //   success:function(res){

      //     if(res == 'False' || res == 'NULL'){
      //       msg_error();
      //       // 跳转回列表页
      //       return;
      //     }
      //     var d = {
      //         User_Code : this.props.params.id,
      //         title : '编辑产品',
      //         Login_Name : res.Login_Name, // 登录名
      //         User_Birthday : _G.timeFormat(res.User_Birthday), // 生日
      //         Depart_Code : res.Depart_Code, // 隶属部门
      //         Register_On : _G.timeFormat(res.Register_On), //加入日期
      //         User_Name : res.User_Name, // 姓名
      //         User_Hometown : res.User_Hometown, // 籍贯
      //         Email : res.Email, // 电子邮件
      //         Phone_Code : res.Phone_Code, // 手机
      //         User_Nation : res.User_Nation , // 民族
      //         Marital_Status : res.Marital_Status, // 婚姻
      //         User_Status : res.User_Status, // 状态
      //         User_IDCard : res.User_IDCard , // 身份证号
      //         Home_Phone : res.Home_Phone // 家庭电话
      //       };
      //     console.log(d,res)
      //     this.setState({
      //       formData:d
      //     })

      //   }.bind(this)
      // })
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
      

      // // 提交数据
      // let u = this.props.params.id ? urlUserEdit : urlUserAdd;
      // let t = this.props.params.id ? 'PUT' : 'POST';
      // $.ajax({
      //   url  : u,
      //   data : this.state.formData,
      //   method : 'post',
      //   success:function(res){
      //     if(res == 'True'){
      //       msg_success();
      //       // 调转到列表页
      //       return;
      //     }
      //     if(res == 'False' || res == 'NULL'){
      //       msg_error();
      //       return
      //     }
      //   },
      //   fail:function(res){
      //     msg_error();
      //   }
      // })


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

  rowSelection(){
    return {
      onChange(selectedRowKeys) {
        console.log('selectedRowKeys changed: ' + selectedRowKeys);
      },
      onSelect: function(record, selected, selectedRows) {
        console.log(record, selected, selectedRows);
      },
      onSelectAll: function(selected, selectedRows) {
        console.log(selected, selectedRows);
      }
    }
  }

  handleOk(){
    //******************* 读取 this.state.formData.addPacking 提交数据 插入到已选择比例表格中 然后 关闭****************************
    console.log(this.state)
    this.setState({
      confirmLoading:true
    })
    setTimeout(()=>{
      this.setState({
        visible : false
      })
    },2000)
  }
  handleCancel(e){
    this.setState({
      visible : false
    })
  }
  showModal(){
    this.setState({
      visible : true,
      confirmLoading: false,
    })
  }

  // datepicker change
  onChange(field,value){
   var data = Object.assign({},this.state);
    data.formData[field]=value;
    this.setState(data)
  }

  // 上传图片 onchange
  uploadChange(info){
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(info.file.name + ' 上传成功。');
    } else if (info.file.status === 'error') {
      message.error(info.file.name + ' 上传失败。');
    }
  }

  // checkRoleName(rule, value, callback) {
  //   if (!value) {
  //     callback(new Error('请输入角色名称'));
  //   } else {
  //     callback();
  //   }
  // }

  onInputNumberChange(value){
    let i=0,d=[];
    for(;i<value;i++){
      d[i]={
        key : i,
        index : i,
        levels:value-i,
        unit : undefined,
        sizes:undefined
      }
    }
    packing_data.length = value;
    let state = Object.assign({},this.state);
    state.formData.addPacking.level = value;
    state.formData.addPacking.data = d;
    this.setState(state);
  }

  // 新增比例 单位 // 新增比例 数量
  packingUnitChange(e,label,record,type){
    console.log(e,label)
    let state = Object.assign({},this.state);
    state.formData.addPacking.data[record.index][type] = e;
    this.setState(state);
  }
  
  packingSizeChange(e){
    let state = Object.assign({},this.state);
    state.formData.addPacking.data[e.index] = e;
    this.setState(state);
  }

  renderPackage(){
    let data = this.state.formData.addPacking.data;
    
    return (
      <Row>
        <Col span="6">
          <label><span style={{color:'#f00'}}>*</span>包装级数</label>
        </Col>
        <Col span="6">
          <InputNumber min={1}  onChange={this.onInputNumberChange}  />
        </Col>
        <Col span="12">
          <Alert message="1级为最小包装" type="warn" showIcon />
        </Col>
        <Col span="6">
          <label><span style={{color:'#f00'}}>*</span>包装比例</label>
        </Col>
        <Col span="18">
          <Table dataSource={data} columns={packing_cloumns} pagination={false} size='small' />
        </Col>
      </Row>
    )
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
          <Row>
            <Col span="14">
              <Row>
                <Col span="12">
                <FormItem
                  label="产品名称："
                  id="Product_Name"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}}
                  >
                    <Input name="Product_Name" value={formData.Product_Name} disabled />
                </FormItem>
                <FormItem
                  label="产品简称："
                  id="Product_Short_Name"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}}
                  validateStatus={this.renderValidateStyle('Product_Short_Name')}
                  help={status.Product_Short_Name.errors ? status.Product_Short_Name.errors.join(',') : null}
                  required>
                    <Validator rules={[{required: true, message: '请输入产品简称',type:"string"}]}>
                      <Input name="Product_Short_Name" value={formData.Product_Short_Name} />
                    </Validator>
                </FormItem>
                <FormItem
                  label="品牌："
                  id="Brand"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}}
                  >
                    <Input name="Brand" value={formData.Brand} />
                </FormItem>
                <FormItem
                  label="描述："
                  id="desc"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}}
                  >
                    <Input type="textarea" name="desc" value={formData.desc} />
                    
                </FormItem>
            </Col>
            <Col span="12">
                <FormItem
                  label="有效期："
                  id="validity"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}} >
                    <Row>
                      <Col span="15">
                        <InputNumber name="valudity-year" value={formData.validity_year} onChange={this.onChange.bind(this,'valudity-year')} />
                      </Col>
                      <Col span="9">
                        <Select name="validity-month" style={{width:'100%'}} value={formData.validity_month} onChange={this.onChange.bind(this,'validity-month')}>
                          <Option value="">月</Option>
                          <Option value="1">1</Option>
                          <Option value="2">2</Option>
                          <Option value="3">3</Option>
                          <Option value="4">4</Option>
                          <Option value="5">5</Option>
                          <Option value="6">6</Option>
                          <Option value="7">7</Option>
                          <Option value="8">8</Option>
                          <Option value="9">9</Option>
                          <Option value="10">10</Option>
                          <Option value="11">11</Option>
                          <Option value="12">12</Option>
                        </Select>
                      </Col>
                    </Row>
                </FormItem>
                <FormItem
                  label="商品码："
                  id="barcode"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}} >
                    <Input name="barcode" value={formData.barcode} onChange={this.setValue} />
                </FormItem>
                <FormItem
                  label="规格："
                  id="unit"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}} >
                    <Input name="unit" value={formData.unit} onChange={this.setValue} />
                </FormItem>
            </Col>
            <Col span="24">
              <Row style={{'borderTop':'1px solid #e6e6e6','padding':'10px 0 0'}}>
                <Col span="18" style={{'margin':'10px 0 0'}}>
                  <label><span style={{color:'#f00'}}>*</span>包装比例</label>
                </Col>
                <Col span="6" style={{'padding':'0 0 10px'}}>
                  <Button type="primary" onClick={this.showModal} style={{'float':'right'}}>新增包装比例</Button>
                </Col>
                <Col span="24">
                    <Table  columns={columns} dataSource={data} pagination={false} size='small'  />
                </Col>
              </Row>
              
            </Col>
            </Row>
            </Col>
            <Col span="10">
                <FormItem
                  label="商品图片："
                  id="pics"
                  labelCol={{span: 4}}
                  wrapperCol={{span: 12}} >
                    <div style={{height:100}}>
                      <Dragger {...upload_props} onChange={this.uploadChange} style={{height:100}}>
                        <Icon type="plus" />
                      </Dragger>
                    </div>
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
        <Modal 
          visible={this.state.visible}
          title="新增包装比例"
          onOk={this.handleOk}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}>
          {this.renderPackage()}
        </Modal>
      </div>
      
      </div>
    );
  }
};



module.exports = {
  BaseProductAdd : BaseProductAdd
}


