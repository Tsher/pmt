// 基础信息  产品信息管理

import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import Form from 'antd/lib/form';
import message from 'antd/lib/message';
import Table from 'antd/lib/table';
import {Link} from 'react-router';
import { createHistory } from 'history';
import Modal from 'antd/lib/modal';
import Popover from 'antd/lib/popover';
import DatePicker from 'antd/lib/date-picker';
import Radio from 'antd/lib/radio';
import Tree from 'antd/lib/tree';
const TreeNode = Tree.TreeNode;

const RadioGroup = Radio.Group;


const confirm = Modal.confirm;
const history = createHistory();

const FormItem = Form.Item;

class SelectForm extends React.Component{
	//mixins: [Form.ValueMixin],

  constructor() {
  	super();
    this.state =  {
      name : undefined, // 产品名称
      brand: undefined, // 产品品牌
      startTime : undefined, // 注册开始时间
      endTime : undefined, // 注册结束时间
    };
    this.setValue = this.setValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.disabledEndDate = this.disabledEndDate.bind(this);
  }

  
  // 文本框的值 同步到 state
  setValue(e){
    var name = e.target.id;
  	this.setState({
      [name] : e.target.value
  	})
  }
  

  handleSubmit(e) {
    // ********************************************************** ajax提交数据，获取table的data值
    e.preventDefault();
    console.log(this.state)
    message.success('收到表单值~~~ ：' + JSON.stringify(this.state, function(k, v) {
      if (typeof v === 'undefined') {
        return '';
      }
      return v;
    }));
  }

  // datepicker change
  onChange(field,value){
    if(field == 'startTime' && this.state.endTime){
      if(value.getTime() > this.state.endTime.getTime()){
        this.setState({
          endTime : value,
          startTime : value
        })
        return;
      }
    }
    this.setState({
      [field] : value
    })
  }
  

  disabledEndDate(endValue){
    if (!endValue || !this.state.startTime) {
      return false;
    }
    return endValue.getTime() <= this.state.startTime.getTime();
  }

 
  render() {
    return (
    	<div className="fright">
      <Form inline onSubmit={this.handleSubmit}>
      <Row>
        <Col span="24" >
            <div className="fright">
            <ul className="clearfix">
            	<li className="fleft">
	            	<FormItem
		            label="产品名称："
		            id="name">
		              <Input placeholder="" id="name" name="name" onChange={this.setValue} value={this.state.name} />
		          </FormItem>
            	</li>
            	<li className="fleft">
	            	<FormItem
		            label="品牌："
		            id="brand">
		              <Input placeholder="" id="brand" name="brand" onChange={this.setValue} value={this.state.brand} />
		          </FormItem>
            	</li>
              <li className="fleft date-picker">
                <FormItem id="startTime" label="入网日期：" labelCol={{span : 5}} >
                  	<Row span="24" >
                  	<Col span="10">
			            <DatePicker placeholder="开始日期" onChange={this.onChange.bind(this,'startTime')} value={this.state.startTime} />
			          </Col>
			          <Col span="1">
			            <p className="ant-form-split">-</p>
			          </Col>
			          <Col span="10">
			            <DatePicker disabledDate={this.disabledEndDate} placeholder="结束日期" value={this.state.endTime} onChange={this.onChange.bind(this,'endTime')} />
			          </Col>
			          </Row>
                </FormItem>
              </li>
              <li className="fleft">
                <FormItem>
                  <Button type="primary" shape="circle" size="large"  htmlType="submit">
    	  		        <Icon type="search" />
    	  		      </Button>
                </FormItem>
              </li>
            </ul>
            
            
          </div>
        </Col>
        </Row>
      </Form>
      </div>
    );
  }
}

let modalState;
function showModal(e){
  Event.stop(e);
  var tar = Event.target(e);
  var id = tar.getAttribute('data-id'),index=tar.getAttribute('data-index')
  modalState(id,index)
}

