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
      Prize_Name : '', // 奖品名称
      Prize_Type : '', // 奖品类别
      Register_On_S : '', // 注册开始时间
      Register_On_E : '', // 注册结束时间
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
      e&&e.preventDefault();
      var data = _G.assign(this.state, {
          Register_On_S: _G.timeFormat2(new Date(this.state.Register_On_S).getTime(), 'YYYY-MM-DD'),
          Register_On_E: _G.timeFormat2(new Date(this.state.Register_On_E).getTime(), 'YYYY-MM-DD')
      });
      this.props.changeTableState(data);
  }
  componentDidMount() {
      this.handleSubmit()
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
		            id="Prize_Name">
		              <Input placeholder="" id="Prize_Name" name="Prize_Name" onChange={this.setValue} value={this.state.Prize_Name} />
		          </FormItem>
            	</li>
            	<li className="fleft">
	            	<FormItem
		            label="奖品类别："
		            id="Prize_Type">
		            	<Select size="large" placeholder="请选择奖品类别" style={{width: 80}} name="Prize_Type"  value={this.state.Prize_Type} onChange={this.onChange.bind(this,'Prize_Type')}>
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
  dataIndex: 'Prize_Code',
  key: 'Prize_Code',
  render: function(text,record) {
  	var href= '/sale/prize/info/'+text;
    return <Link to={href}>{text}</Link>;
  }
}, {
  title: '奖品名称',
  dataIndex: 'Prize_Name',
  key: 'Prize_Name'
}, {
  title: '品牌',
  dataIndex: 'Brand',
  key: 'Brand'
}, {
  title: '规格',
  dataIndex: 'Spec',
  key: 'Spec'
},{
  title: '单位',
  dataIndex: 'Unit',
  key: 'Unit'
},{
  title: '奖品类别',
  dataIndex: 'Prize_Type',
  key: 'Prize_Type'
}, {
  title: '入网日期',
  dataIndex: 'RegisterOn',
  key: 'RegisterOn'
},{
  title: '操作',
  key: 'operation',
  render: function(text, record) {
  	var edit = '/sale/prize/edit/'+record.Prize_Code,
  		del = '/sale/prize/del/' + record.Prize_Code
    return <span><Link to={edit}>编辑</Link><span className="ant-divider"></span><a href="#" onClick={showModal} data-id={record.Prize_Code} data-text="删除" >删除</a></span>;
	}
}];



class SalePrize extends React.Component{
	constructor(){
		super();
    this.state = {
      visible : false,
      title : '',
      ModalText : '',
      changeId : false,
      total : 0,
      data :[],
      opts: {
          page: 1,
          pageSize: 10,
      }
    }
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.changeTableState = this.changeTableState.bind(this);
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
      ModalText: '你正要删除 "'+ id +'"的奖品，是否继续？',
      confirmLoading: false,
      changeId : id
    })
  }
  handleOk(e){
    //******************* 冻结，解冻 逻辑 changeId , 然后 关闭****************************
    var opts = {
            Prize_Code: this.state.changeId
        }
        _G.ajax({
            url: config.__URL + config.sale.prize.del,
            type: "get",
            data: opts,
            success: function(res) {
                this.setState({
                    confirmLoading: true
                })
                var d = [],_tmp = this.state.data
                for(var i=0;i<_tmp.length;i++){
                  if(_tmp[i].Prize_Code!=opts.Prize_Code){
                    d.push(_tmp[i])
                  }
                }
                this.setState({
                    data: d,
                    total: this.state.total,
                    opts: this.state.opts
                })
                this.setState({
                    visible: false
                })
            }.bind(this)
        })
  }
  handleCancel(e){
    this.setState({
      visible : false
    })
  }
  handleClick(e){
    console.log(e);
  }

  // 发送ajax请求，获取table值
    changeTableState(opts) {
        var opts = opts || {};
        opts.page = opts.page || this.state.opts.page;
        opts.pageSize = opts.pageSize || this.state.opts.pageSize;

        this.setState({
            opts: opts
        })
        _G.ajax({
            url: config.__URL + config.sale.prize.list,
            type: "get",
            data: opts,
            success: function(res) {
                var d = [];
                for (var i = 0, l = res.Data.length; i < l; i++) {
                    d[i] = res.Data[i];
                    d[i]['key'] = res.Data[i].User_Code;
                    d[i]['RegisterOn'] = _G.timeFormat2(d[i].RegisterOn)
                }
                this.setState({
                    data: d,
                    total: res.TotalCount,
                    opts: opts
                })
            }.bind(this)
        })
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
              <Button type="primary" size="large"><Icon type="download" /><span>导出报表</span></Button>
      			</Link>
					</Col>
					<Col span="20">
						<SelectForm changeTableState={this.changeTableState} />
					</Col>
				</Row>
				<Row>
					<Table columns={columns} dataSource={this.state.data} pagination={{showQuickJumper:true,pageSize:this.state.opts.pageSize,current:this.state.opts.page,showSizeChanger:true,total:this.state.total}} />
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