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

import '../../entry/config';

const saleDoAdd = config.__URL + config.sale['do']['add'];


const msg_error = function(text){
  message.error(text||'数据验证错误,请检查后提交')
}
const msg_success = function(){
  message.success('数据提交成功，等待后台处理')
}


let clean;

class SelectForm extends React.Component{
	//mixins: [Form.ValueMixin],

  constructor() {
  	super();
    this.state =  {
      index : undefined, // 本次规则在table数据中得index
      Prize_Code : undefined, // 奖品编码,
      Prize_Name : undefined, // 奖品名称
      Prize_Level : undefined, // 奖品级别
      Prize_Level_Name : undefined, // 奖品级别名称
      FirstWinningRate : undefined, // 首次中奖率
      NFirstWinningRate : undefined, // 非首次中奖率
      SActivityTime : undefined, // 中奖开始时间
      EActivityTime : undefined, // 中奖结束时间
      WinningPlaces : undefined, // 中奖名额
      prize_type : 1, // 抽奖模式  1 = 时间区间  2=区域  3 = 产品
      sale_all_prizeName : <Option value="1">1</Option>, // 所有奖品
      sale_all_prizeLevel : <Option value="1">1</Option>, // 所有奖品级别
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
    var that = this;

    // 获取奖品级别
    _G.get_data(config['sale']['do']['sale_prizeLevel'],'sale_prizeLevel',{},function(res){
      const doms = res.Data.map( (item,index)=>{
        return <Option key={index} value={item['REAL_Code']}>{item['CODE_NM']}</Option>
      } )
      that.setState({
        sale_all_prizeLevel : doms
      })
    }); 

    // 获取奖品名称
    _G.get_data(config['sale']['do']['sale_prizeName'],'sale_prizeName',{
      Prize_Name : ''
    },function(res){
      const doms = res.Data.map( (item,index)=>{
        return <Option key={index} value={item['Prize_Code']}>{item['Prize_Name']}</Option>
      } )
      that.setState({
        sale_all_prizeName : doms
      })
    }); 
    
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

  changeState(index){
    var d = this.props.data[index];
    d.index = index;
    this.setState(d);
  }

  clean(){
    this.setState({
      index : undefined, // 本次规则在table数据中得index
      Prize_Code : undefined, // 奖品编码,
      Prize_Name : undefined, // 奖品名称
      Prize_Level : undefined, // 奖品级别
      Prize_Level_Name : undefined, // 奖品级别名称
      FirstWinningRate:undefined, // 首次中奖率
      WinningPlaces : undefined, // 中奖次数
      NFirstWinningRate : undefined, // 非首次中奖率
      prize_type : 1, // 抽奖模式  1 = 时间区间  2=区域  3 = 产品
    })
  }
  

  handleSubmit(e) {
    // ********************************************************** ajax提交数据，获取table的data值
    e.preventDefault();
    console.log(this.state)
    var opts = _G.assign({},this.state);
    if(!opts.Prize_Code || !opts.Prize_Level  || !opts.SActivityTime || !opts.EActivityTime ){
      msg_error('请填写内容');
      return;
    }
    if(!opts.FirstWinningRate){
      opts.FirstWinningRate = 0;
    }
    if(!opts.NFirstWinningRate){
      opts.NFirstWinningRate = 0;
    }
    if(!opts.WinningPlaces){
      opts.WinningPlaces = 0;
    }

    // 修改已有数据
    if(this.state.index){
      updateTableData(this.state); // 调用父节点的更新方法
    }else{
      updateTableData(this.state);
    }


    this.clean();

    
  }

  // datepicker change
  onChange(field,value){
   if(field == 'Prize_Level'){
      let d;
      this.state.sale_all_prizeLevel.map( (item)=>{
        if(item.props.value == value){
          d = item.props.children
        }
      } );
      this.setState({
        'Prize_Level_Name' : d
      })
   }
   if(field == 'Prize_Code'){
    var d;
    this.state.sale_all_prizeName.map( (item)=>{
        if(item.props.value == value){
          d = item.props.children
        }
      } );
    this.setState({
      'Prize_Name' : d
    })
   }
    this.setState({
      [field] : value
    })
  }

  // 结束时间，大于开始时间，并在活动时间范围内
  disabledEndDate(endValue){
    console.log(this.props.endTime)
    if (!endValue || !this.state.SActivityTime ) {
      return false;
    }
    return endValue.getTime() <= this.state.SActivityTime.getTime() ;
  }


 
  render() {
    return (
    	<div className="do-add-time-con">
      <Form inline onSubmit={this.handleSubmit}>
      <ul className="clearfix do-add-time">
        <li span="8" className="fleft" style={{width:'30%'}}>
          <label className="do-add-time-title">奖品名称：</label>
          <Select size="large" placeholder="请选择奖品" style={{width: 140}} name="Prize_Code"  value={this.state.Prize_Code} onChange={this.onChange.bind(this,'Prize_Code')}>
            {this.state.sale_all_prizeName}
          </Select>
        </li>
        <li span="8" className="fleft" style={{width:'30%'}}>
        <label className="do-add-time-title">奖品级别：</label>
          <Select name="Prize_Level"  style={{width: 140}} value={this.state.Prize_Level} onChange={this.onChange.bind(this,'Prize_Level')}>
          {this.state.sale_all_prizeLevel}
          </Select>
        </li>
      </ul>
      <ul className="clearfix do-add-time">
        <li className="fleft" style={{width:'30%'}} span="8">
          <label className="do-add-time-title">首次中奖率：</label>
          <Input placeholder="" id="FirstWinningRate" name="FirstWinningRate" style={{width:140}}  value={this.state.FirstWinningRate} onChange={this.setValue}  />
         
          <span className="ant-form-text"> %</span>
        </li>
        <li className="fleft" style={{width:'30%'}}  span="8">
        <label className="do-add-time-title">非首次中奖率：</label>
        <Input placeholder="" id="NFirstWinningRate" name="NFirstWinningRate" style={{width:140}}   value={this.state.NFirstWinningRate}  onChange={this.setValue} />
                    <span className="ant-form-text"> %</span>
         
        </li>
        <li className="fleft" style={{width:'30%'}}  span="8">
        <label className="do-add-time-title">中奖名额：</label>
        <Input placeholder="" id="WinningPlaces" name="WinningPlaces" style={{width:100}}   value={this.state.WinningPlaces}  onChange={this.setValue} />
        </li>
      </ul>
      <ul className="do-add-time clearfix">
        <li className="fleft" style={{width:'70%'}}  span="20">
          <label className="do-add-time-title">活动时间：</label>
          <span className="timepicker">
            <DatePicker format="yyyy-MM-dd HH:mm:ss" name="SActivityTime" style={{width:150}} showTime placeholder="开始日期" value={this.state.SActivityTime} onChange={this.onChange.bind(this,'SActivityTime')}  />
          </span>
          <span className="timepicker-space"> -- </span>
          <span className="timepicker">
            <DatePicker format="yyyy-MM-dd HH:mm:ss" name="EActivityTime" style={{width:150}}   showTime disabledDate={this.disabledEndDate} value={this.state.EActivityTime} placeholder="结束日期" onChange={this.onChange.bind(this,'EActivityTime')} />
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
  var id = tar.getAttribute('data-id'),index=tar.getAttribute('data-index'),name = tar.getAttribute('data-prizename');
  modalState(id,name,index)
}


// 编辑按钮事件
function EditPrize(e){
  Event.stop(e);
  var tar = Event.target(e);
  var id = tar.getAttribute('data-id'),
      index=tar.getAttribute('data-index');
  changeState(index);
}

let updateTableData;

const columns = [{
  title: '奖品编号',
  dataIndex: 'Prize_Code',
  key: 'Prize_Code'
}, {
  title: '奖品名称',
  dataIndex: 'Prize_Name',
  key: 'Prize_Name'
}, {
  title: '奖品级别',
  dataIndex: 'Prize_Level_Name',
  key: 'Prize_Level_Name'
}, {
  title: '首次中奖率',
  dataIndex: 'FirstWinningRate',
  key: 'FirstWinningRate'
},{
  title: '非首次中奖率',
  dataIndex: 'NFirstWinningRate',
  key: 'NFirstWinningRate'
},{
  title: '起始时间',
  dataIndex: 'SActivityTime',
  key: 'SActivityTime'
},{
  title: '截止时间',
  dataIndex: 'EActivityTime',
  key: 'EActivityTime'
},{
  title: '抽奖模式',
  dataIndex: 'prize_type',
  key: 'prize_type',
  render:function(){
    return <span>时间抽奖</span>
  }
}, {
  title: '操作',
  key: 'operation',
  render: function(text, record,index) {
  	var edit = '/sale/do/edit/'+record.Prize_Code,
  		del = '/sale/user/del/' + record.Prize_Code
    return <span><a href="#" onClick={EditPrize} data-id={record.key} data-index={index} data-text="编辑" >编辑</a><span className="ant-divider"></span><a href="#" onClick={showModal} data-id={record.key} data-index={index} data-name={record.Prize_Name} data-text="删除" >删除</a></span>;
	}
}];

var allData=[];


class SaleADDTime extends React.Component{
	constructor(){
		super();
    this.state = {
      visible : undefined,
      ModalText: '',
      confirmLoading: false,
      changeId : undefined, // 删除数据，在table数据中得index
      index : undefined,
    }
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.updateTableData = this.updateTableData.bind(this); // 更新state.data
	}

  componentDidMount(){
    modalState = this.showModal;
    updateTableData = this.updateTableData;

    
  }
  componentWillUnmount(){
    modalState = false;
    updateTableData = false;
  }

  showModal(id,name,index){
    console.log(id,name,index)
    this.setState({
      visible : true,
      ModalText: '你正要删除 "'+ name +'"的促销中奖规则，是否继续？',
      confirmLoading: false,
      index : index,
      changeId : id
    })
  }

  // update table data
  updateTableData(opts){
    
    console.log(opts);
    
    if(!opts.Prize_Code || !opts.Prize_Level  || !opts.SActivityTime || !opts.EActivityTime ){
      msg_error('请填写内容');
      return;
    }
    if(!opts.FirstWinningRate){
      opts.FirstWinningRate = 0;
    }
    if(!opts.NFirstWinningRate){
      opts.NFirstWinningRate = 0;
    }
    if(!opts.WinningPlaces){
      opts.WinningPlaces = 0;
    }


    this.props.addPrizeTime('time',opts); // 同步到父页面
  }

  
  // 删除 数据
  handleOk(e){
    //******************* data 中得 index 值 = changeId , 然后 关闭****************************
    
    this.props.delPrizeTime('time',this.state.index); // 同步到父页面
   

    // 清除form里面的内容；
    clean();
    this.setState({
      visible : false
    })
    
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
						<SelectForm addPrizeTime={this.props.addPrizeTime} data={this.props.data}  />
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