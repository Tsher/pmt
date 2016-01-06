// 用户管理  企业用户管理

import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import Form from 'antd/lib/form';
import message from 'antd/lib/message';
import Table from 'antd/lib/table';
import {Link} from 'react-router';
import { createHistory } from 'history';
import Modal from 'antd/lib/modal';
import Popover from 'antd/lib/popover';
import DatePicker from 'antd/lib/date-picker';
import Radio from 'antd/lib/radio';

const RadioGroup = Radio.Group;


const confirm = Modal.confirm;
const history = createHistory();

const FormItem = Form.Item;

class SelectForm extends React.Component{
	//mixins: [Form.ValueMixin],

  constructor() {
  	super();
    this.state =  {
      userName: undefined,
      startTime : undefined,
      endTime : undefined,
      state : undefined,
      part : undefined,
      show : 'none'
    };
    this.setValue = this.setValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.radioChange = this.radioChange.bind(this);
    this.disabledEndDate = this.disabledEndDate.bind(this);
    this.showMoreSearch = this.showMoreSearch.bind(this);
  }

  showMoreSearch(){
    this.setState({
      show : this.state.show == 'none' ? 'block' : 'none'
    })
  }


  // 改变文本框的值
  setValue(e){
    var name = e.target.id;
  	this.setState({
      [name] : e.target.value
  	})
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

  // datepicker change
  onChange(field,value){
    this.setState({
      [field] : value
    })
  }
  // radio change
  radioChange(e){
    this.setState({
      state : e.target.value
    })
  }

  disabledEndDate(endValue){
    if (!endValue || !this.state.startTime) {
      return false;
    }
    return endValue.getTime() <= this.state.startTime.getTime();
  }

 
  render() {
    return (
    	<div className="fright">
      <Form inline onSubmit={this.handleSubmit}>
      <Row>
      <Col span="24">
          <div className="fright">
          <FormItem 
            id="userName">
            <Input placeholder="请输入登录名或真实姓名" style={{width:250}} id="userName" name="userName" onChange={this.setValue} value={this.state.userName} />
          </FormItem>
          <FormItem>
            <Button type="primary" shape="circle" size="large"  htmlType="submit">
  		        <Icon type="search" />
  		      </Button>
          </FormItem>
          <FormItem>
            <Button onClick={this.showMoreSearch}><span>更多搜索</span><Icon type="down" /></Button>
          </FormItem>
          </div>
        </Col>
        <Col span="24" style={{ display : this.state.show }}>
            <div className="fright">
            <ul className="fleft clearfix">
              <li className="fleft">
                  <FormItem id="startTime" >
                  <Col span="11">
                    <DatePicker placeholder="开始日期" onChange={this.onChange.bind(this,'startTime')} />
                  </Col>
                  <Col span="1">
                    <p className="ant-form-split">-</p>
                  </Col>
                   <Col span="11">
                    <DatePicker disabledDate={this.disabledEndDate} placeholder="结束日期" onChange={this.onChange.bind(this,'endTime')} />
                  </Col>
                </FormItem>
              </li>
              <li className="fleft">
                <FormItem id="state">
                  <Col span="24">
                    <label className="ant-checkbox-inline">用户状态：</label>
                    <label className="ant-checkbox-inline">
                    <RadioGroup onChange={this.radioChange} value={this.state.state}>
                      <Radio value="all">全部</Radio>
                      <Radio value="on">在职</Radio>
                      <Radio value="off">离职</Radio>
                    </RadioGroup>
                    </label>
                   </Col>
                   
                </FormItem>
              </li>
              <li className="fleft">
                <FormItem id="part" label="隶属部门：">
                  <Input placeholder="" id="part" name="part" onChange={this.setValue} value={this.state.part} />
                </FormItem>
              </li>
              <li className="fleft">
                <FormItem>
                  <Button type="primary"  htmlType="submit">查询</Button>
                </FormItem>
              </li>
            </ul>
            
            
          </div>
        </Col>
        </Row>
      </Form>
      </div>
    );
  }
}

let modalState;
function showModal(e){
  Event.stop(e);
  var tar = Event.target(e);
  var id = tar.getAttribute('data-id');
  modalState(id)
}

const columns = [{
  title: '用户编号',
  dataIndex: 'userNo',
  key: 'userNo',
  render: function(text,record) {
  	var href= '/user/user/info/'+text;
    return <Link to={href}>{text}</Link>;
  }
}, {
  title: '姓名',
  dataIndex: 'userName',
  key: 'userName'
}, {
  title: '性别',
  dataIndex: 'userSex',
  key: 'userSex'
}, {
  title: '登录名',
  dataIndex: 'userLoginName',
  key: 'userLoginName'
},{
  title: '手机号',
  dataIndex: 'userMobile',
  key: 'userMobile'
},{
  title: '注册时间',
  dataIndex: 'userCreateTime',
  key: 'userCreateTime'
},{
  title: '用户状态',
  dataIndex: 'userState',
  key: 'userState'
},{
  title: '电子邮箱',
  dataIndex: 'userEmail',
  key: 'userEmail'
}, {
  title: '操作',
  key: 'operation',
  render: function(text, record) {
  	var edit = '/user/user/edit/'+record.userNo,
  		set = '/user/user/role/' + record.userNo,
  		del = '/user/user/del/' + record.userNo
    return <span><Link to={edit}>编辑</Link><span className="ant-divider"></span><Link to={set}>设置角色</Link><span className="ant-divider"></span><a href="#" onClick={showModal} data-id={record.roleNo} >删除</a></span>;
  }
}];
const data = [{
  key: '1',
  userNo: '000001',
  userName: '李楠',
  userSex: '女',
  userLoginName : 'lili',
  userMobile : 13661111111,
  userCreateTime : '2015-10-10 10:30',
  userState : '在职',
  userEmail : 'ryw@163.com'
}, {
  key: '2',
  userNo: '000002',
  userName: '李楠',
  userSex: '女',
  userLoginName : 'lili',
  userMobile : 13661111111,
  userCreateTime : '2015-10-10 10:30',
  userState : '在职',
  userEmail : 'ryw@163.com'
}, {
  key: '3',
  userNo: '000003',
  userName: '李楠',
  userSex: '女',
  userLoginName : 'lili',
  userMobile : 13661111111,
  userCreateTime : '2015-10-10 10:30',
  userState : '在职',
  userEmail : 'ryw@163.com'
}, {
  key: '4',
  userNo: '000004',
  userName: '李楠',
  userSex: '女',
  userLoginName : 'lili',
  userMobile : 13661111111,
  userCreateTime : '2015-10-10 10:30',
  userState : '在职',
  userEmail : 'ryw@163.com'
}, {
  key: '5',
  userNo: '000005',
  userName: '李楠',
  userSex: '女',
  userLoginName : 'lili',
  userMobile : 13661111111,
  userCreateTime : '2015-10-10 10:30',
  userState : '在职',
  userEmail : 'ryw@163.com'
}, {
  key: '6',
  userNo: '000006',
  userName: '李楠',
  userSex: '女',
  userLoginName : 'lili',
  userMobile : 13661111111,
  userCreateTime : '2015-10-10 10:30',
  userState : '在职',
  userEmail : 'ryw@163.com'
}, {
  key: '7',
  userNo: '000007',
  userName: '李楠',
  userSex: '女',
  userLoginName : 'lili',
  userMobile : 13661111111,
  userCreateTime : '2015-10-10 10:30',
  userState : '在职',
  userEmail : 'ryw@163.com'
}, {
  key: '8',
  userNo: '000008',
  userName: '李楠',
  userSex: '女',
  userLoginName : 'lili',
  userMobile : 13661111111,
  userCreateTime : '2015-10-10 10:30',
  userState : '在职',
  userEmail : 'ryw@163.com'
}, {
  key: '9',
  userNo: '000009',
  userName: '李楠',
  userSex: '女',
  userLoginName : 'lili',
  userMobile : 13661111111,
  userCreateTime : '2015-10-10 10:30',
  userState : '在职',
  userEmail : 'ryw@163.com'
}, {
  key: '10',
  userNo: '000010',
  userName: '李楠',
  userSex: '女',
  userLoginName : 'lili',
  userMobile : 13661111111,
  userCreateTime : '2015-10-10 10:30',
  userState : '在职',
  userEmail : 'ryw@163.com'
}, {
  key: '11',
  userNo: '000011',
  userName: '李楠',
  userSex: '女',
  userLoginName : 'lili',
  userMobile : 13661111111,
  userCreateTime : '2015-10-10 10:30',
  userState : '在职',
  userEmail : 'ryw@163.com'
}];







class UserUser extends React.Component{
	constructor(){
		super();
    this.state = {
      visible : false,
      title : '',
      ModalText : '',
      delId : false,
      total : 100
    }
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
	}

