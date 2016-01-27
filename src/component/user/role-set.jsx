//  用户管理   企业角色管理 设置权限


import React from 'react';
import Tree from 'antd/lib/tree';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Checkbox from 'antd/lib/checkbox';
import message from 'antd/lib/message';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

import { createHistory } from 'history';
const History = createHistory();
const goBack = History.goBack;

const TreeNode = Tree.TreeNode;

/*
*
* @params id
* 查询此id的内容，及权限
* @return tree id 及 tree id对应的权限
* 

**    等待实现功能
*
**/

var treeChecked; // 已选择的tree 节点
function readChecked(){

}


class TreeView  extends React.Component{
  
  handler(e){
    e.preventDeafult();
  }
  constructor(){
    super();
    this.state = {
      treedata : [],
      checkedKeys : [],
      selectedKeys : []
    }
    this.readChecked = this.readChecked.bind(this);
  }
  componentWillMount(){
    readChecked = this.readChecked;
  }
  change(d){
    this.setState({
      treedata : d
    })
  }
  componentWillUnmount(){
    
  }
  addChild(e){
    return false;
  }
  
  readChecked(){
  	return this.state.checkedKeys
  }
  render(){
    const loop = (data) => {
      return data.map( (item) => {
        if(item.Children){
          return (<TreeNode title={item.Name} key={item.Code}>{loop(item.Children)}</TreeNode>);
        }else{
          return (<TreeNode title={item.Name} key={item.Code}></TreeNode>);
        }
      } )
    }
    const parseTree = (data) => loop(data);
    let treeNodes = parseTree(this.props.treedata);
    return (
    	<div>
        	<Tree defaultExpandAll={true} treedata={this.props.treedata} multiple={false} defaultCheckedKeys={this.props.checkedKeys} checkable={true} onCheck={this.props.checkhandle} >
          	{treeNodes}
        	</Tree>
      	</div>
      	)
  }
}


const urlMenus = config.__URL + config.menu;
const saveRoles = config.__URL + config.user.role.saveRole;
const getRoles = config.__URL + config.user.role.getRole; // 获取权限


class UserRoleSet extends React.Component{
	constructor(){
		super();
		this.state = {
			menus : [],
			selectedRole : '',
			checkedKeys : [],
			id : '' // 如果是编辑状态
		}
		this.onChange = this.onChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.checkhandle = this.checkhandle.bind(this);
	}

	componentDidMount(){
		this.setState({
			id : this.props.params.id
		})
		// 读取全菜单树
		_G.ajax({
			url : urlMenus,
			type : 'get',
			success : function(res){
				this.setState({
					menus : res.Data
				})
			}.bind(this)
		})
		// 获取权限
		_G.ajax({
			url : getRoles,
			data : {
				Role_Code : this.props.params.id
			},
			type : 'get',
			success : function(res){
				console.log(res.Data)
			}
		})

	}
	
	onChange(e){
		var roles = this.state.selectedRole;
		if(e.target.checked){
			roles+=','+e.target.value
		}else{
			roles = roles.replace(','+e.target.value,'')
		}
		this.setState({
			selectedRole : roles
		})
	}

	handleSubmit(){
		// 已读取 选择 内容 ，等待ajax提交 *****************************************************
		var data = Object.assign({},this.state);
		// to do ***************************************************
		_G.ajax({
			url : saveRoles,
			data : {
				Role_Code : this.state.id,
				selectedRole : this.state.selectedRole,

			},
			type : 'post',
			success : function(){

			}
		})
	}
	handleReset(){
		goBack();
	}

	checkhandle(info){
		console.log(info.checkedKeys)
	    this.setState({
	      checkedKeys : info.checkedKeys
	    })
	  }
	
	render(){

		return (
			<div className="m-form">
	        	<div className="m-form-title">设置操作角色权限</div>
	        		<div className="m-form-con">
	        			<Row className="group-set-info">
	        				<Col span="4">角色名称:企业管理员</Col>
	        				<Col span="4">角色类型:操作角色</Col>
	        				<Col span="4">角色编号:A000001</Col>
	        			</Row>
	        			<div className="group-set-list">
		        			<Row>
		        				<Col span="6">
		        					<div className="group-set-tree">
		        						<div className="group-set-title">菜单树</div>
		        						<TreeView checkhandle={this.checkhandle} treedata={this.state.menus} checkedKeys={this.state.checkedKeys} />
		        					</div>
		        				</Col>
		        				<Col span="6" offset="1">
		        					<div className="group-set-tree">
		        						<div className="group-set-title">赋予角色权限</div>
		        						<ul>
		        							<li><Checkbox key="search" value="1" defaultChecked={false} onChange={this.onChange} />查询</li>
		        							<li><Checkbox key="add" value="2" defaultChecked={false} onChange={this.onChange} />新增</li>
		        							<li><Checkbox key="edit" value="3" defaultChecked={false} onChange={this.onChange} />修改</li>
		        							<li><Checkbox key="del" value="4" defaultChecked={false} onChange={this.onChange} />删除</li>
		        						</ul>
		        					</div>
		        				</Col>
		        			</Row>
	        			</div>
	        		</div>
	        	<div className="m-form-btns">
					<Row>
					<Col span="4">
					<Button type="primary" onClick={this.handleSubmit}>确定</Button>
					&nbsp;&nbsp;&nbsp;&nbsp;
					<Button type="primary" onClick={this.handleReset}>取消</Button>
					</Col>
					</Row>
      			</div>
	        </div>
	    )
	}
}


module.exports = {
	UserRoleSet : UserRoleSet
}