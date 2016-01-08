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
  render: function(text,record) {
  	var iName = 'ruleNumber'+record.key;
    return <FormItem id={iName}><Input id={iName} name={iName} /></FormItem>;
  }
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


class DateForm extends React.Component{
	constructor() {
		super();
		this.state =  {
	      startTime : undefined,
	      endTime : undefined,
	      total : 100
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
        <Form inline onSubmit={this.handleSubmit}>
		      <FormItem>
	          <Button type="primary" htmlType="submit" >保存</Button>
	          <Button type="primary" style={{marginLeft:10}}>重置</Button>
	          </FormItem>
	          <Row>
				<Table columns={columns} dataSource={data} pagination={{showQuickJumper:true,pageSize:10,current:1,showSizeChanger:true,total:this.state.total}}  />
			  </Row>
	    </Form>
    </div>;
  }
};

class RuleNumber extends React.Component{
	render(){
		return(
			<div className="m-list">
			     <DateForm />
			</div>
		)
	}
}
module.exports = {
	RuleNumber : RuleNumber
}