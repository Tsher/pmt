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


const columns = [{
  title: '发送序号',
  dataIndex: 'sendNo',
  key: 'sendNo',
  render: function(text,record) {
  	var href= '/user/user/info/'+text;
    return <Link to={href}>{text}</Link>;
  }
},{
  title: '公共号',
  dataIndex: 'sendPublic',
  key: 'sendPublic'
},{
  title: '接收手机号',
  dataIndex: 'sendMobile',
  key: 'sendMobile'
},{
  title: '接收状态',
  dataIndex: 'sendStatus',
  key: 'sendStatus'
},{
  title: '发送次数',
  dataIndex: 'sendNumber',
  key: 'sendNumber',
  render: function(text,record) {
  	var href= '/user/user/info/'+text;
    return <Link to={href}>{text}</Link>;
  }
},{
  title: '发送时间',
  dataIndex: 'sendTime',
  key: 'sendTime'
}];
const data = [{
  key: '1',
  sendNo: '000001',
  sendPublic: 13888888888,
  sendMobile : 13661111111,
  sendStatus : '成功',
  sendNumber : 2,
  sendTime : '2015-01-10 10:30'
}, {
  key: '2',
  sendNo: '000002',
  sendPublic: 13888888888,
  sendMobile : 13661111111,
  sendStatus : '成功',
  sendNumber : 2,
  sendTime : '2015-01-10 10:30'
}, {
  key: '3',
  sendNo: '000003',
  sendPublic: 13888888888,
  sendMobile : 13661111111,
  sendStatus : '成功',
  sendNumber : 2,
  sendTime : '2015-01-10 10:30'
}, {
  key: '4',
  sendNo: '000004',
  sendPublic: 13888888888,
  sendMobile : 13661111111,
  sendStatus : '成功',
  sendNumber : 2,
  sendTime : '2015-01-10 10:30'
}, {
  key: '5',
  sendNo: '000005',
  sendPublic: 13888888888,
  sendMobile : 13661111111,
  sendStatus : '成功',
  sendNumber : 2,
  sendTime : '2015-01-10 10:30'
}, {
  key: '6',
  sendNo: '000006',
  sendPublic: 13888888888,
  sendMobile : 13661111111,
  sendStatus : '成功',
  sendNumber : 2,
  sendTime : '2015-01-10 10:30'
}, {
  key: '7',
  sendNo: '000007',
  sendPublic: 13888888888,
  sendMobile : 13661111111,
  sendStatus : '成功',
  sendNumber : 2,
  sendTime : '2015-01-10 10:30'
}, {
  key: '8',
  sendNo: '000008',
  sendPublic: 13888888888,
  sendMobile : 13661111111,
  sendStatus : '成功',
  sendNumber : 2,
  sendTime : '2015-01-10 10:30'
}, {
  key: '9',
  sendNo: '000009',
  sendPublic: 13888888888,
  sendMobile : 13661111111,
  sendStatus : '成功',
  sendNumber : 2,
  sendTime : '2015-01-10 10:30'
}, {
  key: '10',
  sendNo: '000010',
  sendPublic: 13888888888,
  sendMobile : 13661111111,
  sendStatus : '成功',
  sendNumber : 2,
  sendTime : '2015-01-10 10:30'
}, {
  key: '11',
  sendNo: '000011',
  sendPublic: 13888888888,
  sendMobile : 13661111111,
  sendStatus : '成功',
  sendNumber : 2,
  sendTime : '2015-01-10 10:30'
}];

class DateRange extends React.Component{
	constructor() {
		super();
		this.state =  {
	      startTime : undefined,
	      endTime : undefined
	    };
	    this.handleSubmit = this.handleSubmit.bind(this);
	    this.onChange = this.onChange.bind(this);
	    this.disabledStartDate = this.disabledStartDate.bind(this);
	    this.disabledEndDate = this.disabledEndDate.bind(this);
	}
  disabledStartDate(startValue) {
    if (!startValue || !this.state.endValue) {
      return false;
    }
    return startValue.getTime() >= this.state.endValue.getTime();
  }
  disabledEndDate(endValue) {
    if (!endValue || !this.state.startValue) {
      return false;
    }
    return endValue.getTime() <= this.state.startValue.getTime();
  }
  onChange(field, value) {
    this.setState({
      [field]: value,
    });
  }
  handleSubmit(e) {
    // ********************************************************** ajax提交数据，获取table的data值
    e.preventDefault();
    
    message.success('收到表单值~~~ ：' + JSON.stringify(this.state, function(k, v) {
      if (typeof v === 'undefined') {
        return '';
      }
      return v;
    }));
  }
  render() {
    return <div>
      <div style={{width:945, height:60}}>
        <Form inline onSubmit={this.handleSubmit}>
          <Col span="3">
	        <DatePicker placeholder="开始日期" onChange={this.onChange.bind(this,'startTime')} />
	      </Col>
	      <Col span="1">
	        <p className="ant-form-split">-</p>
	      </Col>
	       <Col span="3">
	        <DatePicker disabledDate={this.disabledEndDate} placeholder="结束日期" onChange={this.onChange.bind(this,'endTime')} />
	      </Col>
	      <Col span="3">
	      <FormItem>
          <Button type="primary" htmlType="submit" style={{marginLeft:10}}>查询</Button>
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
	      total : 100
	    };
	}
	render(){
		return(
			<div className="m-list">
			     <DateRange />
			     <Row>
					<Table columns={columns} dataSource={data} pagination={{showQuickJumper:true,pageSize:10,current:1,showSizeChanger:true,total:this.state.total}}  />
				</Row>
			</div>
		)
	}
}
module.exports = {
	SaleDataSend : SaleDataSend
}