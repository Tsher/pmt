import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';
import {LeftMenu} from './left-menu';
import React from 'react';
import Tag from 'antd/lib/tag';
import { Link } from 'react-router';


import '../entry/config';
_G.setUserName = function(){}

class Layout extends React.Component{
	constructor(props){
		super(props)

		this.state = {
			width : 0, // 右侧内容区域宽度
			winw : 1200, // window width
			menuWidth:200, // left menu width
			selectedKeys : '', // 当前选中的菜单
			openKeys : '', //当前展开的菜单
			username : '', // 用户名
			menus :[
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
			],
			tags : [],
			menusNodes:'',
            UserRole : [],
            UserRoleHash : false,
		};

		this.topMenuChange = this.topMenuChange.bind(this);
		this.secMenuChange = this.secMenuChange.bind(this);
		this.tagClick = this.tagClick.bind(this);
		this.logout = this.logout.bind(this);
        this.SetUserRole = this.SetUserRole.bind(this);
        this.setUserName = this.setUserName.bind(this);
	}
	// 一级菜单变更
	topMenuChange(info){
		var menu
		this.state.menus.map(function(item){
			if(item.key == info.key){
				menu = item;
			}
		})
		if(!menu) return;
		this.renderTags([],'')
		this.setState({
			openKeys : menu.key,
			selectedKeys:'',
			tags : [],
		})
	}
	// 二级菜单变更
	secMenuChange(info){
		let tags = [].concat(this.state.tags);
		let item;
		tags.map(function(n){
			if(n.key == info){
				item = n
			}
		} );
		if(!item){
			var that = this;
			this.state.menus.map(function(n){
				if(n.key == that.state.openKeys){
					item = n;
				}
			});
			item.children.map(function(n){
				if(n.key == info){
					item = n;
				}
			});
			tags.push(item);
			this.setState({
				tags : tags,
			})
		}
		this.renderTags(tags,info)
		this.setState({
			selectedKeys : info
		})
	}
	renderMenu(){
		return (
			<LeftMenu secMenuChange={this.secMenuChange} topMenuChange={this.topMenuChange} history={this.props.history} data={this.state.UserRole} selectedKeys={this.state.selectedKeys} openKeys={this.state.openKeys} />
		)
	}
	tagClick(key){
		let tags = [].concat(this.state.tags);
		this.renderTags(tags,key)
		this.setState({
			selectedKeys : key
		})
	}
	onClose(key){
		let selected = this.state.selectedKeys,
			tags = [].concat(this.state.tags);
		let index = tags.findIndex( (n)=> n.key == key );
		tags.splice(index,1);
		this.renderTags(tags,selected);
		this.setState({
			tags : tags,
		})
	}
	renderTags(d,selected){
		const loop = (data) => {
			return data.map( (item) =>{
				if(item.key == selected){
					return (<Tag id={'tags_'+item.key} color="blue" onClick={this.tagClick.bind(this,item.key)} onClose={this.onClose.bind(this,item.key)} href={'#'+item.route} key={item.key}>{item.info}</Tag>);
				}
				return (<Tag id={'tags_'+item.key} closable onClick={this.tagClick.bind(this,item.key)} onClose={this.onClose.bind(this,item.key)} href={'#'+item.route} key={item.key}>{item.info}</Tag>);
			})
		}
		const parseMenu = (data) => loop(data);
		let menusNodes = parseMenu(d);

		this.setState({
			menusNodes : menusNodes
		})
	}
	renderContent(){
		return (
			<div className="m-right-content" style={{width: this.state.width + 'px',position:'relative'}}>
				<div className="m-right-tags" style={{ display: this.state.tags.length? 'block' : 'none' }}>
					{this.state.menusNodes}
				</div>
				{this.props.children}
			</div>
		)
	}
    SetUserRole(data){
        this.setState({
            UserRole : data
        })
    }
	componentDidMount(){
		// window 注册事件计算页面宽度
		let that = this;
		function size(){
			let w = $(window).width();
			
			that.setState({
				width : Math.max(1000, w - that.state.menuWidth-50)
			})
		}
		size();
		$(window).on('resize',size);

		var username = Cookie.read('userName');
			// this.setState({
			// 	username : username
			// })
        
        
        // 设置用户权限菜单
        var hasSetUserRole = false,timer;
        function setRole(){
            if(hasSetUserRole){
                clearInterval(timer);
                timer = null;
                return;
            }
            if(_G.UserRole.length == 0 || !_G.Token) return;
            var roles={}, menus = [].concat(that.state.menus);
            // 全菜单 hash化
            var loopMenu = (data)=>{
                data.map( (item)=>{
                    roles[item.info]={
                        route : item.route,
                        key : item.key
                    }
                    if(item.className){
                        roles[item.info]['className'] = item.className
                    }
                    if(item.children){
                        loopMenu(item.children)
                    }
                } )
            }
            loopMenu(menus);
            
            _G.UserRoleHash = {};
            // 权限
            var loop = (data)=>{
                data.map( (item,index)=>{
                    if(roles[item.Name]){
                       item['route'] = roles[item.Name].route;
                       item['className'] = roles[item.Name].className;
                       item['key'] = roles[item.Name].key;
                       _G.UserRoleHash[item.Name] = item.Fun_Code;
                    }
                    if(item.Children){
                        loop(item.Children)
                    }
                } )
            }
            loop(_G.UserRole);
            console.log('roles',_G.UserRole,_G.UserRoleHash);
            that.setState({
                UserRole : _G.UserRole
            })
            hasSetUserRole = true;
            
            
        }
        
        timer = setInterval(setRole,100)
        
        
        
        
        // _G.UserRole.map( (data)=>{
        //     that.state.menus.map( (item)=>{
        //         if(item.info == data.Name){
        //             data = _G.assign(data,item)
        //         }
        //     } )
        // } )
	    // console.log(_G.UserRole) 
		_G.setUserName = this.setUserName;
		
	}
	setUserName(){
		var username = Cookie.read('userName');
			this.setState({
				username : username
			})
	}
	logout(){
		// 登出
		Cookie.dispose('Token');
        Cookie.dispose('UserRole1');
        Cookie.dispose('UserRole2');
		location.reload();
	}
	userInfo(){
		//用户信息
		return (
			<ul>
				<li className="username">当前用户:{this.state.username}</li>
				<li>
					<Link to='/change-password' className="setting">设置</Link>
				</li>
				<li><Button type="ghost" onClick={this.logout}>注销</Button></li>
			</ul>
		)
	}
	render(){
		return (
			<div>
				<Row className="m-header">
					<Col span="6" className="logo">
						<div>PMT平台</div>
					</Col>
					<Col span="18" className="userinfo">
						{this.userInfo()}
					</Col>
				</Row>
				<div className="m-content clearfix">
					<div className="m-left-menu" style={{width:this.state.menuWidth+'px'}}>{ this.renderMenu() }</div>
					{this.renderContent()}
				</div>
				<div className="m-footer clearfix">
					<p>京ICP备13000015号-5  V2.1.6</p>
					<p>Copyright © 1998 - 2016 北京华信瑞德信息技术有限公司. All Rights Reserved</p>
				</div>
			</div>
		)
	}
}

module.exports = {
	Layout : Layout
}