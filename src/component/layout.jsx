import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';
import {LeftMenu} from './left-menu';
import React from 'react';
import Tag from 'antd/lib/tag';
import { Link } from 'react-router';




class Layout extends React.Component{
	constructor(props){
		super(props)

		this.state = {
			width : 0, // 右侧内容区域宽度
			winw : 1200, // window width
			menuWidth:200, // left menu width
			selectedKeys : '3-1', // 当前选中的菜单
			openKeys : '3', //当前展开的菜单
			menus :["1","2","3","4","5"],
			tags : []
		}
	}
	renderMenu(){
		return (
			<LeftMenu history={this.props.history} data={this.state.menus} selectedKeys={this.state.selectedKeys} openKeys={this.state.openKeys} />
		)
	}
	onClose(e){
		console.log(e);
	}
	renderTags(){
		return (
			<div className="m-right-tags">
				<Tag color="blue" closable onClose={this.onClose} href="/#/rule/number">积分规则</Tag>
				<Tag closable onClose={this.onClose} href="/#/rule/number">积分规则</Tag>
				<Tag closable onClose={this.onClose} href="/#/rule/number">积分规则</Tag>
			</div>
		)
	}
	renderContent(){
		return (
			<div className="m-right-content" style={{width: this.state.width + 'px'}}>
				{this.renderTags()}
				{this.props.children}
			</div>
		)
	}
	componentDidMount(){
		// window 注册事件计算页面宽度
		let that = this;
		function size(){
			let w = $(window).width();
			
			that.setState({
				width : w - that.state.menuWidth-40
			})
		}
		size();
		$(window).on('resize',size);

		// 右侧tag
		window['MenuTags'] = {
			openKeys : '3',
			selected : [
				{key : '3-1',info:'积分规则',route:'/rule/number'}
			]
		}
	}
	userInfo(){
		//用户信息
		return (
			<ul>
				<li className="username">当前用户:tiger</li>
				<li>
					<Button type="primary">设置</Button>
				</li>
				<li><Button type="ghost">注销</Button></li>
			</ul>
		)
	}
	render(){
		return (
			<div>
				<Row className="m-header">
					<Col span="6" className="logo">
						<div>O2O营销平台</div>
					</Col>
					<Col span="18" className="userinfo">
						{this.userInfo()}
					</Col>
				</Row>
				<div className="m-content clearfix">
					<div className="m-left-menu" style={{width:this.state.menuWidth+'px'}}>{ this.renderMenu() }</div>
					{this.renderContent()}
				</div>
			</div>
		)
	}
}

module.exports = {
	Layout : Layout
}