const columns = [{
  title: '产品名称',
  dataIndex: 'productName',
  key: 'productName',
}, {
  title: '产品简称',
  dataIndex: 'productShortName',
  key: 'productShortName'
}, {
  title: '单位',
  dataIndex: 'unit',
  key: 'unit'
}, {
  title: '商品码',
  dataIndex: 'ma',
  key: 'ma'
}, {
  title: '品牌',
  dataIndex: 'brand',
  key: 'brand'
},{
  title: '规格',
  dataIndex: 'guige',
  key: 'guige'
},{
  title: '有效期',
  dataIndex: 'pretime',
  key: 'pretime'
},{
  title: '入网日期',
  dataIndex: 'createTime',
  key: 'createTime'
}, {
  title: '操作',
  key: 'operation',
  render: function(text, record,index) {
  	var edit = '/base/product/edit/'+record.ma,
  		del = '/base/product/del/' + record.ma
    return <span><Link to={edit}>编辑</Link><span className="ant-divider"></span><a href="#" onClick={showModal} data-id={record.ma} data-index={index} data-text="删除" >删除</a></span>;
	}
}];
const data = [{
  key: '1',
  productName: '产品呢1',
  productShortName:'餐1',
  unit: 'ml',
  ma : '123123123',
  brand : 'zara',
  guige : '240',
  pretime : '2015-12-12',
  createTime : '2015-10-10 10:30',
}, {
  key: '2',
  productName: '产品呢1',
  productShortName:'餐1',
  unit: 'ml',
  ma : '123123123',
  brand : 'zara',
  guige : '240',
  pretime : '2015-12-12',
  createTime : '2015-10-10 10:30',
}, {
  key: '3',
  productName: '产品呢1',
  productShortName:'餐1',
  unit: 'ml',
  ma : '123123123',
  brand : 'zara',
  guige : '240',
  pretime : '2015-12-12',
  createTime : '2015-10-10 10:30',
}];


// tree data
var _data = [
  {
    title : 'dom1111',
    key : 'key1',
    children:[
      {
        title : 'dom1-1',
        key : 'key1-1'
      },
      {
        title : 'dom1-2',
        key : 'key1-2'
      }
    ]
  },
  {
    title : 'dom2',
    key : 'key2',
    children:[
      {
        title : 'dom2-1',
        key : 'key2-1'
      },
      {
        title : 'dom2-2',
        key : 'key2-2'
      }
    ]
  }
];




class BaseProduct extends React.Component{
	constructor(){
		super();
    this.state = {
      visible : false,
      title : '',
      ModalText : '',
      changeId : false,
      index:false,
      total : 100,
      treedata : [],
      selectedKeys:[]
    }
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.checkhandle = this.checkhandle.bind(this);
	}

  componentDidMount(){
    modalState = this.showModal;

    this.setState({
      treedata : _data
    });
    
  }
  componentWillUnmount(){
    modalState = false;
  }
  showModal(id,index){
    this.setState({
      visible : true,
      ModalText: '你正要删除 "'+ id +'"的产品，是否继续？',
      confirmLoading: false,
      changeId : id,
      index:index
    })
  }
  handleOk(e){
    //******************* 冻结，解冻 逻辑 changeId , 然后 关闭****************************
    console.log(this.state.changeId,this.state.index)
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
  handleClick(e){
    console.log(e);
  }

  // 点击树菜单
  checkhandle(info){
    console.log(info.checkedKeys);
    //******************* ajax 请求，选中树节点的数据 **********************************
    this.setState({
      selectedKeys : info.checkedKeys,
    })
  }

	render(){


    const loop = (data) => {
      return data.map( (item) => {
        if(item.children){
          return (<TreeNode title={item.title} key={item.key}>{loop(item.children)}</TreeNode>);
        }else{
          return (<TreeNode title={item.title} key={item.key}></TreeNode>);
        }
      } )
    }
    const parseTree = (data) => loop(data);
    let treeNodes = parseTree(this.state.treedata);



		return(
			<div className="m-list">
				<Row>
					<Col span="2">
						<Link to='/base/product/add'>
							<Button type="primary" size="large"><Icon type="plus" /><span>新增</span></Button>
	          			</Link>
					</Col>
					<Col span="2">
						<Link to='/base/product/exports'>
							<Button type="primary" size="large"><Icon type="download" /><span>导出报表</span></Button>
	          			</Link>
					</Col>
					<Col span="20">
						<SelectForm />
					</Col>
				</Row>
				<Row>
          <Col span="4">
            <div className="border border-raduis base-product">
              <div className="title">产品类别</div>
              <div className="con">
                <Tree multiple={true} checkable={true} onCheck={this.checkhandle}>
                        {treeNodes}
                    </Tree>
              </div>
            </div>
          </Col>
          <Col span="20">
					 <Table columns={columns} dataSource={data} pagination={{showQuickJumper:true,pageSize:10,current:1,showSizeChanger:true,total:this.state.total}}  />
          </Col>
				</Row>
        <Modal 
          visible={this.state.visible}
          onOk={this.handleOk}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}>
          <p>{this.state.ModalText}</p>
        </Modal>
			</div>
		)
	}
}
module.exports = {
	BaseProduct : BaseProduct
}