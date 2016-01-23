// 促销数据管理  消费者抽奖流水
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
const saledataRoundList = config.__URL + config.saledata.round.list;


const columns = [{
  title: '抽奖地区',
  dataIndex: 'ScanAddress',
  key: 'ScanAddress'
}, {
  title: '兑换手机号',
  dataIndex: 'ScanPhone',
  key: 'ScanPhone'
},{
  title: '微信号',
  dataIndex: 'ScanWeiXinNo',
  key: 'ScanWeiXinNo'
},{
  title: '奖品',
  dataIndex: 'Prize_Name',
  key: 'Prize_Name'
},{
  title: '是否中奖',
  dataIndex: 'IsWinnName',
  key: 'IsWinnName'
},{
  title: '中奖次数',
  dataIndex: 'WinTimes',
  key: 'WinTimes',
  render: function(text,record) {
  	//var href= '/saledata/round/info/'+record.lotteryNo;
    var href= '/saledata/round/info/';
    return <Link to={href}>{text}</Link>;
  }
},{
  title: '积分',
  dataIndex: 'Member_GetIntegral',
  key: 'Member_GetIntegral'
}];


var changeTableState;


class DateRange extends React.Component{
	constructor() {
		super();
		this.state =  {
      MA_StartTime : '',
      MA_EndTime : ''
    };
	    this.handleSubmit = this.handleSubmit.bind(this);
	    this.onChange = this.onChange.bind(this);
	    //this.disabledStartDate = this.disabledStartDate.bind(this);
	    this.disabledEndDate = this.disabledEndDate.bind(this);
	}
  // disabledStartDate(startValue) {
  //   if (!startValue || !this.state.endValue) {
  //     return false;
  //   }
  //   return startValue.getTime() >= this.state.endValue.getTime();
  // }
  disabledEndDate(endValue) {
    if (!endValue || !this.state.MA_StartTime) {
      return false;
    }
    return endValue.getTime() <= this.state.MA_StartTime.getTime();
  }
  onChange(field, value) {
    console.log(field,value)
    this.setState({
      [field]: value,
    });
  }
  handleSubmit(e) {
    // ********************************************************** ajax提交数据，获取table的data值
    e.preventDefault();
    console.log(this.state)
    
    this.props.changeTableState(this.state);

  }
  render() {
    return <div>
      <div style={{width:945, height:60}}>
        <Form inline onSubmit={this.handleSubmit}>
        <Col span="2">
        <div style={{fontSize:14,lineHeight:2.4}}>抽奖日期：</div>
        </Col>
          <Col span="3">
          <DatePicker value={this.state.MA_StartTime} placeholder="开始日期" onChange={this.onChange.bind(this,'MA_StartTime')} />
        </Col>
        <Col span="1">
          <p className="ant-form-split">-</p>
        </Col>
         <Col span="3">
          <DatePicker value={this.state.MA_EndTime} disabledDate={this.disabledEndDate} placeholder="结束日期" onChange={this.onChange.bind(this,'MA_EndTime')} />
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

class SaleDataRound extends React.Component{
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

    this.changeTableState(opts);
  }
  // 每页数据条数变化
  showSizechange(current, pageSize){
    var opts = Object.assign({},this.state.opts);
    opts.pageSize = pageSize;
    opts.page = current;

    console.log(opts);
    

    this.setState({
      opts : opts
    })

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
    
    //opts.EntityCode = 'DEFAULT';
    var that = this;

    opts.MA_StartTime = ''+_G.timeFormat( new Date(opts.MA_StartTime).getTime() );
    opts.MA_EndTime = ''+_G.timeFormat( new Date(opts.MA_EndTime).getTime() );

    _G.ajax({
      url : saledataRoundList,
      type: "get",
      data : opts,
      success:function(res){
        console.log(res)
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
					<Table onChange={this.tableChange} columns={columns} dataSource={this.state.data} pagination={{showQuickJumper:true,pageSize:this.state.opts.pageSize,current:this.state.opts.page,showSizeChanger:true,total:this.state.total,onShowSizeChange:this.showSizechange}} />
				</Row>
			</div>
		)
	}
}
module.exports = {
	SaleDataRound : SaleDataRound
}