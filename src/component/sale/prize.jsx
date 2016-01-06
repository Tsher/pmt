// 促销管理  奖品管理

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
      prizeName : undefined, // 奖品名称
      prizeType : undefined, // 奖品类别
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
		            label="奖品名称："
		            id="prizeName">
		              <Input placeholder="" id="prizeName" name="prizeName" onChange={this.setValue} value={this.state.prizeName} />
		          </FormItem>
            	</li>
            	<li className="fleft">
	            	<FormItem
		            label="奖品类别："
		            id="prizeType">
		            	<Select size="large" placeholder="请选择奖品类别" style={{width: 80}} name="prizeType"  value={this.state.prizeType} onChange={this.onChange.bind(this,'prizeType')}>
		                    <Option value="prize-type-1">类别1</Option>
		                    <Option value="prize-type-2">类别2</Option>
		                    <Option value="prize-type-3">类别3</Option>
		                    <Option value="prize-type-4">类别4</Option>
		                    <Option value="prize-type-5">类别5</Option>
		                  </Select>
		          </FormItem>
            	</li>
              <li className="fleft date-picker">
                <FormItem id="startTime" label="入网时间：" labelCol={{span : 5}} >
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

let modalState;
function showModal(e){
  Event.stop(e);
  var tar = Event.target(e);
  var id = tar.getAttribute('data-id');
  modalState(id)
}

const columns = [{
  title: '奖品编码',
  dataIndex: 'No',
  key: 'No',
  render: function(text,record) {
  	var href= '/sale/prize/info/'+text;
    return <Link to={href}>{text}</Link>;
  }
}, {
  title: '奖品名称',
  dataIndex: 'prizeName',
  key: 'prizeName'
}, {
  title: '品牌',
  dataIndex: 'productName',
  key: 'productName'
}, {
  title: '规格',
  dataIndex: 'size',
  key: 'size'
},{
  title: '单位',
  dataIndex: 'unit',
  key: 'unit'
},{
  title: '奖品类别',
  dataIndex: 'prizeType',
  key: 'prizeType'
}, {
  title: '入网日期',
  dataIndex: 'createTime',
  key: 'createTime'
},{
  title: '操作',
  key: 'operation',
  render: function(text, record) {
  	var edit = '/sale/prize/edit/'+record.No,
  		del = '/sale/prize/del/' + record.No
    return <span><Link to={edit}>编辑</Link><span className="ant-divider"></span><a href="#" onClick={showModal} data-id={record.No} data-text="删除" >删除</a></span>;
	}
}];
const data = [{
  key: '1',
  No: '000001',
  prizeName: '移动5元充值卡',
  productName : '移动',
  size : '250ml',
  unit : '张',
  prizeType : '话费',
  createTime : '2015-10-10 10:30',
}, {
  key: '2',
  No: '000002',
  prizeName: '移动15元充值卡',
  productName : '移动',
  size : '',
  unit : '张',
  prizeType : '话费',
  createTime : '2015-10-10 10:30',
}];






class SalePrize extends React.Component{
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
					<Col span="2">
						<Link to='/sale/prize/add'>
							<Button type="primary" size="large"><Icon type="plus" /><span>新增</span></Button>
	          			</Link>
	          		</Col>
	          		<Col span="2">
	          			<Link to='/sale/prize/exports'>
							<Button type="primary" size="large"><span>导出报表</span></Button>
	          			</Link>
					</Col>
					<Col span="20">
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
	SalePrize : SalePrize
}