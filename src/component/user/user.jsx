// 用户管理  企业用户管理

import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import Form from 'antd/lib/form';
import message from 'antd/lib/message';
import Table from 'antd/lib/table';
import {Link} from 'react-router';
import Tree from 'antd/lib/tree';
const TreeNode = Tree.TreeNode;
import { createHistory } from 'history';
import Modal from 'antd/lib/modal';
import Popover from 'antd/lib/popover';
import DatePicker from 'antd/lib/date-picker';
import Radio from 'antd/lib/radio';

import moment from 'moment';

const RadioGroup = Radio.Group;


const confirm = Modal.confirm;
const history = createHistory();

const FormItem = Form.Item;

import { Search } from '../btn-search'; // 查询按钮
import { Export } from '../btn-export'; // 导出excel按钮
import { Add } from '../btn-add'; // 新增按钮
import { Edit } from '../btn-edit'; // 编辑，发布，设置等按钮
import { Del } from '../btn-del'; // 删除

let pageName = '企业用户管理'; // 按钮，验证权限使用


import '../../entry/config';


// 用户列表api  http://172.31.0.49:8088/api/SUser/GetUsers?EntityCode=DEFAULT&page=0&pageSize=100
// page ：当前请求页
// pageSize : 每页条数
// EntityCode : DEFAULT 

const urlUserList = config.__URL + config.user.user.list;
const urlUserDel  = config.__URL + config.user.user.del;
const urlUserPart = config.__URL + config.user.user.part;
const urlUserExcel = config.__URL + config.user.user.excel;


let changeTableState;


class SelectForm extends React.Component{
	//mixins: [Form.ValueMixin],

  constructor() {
  	super();
    this.state =  {
      Login_Name: '',
      Register_On_S : '',
      Register_On_E : '',
      User_Status : '',
      Depart_Code : '',
      show : 'none',
      right:0,
      top:-1000,
      width:100,
      excel : 'javascript:;',
    };
    this.setValue = this.setValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.radioChange = this.radioChange.bind(this);
    this.disabledEndDate = this.disabledEndDate.bind(this);
    this.showMoreSearch = this.showMoreSearch.bind(this);
    this.departCheck = this.departCheck.bind(this);
    this.checkhandle = this.checkhandle.bind(this);
    this.fixedTreeClear = this.fixedTreeClear.bind(this);
  }

  showMoreSearch(){
    this.setState({
      show : this.state.show == 'none' ? 'block' : 'none'
    })
  }

  componentDidMount(){


    // 获取部门
    _G.ajax({
      url : urlUserPart,
      type : 'get',
      success : function(res){

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
        let treeNodes = parseTree(res.Data);
        this.setState({
          treeNodes : treeNodes,
          Login_Name: this.props.query.Login_Name || '',
          Register_On_S : this.props.query.Register_On_S || '',
          Register_On_E : this.props.query.Register_On_E || '',
          User_Status : this.props.query.User_Status || '',
          Depart_Code : this.props.query.Depart_Code || '',
          page : this.props.query.page,
          pageSize : this.props.query.pageSize
        })
        
        
        // 页面打开后，请求第一个列表数据
        setTimeout(function(){
            this.handleSubmit();
        }.bind(this),200)
        
        
      }.bind(this)
    })



  }


  // 改变文本框的值
  setValue(e){
    var name = e.target.id;
  	this.setState({
      [name] : e.target.value
  	})
  }
  

  handleSubmit(e) {
    // ********************************************************** ajax提交数据，获取table的data值
    e&&e.preventDefault();
    var data = _G.assign({},this.state);
    console.log(data.Register_On_S)
    data.Register_On_S = _G.timeFormat( new Date(data.Register_On_S).getTime() , 'YYYY-MM-DD' );
    data.Register_On_E = _G.timeFormat( new Date(data.Register_On_E).getTime() , 'YYYY-MM-DD' );
    console.log(data.Register_On_S)
    var d = {
      Register_On_S : data.Register_On_S,
      Register_On_E : data.Register_On_E,
      User_Status : data.User_Status == 0 ? '' : data.User_Status,
      Depart_Code : data.Depart_Code,
      Login_Name : data.Login_Name,
      page : 1,
      pageSize : data.pageSize
    }
    console.log('first time')
    console.log(d)
    this.props.changeTableState(d);

    //excel导出 begin
      var _this = this;
      _G.getExcel({
         url : urlUserExcel,
         data : d,
         callback : function(d){
             var excel = d.ReturnOperateStatus;
             _this.setState({
                 excel : excel
             })
         }
      });
    //excel导出 end
    
  }

  // datepicker change
  onChange(field,value){
    this.setState({
      [field] : value
    })
  }
  // radio change
  radioChange(e){
    console.log(e.target.value)
    this.setState({
      User_Status : e.target.value
    })
  }

  disabledEndDate(endValue){
    if (!endValue || !this.state.Register_On_S) {
      return false;
    }
    return endValue.getTime() <= this.state.Register_On_S.getTime();
  }

