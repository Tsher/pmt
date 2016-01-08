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


const columns = [{
  title: '用户编号',
  dataIndex: 'lotteryNo',
  key: 'lotteryNo',
  render: function(text,record) {
  	var href= '/user/user/info/'+text;
    return <Link to={href}>{text}</Link>;
  }
}, {
  title: '抽奖地区',
  dataIndex: 'lotteryArea',
  key: 'lotteryArea'
}, {
  title: '一物一码',
  dataIndex: 'lotteryCode',
  key: 'lotteryCode'
}, {
  title: '兑换手机号',
  dataIndex: 'lotteryMobile',
  key: 'lotteryMobile'
},{
  title: '微信号',
  dataIndex: 'lotteryWx',
  key: 'lotteryWx'
},{
  title: '奖品',
  dataIndex: 'lotteryPrize',
  key: 'lotteryPrize'
},{
  title: '是否中奖',
  dataIndex: 'lotteryWinning',
  key: 'lotteryWinning'
},{
  title: '兑换方式',
  dataIndex: 'lotteryMode',
  key: 'lotteryMode'
},{
  title: '兑换状态',
  dataIndex: 'lotteryStatus',
  key: 'lotteryStatus'
},{
  title: '兑换次数',
  dataIndex: 'lotteryNumber',
  key: 'lotteryNumber',
  render: function(text,record) {
  	var href= '/user/user/info/'+text;
    return <Link to={href}>{text}</Link>;
  }
},{
  title: '兑换积分',
  dataIndex: 'lotteryIntegral',
  key: 'lotteryIntegral'
},{
  title: '兑换时间',
  dataIndex: 'lotteryTime',
  key: 'lotteryTime'
}];
const data = [{
  key: '1',
  lotteryNo: '000001',
  lotteryArea: '北京',
  lotteryCode: '1100111000',
  lotteryMobile : 13661111111,
  lotteryWx : 'weixin123',
  lotteryPrize : 'iphone',
  lotteryWinning : '是',
  lotteryMode : '空中充值',
  lotteryStatus : '成功',
  lotteryNumber : 2,
  lotteryIntegral : 30,
  lotteryTime : '2015-01-10 10:30'
}, {
  key: '2',
  lotteryNo: '000002',
  lotteryArea: '北京',
  lotteryCode: '1100111000',
  lotteryMobile : 13661111111,
  lotteryWx : 'weixin123',
  lotteryPrize : 'iphone',
  lotteryWinning : '是',
  lotteryMode : '空中充值',
  lotteryStatus : '成功',
  lotteryNumber : 2,
  lotteryIntegral : 30,
  lotteryTime : '2015-02-10 10:30'
}, {
  key: '3',
  lotteryNo: '000003',
  lotteryArea: '北京',
  lotteryCode: '1100111000',
  lotteryMobile : 13661111111,
  lotteryWx : 'weixin123',
  lotteryPrize : 'iphone',
  lotteryWinning : '是',
  lotteryMode : '空中充值',
  lotteryStatus : '成功',
  lotteryNumber : 2,
  lotteryIntegral : 30,
  lotteryTime : '2015-03-10 10:30'
}, {
  key: '4',
  lotteryNo: '000004',
  lotteryArea: '北京',
  lotteryCode: '1100111000',
  lotteryMobile : 13661111111,
  lotteryWx : 'weixin123',
  lotteryPrize : 'iphone',
  lotteryWinning : '是',
  lotteryMode : '空中充值',
  lotteryStatus : '成功',
  lotteryNumber : 2,
  lotteryIntegral : 30,
  lotteryTime : '2015-04-10 10:30'
}, {
  key: '5',
  lotteryNo: '000005',
  lotteryArea: '北京',
  lotteryCode: '1100111000',
  lotteryMobile : 13661111111,
  lotteryWx : 'weixin123',
  lotteryPrize : 'iphone',
  lotteryWinning : '是',
  lotteryMode : '空中充值',
  lotteryStatus : '成功',
  lotteryNumber : 2,
  lotteryIntegral : 30,
  lotteryTime : '2015-05-10 10:30'
}, {
  key: '6',
  lotteryNo: '000006',
  lotteryArea: '北京',
  lotteryCode: '1100111000',
  lotteryMobile : 13661111111,
  lotteryWx : 'weixin123',
  lotteryPrize : 'iphone',
  lotteryWinning : '是',
  lotteryMode : '空中充值',
  lotteryStatus : '成功',
  lotteryNumber : 2,
  lotteryIntegral : 30,
  lotteryTime : '2015-06-10 10:30'
}, {
  key: '7',
  lotteryNo: '000007',
  lotteryArea: '北京',
  lotteryCode: '1100111000',
  lotteryMobile : 13661111111,
  lotteryWx : 'weixin123',
  lotteryPrize : 'iphone',
  lotteryWinning : '是',
  lotteryMode : '空中充值',
  lotteryStatus : '成功',
  lotteryNumber : 2,
  lotteryIntegral : 30,
  lotteryTime : '2015-07-10 10:30'
}, {
  key: '8',
  lotteryNo: '000008',
  lotteryArea: '北京',
  lotteryCode: '1100111000',
  lotteryMobile : 13661111111,
  lotteryWx : 'weixin123',
  lotteryPrize : 'iphone',
  lotteryWinning : '是',
  lotteryMode : '空中充值',
  lotteryStatus : '成功',
  lotteryNumber : 2,
  lotteryIntegral : 30,
  lotteryTime : '2015-08-10 10:30'
}, {
  key: '9',
  lotteryNo: '000009',
  lotteryArea: '北京',
  lotteryCode: '1100111000',
  lotteryMobile : 13661111111,
  lotteryWx : 'weixin123',
  lotteryPrize : 'iphone',
  lotteryWinning : '是',
  lotteryMode : '空中充值',
  lotteryStatus : '成功',
  lotteryNumber : 2,
  lotteryIntegral : 30,
  lotteryTime : '2015-09-10 10:30'
}, {
  key: '10',
  lotteryNo: '000010',
  lotteryArea: '北京',
  lotteryCode: '1100111000',
  lotteryMobile : 13661111111,
  lotteryWx : 'weixin123',
  lotteryPrize : 'iphone',
  lotteryWinning : '是',
  lotteryMode : '空中充值',
  lotteryStatus : '成功',
  lotteryNumber : 2,
  lotteryIntegral : 30,
  lotteryTime : '2015-10-10 10:30'
}, {
  key: '11',
  lotteryNo: '000011',
  lotteryArea: '北京',
  lotteryCode: '1100111000',
  lotteryMobile : 13661111111,
  lotteryWx : 'weixin123',
  lotteryPrize : 'iphone',
  lotteryWinning : '是',
  lotteryMode : '空中充值',
  lotteryStatus : '成功',
  lotteryNumber : 2,
  lotteryIntegral : 30,
  lotteryTime : '2015-11-10 10:30'
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

class SaleDataRound extends React.Component{
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
	SaleDataRound : SaleDataRound
}