// 营销规则 积分规则
import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import { DatePicker } from 'antd/lib';
import { Button } from 'antd/lib';
import Table from 'antd/lib/table';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import message from 'antd/lib/message';
import {Link} from 'react-router';
import Icon from 'antd/lib/icon';
import Modal from 'antd/lib/modal';
const confirm = Modal.confirm;

const FormItem = Form.Item;

import '../../entry/config';
const ruleNumberList = config.__URL + config.rule.number.list;
const ruleNumberDel  = config.__URL + config.rule.number.del;

var changeTableState;

const columns = [{
  title: '规则名称',
  dataIndex: 'IntegralRule_Name',
  key: 'IntegralRule_Name'
},{
  title: '描述',
  dataIndex: 'Description',
  key: 'Description'
},{
  title: '获得积分',
  dataIndex: 'Bas_Integral',
  key: 'Bas_Integral',
},{
  title: '计划生效时间',
  dataIndex: 'Effective_Time',
  key: 'Effective_Time'
},{
  title: '计划失效时间',
  dataIndex: 'Failure_Time',
  key: 'Failure_Time'
}, {
  title: '操作',
  key: 'operation',
  render: function(text, record,index) {
    var edit = '/rule/number/edit/'+record.IntegralRule_Code,
      del = '/rule/number/del/' + record.IntegralRule_Code
    return <span><Link to={edit}>编辑</Link><span className="ant-divider"></span><a href="#" onClick={showModal} data-id={record.IntegralRule_Code} data-index={index} data-name={record.IntegralRule_Name} >删除</a></span>;
  }
}];


let modalState;
function showModal(e){
  Event.stop(e);
  var tar = Event.target(e);
  var id = tar.getAttribute('data-id'),index=tar.getAttribute('data-index'),name = tar.getAttribute('data-name');
  modalState(id,index,name)
}



class RuleNumber extends React.Component{
  constructor() {
    super();
    this.state =  {
        total : 100,
        data : [],
        opts : {
          page :1,
          pageSize : 10,
        },
      }
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

    this.changeTableState = this.changeTableState.bind(this);
    this.tableChange = this.tableChange.bind(this);
    this.showSizechange = this.showSizechange.bind(this);

    this.changeTableState(this.state.opts);
  }


  componentDidMount(){

    console.log('hu');
    this.changeTableState(this.state.opts);

    this.setState({
      data : []
    })
  }
  // 点击分页
  tableChange(pagination, filters, sorter){
    var opts = Object.assign({},this.state.opts);
    opts.page = pagination.current;
    opts.pageSize = pagination.pageSize;

    this.setState({
      opts : opts
    })

    this.changeTableState(opts);
  }
  // 每页数据条数变化
  showSizechange(current, pageSize){
    var opts = Object.assign({},this.state.opts);
    opts.pageSize = pageSize;
    opts.page = current;

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
    
    // this.setState({
    //   opts : opts
    // })
    
    //opts.EntityCode = 'DEFAULT';
    var that = this;

    _G.ajax({
      url : ruleNumberList,
      type: "get",
      data : opts,
      success:function(res){
        var d = [];

        for(var i=0,l=res.Data.length;i<l;i++){
          d[i]=res.Data[i];
          d[i]['key'] = i;
          d[i]['Effective_Time'] = _G.timeFormat2(res.Data[i].Effective_Time,'YYYY-MM-DD');
          d[i]['Failure_Time'] = _G.timeFormat2(res.Data[i].Failure_Time,'YYYY-MM-DD');
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

    modalState = this.showModal;
    
  }
  showModal(id,index,name){
    this.setState({
      visible : true,
      ModalText: '你正要删除 规则："'+ id +'"，是否继续？',
      confirmLoading: false,
      delId : id,
      index : index
    })
  }
  handleOk(e){
    //*******************删除逻辑，删除 delId , 然后 关闭****************************
    
    // ***********************删除请求******************
    
    this.setState({
      confirmLoading:true
    })
    _G.ajax({
      url : ruleNumberDel,
      method : 'get',
      data : {
        IntegralRule_Code : this.state.delId
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
  }
  handleCancel(e){
    this.setState({
      visible : false
    })
  }
	render(){
		return(
			<div className="m-list">
        <Row>
			  <Col span="2" style={{marginBottom:20}}>
            <Link to='/rule/number/add'>
              <Button type="primary" size="large"><Icon type="plus" /><span>新增</span></Button>
                  </Link>
        </Col>
        <Col span="2">
            <Link to='/rule/number/exports'>
              <Button type="primary" size="large"><Icon type="download" /><span>导出报表</span></Button>
                  </Link>
          </Col>
        </Row>
        <Table onChange={this.tableChange} columns={columns} dataSource={this.state.data} pagination={{showQuickJumper:true,pageSize:this.state.opts.pageSize,current:this.state.opts.page,showSizeChanger:true,total:this.state.total,onShowSizeChange:this.showSizechange}} />
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
	RuleNumber : RuleNumber
}