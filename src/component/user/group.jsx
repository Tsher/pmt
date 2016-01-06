// 用户管理  组织机构管理

import React from 'react';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import {Link} from 'react-router';
import { createHistory } from 'history';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Table from 'antd/lib/table';

const FormItem = Form.Item;
import Tree from 'antd/lib/tree';
const TreeNode = Tree.TreeNode;

import Modal from 'antd/lib/modal';


const confirm = Modal.confirm;

const history = createHistory();



// tree data
var _data = [
  {
    title : 'dom1111',
    key : 'key1',
    children:[
      {
        title : 'dom1-1',
        key : 'key1-1'
      },
      {
        title : 'dom1-2',
        key : 'key1-2'
      }
    ]
  },
  {
    title : 'dom2',
    key : 'key2',
    children:[
      {
        title : 'dom2-1',
        key : 'key2-1'
      },
      {
        title : 'dom2-2',
        key : 'key2-2'
      }
    ]
  }
];




const columns = [{
  title: '用户编号',
  dataIndex: 'userNo',
  key: 'userNo',
}, {
  title: '真实名称',
  dataIndex: 'userName',
  key: 'userName'
}, {
  title: '登录名',
  dataIndex: 'loginName',
  key: 'loginName'
}];
// table data
const data = [{
  key: '1',
  userNo: '000001',
  userName: '真实姓名',
  loginName: '登录名',
}, {
  key: '2',
  userNo: '000002',
  userName: '真实姓名',
  loginName: '登录名',
}, {
  key: '3',
  userNo: '000003',
  userName: '真实姓名',
  loginName: '登录名',
}, {
  key: '4',
  userNo: '000004',
  userName: '真实姓名',
  loginName: '登录名',
}, {
  key: '5',
  userNo: '000005',
  userName: '真实姓名',
  loginName: '登录名',
}, {
  key: '6',
  userNo: '000005',
  userName: '真实姓名',
  loginName: '登录名',
}, {
  key: '7',
  userNo: '000005',
  userName: '真实姓名',
  loginName: '登录名',
}, {
  key: '8',
  userNo: '000005',
  userName: '真实姓名',
  loginName: '登录名',
}, {
  key: '9',
  userNo: '000005',
  userName: '真实姓名',
  loginName: '登录名',
}, {
  key: '10',
  userNo: '000010',
  userName: '真实姓名',
  loginName: '登录名',
}, {
  key: '11',
  userNo: '000011',
  userName: '真实姓名',
  loginName: '登录名',
}, {
  key: '12',
  userNo: '000012',
  userName: '真实姓名',
  loginName: '登录名',
}];





class UserGroup extends React.Component{
	constructor(){
		super();
	    this.state = {
	      treedata : [],
	      selectedKeys : [],
	      checkedKeys:[],
	      info : {
	      	no : null, // 编号
	      	parent : null, // 上级部门
	      	name : null , // 部门名称
	      	admin : null, // 部门管理员
	      	desc : null , // 部门描述
	      	child :[
	      		{
	      			no : null, // 用户编号
	      			name : null, // 真实姓名
	      			loginName : null, // 登录名
	      		}
	      	]
	      },
	      showEditBtn : false, // 是否可点 编辑按钮
	      showDelBtn : false, // 是否可点 删除按钮
	      editLink : '', // 编辑链接地址
	      showInfo : 'none' , // none 隐藏， block 显示   右侧详细信息
	    };
	    this.checkhandle = this.checkhandle.bind(this);
	    this.rightClickhandler = this.rightClickhandler.bind(this);

	    this.handleCancel = this.handleCancel.bind(this);
	    this.showModal = this.showModal.bind(this);
	    this.handleOk = this.handleOk.bind(this);
	    this.handleCancel = this.handleCancel.bind(this);
	}

  componentDidMount(){
    this.setState({
      treedata : _data
    });

  }

