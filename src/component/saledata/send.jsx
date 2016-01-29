// 促销数据管理  发送短信流水
import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import { DatePicker } from 'antd/lib';
import { Button } from 'antd/lib';
import Icon from 'antd/lib/icon';
import Table from 'antd/lib/table';
import {Link} from 'react-router';
import Form from 'antd/lib/form';
import message from 'antd/lib/message';

const FormItem = Form.Item;

import '../../entry/config';
const saledataSendList = config.__URL + config.saledata.send.list;

var changeTableState;
var rTimes={};
var rPages={};


const columns = [{
  title: '公用号',
  dataIndex: 'Send_Phone',
  key: 'Send_Phone'
},{
  title: '接收手机号',
  dataIndex: 'Receive_Phone',
  key: 'Receive_Phone'
},{
  title: '发送状态',
  dataIndex: 'Send_Status',
  key: 'Send_Status'
},{
  title: '发送次数',
  dataIndex: 'Receive_Num',
  key: 'Receive_Num',
  render: function(text,record) {
    var timeS = ''+_G.timeFormat2( new Date(rTimes.Recharge_Time_S).getTime() , 'YYYY-MM-DD' )
    var timeE = ''+_G.timeFormat2( new Date(rTimes.Recharge_Time_E).getTime() , 'YYYY-MM-DD' )
    var arr = {
       Send_Phone:record.Send_Phone,
       Receive_Phone:record.Receive_Phone,
       Send_Status:record.Send_Status,
       Recharge_Time_S:timeS,
       Recharge_Time_E:timeE,
       Page:rPages.page,
       PageSize:rPages.pageSize
    }
    var href= '/saledata/send/info/'+JSON.stringify(arr);
    return <Link to={href}>{text}</Link>;
  }
}];


class DateRange extends React.Component{
	constructor() {
		super();
		this.state =  {
	      Send_Time_S : '',
        Send_Time_E : ''
	    };
	    this.handleSubmit = this.handleSubmit.bind(this);
	    this.onChange = this.onChange.bind(this);
	    this.disabledEndDate = this.disabledEndDate.bind(this);
	}
  disabledEndDate(endValue) {
    if (!endValue || !this.state.Send_Time_S) {
      return false;
    }
    return endValue.getTime() <= this.state.Send_Time_S.getTime();
  }
  onChange(field, value) {
    this.setState({
      [field]: value,
    });
    rTimes[field] = value;
  }
  handleSubmit(e) {
    // ********************************************************** ajax提交数据，获取table的data值
    e.preventDefault();
    this.props.changeTableState(this.state);
  }
  render() {
    return <div>
      <div style={{width:945, height:60}}>
        <Form inline onSubmit={this.handleSubmit}>
        <Col span="2">
        <div style={{fontSize:14,lineHeight:2.4}}>发送日期：</div>
        </Col>
          <Col span="3">
          <DatePicker placeholder="开始日期" value={this.state.Send_Time_S} onChange={this.onChange.bind(this,'Send_Time_S')} />
        </Col>
        <Col span="1">
          <p className="ant-form-split">-</p>
        </Col>
         <Col span="3">
          <DatePicker value={this.state.Send_Time_E} disabledDate={this.disabledEndDate} placeholder="结束日期" onChange={this.onChange.bind(this,'Send_Time_E')} />
        </Col>
        <Col span="1">
        <FormItem>
          <Button type="primary" shape="circle" size="large"  htmlType="submit" style={{marginLeft:10}}>
                <Icon type="search" />
              </Button>
          </FormItem>
        </Col>
        <Col span="3">
        <FormItem>
          <Link to='/saledata/send/exports'>
            <Button type="primary" size="large"  htmlType="submit" style={{marginLeft:10}}><Icon type="download" /><span>导出报表</span></Button>
          </Link>
        </FormItem>
        </Col>
      </Form>
      </div>
    </div>;
  }
};

class SaleDataSend extends React.Component{
	constructor(){
		super();
		this.state =  {
	      total : 100,
        data : [],
        opts : {
          page :1,
          pageSize : 10,
        },
	    };
      this.changeTableState = this.changeTableState.bind(this);
      this.tableChange = this.tableChange.bind(this);
      this.showSizechange = this.showSizechange.bind(this);
	}

  componentDidMount(){

    changeTableState = this.changeTableState;
    //modalState = this.showModal;

    this.setState({
      data : []
    })
    
  }

  // 点击分页
  tableChange(pagination, filters, sorter){
    var opts = Object.assign({},this.state.opts);
    opts.page = pagination.current;
    opts.pageSize = pagination.pageSize;

    

    this.setState({
      opts : opts
    })
    rPages = opts;

    this.changeTableState(opts);
  }
  // 每页数据条数变化
  showSizechange(current, pageSize){
    var opts = Object.assign({},this.state.opts);
    opts.pageSize = pageSize;
    opts.page = current;
    
    this.setState({
      opts : opts
    })
    rPages = opts;

    this.changeTableState(opts);

  }

  // 发送ajax请求，获取table值
  changeTableState(opts){

    var opts = opts || {};
    opts.page = opts.page || this.state.opts.page;
    opts.pageSize = opts.pageSize ||  this.state.opts.pageSize;

    this.setState({
      opts : opts
    })
    rPages = opts;
    //opts.EntityCode = 'DEFAULT';
    var that = this;

    opts.Send_Time_S = ''+_G.timeFormat( new Date(opts.Send_Time_S).getTime() );
    opts.Send_Time_E = ''+_G.timeFormat( new Date(opts.Send_Time_E).getTime() );

    _G.ajax({
      url : saledataSendList,
      method: "get",
      data : opts,
      success:function(res){
        console.log('h'+res.Data)
        var d = [];
        for(var i=0,l=res.Data.length;i<l;i++){
          d[i]=res.Data[i];
          d[i]['key'] = i;
        }
        this.setState({
          data : d,
          total : res.TotalCount,
          opts : opts
        })

      }.bind(this)

    })

  }

	render(){
		return(
			<div className="m-list">
			     <DateRange changeTableState={this.changeTableState} />
			     <Row>
					<Table onChange={this.tableChange} columns={columns} dataSource={this.state.data} pagination={{showQuickJumper:true,pageSize:this.state.opts.pageSize,current:this.state.opts.page,showSizeChanger:true,total:this.state.total,onShowSizeChange:this.showSizechange}}  />
				</Row>
			</div>
		)
	}
}
module.exports = {
	SaleDataSend : SaleDataSend
}