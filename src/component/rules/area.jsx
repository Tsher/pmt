// 积分规则  批次区域管理
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
      batchNumStart : undefined, // 起始批次号
      batchNumEnd: undefined, // 结束批次号
      boxNumStart:undefined, // 起始箱号
      boxNumEnd:undefined, // 结束箱号
      saleRegion : undefined  // 销售区域
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
      <Form inline onSubmit={this.handleSubmit}>
      <Row>
        <Col span="24" >
            <div className="">
            <ul className="clearfix">
	            <li className="fleft">
		            	<FormItem
			            label="起始批次号："
			            id="batchNumStart">
			              <Input placeholder="" id="batchNumStart" name="batchNumStart" onChange={this.setValue} value={this.state.batchNumStart} />
			          </FormItem>
			          <FormItem
			            label="至　"
			            id="batchNumEnd">
			              <Input placeholder="" id="batchNumEnd" name="batchNumEnd" onChange={this.setValue} value={this.state.batchNumEnd} />
			          </FormItem>
	            </li>
	            <li className="fleft">
		            	<FormItem
			            label="起始箱号："
			            id="boxNumStart">
			              <Input placeholder="" id="boxNumStart" name="boxNumStart" onChange={this.setValue} value={this.state.boxNumStart} />
			          </FormItem>
			          <FormItem
			            label="至　"
			            id="boxNumEnd">
			              <Input placeholder="" id="boxNumEnd" name="boxNumEnd" onChange={this.setValue} value={this.state.boxNumEnd} />
			          </FormItem>
	            </li>
              
              
              <li className="fleft">
			    <FormItem
		            label="销售区域："
		            id="saleRegion">
		            	<Select size="large" placeholder="选择销售区域" style={{width: 200}} name="saleRegion"  value={this.state.saleRegion} onChange={this.onChange.bind(this,'saleRegion')}>
		                    <Option value="华南">华南</Option>
					        <Option value="华北">华北</Option>
					        <Option value="西南">西南</Option>
					        < Option value="西北">西北</Option>
		                  </Select>
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
          <Row className="clearfix" style={{marginBottom:'20px'}}>
              <Col span="2" >
                <Link to='/rule/area/add'>
                  <Button type="primary" size="large"><Icon type="plus" /><span>新增</span></Button>
                </Link>
              </Col>
              <Col span="2" >
                <Link to='/rule/area/exports'>
                  <Button type="primary" size="large"><Icon type="download" /><span>导出报表</span></Button>
                </Link>
              </Col>
            </Row>
        </Col>
        </Row>
      </Form>
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
  title: '序号',
  dataIndex: 'No',
  key: 'No'
}, {
  title: '起始批次号',
  dataIndex: 'batchNumStart',
  key: 'batchNumStart'
}, {
  title: '结束批次号',
  dataIndex: 'batchNumEnd',
  key: 'batchNumEnd'
}, {
  title: '起始箱号',
  dataIndex: 'boxNumStart',
  key: 'boxNumStart'
},{
  title: '结束箱号',
  dataIndex: 'boxNumEnd',
  key: 'boxNumEnd'
},{
  title: '销售区域',
  dataIndex: 'saleRegion',
  key: 'saleRegion'
},{
  title: '录入时间',
  dataIndex: 'areaTime',
  key: 'areaTime'
}, {
  title: '操作',
  key: 'operation',
  render: function(text, record) {
  	var edit = '/rule/area/edit/'+record.No,
  		del = '/rule/area/del/' + record.No
    return <span><Link to={edit}>编辑</Link><span className="ant-divider"></span><a href="#" onClick={showModal} data-id={record.No} data-text="删除" >删除</a></span>;
	}
}];
const data = [{
  key: '1',
  No: '000001',
  batchNumStart: 2015102840,
  batchNumEnd : 2015102899,
  boxNumStart : 10001,
  boxNumEnd : 10008,
  saleRegion : '华南',
  areaTime : '2015-10-10 10:30'
}, {
  key: '2',
  No: '000002',
  userName: '李楠',
  batchNumStart: 2015102840,
  batchNumEnd : 2015102899,
  boxNumStart : 10001,
  boxNumEnd : 10008,
  saleRegion : '华南',
  areaTime : '2015-10-10 10:30'
}, {
  key: '3',
  No: '000003',
  batchNumStart: 2015102840,
  batchNumEnd : 2015102899,
  boxNumStart : 10001,
  boxNumEnd : 10008,
  saleRegion : '华南',
  areaTime : '2015-10-10 10:30'
}, {
  key: '4',
  No: '000004',
  batchNumStart: 2015102840,
  batchNumEnd : 2015102899,
  boxNumStart : 10001,
  boxNumEnd : 10008,
  saleRegion : '华南',
  areaTime : '2015-10-10 10:30'
}, {
  key: '5',
  No: '000005',
  batchNumStart: 2015102840,
  batchNumEnd : 2015102899,
  boxNumStart : 10001,
  boxNumEnd : 10008,
  saleRegion : '华南',
  areaTime : '2015-10-10 10:30'
}, {
  key: '6',
  No: '000006',
  batchNumStart: 2015102840,
  batchNumEnd : 2015102899,
  boxNumStart : 10001,
  boxNumEnd : 10008,
  saleRegion : '华南',
  areaTime : '2015-10-10 10:30'
}];


class RuleArea extends React.Component{
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
      ModalText: '你正要删除 "'+ id +'"的批次号，是否继续？',
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
					<SelectForm />
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
	RuleArea : RuleArea
}