  departCheck(e){
    var tar = e.target;
    var size = $(tar).offset();
    this.setState({
      right : 10,
      top : tar.offsetHeight,
      width : tar.offsetWidth
    })
  }
  departChange(e){
      
  }

  // 点击树菜单
  checkhandle(info){
    // 根据 eventKey 查询 相关信息 展示右侧详细信息
    console.log(info)
    var state = _G.assign({},this.state);
    state.Depart_Code = info.node.props.eventKey;
    state.Depart_Name = info.node.props.title;
    state.top = -1000;
    this.setState(state);
    // 根据选中的 key ，获取 相关数据 ,更新state，展示再右侧
  }
  
  fixedTreeClear(e){
     console.log(e)
    var state = _G.assign({},this.state);
    state.Depart_Code = '';
    state.Depart_Name = '';
    state.top = -1000;
    this.setState(state);
  }

 
  render() {
    return (
    	<div className="fright">
      <Form inline onSubmit={this.handleSubmit}>
      <Row>
      <Col span="24">
          <div className="fright">
          <FormItem 
            id="Login_Name">
            <Input placeholder="请输入登录名或真实姓名" style={{width:250}} id="Login_Name" name="Login_Name" onChange={this.setValue} value={this.state.Login_Name} />
          </FormItem>
          <FormItem>
            <Search Name={pageName} />
          </FormItem>
          <FormItem>
            <Button onClick={this.showMoreSearch}><span>更多搜索</span><Icon type="down" /></Button>
          </FormItem>
          </div>
        </Col>
        <Col span="24" style={{ display : this.state.show }}>
            <div className="fright">
            <ul className="fleft clearfix">
              <li className="fleft" style={{width:210}}>
                  <FormItem id="Register_On_S" >
                  <Col span="11">
                    <DatePicker  placeholder="开始日期" onChange={this.onChange.bind(this,'Register_On_S')} />
                  </Col>
                  <Col span="1">
                    <p className="ant-form-split">-</p>
                  </Col>
                   <Col span="11">
                    <DatePicker style={{width:100}} disabledDate={this.disabledEndDate} placeholder="结束日期" onChange={this.onChange.bind(this,'Register_On_E')} />
                  </Col>
                </FormItem>
              </li>
              <li className="fleft">
                <FormItem id="state">
                  <Col span="24">
                    <label className="ant-checkbox-inline">用户状态：</label>
                    <label className="ant-checkbox-inline">
                    <RadioGroup name="User_Status" onChange={this.radioChange} value={this.state.User_Status}>
                      <Radio value="0">全部</Radio>
                      <Radio value="10">在职</Radio>
                      <Radio value="11">离职</Radio>
                    </RadioGroup>
                    </label>
                   </Col>
                   
                </FormItem>
              </li>
              <li className="fleft" style={{"position":"relative"}}>
                <FormItem id="Depart_Code" label="隶属部门：">
                  <Input placeholder="" name="Depart_Name" onClick={this.departCheck} onChange={this.departChange} value={this.state.Depart_Name} />
                </FormItem>
                <div id="fixedTree" onClick={this.fixedTreeClick} className="fixedTree" style={{right:this.state.right,top:this.state.top,width:this.state.width}}>
                  <Tree multiple={false} onSelect={this.checkhandle}>
                      {this.state.treeNodes}
                  </Tree>
                  <a className="clear-btn" onClick={this.fixedTreeClear}></a>
                </div>
              </li>
              <li className="fleft">
                <FormItem>
                  <Export Name={pageName} excel={this.state.excel} />
                </FormItem>
              </li>
            </ul>
            
            
          </div>
        </Col>
        </Row>
      </Form>
      
      </div>
    );
  }
}

let modalState;
function showModal(e){
  Event.stop(e);
  var tar = Event.target(e);
  var id = tar.getAttribute('data-id'),index=tar.getAttribute('data-index'),name = tar.getAttribute('data-name');
  modalState(id,index,name)
}

// {
//   title: '用户编号',
//   dataIndex: 'User_Code',
//   key: 'User_Code',
//   render: function(text,record) {
//     var href= '/user/user/info/'+text;
//     return <Link to={href}>{text}</Link>;
//   }
// }, 
const columns = [{
  title: '姓名',
  dataIndex: 'User_Name',
  key: 'User_Name'
}, {
  title: '性别',
  dataIndex: 'User_Sex',
  key: 'User_Sex',
  render:function(text,record){
    var sex = _G.userSex(text);
    return <span>{sex}</span>;
  }
}, {
  title: '登录名',
  dataIndex: 'Login_Name',
  key: 'Login_Name'
},{
  title: '手机号',
  dataIndex: 'Phone_Code',
  key: 'Phone_Code'
},{
  title: '注册时间',
  dataIndex: 'Register_On',
  key: 'Register_On',
  render:function(text,record){
    var time = _G.timeFormat2(text);
    return <span>{time}</span>
  }
},{
  title: '用户状态',
  dataIndex: 'UserStatusName',
  key: 'UserStatusName',
  render:function(text,record){
    return <span>{record.UserStatusName}</span>;
  }
},{
  title: '电子邮箱',
  dataIndex: 'Email',
  key: 'Email'
}, {
  title: '操作',
  key: 'operation',
  render: function(text, record,index) {
  	var edit = '/user/user/edit/'+record.User_Code,
  		set = '/user/user/role/' + record.User_Code,
  		del = '/user/user/del/' + record.User_Code
    return <span>
    <Edit editLink={edit} Name={pageName} value='编辑' />
    <span className="ant-divider"></span>
    <Edit editLink={set} Name={pageName} value='设置权限' />
    <span className="ant-divider"></span>
    <Del click={showModal} index={index} _name={record.User_Name} id={record.User_Code} Name={pageName} /></span>;
  }
}];






