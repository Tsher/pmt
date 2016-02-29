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
import { Search } from '../btn-search'; // 查询按钮
import { Export } from '../btn-export'; // 导出excel按钮
import { Add } from '../btn-add'; // 新增按钮
import { Edit } from '../btn-edit'; // 编辑，发布，设置等按钮
import { Del } from '../btn-del'; // 删除

let pageName = '发送短信流水'; // 按钮，验证权限使用
const saledataSendList = config.__URL + config.saledata.send.list;
const saledataSendExcel = config.__URL + config.saledata.send.excel;

var changeTableState;
var rTimes={
  Send_Time_S:new Date().getTime(),
  Send_Time_E:new Date().getTime()
};
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
    var timeS = ''+_G.timeFormat2( new Date(rTimes.Send_Time_S).getTime() ,'YYYY-MM-DD');
    var timeE = ''+_G.timeFormat2( new Date(rTimes.Send_Time_E).getTime() ,'YYYY-MM-DD');
    var arr = {
       Send_Phone:record.Send_Phone,
       Receive_Phone:record.Receive_Phone,
       Send_Status:record.Send_Status,
       Send_Time_S:timeS,
       Send_Time_E:timeE,
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
	      Send_Time_S : ''+_G.timeFormat2( new Date().getTime() ,'YYYY-MM-DD'),
        Send_Time_E : ''+_G.timeFormat2( new Date().getTime() ,'YYYY-MM-DD'),
        excel : 'javascript:;',
	    };
	    this.handleSubmit = this.handleSubmit.bind(this);
	    this.onChange = this.onChange.bind(this);
	    this.disabledEndDate = this.disabledEndDate.bind(this);
	}
  componentDidMount(){
    this.handleSubmit();
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
    e&&e.preventDefault();

    //excel导出 begin
    var _this = this;
    _G.getExcel({
       url : saledataSendExcel,
       data : {
          Send_Time_S : _G.timeFormat2( new Date(_this.state.Send_Time_S).getTime() , 'YYYY-MM-DD' ),
          Send_Time_E : _G.timeFormat2( new Date(_this.state.Send_Time_E).getTime() , 'YYYY-MM-DD' ),
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
    var opts = _G.assign({},this.state.opts);
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
    var opts = _G.assign({},this.state.opts);
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
    var optsD = _G.assign({},opts);

    optsD.Send_Time_S = ''+_G.timeFormat2( new Date(opts.Send_Time_S).getTime() ,'YYYY-MM-DD');
    optsD.Send_Time_E = ''+_G.timeFormat2( new Date(opts.Send_Time_E).getTime() ,'YYYY-MM-DD');

    _G.ajax({
      url : saledataSendList,
      method: "get",
      data : optsD,
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