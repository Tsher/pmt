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
		}
		this.handleClick = this.handleClick.bind(this);
		this.handleClick2 = this.handleClick2.bind(this);
		this.onToggle = this.onToggle.bind(this);
	}
	componentDidMount(){
		this.setState({
			selectedKeys : [this.props.selectedKeys],
			openKeys : [this.props.openKeys]
		})
	}
	// 二级菜单点击
	handleClick(e){
		this.props.secMenuChange(e.key)
		this.setState({
			selectedKeys: [e.key],
			openKeys: e.keyPath.slice(1)
		});
	}
	handleClick2(e){
		var a =1;
		a++;
		console.log(a);
	}
	// 一级菜单展开
	onToggle(info){
		this.props.topMenuChange(info)
		this.setState({
			openKeys: [info.key],
			selectedKeys:[]
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
		let menusNodes = parseMenu(this.props.data);

		return (menusNodes);
	}
	render(){
		return (
			<Menu onClick={this.handleClick}
				openKeys={this.state.openKeys}
				onOpen={this.onToggle}
				onClose={this.onToggle}
				selectedKeys={[this.props.selectedKeys]}
				mode="inline">
				{this.renderItem()}
			</Menu>
		)
	}
}

module.exports = {
	LeftMenu : LeftMenu
}