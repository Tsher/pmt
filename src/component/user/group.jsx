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
import Popover from 'antd/lib/popover';

const FormItem = Form.Item;
import Tree from 'antd/lib/tree';
const TreeNode = Tree.TreeNode;

import Modal from 'antd/lib/modal';


const confirm = Modal.confirm;

const history = createHistory();

import '../../entry/config';
const groupList = config.__URL + config.user.group.list;
const groupInfo = config.__URL + config.user.group.info;
const groupDel = config.__URL + config.user.group.del;

var changeTableState;


import { Add } from '../btn-add'; // 新增按钮
import { Edit } from '../btn-edit'; // 编辑，发布，设置等按钮
import { Del } from '../btn-del'; // 删除

let pageName = '组织机构管理'; // 按钮，验证权限使用


const columns = [{
  title: '真实名称',
  dataIndex: 'User_Name',
  key: 'User_Name'
}, {
  title: '登录名',
  dataIndex: 'Login_Name',
  key: 'Login_Name'
}];



class UserGroup extends React.Component{
	constructor(){
		super();
	    this.state = {
	      treedata : [],
	      selectedKeys : [],
        roles : {},
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
        DataDetail:[],
	      showEditBtn : false, // 是否可点 编辑按钮
	      showDelBtn : false, // 是否可点 删除按钮
        editLink : '',// 编辑链接地址
        addLink : '/user/group/add/,add',// 添加链接地址
	      showInfo : 'none' , // none 隐藏， block 显示   右侧详细信息
        rightClickMenuStyle:{
          left : '0',
          top : '-100'
        }
	    };
	    this.checkhandle = this.checkhandle.bind(this);
	    this.rightClickhandler = this.rightClickhandler.bind(this);

	    this.handleCancel = this.handleCancel.bind(this);
	    this.showModal = this.showModal.bind(this);
	    this.handleOk = this.handleOk.bind(this);
	    this.handleCancel = this.handleCancel.bind(this);
      this.hideRightClickMenu = this.hideRightClickMenu.bind(this);
      this.renderEdit = this.renderEdit.bind(this);
      this.renderDel = this.renderDel.bind(this);
	}

  hideRightClickMenu(){
    this.setState({
        rightClickMenuStyle : {
          left:0,
          top : -100
        }
      })
  }
  componentDidMount(){
    _G.ajax({
      url : groupList,
      type: "get",
      success:function(res){
        var d = res.Data;
        this.setState({
          treedata : d
        });
      }.bind(this)

    }) 
    
    setTimeout(function(){
      var roles = {
        add : _G.hasRole(pageName,2),
        edit : _G.hasRole(pageName,3),
        del : _G.hasRole(pageName,4)
      }
      this.setState({
        roles : roles
      })
    }.bind(this),500)

    Event.add(document.body,'click',this.hideRightClickMenu)
    

  }

  // 点击树菜单
  checkhandle(info){
    var code = info.node.props.eventKey;
    _G.ajax({
      url : groupInfo,
      type: "get",
      data : {Organization_Code:code},
      success:function(res){
        var d = res;
        var dD = d.DataDetail;
        for(var i=0;i<dD.length;i++){
          dD[i].key = dD[i].User_Code;
        }
        this.setState({
           info:d.Data,
           DataDetail : dD,
        })

        // 根据 eventKey 查询 相关信息 展示右侧详细信息
        this.setState({
          selectedKeys : [info.node.props.eventKey],
          editLink : '/user/group/edit/'+ info.node.props.eventKey+',edit',
          addLink : '/user/group/add/'+ info.node.props.eventKey+','+this.state.info.Organization_Name,
          showEditBtn : true,
          showInfo : 'block',
        })
      }.bind(this)

    })
  	
    // 根据选中的 key ，获取 相关数据 ,更新state，展示再右侧
  }
  // 右键树菜单
  rightClickhandler(info){
  	this.setState({
  		  selectedKeys : [info.node.props.eventKey],
      	editLink : '/user/group/edit/'+ info.node.props.eventKey+',edit',
        addLink : '/user/group/add/'+ info.node.props.eventKey+','+this.state.info.Organization_Name,
      	showEditBtn : true,
      	showInfo : 'block',
        rightClickMenuStyle : {
          left : info.event.pageX,
          top : info.event.pageY + 10,
        }
  	})
  }
  componentWillUnmount(){
    Event.remove(document.body,'click',this.hideRightClickMenu)
  }

