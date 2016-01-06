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
    this.checkhandle = this.checkhandle.bind(this);
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
  checkhandle(info){
    this.setState({
      selectedKeys : [info.node.props.eventKey],
      checkedKeys : info.checkedKeys
    })
  }
  readChecked(){
  	return this.state.checkedKeys
  }
  render(){
    const loop = (data) => {
      return data.map( (item) => {
        if(item.children){
          return (<TreeNode title={item.info} key={item.key}>{loop(item.children)}</TreeNode>);
        }else{
          return (<TreeNode title={item.info} key={item.key}></TreeNode>);
        }
      } )
    }
    const parseTree = (data) => loop(data);
    let treeNodes = parseTree(this.props.treedata);
    return (
    	<div>
        	<Tree defaultExpandAll={true} treedata={this.props.treedata} multiple={false} defaultCheckedKeys={this.props.checkedKeys} checkable={true} onCheck={this.checkhandle} >
          	{treeNodes}
        	</Tree>
      	</div>
      	)
  }
}


class UserRoleSet extends React.Component{
	constructor(){
		super();
		this.state = {
			menus : [
				{
					key : "1", 
					info : '用户管理', 
					route : '/user',
					className : 'menu-user',
					checked : true,
					children : [
						{key : "1-1",info : '组织机构管理',route : '/user/group', limits : ['search','add','edit','del']},
						{key : "1-2",info : '企业用户管理',route : '/user/user', limits : ['search','add','edit']},
						{key : "1-3",info : '企业角色管理',route : '/user/role', limits : ['search']},
					] 
				},
				{ 
					key : "2", 
					info : '基础信息', 
					route : '/base' ,
					className : 'menu-base',
					checked : false,
					children : [
						{key : "2-1",info : '企业信息管理',route : '/base/info', limits : []},
						{key : "2-2",info : '产品信息管理',route : '/base/product', limits : []},
						{key : "2-3",info : '销售区域管理',route : '/base/area', limits : []},
					] 
				},
				{ 
					key : "3", 
					info : '营销规则', 
					route : '/rule' ,
					className : 'menu-rule',
					checked : false,
					children : [
						{key : "3-1",info : '积分规则',route : '/rule/number', limits : []},
						{key : "3-2",info : '批次区域管理',route : '/rule/area', limits : []}
					] 
				},
				{ 
					key : "4", 
					info : '促销管理', 
					route : '/sale' ,
					className : 'menu-sale',
					checked : false,
					children : [
						{key : "4-1",info : '会员管理', route : '/sale/vip', limits : []},
						{key : "4-2",info : '促销人员管理', route : '/sale/user', limits : []},
						{key : "4-3",info : '促销活动设置', route : '/sale/do', limits : []},
						{key : "4-4",info : '奖品管理', route : '/sale/prize', limits : []}
					] 
				},
				{ 
					key : "5", 
					info : '促销数据管理',
					route : '/saledata',
					className : 'menu-saledata',
					checked : false,
					children : [
						{key : "5-1",info : '消费者参与流水', route : '/saledata/user', limits : []},
						{key : "5-2",info : '奖品兑换流水', route : '/saledata/prize', limits : []},
						{key : "5-3",info : '消费者抽奖流水', route : '/saledata/round', limits : []},
						{key : "5-4",info : '发送短信流水', route : '/saledata/send', limits : []},
						{key : "5-5",info : '话费充值流水', route : '/saledata/push', limits : []}
					] 
				}
			],
			selectedRole:'',
			id : '' // 如果是编辑状态
		}
		this.onChange = this.onChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount(){
		// 读取全菜单树


		// 编辑
	    if(this.props.params.id){
	      // ajax获取当前id的权限，变更state**********************
	      
	    }else{
	      // 新增 *************
	    } 
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
		treeChecked = readChecked();
		console.log(treeChecked,this.state.selectedRole.replace(/^\,/,''))
	}
	handleReset(){
		goBack();
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
		        						<TreeView treedata={this.state.menus} checkedKeys={[]} />
		        					</div>
		        				</Col>
		        				<Col span="6" offset="1">
		        					<div className="group-set-tree">
		        						<div className="group-set-title">赋予角色权限</div>
		        						<ul>
		        							<li><Checkbox key="search" value="search" defaultChecked={false} onChange={this.onChange} />查询</li>
		        							<li><Checkbox key="add" value="add" defaultChecked={false} onChange={this.onChange} />新增</li>
		        							<li><Checkbox key="edit" value="edit" defaultChecked={false} onChange={this.onChange} />修改</li>
		        							<li><Checkbox key="del" value="edl" defaultChecked={false} onChange={this.onChange} />删除</li>
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