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
const saledataSendInfo = config.__URL + config.saledata.send.info;

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
  dataIndex: 'SendNum',
  key: 'SendNum'
},{
  title: '发送时间',
  dataIndex: 'Send_Time',
  key: 'Send_Time'
}];


class SaleDataSendInfo extends React.Component{
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
      url : saledataSendInfo,
      type: "get",
      data : opts,
      success:function(res){
        var d = res.Data;
        for(var i=0;i<d.length;i++){
          d[i].key = i;
          d[i].Send_Time = _G.timeFormat2(d[i].Send_Time,'YYYY-MM-DD');
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
	SaleDataSendInfo : SaleDataSendInfo
}