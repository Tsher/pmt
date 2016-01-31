//  用户管理   组织机构管理  新增

var _extends = _G.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import {Link} from 'react-router';
import { createHistory } from 'history';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Validation from 'antd/lib/validation';
import message from 'antd/lib/message';
import Tree from 'antd/lib/tree';
import Modal from 'antd/lib/modal';

const FormItem = Form.Item;

const TreeNode = Tree.TreeNode;

const Validator = Validation.Validator;
const confirm = Modal.confirm;
const FieldMixin = Validation.FieldMixin;

const history = createHistory();

const goBack = history.goBack;

function cx(classNames) {
  if (typeof classNames === 'object') {
    return Object.keys(classNames).filter(function(className) {
      return classNames[className];
    }).join(' ');
  } else {
    return Array.prototype.join.call(arguments, ' ');
  }
}


const msg_error = function(){
  message.error('数据验证错误,请检查后提交')
}
const msg_success = function(){
  message.success('数据提交成功，等待后台处理')
}

// tree data
var _data = [
  {
  	title:'中国大陆',
  	key : 'key0',
  	children : [
  	      {
		    title : '北京市',
		    key : 'key1',
		    children:[
		      {
		        title : '海淀区',
		        key : 'key1-1'
		      },
		      {
		        title : '朝阳区',
		        key : 'key1-2'
		      }
		    ]
		  },
		  {
		    title : '天津市',
		    key : 'key2',
		    children:[
		      {
		        title : '海淀区',
		        key : 'key2-1'
		      },
		      {
		        title : '朝阳区',
		        key : 'key2-2'
		      }
		    ]
		  },
		  {
		    title : '湖南省',
		    key : 'key3',
		    children:[
		      {
		        title : '长沙市',
		        key : 'key3-1'
		      },
		      {
		        title : '永州市',
		        key : 'key3-2'
		      },
		      {
		        title : '常德市',
		        key : 'key3-3'
		      },
		      {
		        title : '岳阳市',
		        key : 'key3-4'
		      },
		      {
		        title : '娄底时',
		        key : 'key3-5'
		      },
		      {
		        title : '株洲',
		        key : 'key3-6'
		      }
		    ]
		  },
		  {
		    title : '河南省',
		    key : 'key4',
		    children:[
		      {
		        title : '郑州市',
		        key : 'key4-1'
		      },
		      {
		        title : '洛阳市',
		        key : 'key4-2'
		      },
		      {
		        title : '驻马店市',
		        key : 'key4-3',
		        children : [
		           {
		           	   title : '峄城区',
		           	   key : 'key4-3－1'
		           },
		           {
		           	   title : '正阳县',
		           	   key : 'key4-3－2'
		           }
		        ]
		      }
		    ]
		  },
		  {
		    title : '河北省',
		    key : 'key5',
		    children:[
		      {
		        title : '石家庄',
		        key : 'key5-1'
		      },
		      {
		        title : '保定',
		        key : 'key5-2'
		      }
		    ]
		  }
  	]
  }
];


