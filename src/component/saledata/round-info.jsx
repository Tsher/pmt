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


class SaleDataRoundInfo extends React.Component{
	constructor(){
		super();
		this.state =  {
	      total : 100,
        id : '',
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
	SaleDataRoundInfo : SaleDataRoundInfo
}