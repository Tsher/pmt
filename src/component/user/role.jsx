// 用户管理  企业角色管理  列表



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
import { createHistory } from 'history';
import Modal from 'antd/lib/modal';


const confirm = Modal.confirm;
const history = createHistory();

const FormItem = Form.Item;

import '../../entry/config';

import { Search } from '../btn-search'; // 查询按钮
import { Export } from '../btn-export'; // 导出excel按钮
import { Add } from '../btn-add'; // 新增按钮
import { Edit } from '../btn-edit'; // 编辑，发布，设置等按钮
import { Del } from '../btn-del'; // 删除

let pageName = '企业角色管理'; // 按钮，验证权限使用


const urlRoleList = config.__URL + config.user.role.list;
const urlRoleDel = config.__URL + config.user.role.del;
const urlRoleType = config.__URL + config.user.role.type;
const urlRoleExcel = config.__URL + config.user.role.excel;


let role_all_type={
    "全部" : ''
};

class SelectForm extends React.Component{
	//mixins: [Form.ValueMixin],

  constructor() {
  	super();
    this.state =  {
      Role_Name : '',
      Role_Type : "",
      role_all_type : undefined,
      excel : 'javascript:;',
    };
    this.setValue = this.setValue.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentDidMount(){
    // 获取所有角色类型
    var that = this;
    _G.get_data(config['user']['role']['type'],'user_role_type',{},function(res){
      res.Data.map(function(item){
        role_all_type[item.REAL_Code] = item.CODE_NM;
      })
      const doms = [{'REAL_Code':'','CODE_NM':'全部'}].concat(res.Data).map( (item,index)=>{
        return <Option key={index} value={item['REAL_Code']}>{item['CODE_NM']}</Option>
      } )
      that.setState({
        role_all_type : doms,
      })
    }); 
    this.handleSubmit();
  }

  

  setValue(e){
    console.log(e.target.name,e.target.value)
  	this.setState({
  		[e.target.name] : e.target.value,
  	})
  }
  handleSelectChange(field,value){
    console.log(field,value)
  	this.setState({
  		[field]:value
  	})
  }

  handleSubmit(e) {
    // ********************************************************** ajax提交数据，获取table的data值
    e&&e.preventDefault();
    var data = {
      Role_Name : this.state.Role_Name,
      Role_Type : this.state.Role_Type,
      page : 1
    }
    this.props.changeTableState(data);
    console.log(this.state);

    //excel导出 begin
    var _this = this;
    _G.getExcel({
       url : urlRoleExcel,
       data : data,
       callback : function(d){
           var excel = d.ReturnOperateStatus;
           _this.setState({
               excel : excel
           })
       }
    });
    //excel导出 end
    
  }

  render() {
    const formData = this.state;
    return (
    	<div className="fright">
      <Form inline onSubmit={this.handleSubmit}>
        <FormItem
          id="Role_Name">
          <Input placeholder="请输入角色名" id="Role_Name" name="Role_Name" onChange={this.setValue} value={this.state.Role_Name} />
        </FormItem>
        <FormItem
          id="Role_Type">
          <label className="ant-checkbox-inline">角色类型：</label>
          <Select id="select" name="Role_Type" size="large" value={this.state.Role_Type} style={{width:200}} onChange={this.handleSelectChange.bind(this,'Role_Type')}>
	         {this.state.role_all_type}
	        </Select>
        </FormItem>
        <FormItem >
          <Search Name={pageName} />
        </FormItem>
        <FormItem>
          <Export Name={pageName} excel={this.state.excel} />
        </FormItem>
      </Form>
      </div>
    );
  }
}

let modalState;
function showModal(e){
  Event.stop(e);
  var tar = Event.target(e);
  var id = tar.getAttribute('data-id'),name=tar.getAttribute('data-name'),index=tar.getAttribute('data-index');
  modalState(id,index,name)
}

const columns = [{
  title: '角色编号',
  dataIndex: 'Role_Code',
  key: 'Role_Code',
  render: function(text,record) {
  	var href= '/user/role/info/'+record.Role_Code;
    return <Link to={href}>{text}</Link>;
  }
}, {
  title: '角色名称',
  dataIndex: 'Role_Name',
  key: 'Role_Name'
}, {
  title: '角色类型',
  dataIndex: 'Role_Type',
  key: 'Role_Type',
  render:function(text,record){
    return (<span>{role_all_type[record.Role_Type]}</span>)
  }
}, {
  title: '角色描述',
  dataIndex: 'Role_Description',
  key: 'Role_Description'
}, {
  title: '操作',
  key: 'operation',
  render: function(text, record,index) {
  	var edit = '/user/role/edit/'+ record.Role_Code,
  		set = '/user/role/set/' + record.Role_Code,
  		del = '/user/role/del/' + record.Role_Code
    return <span>
    <Edit editLink={edit} Name={pageName} value='编辑' />
    <span className="ant-divider"></span>
    <Edit editLink={set} Name={pageName} value='设置权限' />
    <span className="ant-divider"></span>
    <Del click={showModal} index={index} _name={record.Role_Name} id={record.Role_Code} Name={pageName} /></span>;
  }
}];



class UserRole extends React.Component{
	constructor(){
		super();
    this.state = {
      visible : false,
      title : '',
      ModalText : '',
      delId : false,
      total : 0, // 数据总数
      data:[],
      opts:{
        page:1,
        pageSize:10
      }
    }
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.changeTableState = this.changeTableState.bind(this);
    this.tableChange = this.tableChange.bind(this);
	}

