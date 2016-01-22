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
  key: 'sendNumber',
  render: function(text,record) {
    var href= '/saledata/send/info/'+text;
    return <Link to={href}>{text}</Link>;
  }
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
        <Col span="2">
        <div style={{fontSize:14,lineHeight:2.4}}>发送日期：</div>
        </Col>
          <Col span="3">
          <DatePicker placeholder="开始日期" onChange={this.onChange.bind(this,'startTime')} />
        </Col>
        <Col span="1">
          <p className="ant-form-split">-</p>
        </Col>
         <Col span="3">
          <DatePicker disabledDate={this.disabledEndDate} placeholder="结束日期" onChange={this.onChange.bind(this,'endTime')} />
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