  // 点击树菜单
  checkhandle(info){
  	console.log('/user/group/edit/'+ info.node.props.eventKey)
  	// 根据 eventKey 查询 相关信息 展示右侧详细信息
    this.setState({
      selectedKeys : [info.node.props.eventKey],
      editLink : '/user/group/edit/'+ info.node.props.eventKey,
      showEditBtn : true,
      showInfo : 'block',
    })
    // 根据选中的 key ，获取 相关数据 ,更新state，展示再右侧
  }
  // 右键树菜单
  rightClickhandler(info){
  	this.setState({
  		selectedKeys : [info.node.props.eventKey],
      	editLink : '/user/group/edit/'+ info.node.props.eventKey,
      	showEditBtn : true,
      	showInfo : 'block',
  	})
    console.log(info.event.pageX,info.event.pageY,info.node.props.eventKey)
  }
  componentWillUnmount(){
    
  }

  showModal(){
  	// 删除之前 查询此 key 是否有子节点， 如有，不允许删除 ************************
    this.setState({
      visible : true,
      ModalText: '你正要删除 "'+ this.state.selectedKeys[0] +'"的部门，是否继续？',
      confirmLoading: false
    })
  }
  handleOk(e){
    //*******************删除逻辑，删除 selectedKeys[0] , 然后 关闭****************************
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
  
  render(){
	const loop = (data) => {
      return data.map( (item) => {
        if(item.children){
          return (<TreeNode title={item.title} key={item.key}>{loop(item.children)}</TreeNode>);
        }else{
          return (<TreeNode title={item.title} key={item.key}></TreeNode>);
        }
      } )
    }
    const parseTree = (data) => loop(data);
    let treeNodes = parseTree(this.state.treedata);
	return(
			<div className="m-list">
				<Row>
					<Col span="2">
				        <Link to='/user/group/add'>
							<Button type="primary" size="large"><Icon type="plus" /><span>新增</span></Button>
				        </Link>
					</Col>
					<Col span="2">
				        <Link to={this.state.editLink}>
							<Button type="primary" size="large"><Icon type="edit" /><span>修改</span></Button>
				        </Link>
					</Col>
					<Col span="2">
				        <Button type="primary" size="large" onClick={this.showModal}><Icon type="edit" /><span>删除</span></Button>
					</Col>
				</Row>
				<Row>
					<Col span="8">
						<div className="border border-raduis">
							<div className="title">组织机构</div>
							<div className="con">
								<Tree multiple={false} onSelect={this.checkhandle} onRightClick={this.rightClickhandler}>
					          		{treeNodes}
					        	</Tree>
							</div>
						</div>
					</Col>
					<Col span="8" style={{ display : this.state.showInfo }} >
						<div className="border border-raduis">
							<div className="title"> 机构信息 </div>
							<div className="con">
								<Form inline >
									<FormItem id="no" label="部门编号: " labelCol={{span:8}} wrapperCol={{span: 14,offset:1}}>
										<Input name="no" value={this.state.info.no}  />
									</FormItem>
									<FormItem id="parent" label="上级部门: " labelCol={{span:8}} wrapperCol={{span: 14,offset:1}}>
										<Input name="parent"  value={this.state.info.parent}  />
									</FormItem>
									<FormItem id="name" label="部门名称: " labelCol={{span:8}} wrapperCol={{span: 14,offset:1}}>
										<Input name="name" value={this.state.info.name}  />
									</FormItem>
									<FormItem id="desc" label="部门描述: " labelCol={{span:8}} wrapperCol={{span: 14,offset:1}}>
										<Input name="desc" type="textarea"  value={this.state.info.desc}  />
									</FormItem>
									<FormItem id="admin" label="部门管理员: " labelCol={{span:8}} wrapperCol={{span: 14,offset:1}}>
										<Input name="admin"  value={this.state.info.admin}  />
									</FormItem>
								</Form>
							</div>
						</div>
					</Col>
					<Col span="8"  style={{ display : this.state.showInfo }} >
						<div className="border border-raduis">
							<div className="title">机构成员</div>
							<div className="con">
								<Table columns={columns} pagination={false} dataSource={data} size="small" />
							</div>
						</div>
					</Col>
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
	UserGroup : UserGroup
}