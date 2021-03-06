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
import { Search } from '../btn-search'; // 查询按钮
import { Export } from '../btn-export'; // 导出excel按钮
import { Add } from '../btn-add'; // 新增按钮
import { Edit } from '../btn-edit'; // 编辑，发布，设置等按钮
import { Del } from '../btn-del'; // 删除

let pageName = '消费者抽奖流水'; // 按钮，验证权限使用

const saledataRoundList = config.__URL + config.saledata.round.list;
const saledataRoundExcel = config.__URL + config.saledata.round.excel;

var aTimes = {
  MA_StartTime : '',
  MA_EndTime : ''
}
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
    var arr = {
       ScanAddress:record.ScanAddress,
       ScanPhone:record.ScanPhone,
       ScanWeiXinNo:record.ScanWeiXinNo,
       Prize_Name:record.Prize_Name,
       MA_StartTime:aTimes.MA_StartTime,
       MA_EndTime : aTimes.MA_EndTime,
    }
    var href= '/saledata/round/info/'+JSON.stringify(arr);
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
      MA_StartTime : new Date(),
      MA_EndTime : new Date(),
      excel : 'javascript:;',
    };
	    this.handleSubmit = this.handleSubmit.bind(this);
	    this.onChange = this.onChange.bind(this);
	    //this.disabledStartDate = this.disabledStartDate.bind(this);
	    this.disabledEndDate = this.disabledEndDate.bind(this);
	}
  componentDidMount(){
    this.handleSubmit();
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
    this.setState({
      [field]: value,
    });
  }
  handleSubmit(e) {
    // ********************************************************** ajax提交数据，获取table的data值
    e&&e.preventDefault();

    //excel导出 begin
    var _this = this;
    _G.getExcel({
       url : saledataRoundExcel,
       data : {
          MA_StartTime : _G.timeFormat2( new Date(_this.state.MA_StartTime).getTime() , 'YYYY-MM-DD' ),
          MA_EndTime : _G.timeFormat2( new Date(_this.state.MA_EndTime).getTime() , 'YYYY-MM-DD' ),
       },
       callback : function(d){
           var excel = d.ReturnOperateStatus;
           _this.setState({
               excel : excel
           })
       }
    });
    //excel导出 end
    
    var data = _G.assign({},this.state);
    data.page =1;
    this.props.changeTableState(data);


    aTimes.MA_StartTime = _G.timeFormat2( new Date(_this.state.MA_StartTime).getTime() , 'YYYY-MM-DD' );
    aTimes.MA_EndTime = _G.timeFormat2( new Date(_this.state.MA_EndTime).getTime() , 'YYYY-MM-DD' );

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
        <div style={{marginLeft:10}}>
          <Search Name={pageName} />
        </div>
          </FormItem>
        </Col>
        <Col span="3">
        <FormItem>
        <div style={{marginLeft:10}}>
          <Export Name={pageName} excel={this.state.excel} />
        </div>
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
    this.showTotal = this.showTotal.bind(this);
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
    var opts = _G.assign({},this.state.opts);
    opts.page = pagination.current;
    opts.pageSize = pagination.pageSize;

    this.setState({
      opts : opts
    })

    this.changeTableState(opts);
  }
  // 每页数据条数变化
  showSizechange(current, pageSize){
    var opts = _G.assign({},this.state.opts);
    opts.pageSize = pageSize;
    opts.page = current;

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
    var optsD = _G.assign({},opts);

    optsD.MA_StartTime = ''+_G.timeFormat( new Date(opts.MA_StartTime).getTime(),'YYYY-MM-DD');
    optsD.MA_EndTime = ''+_G.timeFormat( new Date(opts.MA_EndTime).getTime(),'YYYY-MM-DD');

    _G.ajax({
      url : saledataRoundList,
      type: "get",
      data : optsD,
      success:function(res){
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
  showTotal(){
    return '共'+this.state.total+'条'
  }
	render(){
		return(
			<div className="m-list">
			     <DateRange changeTableState={this.changeTableState} />
			     <Row>
					<Table onChange={this.tableChange} columns={columns} dataSource={this.state.data} pagination={{showQuickJumper:true,pageSize:this.state.opts.pageSize,current:this.state.opts.page,showSizeChanger:true,total:this.state.total,onShowSizeChange:this.showSizechange,showTotal:this.showTotal}} />
				</Row>
			</div>
		)
	}
}
module.exports = {
	SaleDataRound : SaleDataRound
}