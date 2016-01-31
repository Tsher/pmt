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
import { createHistory } from 'history';

const FormItem = Form.Item;
const history = createHistory();

const goBack = history.goBack;

import '../../entry/config';
const saledataRoundInfo = config.__URL + config.saledata.round.info;

const columns = [{
  title: '序号',
  dataIndex: 'WR_Code',
  key: 'WR_Code'
},{
  title: '抽奖地区',
  dataIndex: 'Region_Address',
  key: 'Region_Address'
},{
  title: '微信号',
  dataIndex: 'ScanWeiXinNo',
  key: 'ScanWeiXinNo'
},{
  title: '奖品',
  dataIndex: 'Prize_Name',
  key: 'Prize_Name'
},{
  title: '中奖时间',
  dataIndex: 'WR_Time',
  key: 'WR_Time'
},{
  title: '兑换时间',
  dataIndex: 'Convert_Time',
  key: 'Convert_Time'
},{
  title: '兑换状态',
  dataIndex: 'Convert_Status',
  key: 'Convert_Status',
  render: function(text,record) {
    var str = record.Convert_Status == 1 ? '未兑奖' : '已兑奖';
    return <div>{str}</div>
  }
}];

class SaleDataRoundInfo extends React.Component{
	constructor(){
		super();
		this.state =  {
        total : 0,
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
    var id = this.props.params.id;
    var opts = JSON.parse(id);

    this.changeTableState(opts);
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

    _G.ajax({
      url : saledataRoundInfo,
      type: "get",
      data : opts,
      success:function(res){
        var d = res.Data;
        for(var i=0;i<d.length;i++){
          d[i].key = i;
          d[i].WR_Time = _G.timeFormat2(d[i].WR_Time,'YYYY-MM-DD');
        }
        
        this.setState({
          data : d,
          total : res.TotalCount,
          opts : opts
        })

      }.bind(this)

    })
  }
  
  handleReset(e) {
    // 返回***********************************
    goBack();
    e.preventDefault();
  }
	render(){
		return(
			<div className="m-list">
			    <Row>
    					<Table onChange={this.tableChange} columns={columns} dataSource={this.state.data} pagination={{showQuickJumper:true,pageSize:this.state.opts.pageSize,current:this.state.opts.page,showSizeChanger:true,total:this.state.total,onShowSizeChange:this.showSizechange}} />
    			</Row>
          <Row>
            <Button type="primary" onClick={this.handleReset}>返回</Button>
          </Row>
			</div>
		)
	}
}
module.exports = {
	SaleDataRoundInfo : SaleDataRoundInfo
}