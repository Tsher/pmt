// 促销管理  促销人员管理

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

const RadioGroup = Radio.Group;


const confirm = Modal.confirm;
const history = createHistory();

const FormItem = Form.Item;

class SelectForm extends React.Component{
	//mixins: [Form.ValueMixin],

  constructor() {
  	super();
    this.state =  {
      name : undefined, // 姓名
      userName: undefined, // 昵称
      startTime : undefined, // 注册开始时间
      endTime : undefined, // 注册结束时间
      mobile : undefined,  // 手机号
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
    message.success('收到表单值~~~ ：' + JSON.stringify(this.state, function(k, v) {
      if (typeof v === 'undefined') {
        return '';
      }
      return v;
    }));
  }

  // datepicker change
  onChange(field,value){
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
		            label="姓名："
		            id="name">
		              <Input placeholder="" id="name" name="name" onChange={this.setValue} value={this.state.name} />
		          </FormItem>
            	</li>
            	<li className="fleft">
	            	<FormItem
		            label="昵称："
		            id="userName">
		              <Input placeholder="" id="userName" name="userName" onChange={this.setValue} value={this.state.userName} />
		          </FormItem>
            	</li>
              <li className="fleft date-picker">
                <FormItem id="startTime" label="注册时段：" labelCol={{span : 5}} >
                  	<Row span="24" >
                  	<Col span="10">
			            <DatePicker placeholder="开始日期" onChange={this.onChange.bind(this,'startTime')} />
			          </Col>
			          <Col span="1">
			            <p className="ant-form-split">-</p>
			          </Col>
			          <Col span="10">
			            <DatePicker disabledDate={this.disabledEndDate} placeholder="结束日期" onChange={this.onChange.bind(this,'endTime')} />
			          </Col>
			          </Row>
                </FormItem>
              </li>
              
              <li className="fleft">
                <FormItem id="mobile" label="手机号：">
                  <Input placeholder="" id="mobile" name="mobile" onChange={this.setValue} value={this.state.mobile} />
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
  var id = tar.getAttribute('data-id');
  modalState(id)
}

const columns = [{
  title: '编号',
  dataIndex: 'No',
  key: 'No',
  render: function(text,record) {
  	var href= '/sale/user/info/'+text;
    return <Link to={href}>{text}</Link>;
  }
}, {
  title: '昵称',
  dataIndex: 'userName',
  key: 'userName'
}, {
  title: '电子邮箱',
  dataIndex: 'email',
  key: 'email'
}, {
  title: '手机号',
  dataIndex: 'mobile',
  key: 'mobile'
},{
  title: '注册时间',
  dataIndex: 'createTime',
  key: 'createTime'
}, {
  title: '操作',
  key: 'operation',
  render: function(text, record) {
  	var edit = '/sale/user/edit/'+record.No,
  		del = '/sale/user/del/' + record.No
    return <span><Link to={edit}>编辑</Link><span className="ant-divider"></span><a href="#" onClick={showModal} data-id={record.No} data-text="删除" >删除</a></span>;
	}
}];
const data = [{
  key: '1',
  No: '000001',
  userName: '李楠',
  mobile : 13661111111,
  createTime : '2015-10-10 10:30',
  email : 'ryw@163.com'
}, {
  key: '2',
  No: '000002',
  userName: '李楠',
  mobile : 13661111111,
  createTime : '2015-10-10 10:30',
  email : 'ryw@163.com'
}, {
  key: '3',
  No: '000003',
  userName: '李楠',
  mobile : 13661111111,
  createTime : '2015-10-10 10:30',
  email : 'ryw@163.com'
}, {
  key: '4',
  No: '000004',
  userName: '李楠',
  mobile : 13661111111,
  createTime : '2015-10-10 10:30',
  email : 'ryw@163.com'
}, {
  key: '5',
  No: '000005',
  userName: '李楠',
  mobile : 13661111111,
  createTime : '2015-10-10 10:30',
  email : 'ryw@163.com'
}, {
  key: '6',
  No: '000006',
  userName: '李楠',
  mobile : 13661111111,
  createTime : '2015-10-10 10:30',
  email : 'ryw@163.com'
}];







class SaleUser extends React.Component{
	constructor(){
		super();
    this.state = {
      visible : false,
      title : '',
      ModalText : '',
      changeId : false,
      total : 100
    }
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
	}

  componentDidMount(){
    modalState = this.showModal;
    
  }
  componentWillUnmount(){
    modalState = false;
  }
  showModal(id){
    this.setState({
      visible : true,
      ModalText: '你正要删除 "'+ id +'"的促销人员，是否继续？',
      confirmLoading: false,
      changeId : id
    })
  }
  handleOk(e){
    //******************* 冻结，解冻 逻辑 changeId , 然后 关闭****************************
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
	render(){
		return(
			<div className="m-list">
				<Row>
					<Col span="3">
						<Link to='/sale/user/add'>
							<Button type="primary" size="large"><Icon type="plus" /><span>新增</span></Button>
	          			</Link>
					</Col>
					<Col span="21">
						<SelectForm />
					</Col>
				</Row>
				<Row>
					<Table columns={columns} dataSource={data} pagination={{showQuickJumper:true,pageSize:10,current:1,showSizeChanger:true,total:this.state.total}}  />
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
	SaleUser : SaleUser
}