  componentDidMount(){
    modalState = this.showModal;
    var that = this;
    setTimeout(function(){
      that.setState({
        total:400
      })
    },3000)
  }
  componentWillUnmount(){
    modalState = false;
  }
  showModal(id){
    this.setState({
      visible : true,
      ModalText: '你正要删除 编号"'+ id +'"的用户，是否继续？',
      confirmLoading: false,
      delId : id
    })
  }
  handleOk(e){
    //*******************删除逻辑，删除 delId , 然后 关闭****************************
    this.setState({
      confirmLoading:true
    })
    setTimeout(()=>{
      this.setState({
        visible : false
      })
    },2000)
  }
  handleCancel(e){
    this.setState({
      visible : false
    })
  }
  handleClick(e){
    console.log(e);
  }
	render(){
		return(
			<div className="m-list">
				<Row>
					<Col span="2">
          <Link to='/user/user/add'>
						<Button type="primary" size="large"><Icon type="plus" /><span>新增</span></Button>
          </Link>
					</Col>
					<Col span="22">
						<SelectForm />
					</Col>
				</Row>
				<Row>
					<Table columns={columns} dataSource={data} pagination={{showQuickJumper:true,pageSize:10,current:1,showSizeChanger:true,total:this.state.total}}  />
				</Row>
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
	UserUser : UserUser
}