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
import Modal from 'antd/lib/modal';
const confirm = Modal.confirm;

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
}, {
  title: '操作',
  key: 'operation',
  render: function(text, record,index) {
    var edit = '/rule/number/edit/'+record.key,
      del = '/rule/number/del/' + record.key
    return <span><Link to={edit}>编辑</Link><span className="ant-divider"></span><a href="#" onClick={showModal} data-id={record.key} data-index={index} data-name={record.ruleName} >删除</a></span>;
  }
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


let modalState;
function showModal(e){
  Event.stop(e);
  var tar = Event.target(e);
  var id = tar.getAttribute('data-id'),index=tar.getAttribute('data-index'),name = tar.getAttribute('data-name');
  modalState(id,index,name)
}



class RuleNumber extends React.Component{
  constructor() {
    super();
    this.state =  {
        total : 100
      }
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  componentDidMount(){

    modalState = this.showModal;
    
  }
  showModal(id,index,name){
    this.setState({
      visible : true,
      ModalText: '你正要删除 规则："'+ name +'"，是否继续？',
      confirmLoading: false,
      delId : id,
      index : index
    })
  }
  handleOk(e){
    //*******************删除逻辑，删除 delId , 然后 关闭****************************
    
    // ***********************删除请求******************
    
    this.setState({
      confirmLoading:true
    })
    setTimeout(function(){
      this.setState({
        visible : false
      })
    }.bind(this),2000)
  }
  handleCancel(e){
    this.setState({
      visible : false
    })
  }
	render(){
		return(
			<div className="m-list">
        <Row>
			  <Col span="2" style={{marginBottom:20}}>
            <Link to='/rule/number/add'>
              <Button type="primary" size="large"><Icon type="plus" /><span>新增</span></Button>
                  </Link>
        </Col>
        <Col span="2">
            <Link to='/rule/number/exports'>
              <Button type="primary" size="large"><Icon type="download" /><span>导出报表</span></Button>
                  </Link>
          </Col>
        </Row>
        <Table columns={columns} dataSource={data} pagination={{showQuickJumper:true,pageSize:10,current:1,showSizeChanger:true,total:this.state.total}}  />
        <Modal title="您正在进行删除操作，请确认！"
          visible={this.state.visible}
          onOk={this.handleOk}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}>
          <p>{this.state.ModalText}</p>
        </Modal>
			</div>
		)
	}
}
module.exports = {
	RuleNumber : RuleNumber
}