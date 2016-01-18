// 营销规则 积分规则
import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import { DatePicker } from 'antd/lib';
import { Button } from 'antd/lib';
import Table from 'antd/lib/table';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import message from 'antd/lib/message';
import {Link} from 'react-router';
import Icon from 'antd/lib/icon';

const FormItem = Form.Item;

const columns = [{
  title: '规则名称',
  dataIndex: 'ruleName',
  key: 'ruleName'
},{
  title: '描述',
  dataIndex: 'ruleText',
  key: 'ruleText'
},{
  title: '获得积分',
  dataIndex: 'ruleNumber',
  key: 'ruleNumber',
},{
  title: '计划生效时间',
  dataIndex: 'ruleTimeStar',
  key: 'ruleTimeStar'
},{
  title: '计划失效时间',
  dataIndex: 'ruleTimeEnd',
  key: 'ruleTimeEnd'
}];
const data = [{
  key: '1',
  ruleName: '绑定邮箱',
  ruleText: '会员通过了电子邮箱验证（包括用邮箱注册），每个会员只能按此规则获取1次积分。',
  ruleNumber : 30,
  ruleTimeStar : '2016-01-10 10:30',
  ruleTimeEnd : '2016-9-10 10:30'
}, {
  key: '2',
  ruleName: '绑定手机',
  ruleText: '会员通过了手机短信验证（包括用手机注册），每个会员只能按此规则获取1次积分。',
  ruleNumber : 100,
  ruleTimeStar : '2016-01-10 10:30',
  ruleTimeEnd : '2016-9-10 10:30'
}, {
  key: '3',
  ruleName: '注册会员',
  ruleText: '成功注册会员，每个会员只能按此规则获取1次积分。',
  ruleNumber : 100,
  ruleTimeStar : '2016-01-10 10:30',
  ruleTimeEnd : '2016-9-10 10:30'
}];



class RuleNumber extends React.Component{
  constructor() {
    super();
    this.state =  {
        total : 100
      }
  }
	render(){
		return(
			<div className="m-list">
			  <Col span="3" style={{marginBottom:20}}>
            <Link to='/rule/number/add'>
              <Button type="primary" size="large"><Icon type="plus" /><span>新增</span></Button>
                  </Link>
        </Col>
        <Table columns={columns} dataSource={data} pagination={{showQuickJumper:true,pageSize:10,current:1,showSizeChanger:true,total:this.state.total}}  />
			</div>
		)
	}
}
module.exports = {
	RuleNumber : RuleNumber
}