class RightBox extends React.Component{
    constructor(){
		super();

	    this.state = {
	      treedata : [],
	      selectedKeys : [],
	      checkedKeys:['key2'],
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
	      showInfo : 'block' , // none 隐藏， block 显示   右侧详细信息
	      status: {
	        name:{}, // 新增部门的名称
	        no :{},
	        desc:{},
	      },
	      formData: {
	        id : undefined, // 新增 or 编辑 识别
	        no : undefined, // 编辑状态 部门编号
	        key : undefined, // 选中的部门id
	        parent : undefined, // 选中的部门名称
	        name: undefined, // 新增部门的名称
	        desc : undefined, // 新增部门的描述
	        title : '新增部门',
	        show : 'block', // 新增= none  编辑=block
	      },
	      no : undefined
	    };
	    this.checkhandle = this.checkhandle.bind(this);
	    this.rightClickhandler = this.rightClickhandler.bind(this);

	    this.handleCancel = this.handleCancel.bind(this);
	    this.showModal = this.showModal.bind(this);
	    this.handleOk = this.handleOk.bind(this);
	    this.handleCancel = this.handleCancel.bind(this);

	    this.setField = FieldMixin.setField.bind(this);
	    this.handleValidate = FieldMixin.handleValidate.bind(this);
	    this.onValidate = FieldMixin.onValidate.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleReset(e) {
    // 返回***********************************
    goBack();

    // this.refs.validation.reset();
    // this.setState({
    //   status: {
    //     select: {},
    //     string:{},
    //     textarea:{}
    //   },
    //   formData: {
    //     select: undefined,
    //     string: undefined,
    //     textarea:undefined
    //   }
    // });
    e.preventDefault();
  }

  handleSubmit(e) {
    //***********************************等待ajax提交数据 ******** 区分 新增 或者 编辑
    e.preventDefault();
    // this.setState({
    //   isEmailOver: true
    // });
    const validation = this.refs.validation;
    validation.validate((valid) => {
      if (!valid) {
        console.log('error in form');
        msg_error()
        return;
      } else {
        console.log('submit');
      }
      console.log(this.state.formData);
      msg_success();
    });
  }

  renderValidateStyle(item) {
    const formData = this.state.formData;
    const status = this.state.status;

    const classes = cx({
      'error': status[item].errors,
      'validating': status[item].isValidating,
      'success': formData[item] && !status[item].errors && !status[item].isValidating
    });

    return classes;
  }

  checkGroupName(rule, value, callback) {
    if (!value) {
      callback(new Error('请输入角色名称'));
    } else {
      callback();
    }
  }


  
  render(){
  	const formData = this.state.formData;
  	const status = this.state.status;
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
			<div>
			  <div className="m-form-title">{this.state.formData.title}</div>
				<Col span="8" style={{ display : 'block' }} >
						<div className="border border-raduis">
							<div className="title"> {this.state.title} </div>
							<div className="con">
								<Form inline >
								 <Validation ref="validation" onValidate={this.handleValidate}>
								    <FormItem
						                label="区域名称："
						                id="name"
						                labelCol={{span: 8}}
						                wrapperCol={{span: 14,offset:1}}
						                validateStatus={this.renderValidateStyle('name')}
						                help={status.name.errors ? status.name.errors.join(',') : null}
						                required>
						                  <Validator rules={[{required: true, message: '区域名称'}]}>
						                    <Input  name="name" value={formData.name} />
						                  </Validator>
						            </FormItem>
						            <FormItem
						                label="区域编号: "
						                id="no"
						                labelCol={{span: 8}}
						                wrapperCol={{span: 14,offset:1}}
						                validateStatus={this.renderValidateStyle('no')}
						                help={status.no.errors ? status.no.errors.join(',') : null}
						                >
						                  <Validator rules={[{required: false, message: ''}]}>
						                    <Input  name="no" value={formData.no} />
						                  </Validator>
						            </FormItem>

						            <FormItem
						                label="区域描述: "
						                id="desc"
						                labelCol={{span: 8}}
						                wrapperCol={{span: 14,offset:1}}
						                validateStatus={this.renderValidateStyle('desc')}
						                help={status.desc.errors ? status.desc.errors.join(',') : null}
						                >
						                  <Validator rules={[{required: false, message: ''}]}>
						                    <Input style={{height:100}} name="desc" type="textarea"  value={formData.desc}  />
						                    </Validator>
						            </FormItem>

								 </Validation>
								</Form>
							</div>
						</div>
					</Col>
					<Col span="8"  style={{ display : 'block' }} >
						<div className="border border-raduis">
							<div className="title">区域树</div>
							<div className="con">
								<Tree checkable defaultExpandAll checkedKeys={this.state.checkedKeys} multiple={false} onSelect={this.checkhandle} onRightClick={this.rightClickhandler}>
					          		{treeNodes}
					        	</Tree>
							</div>
						</div>
					</Col>

					<div className="m-form-btns" style={{width:1000}} >
				        <Col span="4" offset="2">
				        <Button type="primary" onClick={this.handleSubmit}>确定</Button>
				        &nbsp;&nbsp;&nbsp;&nbsp;
				        <Button type="primary" onClick={this.handleReset}>取消</Button>
				        </Col>
				        
				      </div>
			</div>
		)
	}
}



class BaseAreaAdd extends React.Component{
	constructor(){
		super();
	    this.state = {}
	}

    render(){
	
	return(
			<div className="m-list">
				<Row>
					<RightBox />
				</Row>
        		
			</div>
		)
	}
}


module.exports = {
  BaseAreaAdd : BaseAreaAdd
}


