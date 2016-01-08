// 促销数据管理  话费充值流水
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
  title: '充值序号',
  dataIndex: 'pushNo',
  key: 'pushNo',
  render: function(text,record) {
  	var href= '/user/user/info/'+text;
    return <Link to={href}>{text}</Link>;
  }
},{
  title: '帐号',
  dataIndex: 'pushPublic',
  key: 'pushPublic'
},{
  title: '充值手机号',
  dataIndex: 'pushMobile',
  key: 'pushMobile'
},{
  title: '充值状态',
  dataIndex: 'pushStatus',
  key: 'pushStatus'
},{
  title: '充值次数',
  dataIndex: 'pushNumber',
  key: 'pushNumber',
  render: function(text,record) {
  	var href= '/user/user/info/'+text;
    return <Link to={href}>{text}</Link>;
  }
},{
  title: '充值时间',
  dataIndex: 'pushTime',
  key: 'pushTime'
}];
const data = [{
  key: '1',
  pushNo: '000001',
  pushPublic: 13888888888,
  pushMobile : 13661111111,
  pushStatus : '成功',
  pushNumber : 2,
  pushTime : '2015-01-10 10:30'
}, {
  key: '2',
  pushNo: '000002',
  pushPublic: 13888888888,
  pushMobile : 13661111111,
  pushStatus : '成功',
  pushNumber : 2,
  pushTime : '2015-01-10 10:30'
}, {
  key: '3',
  pushNo: '000003',
  pushPublic: 13888888888,
  pushMobile : 13661111111,
  pushStatus : '成功',
  pushNumber : 2,
  pushTime : '2015-01-10 10:30'
}, {
  key: '4',
  pushNo: '000004',
  pushPublic: 13888888888,
  pushMobile : 13661111111,
  pushStatus : '成功',
  pushNumber : 2,
  pushTime : '2015-01-10 10:30'
}, {
  key: '5',
  pushNo: '000005',
  pushPublic: 13888888888,
  pushMobile : 13661111111,
  pushStatus : '成功',
  pushNumber : 2,
  pushTime : '2015-01-10 10:30'
}, {
  key: '6',
  pushNo: '000006',
  pushPublic: 13888888888,
  pushMobile : 13661111111,
  pushStatus : '成功',
  pushNumber : 2,
  pushTime : '2015-01-10 10:30'
}, {
  key: '7',
  pushNo: '000007',
  pushPublic: 13888888888,
  pushMobile : 13661111111,
  pushStatus : '成功',
  pushNumber : 2,
  pushTime : '2015-01-10 10:30'
}, {
  key: '8',
  pushNo: '000008',
  pushPublic: 13888888888,
  pushMobile : 13661111111,
  pushStatus : '成功',
  pushNumber : 2,
  pushTime : '2015-01-10 10:30'
}, {
  key: '9',
  pushNo: '000009',
  pushPublic: 13888888888,
  pushMobile : 13661111111,
  pushStatus : '成功',
  pushNumber : 2,
  pushTime : '2015-01-10 10:30'
}, {
  key: '10',
  pushNo: '000010',
  pushPublic: 13888888888,
  pushMobile : 13661111111,
  pushStatus : '成功',
  pushNumber : 2,
  pushTime : '2015-01-10 10:30'
}, {
  key: '11',
  pushNo: '000011',
  pushPublic: 13888888888,
  pushMobile : 13661111111,
  pushStatus : '成功',
  pushNumber : 2,
  pushTime : '2015-01-10 10:30'
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

class SaleDataPush extends React.Component{
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
	SaleDataPush : SaleDataPush
}