  componentDidMount(){
    modalState = this.showModal;
  }
  componentWillUnmount(){
    modalState = false;
  }
  changeTableState(opts){
    console.log(opts)
    var opts = opts || {};
    opts.page = opts.page || this.state.opts.page;
    opts.pageSize = opts.pageSize || this.state.opts.pageSize;
    //opts.EntityCode = 'DEFAULT';
    var that = this;

    _G.ajax({
      url : urlRoleList,
      method: "get",
      data : opts,
      success:function(res){
        
        //this.props.history.pushState(opts,this.props.location.pathname,opts);
        
        var d = [];
        for(var i=0,l=res.Data.length;i<l;i++){
          d[i]=res.Data[i];
          d[i]['key'] = i;
        }
        this.setState({
          data : d,
          total : res.TotalCount,
          opts : opts
        })

      }.bind(this)

    })
  }
  showModal(id,index,name){
    this.setState({
      visible : true,
      ModalText: '你正要删除 "'+ name +'"的角色，是否继续？',
      confirmLoading: false,
      delId : id,
      index : index,
    })
  }
  handleOk(e){
    //*******************删除逻辑，删除 delId , 然后 关闭****************************
    this.setState({
      loading : true
    })
    _G.ajax({
      url : urlRoleDel,
      method : 'get',
      data : {
        Role_Code : this.state.delId
      },
      success:function(res){
        if(res.ReturnOperateStatus == 'True'){
          this.setState({
            visible : false
          })
          console.log('删除成功');
          var d = [].concat(this.state.data);
          console.log(d)
          d.splice(this.state.index,1);
          console.log(d,this.state.index)
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

  // 点击分页
  tableChange(pagination, filters, sorter){
    var opts = _G.assign({},this.state.opts);
    opts.page = pagination.current;
    opts.pageSize = pagination.pageSize;

    

    this.setState({
      opts : opts
    })

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
	render(){
		return(
			<div className="m-list">
				<Row>
					<Col span="4">
            <Add Name={pageName} addLink='/user/role/add' />
					</Col>
					<Col span="20">
						<SelectForm query={this.props.location} changeTableState={this.changeTableState} />
					</Col>
				</Row>
				<Row>
					<Table onChange={this.tableChange}  onShowSizeChange={this.showSizechange}
            columns={columns} dataSource={this.state.data} 
            pagination={{showQuickJumper:true,pageSize:this.state.opts.pageSize,current:1,showSizeChanger:true,total:this.state.total}}  />
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
	UserRole : UserRole
}