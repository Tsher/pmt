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

const columns = [{
  title: '公用号',
  dataIndex: 'sendPublic',
  key: 'sendPublic'
},{
  title: '接收手机号',
  dataIndex: 'sendMobile',
  key: 'sendMobile'
},{
  title: '发送状态',
  dataIndex: 'sendStatus',
  key: 'sendStatus'
},{
  title: '发送次数',
  dataIndex: 'sendNumber',
  key: 'sendNumber'
}];
const data = [{
  key: '1',
  sendPublic: 13888888888,
  sendMobile : 13661111111,
  sendStatus : '成功',
  sendNumber : 2
}, {
  key: '2',
  sendPublic: 13888888888,
  sendMobile : 13661111111,
  sendStatus : '成功',
  sendNumber : 2
}, {
  key: '3',
  sendPublic: 13888888888,
  sendMobile : 13661111111,
  sendStatus : '成功',
  sendNumber : 2
}, {
  key: '4',
  sendPublic: 13888888888,
  sendMobile : 13661111111,
  sendStatus : '成功',
  sendNumber : 2
}, {
  key: '5',
  sendPublic: 13888888888,
  sendMobile : 13661111111,
  sendStatus : '成功',
  sendNumber : 2
}, {
  key: '6',
  sendPublic: 13888888888,
  sendMobile : 13661111111,
  sendStatus : '成功',
  sendNumber : 2
}, {
  key: '7',
  sendPublic: 13888888888,
  sendMobile : 13661111111,
  sendStatus : '成功',
  sendNumber : 2
}, {
  key: '8',
  sendPublic: 13888888888,
  sendMobile : 13661111111,
  sendStatus : '成功',
  sendNumber : 2
}, {
  key: '9',
  sendPublic: 13888888888,
  sendMobile : 13661111111,
  sendStatus : '成功',
  sendNumber : 2
}, {
  key: '10',
  sendPublic: 13888888888,
  sendMobile : 13661111111,
  sendStatus : '成功',
  sendNumber : 2
}, {
  key: '11',
  sendPublic: 13888888888,
  sendMobile : 13661111111,
  sendStatus : '成功',
  sendNumber : 2
}];


class SaleDataPushInfo extends React.Component{
	constructor(){
		super();
		this.state =  {
	      total : 100
	    };
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
    					<Table columns={columns} dataSource={data} pagination={{showQuickJumper:true,pageSize:10,current:1,showSizeChanger:true,total:this.state.total}}  />
    			</Row>
          <Row>
            <Button type="primary" onClick={this.handleReset}>返回</Button>
          </Row>
			</div>
		)
	}
}
module.exports = {
	SaleDataPushInfo : SaleDataPushInfo
}