  showModal(){
  	// 删除之前 查询此 key 是否有子节点， 如有，不允许删除 ************************
    if (!this.state.selectedKeys[0]) {return};
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


    
    _G.ajax({
      url : groupDel,
      method : 'get',
      data : {
        Organization_Code : this.state.selectedKeys[0]
      },
      success:function(res){
        if(res.ReturnOperateStatus == 'True'){
          this.setState({
            visible : false
          })

          _G.ajax({
            url : groupList,
            type: "get",
            success:function(res){
              var d = res.Data;
              this.setState({
                treedata : d
              });
            }.bind(this)

          }) 
          /*var d = [].concat(this.state.treedata);
          d.splice(this.state.index,1);
          this.setState({
            treedata : d,
            loading : false
          })*/
          //**********************更新table数据****************
          return
        }
        if(res.ReturnOperateStatus == 'False'){
          console.log('删除失败')
        }
      }.bind(this)
    })

  }
  handleCancel(e){
    this.setState({
      visible : false
    })
  }

  renderEdit(){
    if(this.state.roles.edit){
      
    var that = this;
    
      if(that.state.editLink){
        return (<Link to={that.state.editLink}>
                <Button type="primary" size="large"><Icon type="edit" /><span>修改</span></Button>
                  </Link>)
      }
      return (<Button type="primary" size="large"><Icon type="edit" /><span>修改</span></Button>)
    }else{
      return (<span></span>)
    }
    
  }
  renderDel(){
    if(this.state.roles.del){
      return (<Button type="primary" size="large" onClick={this.showModal}><Icon type="edit" /><span>删除</span></Button>)
    }else{
      return (<span></span>)
    }
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
    let treeNodes = parseTree(this.state.treedata);

  
	return(
			<div className="m-list">
				<Row>
					<Col span="2">
            <Add Name={pageName} addLink={this.state.addLink} />
					</Col>
					<Col span="2">
				        {this.renderEdit()}
					</Col>
					<Col span="2">
          {this.renderDel()}
				        
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
									<FormItem id="Organization_Code" label="部门编号: " labelCol={{span:8}} wrapperCol={{span: 14,offset:1}}>
										<Input name="Organization_Code" disabled value={this.state.info.Organization_Code}  />
									</FormItem>
									<FormItem id="ParentOrganization_Name" label="上级部门: " labelCol={{span:8}} wrapperCol={{span: 14,offset:1}}>
										<Input name="ParentOrganization_Name" disabled value={this.state.info.ParentOrganization_Name}  />
									</FormItem>
									<FormItem id="Organization_Name" label="部门名称: " labelCol={{span:8}} wrapperCol={{span: 14,offset:1}}>
										<Input name="Organization_Name" disabled value={this.state.info.Organization_Name}  />
									</FormItem>
									<FormItem id="Description" label="部门描述: " labelCol={{span:8}} wrapperCol={{span: 14,offset:1}}>
										<Input name="Description" type="textarea" disabled value={this.state.info.Description}  />
									</FormItem>
									<FormItem id="admin" label="部门管理员: " labelCol={{span:8}} wrapperCol={{span: 14,offset:1}}>
										<Input name="admin" disabled value={this.state.info.admin}  />
									</FormItem>
								</Form>
							</div>
						</div>
					</Col>
					<Col span="8"  style={{ display : this.state.showInfo }} >
						<div className="border border-raduis">
							<div className="title">机构成员</div>
							<div className="con">
								<Table columns={columns} pagination={false} dataSource={this.state.DataDetail} size="small" />
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
          <div className="layerMenu" style={{left:this.state.rightClickMenuStyle.left,top:this.state.rightClickMenuStyle.top}}><a href={"#/user/group/add/"+this.state.selectedKeys[0]+','+this.state.info.Organization_Name}>新增</a><a href={"#/user/group/edit/"+this.state.selectedKeys[0]+',edit'}>修改</a></div>
			</div>
		)
	}
}
module.exports = {
	UserGroup : UserGroup
}