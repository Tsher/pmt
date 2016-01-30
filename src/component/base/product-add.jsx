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
const baseProductOne = config.__URL + config.base.product.one;
const baseProductEdit = config.__URL + config.base.product.edit;
const baseProductInfo = config.__URL + config.base.product.info;
let baseProductUpload = config.__URL + config.base.product.upload;


// 图片上传参数定义
const upload_props = {
  name: 'file',
  showUploadList: true,
  action: baseProductUpload
};




const columns = [{
  title: '序号',
  dataIndex: 'Product_PPR_Code',
  key: 'Product_PPR_Code',
  // render: function(text,record) {
  //  var href= '/sale/do/info/'+text;
  //   return <Link to={href}>{text}</Link>;
  // }
}, {
  title: '包装级数',
  dataIndex: 'Pack_Level',
  key: 'Pack_Level'
}, {
  title: '包装比例',
  dataIndex: 'Packing_Proportion',
  key: 'Packing_Proportion'
}, {
  title: '包装单位',
  dataIndex: 'Unit',
  key: 'Unit'
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



let packing_data=[];
const packing_cloumns = [
  {
    title: '包装级数',
    dataIndex: 'Level',
    key: 'Level',
    index:'Level'
  },
  {
    title: '计量单位',
    dataIndex: 'Unit',
    key: 'Unit',
    index : 'Unit',
    render:function(text,record,index){
      return (
        <Select onChange={function(value,label){
          packingUnitChange(value,label,record,'Unit')
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
    dataIndex: 'Lower_PackageQTY',
    key: 'Lower_PackageQTY',
    index : 'Lower_PackageQTY',
    render : function(text,record,index){
      if(packing_data==0 || index==packing_data.length-1){
        return (<span></span>)
      }
      return (
        <InputNumber min={1} onChange={function(value,label){
          packingUnitChange(value,label,record,'Lower_PackageQTY')
        }} />
      )
    }
  }
];



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
        
        SName : {}, // 产品简称
        Product_Description : {}, // 描述
        Pack_Unit : {}, // 规格
        
      },
      formData: {
        Product_Code : '', // 商品编码
        title : '新增产品',
        Product_Name : undefined, // 产品名称
        SName : undefined, // 产品简称
        Brand : undefined, // 品牌
        Product_Description : undefined, // 描述
        Pack_Unit : undefined, // 规格
        Validity : undefined, // 有效期
        Validity_Unit:'', // 有效期单位
        Validity_Units : '', // 所有有效期类别
        Units:'', // 所有计量单位
        Industry_Code : undefined, // 行业编码
        DataImage : [], // 图片
        DataDetail : [], // 比例
        addPacking : []
      },
      upload_props : {
        name: 'file',
        showUploadList: true,
        data : {
          Token : _G.Token
        },
        action: baseProductUpload
      },
      packing_cloumns : [
        {
          title: '包装级数',
          dataIndex: 'Level',
          key: 'Level',
          index:'Level'
        },
        {
          title: '计量单位',
          dataIndex: 'Unit',
          key: 'Unit',
          index : 'Unit',
          render:function(text,record,index){
            return (
              <Select onChange={function(value,label){
                packingUnitChange(value,label,record,'Unit')
              }} style={{width:'60px'}}>
                {this.state.formData.Units}
              </Select>
            )
          }
        },
        {
          title: '下级包装数量',
          dataIndex: 'Lower_PackageQTY',
          key: 'Lower_PackageQTY',
          index : 'Lower_PackageQTY',
          render : function(text,record,index){
            if(packing_data==0 || index==packing_data.length-1){
              return (<span></span>)
            }
            return (
              <InputNumber min={1} onChange={function(value,label){
                packingUnitChange(value,label,record,'Lower_PackageQTY')
              }} />
            )
          }
        }
      ]
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

  // 删除表格中某条数据
  modalState(id,index,name){
    console.log(id,index,name)
    // var data = Object.assign({},this.state);
    // data.formData.addPacking.splice(index,1);

    // this.setState(data);
  }

  componentDidMount(){
    packingUnitChange = this.packingUnitChange;
    modalState = this.modalState;

    //baseProductUpload += '?Token='+_G.Token;
    var upload_props = Object.assign({},this.state.upload_props);
    upload_props.Token = _G.Token;
    this.setState({
      upload_props : upload_props
    })

    // 获取有效期
    var that = this;
    _G.get_data(config['base']['product']['dic'],'Validity_Unit',{},function(res){
      
      const doms = res.Data.map( (item,index)=>{
        return <Option key={index} value={item['CODE_NM']}>{item['CODE_NM']}</Option>
      } )
      that.setState({
        Validity_Units : doms
      })
    }); 

    // 获取计量单位
    var that = this;
    _G.get_data(config['base']['product']['unit'],'product_Units',{},function(res){
      
      const doms = res.Data.map( (item,index)=>{
        return <Option key={index} value={item['CODE_NM']}>{item['CODE_NM']}</Option>
      } )
      that.setState({
        Units : doms
      })
    }); 


    // 编辑
    if(this.props.params.id){
      // ajax获取当前id的内容，变更state ****************************
      _G.ajax({
        url : baseProductOne,
        type : 'get',
        data : {
          Product_Code : this.props.params.id
        },
        success:function(res){
          console.log(res)
          
          var d = {
              Product_Code : this.props.params.id,
              title : '编辑产品',
              Product_Name : res.Data.Product_Name, // 产品名称
              SName : res.Data.SName, // 产品简称
              Brand : res.Data.Brand, // 品牌
              Product_Description : res.Data.Product_Description, // 描述
              Pack_Unit : res.Data.Pack_Unit, // 规格
              Validity : res.Data.Validity, // 有效期
              Validity_Unit:res.Data.Validity_Unit, // 有效期单位
              Validity_year : undefined, // 有效期年份
              Validity_month : undefined, // 有效期月份
              Industry_Code : res.Data.Industry_Code, // 行业编码 商品码
              DataImage : res.DataImage, // 图片
              DataDetail : [], // 比例
              addPacking : res.DataDetail
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
        Level : i,
        Lower_PackageQTY:'',
        Pack_Level:value-i,
        Unit : undefined,
        Packing_Proportion:undefined
      }
    }
    packing_data.length = value;
    let state = Object.assign({},this.state);
    //state.formData.addPacking.level = value;
    state.formData.addPacking = d;
    this.setState(state);
  }

  // 新增比例 单位 // 新增比例 数量
  packingUnitChange(e,label,record,type){
    console.log(e,label)
    let state = Object.assign({},this.state);
    state.formData.addPacking[record.index][type] = e;
    this.setState(state);
  }
  
  packingSizeChange(e){
    let state = Object.assign({},this.state);
    state.formData.addPacking[e.index] = e;
    this.setState(state);
  }

  renderPackage(){
    let data = this.state.formData.addPacking;
    
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
                  id="SName"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}}
                  validateStatus={this.renderValidateStyle('SName')}
                  help={status.SName.errors ? status.SName.errors.join(',') : null}
                  required>
                    <Validator rules={[{required: true, message: '请输入产品简称',type:"string"}]}>
                      <Input name="SName" value={formData.SName} />
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
                  id="Product_Description"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}}
                  >
                    <Input type="textarea" name="Product_Description" value={formData.Product_Description} />
                    
                </FormItem>
            </Col>
            <Col span="12">
                <FormItem
                  label="有效期："
                  id="Validity"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}} >
                    <Row>
                      <Col span="15">
                        <InputNumber name="Validity" value={formData.Validity} onChange={this.onChange.bind(this,'Validity')} />
                      </Col>
                      <Col span="9">
                        <Select name="Validity_Unit" defaultValue={formData.Validity_Unit} style={{width:'100%'}} value={formData.Validity_Unit} onChange={this.onChange.bind(this,'Validity_Unit')}>
                          {this.state.Validity_Units}
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
                  id="Unit"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}} >
                    <Input name="Unit" value={formData.Unit} onChange={this.setValue} />
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
                    <Table  columns={columns} dataSource={formData.addPacking} pagination={false} size='small'  />
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
                      <Dragger  {...this.upload_props} onChange={this.uploadChange} style={{height:100}}>
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


