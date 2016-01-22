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

import '../../entry/config';

const urlRoleList = config.__URL + config.user.role.list;
const urlRoleDel = config.__URL + config.user.role.del;

class SelectForm extends React.Component{
	//mixins: [Form.ValueMixin],

  constructor() {
  	super();
    this.state =  {
      Role_Name: '',
      Role_Type: "2",
    };
    this.setValue = this.setValue.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setValue(e){
  	var Role_Type = this.state.Role_Type;
  	this.setState({
  		Role_Name : e.target.value,
      Role_Type : Role_Type
  	})
  }
  handleSelectChange(e){
  	var Role_Name = this.state.Role_Name;
  	console.log(e)
  	this.setState({
  		Role_Name : Role_Name,
      Role_Type : e
  	})
  	// this.setState({
  	// 	formData['Role_Type'] : e.target.value
  	// })
  }

  handleSubmit(e) {
    // ********************************************************** ajax提交数据，获取table的data值
    e.preventDefault();

    this.props.changeTableState(this.state);
    console.log(this.state);
    
  }

  render() {
    const formData = this.state;
    return (
    	<div className="fright">
      <Form inline onSubmit={this.handleSubmit}>
        <FormItem
          id="Role_Name">
          <Input placeholder="请输入角色名" id="Role_Name" name="Role_Name" onChange={this.setValue} value={this.state.Role_Name} />
        </FormItem>
        <FormItem
          id="Role_Type">
          <Select id="select" name="Role_Type" size="large" defaultValue={this.state.Role_Type} style={{width:200}} onChange={this.handleSelectChange}>
	        <Option value="1">操作角色</Option>
	        <Option value="2">角色1</Option>
	        <Option value="3">角色2</Option>
	        <Option value="4">角色3</Option>
	      </Select>
        </FormItem>
        <FormItem>
          <Button type="primary" shape="circle" size="large"  htmlType="submit">
    		    <Icon type="search" />
    		  </Button>
        </FormItem>
        <FormItem>
          <Button type="primary" size="large"  >导出excel</Button>
        </FormItem>
      </Form>
      </div>
    );
  }
}

let modalState;
function showModal(e){
  Event.stop(e);
  var tar = Event.target(e);
  var id = tar.getAttribute('data-id'),name=tar.getAttribute('data-name'),index=tar.getAttribute('data-index');
  modalState(id,index,name)
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
  dataIndex: 'Role_Name',
  key: 'Role_Name'
}, {
  title: '角色类型',
  dataIndex: 'Role_Type',
  key: 'Role_Type'
}, {
  title: '角色描述',
  dataIndex: 'roleDesc',
  key: 'roleDesc'
}, {
  title: '操作',
  key: 'operation',
  render: function(text, record,index) {
  	var edit = '/user/role/edit/'+record.Role_Code,
  		set = '/user/role/set/' + record.Role_Code,
  		del = '/user/role/del/' + record.Role_Code
    return <span><Link to={edit}>编辑</Link><span className="ant-divider"></span><Link to={set}>设置权限</Link><span className="ant-divider"></span><a href="#" onClick={showModal} data-index={index} data-name={record.Role_Name} data-id={record.Role_Code} >删除</a></span>;
  }
}];



class UserRole extends React.Component{
	constructor(){
		super();
    this.state = {
      visible : false,
      title : '',
      ModalText : '',
      page:1,
      pagesize:10,
      delId : false,
      total : 0, // 数据总数
      data:[]
    }
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.changeTableState = this.changeTableState.bind(this);
	}

  componentDidMount(){
    modalState = this.showModal;
  }
  componentWillUnmount(){
    modalState = false;
  }
  changeTableState(opts){
    var opts = opts || {};
    opts.page = this.state.page*1-1;
    opts.pagesize = this.state.pagesize;
    //opts.EntityCode = 'DEFAULT';
    var that = this;

    _G.ajax({
      url : urlRoleList,
      method: "get",
      data : opts,
      success:function(res){
        var d = [];
        for(var i=0,l=res.Data.length;i<l;i++){
          d[i]=res.Data[i];
          d[i]['key'] = i;
        }
        this.setState({
          data : d,
          total : Math.ceil(res.TotalCount/this.state.pagesize)
        })

      }.bind(this)

    })
  }
  showModal(id,index,name){
    this.setState({
      visible : true,
      ModalText: '你正要删除 "'+ name +'"的角色，是否继续？',
      confirmLoading: false,
      delId : id,
      index : index,
    })
  }
  handleOk(e){
    //*******************删除逻辑，删除 delId , 然后 关闭****************************
    this.setState({
      loading : true
    })
    _G.ajax({
      url : urlRoleDel,
      method : 'get',
      data : {
        Role_Code : this.state.delId
      },
      success:function(res){
        if(res.ReturnOperateStatus == 'True'){
          this.setState({
            visible : false
          })
          console.log('删除成功');
          var d = [].concat(this.state.data);
          d.splice(d[this.state.index],1);
          console.log(this.state.index)
          this.setState({
            data : d,
            loading : false
          })
          //**********************更新table数据****************
          return
        }
        if(res.ReturnOperateStatus == 'False'){
          console.log('删除失败')
        }
      }.bind(this)
    })

    this.setState({
      confirmLoading:true
    })
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
						<SelectForm changeTableState={this.changeTableState} />
					</Col>
				</Row>
				<Row>
					<Table columns={columns} dataSource={this.state.data} pagination={{showQuickJumper:true,pageSize:this.state.pagesize,current:1,showSizeChanger:true,total:this.state.total}}  />
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