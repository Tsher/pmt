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
  title: '抽奖地区',
  dataIndex: 'lotteryArea',
  key: 'lotteryArea'
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
  title: '中奖次数',
  dataIndex: 'lotteryNumber',
  key: 'lotteryNumber',
  render: function(text,record) {
  	var href= '/saledata/round/info/'+record.lotteryNo;
    return <Link to={href}>{text}</Link>;
  }
},{
  title: '积分',
  dataIndex: 'lotteryIntegral',
  key: 'lotteryIntegral'
}];
const data = [{
  key: '1',
  lotteryArea: '北京',
  lotteryMobile : 13661111111,
  lotteryWx : 'weixin123',
  lotteryPrize : 'iphone',
  lotteryWinning : '是',
  lotteryNumber : 2,
  lotteryIntegral : 30
}, {
  key: '2',
  lotteryArea: '北京',
  lotteryMobile : 13661111111,
  lotteryWx : 'weixin123',
  lotteryPrize : 'iphone',
  lotteryWinning : '是',
  lotteryNumber : 2,
  lotteryIntegral : 30
}, {
  key: '3',
  lotteryArea: '北京',
  lotteryMobile : 13661111111,
  lotteryWx : 'weixin123',
  lotteryPrize : 'iphone',
  lotteryWinning : '是',
  lotteryNumber : 2,
  lotteryIntegral : 30
}, {
  key: '4',
  lotteryArea: '北京',
  lotteryMobile : 13661111111,
  lotteryWx : 'weixin123',
  lotteryPrize : 'iphone',
  lotteryWinning : '是',
  lotteryNumber : 2,
  lotteryIntegral : 30
}, {
  key: '5',
  lotteryArea: '北京',
  lotteryMobile : 13661111111,
  lotteryWx : 'weixin123',
  lotteryPrize : 'iphone',
  lotteryWinning : '是',
  lotteryNumber : 2,
  lotteryIntegral : 30
}, {
  key: '6',
  lotteryArea: '北京',
  lotteryMobile : 13661111111,
  lotteryWx : 'weixin123',
  lotteryPrize : 'iphone',
  lotteryWinning : '是',
  lotteryNumber : 2,
  lotteryIntegral : 30
}, {
  key: '7',
  lotteryArea: '北京',
  lotteryMobile : 13661111111,
  lotteryWx : 'weixin123',
  lotteryPrize : 'iphone',
  lotteryWinning : '是',
  lotteryNumber : 2,
  lotteryIntegral : 30
}, {
  key: '8',
  lotteryArea: '北京',
  lotteryMobile : 13661111111,
  lotteryWx : 'weixin123',
  lotteryPrize : 'iphone',
  lotteryWinning : '是',
  lotteryNumber : 2,
  lotteryIntegral : 30
}, {
  key: '9',
  lotteryArea: '北京',
  lotteryMobile : 13661111111,
  lotteryWx : 'weixin123',
  lotteryPrize : 'iphone',
  lotteryWinning : '是',
  lotteryNumber : 2,
  lotteryIntegral : 30
}, {
  key: '10',
  lotteryArea: '北京',
  lotteryMobile : 13661111111,
  lotteryWx : 'weixin123',
  lotteryPrize : 'iphone',
  lotteryWinning : '是',
  lotteryNumber : 2,
  lotteryIntegral : 30
}, {
  key: '11',
  lotteryArea: '北京',
  lotteryMobile : 13661111111,
  lotteryWx : 'weixin123',
  lotteryPrize : 'iphone',
  lotteryWinning : '是',
  lotteryNumber : 2,
  lotteryIntegral : 30
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
        <div style={{fontSize:14,lineHeight:2.4}}>抽奖日期：</div>
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