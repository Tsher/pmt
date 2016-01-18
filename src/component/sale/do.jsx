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


import '../../entry/config';


// 用户列表api  http://172.31.0.49:8088/api/SUser/GetUsers?EntityCode=DEFAULT&page=0&pagesize=100
// page ：当前请求页
// pageSize : 每页条数
// EntityCode : DEFAULT 

const saleDoList = config.__URL + config.sale['do']['list'];
const urlUserDel  = config.__URL + config.user.user.del;


class SelectForm extends React.Component{
	//mixins: [Form.ValueMixin],

  constructor() {
  	super();
    this.state =  {
      MA_Name : undefined, // 活动名称
      MA_StartTime : undefined, // 注册开始时间
      MA_EndTime : undefined, // 注册结束时间
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


    this.props.changeTableState(this.state);



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
    if (!endValue || !this.state.MA_StartTime) {
      return false;
    }
    return endValue.getTime() <= this.state.MA_StartTime.getTime();
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
		            id="MA_Name">
		              <Input placeholder="" id="MA_Name" name="MA_Name" onChange={this.setValue} value={this.state.MA_Name} />
		          </FormItem>
            	</li>
            	
              <li className="fleft date-picker">
                  <FormItem id="MA_StartTime" label="活动时间：" labelCol={{span : 5}} >
                  	<Row span="24" >
                  	<Col span="10">
			            <DatePicker placeholder="开始日期" onChange={this.onChange.bind(this,'MA_StartTime')} />
			          </Col>
			          <Col span="1">
			            <p className="ant-form-split">-</p>
			          </Col>
			          <Col span="10">
			            <DatePicker disabledDate={this.disabledEndDate} placeholder="结束日期" onChange={this.onChange.bind(this,'MA_EndTime')} />
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
              <li className="fleft">
                <FormItem>
                  <Button type="primary" size="large">
                    导出excel
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
    state = tar.getAttribute('data-rstatus');
  modalStatePublish(id,state)
}

const columns = [{
  title: '活动编码',
  dataIndex: 'MA_Code',
  key: 'MA_Code',
  // render: function(text,record) {
  // 	var href= '/sale/do/info/'+text;
  //   return <Link to={href}>{text}</Link>;
  // }
}, {
  title: '活动名称',
  dataIndex: 'MA_Name',
  key: 'MA_Name'
}, {
  title: '活动状态',
  dataIndex: 'MA_Status',
  key: 'MA_Status'
},{
  title: '发布状态',
  dataIndex: 'MA_RStatus',
  key: 'MA_RStatus'
},{
  title: '活动开始时间',
  dataIndex: 'MA_StartTime',
  key: 'MA_StartTime'
},{
  title: '活动结束时间',
  dataIndex: 'MA_EndTime',
  key: 'MA_EndTime'
}, {
  title: '操作',
  key: 'operation',
  render: function(text, record) {
  	var publish = '/sale/do/publish/'+ record.MA_Code,
      edit = '/sale/do/edit/'+record.MA_Code,
  		del = '/sale/do/del/' + record.MA_Code
    return <span><a href="#" onClick={showModalPublish} data-id={record.MA_Code} data-rstatus={record.MA_RStatus}>{record.MA_RStatus}</a><span className="ant-divider"></span><Link to={edit}>编辑</Link><span className="ant-divider"></span><a href="#" onClick={showModal} data-id={record.MA_Code} data-text="删除" >删除</a></span>;
	}
}];
const data = [];
// {
//   key: '1',
//   MA_Code: '000001',
//   MA_Name: '活动名称1',
//   area : '华北',
//   MA_Status : '进行中',
//   MA_RStatus : '发布',
//   MA_StartTime : '2015-10-10 12:30',
//   MA_EndTime : '2015-12-12 12:30'
// }


class SaleDo extends React.Component{
	constructor(){
		super();
    this.state = {
      visible : false,
      title : '',
      ModalText : '',
      changeId : false,  // 删除id
      publishId : false, // 发布ids
      MA_RStatus : false, // 发布状态
      total : 1,
      page : 1,
      pagesize: 10,
    }
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.showModalPublish = this.showModalPublish.bind(this);
    this.changeTableState = this.changeTableState.bind(this);
	}

  componentDidMount(){
    modalState = this.showModal;
    modalStatePublish = this.showModalPublish;


  }
  componentWillUnmount(){
    modalState = false;
    modalStatePublish = false;
  }

  // 发送ajax请求，获取table值
  changeTableState(opts){
    var opts = opts || {};
    opts.page = this.state.page*1-1;
    opts.pagesize = this.state.pagesize;
    //opts.EntityCode = 'DEFAULT';
    var that = this;

    _G.ajax({
      url : saleDoList,
      method: "get",
      data : opts,
      success:function(res){
        var d = [];
        for(var i=0,l=res.Data.length;i<l;i++){
          d[i]=res.Data[i];
          d[i]['key'] = res.Data[i].MA_Code;
        }
        this.setState({
          data : d,
          total : Math.ceil(res.TotalCount/this.state.pagesize)
        })

      }.bind(this)

    })

  }


  // 删除
  showModal(id){
    this.setState({
      visible : true,
      ModalText: '你正要删除 "'+ id +'"的活动，是否继续？',
      confirmLoading: false,
      publishId : false,
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
      changeId : false,
      MA_RStatus : state == '已发布' ? 1 : 0
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
        MA_RStatus : false
      })
    },2000)
  }
  handleCancel(e){
    this.setState({
      visible : false,
      changeId : false,
      publishId : false,
      MA_RStatus : false
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
						<SelectForm changeTableState={this.changeTableState} />
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