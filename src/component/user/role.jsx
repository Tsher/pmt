// 用户管理  企业角色管理  列表



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


const confirm = Modal.confirm;
const history = createHistory();

const FormItem = Form.Item;

class SelectForm extends React.Component{
	//mixins: [Form.ValueMixin],

  constructor() {
  	super();
    this.state =  {
      formData: {
        roleName: undefined,
        role: "2",
      }
    };
    this.setValue = this.setValue.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setValue(e){
  	var role = this.state.formData.role;
  	this.setState({
  		formData : {
  			roleName : e.target.value,
  			role : role
  		}
  	})
  }
  handleSelectChange(e){
  	var roleName = this.state.formData.roleName;
  	console.log(e)
  	this.setState({
  		formData : {
  			roleName : roleName,
  			role : e
  		}
  	})
  	// this.setState({
  	// 	formData['role'] : e.target.value
  	// })
  }

  handleSubmit(e) {
    // ********************************************************** ajax提交数据，获取table的data值
    e.preventDefault();
    message.success('收到表单值~~~ ：' + JSON.stringify(this.state.formData, function(k, v) {
      if (typeof v === 'undefined') {
        return '';
      }
      return v;
    }));
  }

  render() {
    const formData = this.state.formData;
    return (
    	<div className="fright">
      <Form inline onSubmit={this.handleSubmit}>
        <FormItem
          id="roleName">
          <Input placeholder="请输入角色名" id="roleName" name="roleName" onChange={this.setValue} value={this.state.formData.roleName} />
        </FormItem>
        <FormItem
          id="role">
          <Select id="select" name="role" size="large" defaultValue={this.state.formData.role} style={{width:200}} onChange={this.handleSelectChange}>
	        <Option value="1">操作角色</Option>
	        <Option value="2">角色1</Option>
	        <Option value="3">角色2</Option>
	        < Option value="4">角色3</Option>
	      </Select>
        </FormItem>
        <Button type="primary" shape="circle" size="large"  htmlType="submit">
		    <Icon type="search" />
		  </Button>
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
  title: '角色编号',
  dataIndex: 'roleNo',
  key: 'roleNo',
  render: function(text,record) {
  	var href= '/user/role/info/'+text;
    return <Link to={href}>{text}</Link>;
  }
}, {
  title: '角色名称',
  dataIndex: 'roleName',
  key: 'roleName'
}, {
  title: '角色类型',
  dataIndex: 'roleType',
  key: 'roleType'
}, {
  title: '角色描述',
  dataIndex: 'roleDesc',
  key: 'roleDesc'
}, {
  title: '操作',
  key: 'operation',
  render: function(text, record) {
  	var edit = '/user/role/edit/'+record.roleNo,
  		set = '/user/role/set/' + record.roleNo,
  		del = '/user/role/del/' + record.roleNo
    return <span><Link to={edit}>编辑</Link><span className="ant-divider"></span><Link to={set}>设置权限</Link><span className="ant-divider"></span><a href="#" onClick={showModal} data-id={record.roleNo} >删除</a></span>;
  }
}];
const data = [{
  key: '1',
  roleNo: '000001',
  roleName: '企业管理员',
  roleType: '操作角色',
  roleDesc: '拥有全部权限'
}, {
  key: '2',
  roleNo: '000002',
  roleName: '企业管理员',
  roleType: '操作角色',
  roleDesc: '拥有全部权限'
}, {
  key: '3',
  roleNo: '000003',
  roleName: '企业管理员',
  roleType: '操作角色',
  roleDesc: '拥有全部权限'
}, {
  key: '4',
  roleNo: '000004',
  roleName: '企业管理员',
  roleType: '操作角色',
  roleDesc: '拥有全部权限'
}, {
  key: '5',
  roleNo: '000005',
  roleName: '企业管理员',
  roleType: '操作角色',
  roleDesc: '拥有全部权限'
}, {
  key: '6',
  roleNo: '000006',
  roleName: '企业管理员',
  roleType: '操作角色',
  roleDesc: '拥有全部权限'
}, {
  key: '7',
  roleNo: '000007',
  roleName: '企业管理员',
  roleType: '操作角色',
  roleDesc: '拥有全部权限'
}, {
  key: '8',
  roleNo: '000008',
  roleName: '企业管理员',
  roleType: '操作角色',
  roleDesc: '拥有全部权限'
}, {
  key: '9',
  roleNo: '000009',
  roleName: '企业管理员',
  roleType: '操作角色',
  roleDesc: '拥有全部权限'
}, {
  key: '10',
  roleNo: '000010',
  roleName: '企业管理员',
  roleType: '操作角色',
  roleDesc: '拥有全部权限'
}, {
  key: '11',
  roleNo: '000011',
  roleName: '企业管理员',
  roleType: '操作角色',
  roleDesc: '拥有全部权限'
}];







class UserRole extends React.Component{
	constructor(){
		super();
    this.state = {
      visible : false,
      title : '',
      ModalText : '',
      delId : false,
      total : 1000 // 数据总数
    }
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
	}

  componentDidMount(){
    modalState = this.showModal;
  }
  componentWillUnmount(){
    modalState = false;
  }
  showModal(id){
    this.setState({
      visible : true,
      ModalText: '你正要删除 编号"'+ id +'"的角色，是否继续？',
      confirmLoading: false,
      delId : '0001'
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
					<Col span="4">
          <Link to='/user/role/add'>
						<Button type="primary" size="large"><Icon type="plus" /><span>新增</span></Button>
          </Link>
					</Col>
					<Col span="20">
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
	UserRole : UserRole
}