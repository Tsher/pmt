//  基础信息   销售区域管理  新增

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

import '../../entry/config';
const regionUrl = config.__URL + config.base.area.region;
const salesRegionOneUrl = config.__URL + config.base.area.salesRegionOne;
const baseAreaAdd = config.__URL + config.base.area.add;
const baseAreaEdit = config.__URL + config.base.area.edit;

var changeTableState;

// tree data
var _data = [
	{
	  	Name:'中国大陆',
	  	Code : 'key0',
	  	Children : []
	}
]


class RightBox extends React.Component{
    constructor(){

		super();

	    this.state = {
	      treedata : [],
	      selectedKeys : [],
	      checkedKeys:[],
	      showEditBtn : false, // 是否可点 编辑按钮
	      showDelBtn : false, // 是否可点 删除按钮
	      editLink : '', // 编辑链接地址
	      showInfo : 'block' , // none 隐藏， block 显示   右侧详细信息
	      status: {
	        name:{}, // 新增部门的名称
	        no :{},
	        desc:{},
	        key:{},
	      },
	      formData: {
	        id : '', // 新增 or 编辑 识别
	        no : '', // 编辑状态 部门编号
	        key : '', // 
	        parent : '', // 
	        name: '', // 新增部门的名称
	        desc : '', // 新增部门的描述
	        title : ''
	      },
	      no : undefined,
	      key : '',
	    };

	    this.handleCheck = this.handleCheck.bind(this);

	    this.setField = FieldMixin.setField.bind(this);
	    this.handleValidate = FieldMixin.handleValidate.bind(this);
	    this.onValidate = FieldMixin.onValidate.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
	}

  componentDidMount(){
  	var id = this.props.id;

  	if (id) {
  		_G.ajax({
		  url : salesRegionOneUrl,
		  type: "get",
		  data : {SalesRegion_Code:id},
		  success:function(res){
		    var d = res.Data;
		    var keys=[];
		    keys = d.RegionNos.split(',');

		    var json = {
		        id : id, // 新增 or 编辑 识别
		        no : id, // 编辑状态 部门编号
		        name: d.SalesRegion_Name, // 新增部门的名称
		        desc : d.Region_Description, // 新增部门的描述
		        title : '区域成员管理'
		    }

		    this.setState({
	          formData : json,
	          checkedKeys : keys,
	          key : d.RegionNos,
	        })
		    
		  }.bind(this)

		})
  	};

  	

  	_G.ajax({
	  url : regionUrl,
	  type: "get",
	  success:function(res){
	    var d = res.Data;
	    //_data[0].Children = d;
	    _data[0].Children.push(d[0])
	    _data[0].Children.push(d[1])
	    this.setState({
	      treedata : _data
	    });	    
	  }.bind(this)

	})

  }

  // 点击树菜单
  handleCheck(info){
  	var arr = this.state.checkedKeys;
  	var arrList = getKeys(info.node.props);
  	arr = arr.concat(arrList);
  	var str = getKeys(info.node.props).join(',');
  	console.log(arr)
  	//console.log(info.node.props.eventKey)
  	this.setState({
      selectedKeys : [info.node.props.eventKey],
      editLink : '/base/area/add/'+ info.node.props.eventKey,
      showEditBtn : true,
      showInfo : 'block',
      checkedKeys:arr,
      key:arr.join(','),
    })

    function getKeys(obj){
    	var arr=[];
	  	arr.push(obj.eventKey);
	  	function dg(o){
	  		for(var i in o){
	  			arr.push(o[i].key);
	  			if (o[i].children) {
	  				dg(o[i].children)
	  			};
	  			if (o[i].props.children) {
	  				dg(o[i].props.children)
	  			};
	  		}
	  	}
	  	dg(obj.children)
	  	return arr;
	}
  }

  handleReset(e) {
    // 返回***********************************
    goBack();
    e.preventDefault();
  }

  handleSubmit(e) {
    //***********************************等待ajax提交数据 ******** 区分 新增 或者 编辑
    e.preventDefault();
    // this.setState({
    //   isEmailOver: true
    // });
    
    this.state.formData.key = this.state.key;

    const validation = this.refs.validation;
    validation.validate((valid) => {
      if (!valid) {
        console.log('error in form');
        msg_error()
        return;
      } else {
        console.log('submit');
      }
      //console.log(this.state.formData);
      msg_success();
    });

    

    // 提交数据
      let u = this.state.formData.id ? baseAreaEdit : baseAreaAdd;
      var keys = this.state.key.split(',');
      var arr = [];
      for(var i=0;i<keys.length;i++){
      	var json = {};
      	json.Region_Code = keys[i];
      	arr.push(json);
      }
      var fD = {
      	SalesRegion_Name : this.state.formData.name,
      	Region_Description : this.state.formData.desc,
      	SalesRegion_Code : this.state.formData.id,
      	Detail:arr,
      }
      //console.log(JSON.stringify(fD)+'--'+u);
      //return
      _G.ajax({
        url  : u,
        data : fD,
        method : 'post',
        success:function(res){
          if(res.ReturnOperateStatus == 'True'){
            msg_success();
            // 调转到列表页
            goBack();
            return;
          }
          if(res.ReturnOperateStatus == 'False' || res.ReturnOperateStatus == 'NULL'){
            msg_error(res.Msg);
            return
          }
        },
        fail:function(res){
          msg_error();
        }
      })

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

		<div className="m-form">
	        <div className="m-form-title">{this.state.formData.title}</div>
	        <div className="m-form-con" style={{overflow:'hidden'}}>
	           <div className="m-list">
	                <Col span="8" style={{ display : 'block' }} >
						<div className="border border-raduis">
							<div className="title"> 区域信息 </div>
							<div className="con">
								<Form horizontal>
								 <Validation ref="validation" onValidate={this.handleValidate}>
								    
								    <FormItem
						                label="区域名称："
						                id="name"
						                labelCol={{span: 8}}
						                wrapperCol={{span: 14}}
						                validateStatus={this.renderValidateStyle('name')}
						                help={status.name.errors ? status.name.errors.join(',') : null}
						                required>
						                  <Validator rules={[{required: true, message: '区域名称'}]}>
						                    <Input  name="name" value={formData.name} />
						                  </Validator>
						            </FormItem>
						            

						            <FormItem
						                label="区域描述："
						                id="desc"
						                labelCol={{span: 8}}
						                wrapperCol={{span: 14}}
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
								<Tree multiple={false} checkable defaultExpandAll checkedKeys={this.state.checkedKeys} onCheck={this.handleCheck}>
					          		{treeNodes}
					        	</Tree>
							</div>
						</div>
					</Col>
	           </div>
		    </div>
		      <div className="m-form-btns" style={{overflow:'hidden'}}>
		      <Row>
		        <Col span="4" offset="2">
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



class BaseAreaAdd extends React.Component{
	constructor(){
		super();
	    this.state = {
	    }
	}

    render(){
	return(
			<Row>
				<RightBox id={this.props.params.id} />
			</Row>
		)
	}
}


module.exports = {
  BaseAreaAdd : BaseAreaAdd
}


