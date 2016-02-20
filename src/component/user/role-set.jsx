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

const msg_error = function(){
  message.error('数据验证错误,请检查后提交')
}
const msg_success = function(){
  message.success('数据提交成功，等待后台处理')
}

/*
*
* @params id
* 查询此id的内容，及权限
* @return tree id 及 tree id对应的权限
*/ 


const urlMenus = config.__URL + config.menu;
const saveRoles = config.__URL + config.user.role.saveRole;
const getRoles = config.__URL + config.user.role.getRole; // 获取权限
const getRole = config.__URL + config.user.role.get; // 获取用户信息
const getRoleType = config.__URL + config.user.role.type; // 角色类型

class UserRoleSet extends React.Component{
	constructor(){
		super();
		this.state = {
			menus : [],
			selectedRole : {},
			selectedRoleArray : [],
			id : '', // 如果是编辑状态
			Role_Name : '',
			Role_Type : '',
			Role_Code : '',
			Roles : [],
			treedata : [],
		}
		this.onChange = this.onChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.checkhandle = this.checkhandle.bind(this);
	}



	componentDidMount(){
		this.setState({
			id : this.props.params.id,
			Role_Code : this.props.params.id
		})
		// 获取角色类型
		_G.ajax({
			url : getRoleType,
			type : 'get',
			success : function(res){
				console.log('角色信息');
				console.log(res)
				var t = this.state.Role_Type,that=this;
				if(t){
					res.Data.map(function(item){
						if(item.REAL_Code == t){
							this.setState({
								Role_TypeName : item.CODE_NM
							})
						}
					})
				}
				this.setState({
					Roles : res.Data
				})
			}.bind(this)
		})
		// 读取用户信息
		_G.ajax({
			url : getRole,
			type : 'get',
			data : {
				Role_Code : this.props.params.id
			},
			success : function(res){
				console.log('用户信息');
				console.log(res)
				var types = this.state.Roles,that =this;
				types.map(function(item){
					if(types.REAL_Code == res.Data.Role_Type){
						that.setState({
							Role_TypeName : item.CODE_NM
						})
					}
				})
				this.setState({
					Role_Name : res.Data.Role_Name,
					Role_Type : res.Data.Role_Type
				})
			}.bind(this)
		})
		// 读取全菜单树
		_G.ajax({
			url : urlMenus,
			type : 'get',
			success : function(res){
				console.log('获取权限');
				console.log(res)
				this.setState({
					menus : res.Data
				})
			}.bind(this)
		})
		// 获取权限
		_G.ajax({
			url : getRoles,
			type : 'get',
			data : {
				Role_Code : this.props.params.id
			},
			success : function(res){
				this.setState({
					treedata : res.Data
				})
			}.bind(this)
		})

	}
	
	onChange(e){
		var roles = _G.assign({},this.state.selectedRole);
        var s = e.target.value.split('-');
        roles[s[0]] = roles[s[0]] || '';
		if(e.target.checked){
            roles[s[0]] += ',' + s[1];
		}else{
            roles[s[0]] = roles[s[0]].replace(s[1],'');
		}
        roles[s[0]] = roles[s[0]].replace(/,{1,}/g,',').replace(/^,|,$/,'');
        console.log(roles)
		this.setState({
			selectedRole : roles
		})
        s=null;
        roles=null;
	}

	handleSubmit(){
		// 已读取 选择 内容 ，等待ajax提交 *****************************************************
		var data = _G.assign({},this.state);
        var LineJson = [];
        for(var key in data.selectedRole){
            if(data.selectedRole[key]!=''){
                LineJson[LineJson.length] = {
                    MenuID : key,
                    Roles : data.selectedRole[key]
                }
            }
        }
        console.log(LineJson)
		// to do ***************************************************
		_G.ajax({
			url : saveRoles + '?Role_Code='+ this.state.Role_Code + '&LineJson={"Data":'+ JSON.stringify(LineJson) +'}' ,
			data : {
				LineJson : JSON.stringify({DATA:LineJson})
			},
			type : 'post',
			success : function(res){
                msg_success();
                // 调转到列表页
                goBack();
                return;
			}
		})
	}
	handleReset(){
		goBack();
	}

	checkhandle(info){
	    this.setState({
	      checkedKeys : info.checkedKeys
	    })
	}

	renderMenu(){
        var that = this;
		const values = {
			"1" : '查询',
			"2" : '新增',
			"3" : '修改',
			"4" : '删除'
		};
		const loopLis = (data,code) => {
			return ["1","2","3","4"].map( (item) => {
				if(data.indexOf(item)>-1){
					return (<li key={code+'-'+item}><Checkbox key={code+'-'+item} value={code+'-'+item} defaultChecked={true}  onChange={that.onChange} />{values[item]}</li>)
				}else{
					return (<li key={code+'-'+item}><Checkbox key={code+'-'+item} value={code+'-'+item} defaultChecked={false} onChange={that.onChange} />{values[item]}</li>)
				}
			} )
		}
		const loop = (data) => {
	      return data.map( (item) => {
	        if(item.Children && item.Children.length){
	          return (<div key={item.Code}><h2>{item.Name}</h2>{loop(item.Children)}</div>);
	        }else{
	          return (<dl key={item.Code} className="roles_set"><dt>{item.Name}</dt><dd><ul>{loopLis(item.Fun_Code||'',item.Code)}</ul></dd></dl>);
	        }
	      } )
	    }
	    const parseTree = (data) => loop(data);
	    let treeNodes = parseTree(this.state.menus);
	    return treeNodes
	}
	
	render(){

		return (
			<div className="m-form">
	        	<div className="m-form-title">设置操作角色权限</div>
	        		<div className="m-form-con">
	        			<Row className="group-set-info">
	        				<Col span="4">角色名称:{this.state.Role_Name}</Col>
	        				<Col span="4">角色类型:{this.state.Role_TypeName}</Col>
	        				<Col span="4">角色编号:{this.state.Role_Code}</Col>
	        			</Row>
	        			<div className="group-set-list">
		        			{this.renderMenu()}
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