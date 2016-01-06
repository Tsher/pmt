import Menu from 'antd/lib/menu';
const SubMenu = Menu.SubMenu;
import React from 'react';
import {Link} from 'react-router';

class LeftMenu extends React.Component{
	constructor(){
		super();
		this.state = {
			selectedKeys : [],
			openKeys : [],
			allmenus :[
				{
					key : "1", 
					info : '用户管理', 
					route : '/user',
					className : 'menu-user',
					children : [
						{key : "1-1",info : '组织机构管理',route : '/user/group'},
						{key : "1-2",info : '企业用户管理',route : '/user/user'},
						{key : "1-3",info : '企业角色管理',route : '/user/role'},
					] 
				},
				{ 
					key : "2", 
					info : '基础信息', 
					route : '/base' ,
					className : 'menu-base',
					children : [
						{key : "2-1",info : '企业信息管理',route : '/base/info'},
						{key : "2-2",info : '产品信息管理',route : '/base/product'},
						{key : "2-3",info : '销售区域管理',route : '/base/area'},
					] 
				},
				{ 
					key : "3", 
					info : '营销规则', 
					route : '/rule' ,
					className : 'menu-rule',
					children : [
						{key : "3-1",info : '积分规则',route : '/rule/number'},
						{key : "3-2",info : '批次区域管理',route : '/rule/area'}
					] 
				},
				{ 
					key : "4", 
					info : '促销管理', 
					route : '/sale' ,
					className : 'menu-sale',
					children : [
						{key : "4-1",info : '会员管理', route : '/sale/vip'},
						{key : "4-2",info : '促销人员管理', route : '/sale/user'},
						{key : "4-3",info : '促销活动设置', route : '/sale/do'},
						{key : "4-4",info : '奖品管理', route : '/sale/prize'}
					] 
				},
				{ 
					key : "5", 
					info : '促销数据管理',
					route : '/saledata',
					className : 'menu-saledata',
					children : [
						{key : "5-1",info : '消费者参与流水', route : '/saledata/user'},
						{key : "5-2",info : '奖品兑换流水', route : '/saledata/prize'},
						{key : "5-3",info : '消费者抽奖流水', route : '/saledata/round'},
						{key : "5-4",info : '发送短信流水', route : '/saledata/send'},
						{key : "5-5",info : '话费充值流水', route : '/saledata/push'}
					] 
				}
			]
		}
		this.handleClick = this.handleClick.bind(this);
		this.handleClick2 = this.handleClick2.bind(this);
		this.onToggle = this.onToggle.bind(this);
	}
	componentDidMount(){
		let selectedKeys = this.props.selectedKeys,
			openKeys = this.props.openKeys;
		this.setState({
			selectedKeys : [selectedKeys],
			openKeys : [openKeys]
		})
	}
	
	handleClick(e){
		this.setState({
			selectedKeys: [e.key],
			openKeys: e.keyPath.slice(1)
		});
	}
	handleClick2(e){
		console.log('subment');
		var a =1;
		a++;
		console.log(a);
	}
	onToggle(info){
		this.setState({
			openKeys: [info.key]
		});
	}
	renderItem(){
		const loop = (data) => {
			return data.map( (item) => {
				if(item.children){
					return (<SubMenu onClick={this.handleClick2} key={item.key} title={<div className={item.className}><Link to={item.route}>{item.info}</Link></div>} >{loop(item.children)}</SubMenu>);
				}else{
					return (<Menu.Item key={item.key}><Link to={item.route}>{item.info}</Link></Menu.Item>);
				}
			} )
		}
		const parseMenu = (data) => loop(data);
		let menusNodes = parseMenu(this.state.allmenus);

		return (menusNodes);
	}
	render(){
		return (
			<Menu onClick={this.handleClick}
				openKeys={this.state.openKeys}
				onOpen={this.onToggle}
				onClose={this.onToggle}
				selectedKeys={this.state.selectedKeys}
				mode="inline">
				{this.renderItem()}
			</Menu>
		)
	}
}

module.exports = {
	LeftMenu : LeftMenu
}