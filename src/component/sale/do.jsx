// 促销管理  促销活动设置

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
      name : undefined, // 活动名称
      area: undefined, // 区域
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
		            label="活动名称："
		            id="name">
		              <Input placeholder="" id="name" name="name" onChange={this.setValue} value={this.state.name} />
		          </FormItem>
            	</li>
            	<li className="fleft">
	            	<FormItem
		            label="活动区域："
		            id="area">
		              <Input placeholder="" id="area" name="area" onChange={this.setValue} value={this.state.area} />
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

let modalState,modalStatePublish;

// 删除
function showModal(e){
  Event.stop(e);
  var tar = Event.target(e);
  var id = tar.getAttribute('data-id');
  modalState(id)
}
// 发布
function showModalPublish(e){
  Event.stop(e);
  var tar = Event.target(e);
  var id = tar.getAttribute('data-id'),
    state = tar.getAttribute('data-publishstate');
  console.log(state)
  modalStatePublish(id,state)
}

const columns = [{
  title: '活动编码',
  dataIndex: 'No',
  key: 'No',
  // render: function(text,record) {
  // 	var href= '/sale/do/info/'+text;
  //   return <Link to={href}>{text}</Link>;
  // }
}, {
  title: '活动名称',
  dataIndex: 'name',
  key: 'name'
}, {
  title: '活动区域',
  dataIndex: 'area',
  key: 'area'
}, {
  title: '活动状态',
  dataIndex: 'state',
  key: 'state'
},{
  title: '发布状态',
  dataIndex: 'publishState',
  key: 'publishState'
},{
  title: '活动开始时间',
  dataIndex: 'startTime',
  key: 'startTime'
},{
  title: '活动结束时间',
  dataIndex: 'endTime',
  key: 'endTime'
}, {
  title: '操作',
  key: 'operation',
  render: function(text, record) {
  	var publish = '/sale/do/publish/'+ record.No,
      edit = '/sale/do/edit/'+record.No,
  		del = '/sale/do/del/' + record.No
    return <span><a href="#" onClick={showModalPublish} data-id={record.No} data-publishstate={record.publishState}>{record.publishState}</a><span className="ant-divider"></span><Link to={edit}>编辑</Link><span className="ant-divider"></span><a href="#" onClick={showModal} data-id={record.No} data-text="删除" >删除</a></span>;
	}
}];
const data = [{
  key: '1',
  No: '000001',
  name: '活动名称1',
  area : '华北',
  state : '进行中',
  publishState : '发布',
  startTime : '2015-10-10 12:30',
  endTime : '2015-12-12 12:30'
}, {
  key: '2',
  No: '000002',
  name: '活动名称2',
  area : '华北',
  state : '进行中',
  publishState : '已发布',
  startTime : '2015-10-10 12:30',
  endTime : '2015-12-12 12:30'
}, {
  key: '3',
  No: '000003',
  name: '活动名称3',
  area : '华北',
  state : '进行中',
  publishState : '已发布',
  startTime : '2015-10-10 12:30',
  endTime : '2015-12-12 12:30'
}, {
  key: '4',
  No: '000004',
  name: '活动名称4',
  area : '华北',
  state : '进行中',
  publishState : '已发布',
  startTime : '2015-10-10 12:30',
  endTime : '2015-12-12 12:30'
}, {
  key: '5',
  No: '000005',
  name: '活动名称5',
  area : '华北',
  state : '进行中',
  publishState : '已发布',
  startTime : '2015-10-10 12:30',
  endTime : '2015-12-12 12:30'
}, {
  key: '6',
  No: '000006',
  name: '活动名称6',
  area : '华北',
  state : '进行中',
  publishState : '已发布',
  startTime : '2015-10-10 12:30',
  endTime : '2015-12-12 12:30'
}];



class SaleDo extends React.Component{
	constructor(){
		super();
    this.state = {
      visible : false,
      title : '',
      ModalText : '',
      changeId : false,  // 删除id
      publishId : false, // 发布ids
      publishState : false, // 发布状态
      total : 100
    }
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.showModalPublish = this.showModalPublish.bind(this);
	}

  componentDidMount(){
    modalState = this.showModal;
    modalStatePublish = this.showModalPublish;
  }
  componentWillUnmount(){
    modalState = false;
    modalStatePublish = false;
  }


  // 删除
  showModal(id){
    this.setState({
      visible : true,
      ModalText: '你正要删除 "'+ id +'"的活动，是否继续？',
      confirmLoading: false,
      changeId : id
    })
  }

  // 发布 选项，
  showModalPublish(id,state){
    var type = state == '已发布' ? '停止发布' : '发布';

    this.setState({
      visible : true,
      ModalText: '你正要 '+type+'"'+ id +'"的活动，是否继续？',
      confirmLoading: false,
      publishId : id,
      publishState : state == '已发布' ? 1 : 0
    })
  }
  handleOk(e){
    //******************* 冻结，解冻 逻辑 changeId , publishId , 然后 关闭****************************
    this.setState({
      confirmLoading:true
    })
    setTimeout(()=>{
      this.setState({
        visible : false,
        changeId : false,
        publishId : false,
        publishState : false
      })
    },2000)
  }
  handleCancel(e){
    this.setState({
      visible : false,
      changeId : false,
      publishId : false,
      publishState : false
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
						<Link to='/sale/do/add'>
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
	SaleDo : SaleDo
}