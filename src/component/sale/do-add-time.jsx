// 促销管理  促销活动设置 添加活动 时间区间中奖率

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

import moment from 'moment';

const RadioGroup = Radio.Group;

const RangePicker = DatePicker.RangePicker;
const confirm = Modal.confirm;
const history = createHistory();

const FormItem = Form.Item;

let changeState;


// 奖品json
const prizes = {
  'prize-1' : '奖品1',
  'prize-2' : '奖品2',
  'prize-3' : '奖品3',
  'prize-4' : '奖品4',
  'prize-5' : '奖品5',
}


let clean;

class SelectForm extends React.Component{
	//mixins: [Form.ValueMixin],

  constructor() {
  	super();
    this.state =  {
      index : undefined, // 本次规则在table数据中得index
      prizeId : undefined, // 奖品编码,
      prizeName : undefined, // 奖品名称
      prizeLevel : undefined, // 奖品级别
      probability_first : undefined, // 首次中奖率
      probability : undefined, // 非首次中奖率
      prize_startTime : undefined, // 中奖时间
      prize_endTime : undefined, // 中奖时间
      prize_type : 1, // 抽奖模式  1 = 时间区间  2=区域  3 = 产品
    };

    this.setValue = this.setValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.disabledEndDate = this.disabledEndDate.bind(this);
    this.changeState = this.changeState.bind(this);
    this.clean =this.clean.bind(this);
  }

  componentDidMount(){
    changeState = this.changeState;
    clean = this.clean;
  }
  componentWillUnmount(){
    changeState = null;
    clean = null;
  }

  
  // 文本框的值 同步到 state
  setValue(e){
    var name = e.target.id;
    
  	this.setState({
      [name] : e.target.value
  	})
  }

  changeState(data){
    this.setState(data);
  }