class UserUser extends React.Component{
	constructor(){
		super();
    this.state = {
      visible : false,
      title : '',
      ModalText : '',
      total : 0,
      delId : false,
      index:false,
      data : [],
      loading:false,
      opts : {
        page : 1,
        pageSize : 10,
      },
    }
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.changeTableState = this.changeTableState.bind(this);
    this.tableChange = this.tableChange.bind(this);
    this.showSizechange = this.showSizechange.bind(this);
    this.showTotal = this.showTotal.bind(this);
	}

  // 点击分页
  tableChange(pagination, filters, sorter){
    var opts = _G.assign({},this.state.opts);
    opts.page = pagination.current;
    opts.pageSize = pagination.pageSize;

    

    this.setState({
      opts : opts
    })
    console.log(opts)
    this.changeTableState(opts);
  }
  // 每页数据条数变化
  showSizechange(current, pageSize){
    var opts = _G.assign({},this.state.opts);
    opts.pageSize = pageSize;
    opts.page = current;

    console.log(opts);
    

    this.setState({
      opts : opts
    })

    this.changeTableState(opts);

  }

  // 发送ajax请求，获取table值
  changeTableState(opts){

    var opts = opts || {};
    
    opts.page = opts.page || this.state.opts.page;
    opts.pageSize = opts.pageSize ||  this.state.opts.pageSize;
    this.setState({
      opts : opts
    })
    
    //opts.EntityCode = 'DEFAULT';
    var that = this;

    _G.ajax({
      url : urlUserList,
      type: "get",
      data : opts,
      success:function(res){
        console.log(res.Data);
        //this.props.history.pushState(opts,this.props.location.pathname,opts);
        
        var d = [];
        for(var i=0,l=res.Data.length;i<l;i++){
          d[i]=res.Data[i];
          d[i]['key'] = res.Data[i].User_Code;
        }
        this.setState({
          data : d,
          total : res.TotalCount,
          opts : opts
        })

      }.bind(this)

    })

  }

  componentDidMount(){

    changeTableState = this.changeTableState;
    modalState = this.showModal;

    this.setState({
      data : []
    })
    
  }
  componentWillUnmount(){
    modalState = false;
  }
  showModal(id,index,name){
    this.setState({
      visible : true,
      ModalText: '你正要删除 用户："'+ name +'"，是否继续？',
      confirmLoading: false,
      delId : id,
      index : index
    })
  }
  handleOk(e){
    //*******************删除逻辑，删除 delId , 然后 关闭****************************
    
    // ***********************删除请求******************
    this.setState({
      loading : true
    })
    _G.ajax({
      url : urlUserDel,
      method : 'get',
      data : {
        User_Code : this.state.delId
      },
      success:function(res){
        if(res.ReturnOperateStatus == 'True'){
          this.setState({
            visible : false
          })
          console.log('删除成功');
          var d = [].concat(this.state.data);
          d.splice(d[this.state.index],1);
          console.log(this.state.index)
          this.setState({
            data : d,
            loading : false
          })
          //**********************更新table数据****************
          return
        }
        if(res.ReturnOperateStatus == 'False'){
          console.log('删除失败')
        }
      }.bind(this)
    })

    this.setState({
      confirmLoading:true
    })
  }
  handleCancel(e){
    this.setState({
      visible : false
    })
  }
  handleClick(e){
    console.log(e);
  }
  showTotal(){
    return '共'+this.state.total+'条'
  }
	render(){
    const rowKey = function(record) {
      return record.User_Code;  // 比如你的数据主键是 uid
    };

		return(
			<div className="m-list">
				<Row>
					<Col span="2">
          <Add Name={pageName} addLink='/user/user/add' />
					</Col>
					<Col span="22">
						<SelectForm query={this.props.location} changeTableState={this.changeTableState} />
					</Col>
				</Row>
				<Row>
					<Table onChange={this.tableChange}  
            loading={this.state.loading} 
            key={rowKey} 
            columns={columns} 
            dataSource={this.state.data} 
            pagination={{showQuickJumper:true,pageSize:this.state.opts.pageSize,current:this.state.opts.page,showSizeChanger:true,total:this.state.total,onShowSizeChange:this.showSizechange,showTotal:this.showTotal}}  />
				</Row>
        <Modal title="您正在进行删除操作，请确认！"
          visible={this.state.visible}
          onOk={this.handleOk}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}>
          <p>{this.state.ModalText}</p>
        </Modal>
			</div>
		)
	}
}
module.exports = {
	UserUser : UserUser
}