  clean(){
    this.setState({
      index : undefined, // 本次规则在table数据中得index
      prizeId : undefined, // 奖品编码,
      prizeName : undefined, // 奖品名称
      prizeLevel : undefined, // 奖品级别
      probability_first:undefined, // 首次中奖率
      probability : undefined, // 非首次中奖率
      prize_startTime : undefined, // 中奖时间
      prize_endTime : undefined, // 中奖时间
      prize_type : 1, // 抽奖模式  1 = 时间区间  2=区域  3 = 产品
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


    // 修改已有数据
    if(this.state.index){
      updateTableData(this.state.index,this.state); // 调用父节点的更新方法
    }else{
      
      updateTableData(data.length,this.state);
    }


    this.clean();

    
  }

  // datepicker change
  onChange(field,value){
    // 选择奖品时，同时写入奖品名称
    if(field == 'prizeId'){
      this.setState({
        'prizeName' : prizes[value]
      })
    }
   
    this.setState({
      [field] : value
    })
  }
  

  disabledEndDate(endValue){
    if (!endValue || !this.state.prize_startTime) {
      return false;
    }
    return endValue.getTime() <= this.state.prize_startTime.getTime();
  }

 
  render() {
    return (
    	<div className="do-add-time-con">
      <Form inline onSubmit={this.handleSubmit}>
      <ul className="clearfix do-add-time">
        <li span="8" className="fleft" style={{width:'30%'}}>
          <label className="do-add-time-title">奖品名称：</label>
          <Select size="large" placeholder="请选择奖品" style={{width: 140}} name="prizeId"  value={this.state.prizeId} onChange={this.onChange.bind(this,'prizeId')}>
                    <Option value="prize-1">奖品1</Option>
                    <Option value="prize-2">奖品2</Option>
                    <Option value="prize-3">奖品3</Option>
                    <Option value="prize-4">奖品4</Option>
                    <Option value="prize-5">奖品5</Option>
                  </Select>
        </li>
        <li span="8" className="fleft" style={{width:'30%'}}>
        <label className="do-add-time-title">奖品级别：</label>
          <Select name="prizeLevel"  style={{width: 140}} value={this.state.prizeLevel} onChange={this.onChange.bind(this,'prizeLevel')}>
                    <Option value="prizelevel-1">奖品级别1</Option>
                    <Option value="prizelevel-2">奖品级别2</Option>
                    <Option value="prizelevel-3">奖品级别3</Option>
                    <Option value="prizelevel-4">奖品级别4</Option>
                    <Option value="prizelevel-5">奖品级别5</Option>
                  </Select>
        </li>
      </ul>
      <ul className="clearfix do-add-time">
        <li className="fleft" style={{width:'30%'}} span="8">
          <label className="do-add-time-title">首次中奖率：</label>
          <Input placeholder="" id="probability_first" name="probability_first" style={{width:140}}  value={this.state.probability_first} onChange={this.setValue}  />
         
          <span className="ant-form-text"> %</span>
        </li>
        <li className="fleft" style={{width:'30%'}}  span="8">
        <label className="do-add-time-title">非首次中奖率：</label>
        <Input placeholder="" id="probability" name="probability" style={{width:140}}   value={this.state.probability}  onChange={this.setValue} />
                    <span className="ant-form-text"> %</span>
         
        </li>
      </ul>
      <ul className="do-add-time clearfix">
        <li className="fleft" style={{width:'70%'}}  span="20">
          <label className="do-add-time-title">活动时间：</label>
          <span className="timepicker">
            <DatePicker format="yyyy-MM-dd HH:mm:ss" name="prize_startTime" style={{width:150}} showTime placeholder="开始日期" value={this.state.prize_startTime} onChange={this.onChange.bind(this,'prize_startTime')}  />
          </span>
          <span className="timepicker-space"> -- </span>
          <span className="timepicker">
            <DatePicker format="yyyy-MM-dd HH:mm:ss" name="prize_endTime" style={{width:150}}   showTime disabledDate={this.disabledEndDate} value={this.state.prize_endTime} placeholder="结束日期" onChange={this.onChange.bind(this,'prize_endTime')} />
          </span>
        </li>
        <li className="fright" span="4">
          <Button type="primary" size="large"  htmlType="submit">添加</Button>
        </li>
      </ul>
      </Form>
      </div>
    );
  }
}

let modalState;

function showModal(e){
  Event.stop(e);
  var tar = Event.target(e);
  var id = tar.getAttribute('data-id'),name = tar.getAttribute('data-prizename');
  modalState(id,name)
}


// 编辑按钮事件
function EditPrize(e){
  Event.stop(e);
  var tar = Event.target(e);
  var id = tar.getAttribute('data-id');
  // 根据id 取值
  var d = data[id]; //根据id获取到本规则的值,传递给selectForm
  d.index = id;
  changeState(d);
}

let updateTableData;

const columns = [{
  title: '奖品编号',
  dataIndex: 'prizeId',
  key: 'prizeId'
}, {
  title: '奖品名称',
  dataIndex: 'prizeName',
  key: 'prizeName'
}, {
  title: '奖品级别',
  dataIndex: 'prizeLevel',
  key: 'prizeLevel'
}, {
  title: '首次中奖率',
  dataIndex: 'probability_first',
  key: 'probability_first'
},{
  title: '非首次中奖率',
  dataIndex: 'probability',
  key: 'probability'
},{
  title: '起始时间',
  dataIndex: 'prize_startTime',
  key: 'prize_startTime'
},{
  title: '截止时间',
  dataIndex: 'prize_endTime',
  key: 'prize_endTime'
},{
  title: '抽奖模式',
  dataIndex: 'prize_type',
  key: 'prize_type'
}, {
  title: '操作',
  key: 'operation',
  render: function(text, record,index) {
  	var edit = '/sale/do/edit/'+record.prizeId,
  		del = '/sale/user/del/' + record.prizeId
    return <span><a href="#" onClick={EditPrize} data-id={record.key} data-text="编辑" >编辑</a><span className="ant-divider"></span><a href="#" onClick={showModal} data-id={record.key} data-prizename={record.prizeName} data-text="删除" >删除</a></span>;
	}
}];

let data = [{
  key: 0,
  prizeId: '000001',
  prizeName: '矿泉水1',
  prizeLevel : '1级',
  probability_first : '1.2',
  probability : '0.3',
  prize_startTime : '2015-12-12 23:32:23',
  prize_endTime: '2015-12-23 23:23:23',
  prize_type : 1
}, {
  key: 1,
  prizeId: '000002',
  prizeName: '矿泉水2',
  prizeLevel : '1级',
  probability_first : '1.2',
  probability : '0.3',
  prize_startTime : '2015-12-12 23:32:23',
  prize_endTime: '2015-12-23 23:23:23',
  prize_type : 1
}, {
  key: 2,
  prizeId: '000003',
  prizeName: '矿泉水3',
  prizeLevel : '1级',
  probability_first : '1.2',
  probability : '0.3',
  prize_startTime : '2015-12-12 23:32:23',
  prize_endTime: '2015-12-23 23:23:23',
  prize_type : 1
}];







class SaleADDTime extends React.Component{
	constructor(){
		super();
    this.state = {
      visible : undefined,
      ModalText: '',
      confirmLoading: false,
      changeId : undefined, // 删除数据，在table数据中得index
      data : data, 
    }
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.updateTableData = this.updateTableData.bind(this); // 更新state.data
	}

  componentDidMount(){
    modalState = this.showModal;
    updateTableData = this.updateTableData;

    data = this.props.data;
    this.setState({
      data : this.props.data
    })
    
  }
  componentWillUnmount(){
    modalState = false;
    updateTableData = false;
  }

  showModal(id,name){
    console.log(id,name)
    this.setState({
      visible : true,
      ModalText: '你正要删除 "'+ name +'"的促销中奖规则，是否继续？',
      confirmLoading: false,
      changeId : id
    })
  }

  // update table data
  updateTableData(index,opts){
    
    // 更新 本地data
    data[index] = Object.assign({},(data[index]||{}),{
      key : index,
      prizeId : opts.prizeId, // 奖品编码,
      prizeName : opts.prizeName, // 奖品名称
      prizeLevel : opts.prizeLevel, // 奖品级别
      probability_first : opts.probability_first, // 首次中奖率
      probability :  opts.probability, // 非首次中奖率
      prize_startTime : moment(opts.prize_startTime).format('YYYY-MM-DD HH:MM:SS'), // 中奖时间
      prize_endTime : moment(opts.prize_endTime).format('YYYY-MM-DD HH:MM:SS'), // 中奖时间
      prize_type : 1, // 抽奖模式  1 = 时间区间  2=区域  
    })

    
    this.setState({
      data : data
    })

    this.props.addPrizeTime('time',data); // 同步到父页面
  }

  
  // 删除 数据
  handleOk(e){
    //******************* data 中得 index 值 = changeId , 然后 关闭****************************
    var d = [].concat(this.state.data); // 删除data中index = changeId 的值, 并同步到 全局data
    d.splice(this.state.changeId,1); // 删除data中index = changeId 的值, 
    data.splice(this.state.changeId,1); //  并同步到 本页面的全局data
    
    this.props.addPrizeTime('time',data); // 同步到父页面
   
    console.log(d,this.state.changeId)

    // 重置key
    d.map(function(item,index){
      d[index].key = index;
      data[index].key = index;
    })

    // 清除form里面的内容；
    clean();

    this.setState({
      data : d,
      confirmLoading:true
    })

    // 临时关闭
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

	render(){
		return(
			<div className="m-list">
				<Row>
					<Col span="24">
						<SelectForm addPrizeTime={this.props.addPrizeTime}  />
					</Col>
				</Row>
				<Row>
					<Table columns={columns} dataSource={this.props.data} pagination={{showQuickJumper:true,pageSize:10,current:1,showSizeChanger:true,total:this.state.total}}  />
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
	SaleADDTime : SaleADDTime
}