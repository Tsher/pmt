// 积分规则  批次区域管理
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
import Popover from 'antd/lib/popover';
import DatePicker from 'antd/lib/date-picker';
import Radio from 'antd/lib/radio';

const RadioGroup = Radio.Group;


const confirm = Modal.confirm;
const history = createHistory();

const FormItem = Form.Item;

import '../../entry/config';
const ruleAreaList = config.__URL + config.rule.area.list;
const ruleAreaSearch  = config.__URL + config.rule.area.search;
const ruleAreaDel  = config.__URL + config.rule.area.del;
const ruleAreaExcel  = config.__URL + config.rule.area.excel;
const ruleAreaSeles  = config.__URL + config.rule.area.seles;

var changeTableState;

class SelectForm extends React.Component{
	//mixins: [Form.ValueMixin],

  constructor() {
  	super();
    this.state =  {
      batchNumStart : undefined, // 起始批次号
      batchNumEnd: undefined, // 结束批次号
      boxNumStart:undefined, // 起始箱号
      boxNumEnd:undefined, // 结束箱号
      saleRegion : undefined,  // 销售区域
      selesD : [],
      excel : 'javascript:;',
    };
    this.setValue = this.setValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.disabledEndDate = this.disabledEndDate.bind(this);
  }

  componentDidMount(){

    _G.ajax({
      url : ruleAreaSeles,
      type: "get",
      success:function(res){
        this.setState({
          selesD : res.Data
        })

        this.handleSubmit();

      }.bind(this)

    })

  }

  
  // 文本框的值 同步到 state
  setValue(e){
  	var name = e.target.id;
  	this.setState({
      [name] : e.target.value
  	})
  }
  

  handleSubmit(e) {
    // ********************************************************** ajax提交数据，获取table的data值
    e&&e.preventDefault();
    var subD = {};
    subD.Start_Batch_Code_S = this.state.batchNumStart || '';
    subD.End_Batch_Code_E = this.state.batchNumEnd || '';
    subD.Start_Box_Code_S = this.state.boxNumStart || '';
    subD.End_Box_Code_E = this.state.boxNumEnd || '';
    subD.SalesRegion_Code = this.state.saleRegion || '';

    this.props.changeTableState(subD);

    //excel导出 begin
    var _this = this;
    _G.getExcel({
       url : ruleAreaExcel,
       data : subD,
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
  

  disabledEndDate(endValue){
    if (!endValue || !this.state.startTime) {
      return false;
    }
    return endValue.getTime() <= this.state.startTime.getTime();
  }

 
  render() {
    return (
      <Form inline onSubmit={this.handleSubmit}>
      <Row>
        <Col span="24" >
            <div className="">
            <ul className="clearfix">
	            <li className="fleft">
		            	<FormItem
			            label="起始批次号："
			            id="batchNumStart">
			              <Input placeholder="" id="batchNumStart" name="batchNumStart" onChange={this.setValue} value={this.state.batchNumStart} />
			          </FormItem>
			          <FormItem
			            label="至　"
			            id="batchNumEnd">
			              <Input placeholder="" id="batchNumEnd" name="batchNumEnd" onChange={this.setValue} value={this.state.batchNumEnd} />
			          </FormItem>
	            </li>
	            <li className="fleft">
		            	<FormItem
			            label="起始箱号："
			            id="boxNumStart">
			              <Input placeholder="" id="boxNumStart" name="boxNumStart" onChange={this.setValue} value={this.state.boxNumStart} />
			          </FormItem>
			          <FormItem
			            label="至　"
			            id="boxNumEnd">
			              <Input placeholder="" id="boxNumEnd" name="boxNumEnd" onChange={this.setValue} value={this.state.boxNumEnd} />
			          </FormItem>
	            </li>
              
              
              <li className="fleft">
			    <FormItem
		            label="销售区域："
		            id="saleRegion">
		            	<Select size="large" placeholder="选择销售区域" style={{width: 200}} name="saleRegion"  value={this.state.saleRegion} onChange={this.onChange.bind(this,'saleRegion')}>

                    {
                       this.state.selesD.map(function(d){
                          return <Option key={d.SalesRegion_Code} value={d.SalesRegion_Code} >{d.SalesRegion_Name}</Option>
                       })
                    }
                  </Select>
		          </FormItem>
              </li>
              <li className="fleft">
                <FormItem>
                  <Button type="primary" shape="circle" size="large"  htmlType="submit">
	  		        <Icon type="search" />
	  		      </Button>
                </FormItem>
              </li>
            </ul>
          </div>
          <Row className="clearfix" style={{marginBottom:'20px'}}>
              <Col span="2" >
                <Link to='/rule/area/add'>
                  <Button type="primary" size="large"><Icon type="plus" /><span>新增</span></Button>
                </Link>
              </Col>
              <Col span="2" >
                <a href={this.state.excel}>
                  <Button type="primary" size="large"><Icon type="download" /><span>导出报表</span></Button>
                </a>
              </Col>
            </Row>
        </Col>
        </Row>
      </Form>
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

const columns = [{
  title: '序号',
  dataIndex: 'SortNo',
  key: 'SortNo'
}, {
  title: '起始批次号',
  dataIndex: 'Start_Batch_Code',
  key: 'Start_Batch_Code'
}, {
  title: '结束批次号',
  dataIndex: 'End_Batch_Code',
  key: 'End_Batch_Code'
}, {
  title: '起始箱号',
  dataIndex: 'Start_Box_Code',
  key: 'Start_Box_Code'
},{
  title: '结束箱号',
  dataIndex: 'End_Box_Code',
  key: 'End_Box_Code'
},{
  title: '销售区域',
  dataIndex: 'SalesRegion_Name',
  key: 'SalesRegion_Name'
},{
  title: '录入时间',
  dataIndex: 'Add_On',
  key: 'Add_On'
}, {
  title: '操作',
  key: 'operation',
  render: function(text, record,index) {
  	var edit = '/rule/area/edit/'+record.LotArea_Code,
  		del = '/rule/area/del/' + record.LotArea_Code;
    return <span><Link to={edit}>编辑</Link><span className="ant-divider"></span><a href="#" onClick={showModal} data-id={record.LotArea_Code} data-name={record.LotArea_Code} data-index={index} data-text="删除" >删除</a></span>;
	}
}];



class RuleArea extends React.Component{
	constructor(){
		super();
    this.state = {
      visible : false,
      title : '',
      ModalText : '',
      changeId : '',
      total : 0,
      delId : false,
      index:false,
      data : [],
      loading:false,
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
      url : ruleAreaSearch,
      type: "get",
      data : opts,
      success:function(res){
        console.log(res.Data)
        var d = [];
        for(var i=0,l=res.Data.length;i<l;i++){
          d[i]=res.Data[i];
          d[i].Add_On = ''+_G.timeFormat2(res.Data[i].Add_On);
          d[i]['key'] = res.Data[i].SortNo;
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
    
  }
  componentWillUnmount(){
    modalState = false;
  }
  showModal(id,index,name){
    this.setState({
      visible : true,
      ModalText: '你正要删除 "'+ id +'"的批次号，是否继续？',
      confirmLoading: false,
      changeId : id,
      index:index,
    })
  }
  handleOk(e){
    //******************* 冻结，解冻 逻辑 changeId , 然后 关闭****************************

    this.setState({
      loading : true
    })

    
    _G.ajax({
      url : ruleAreaDel,
      type : 'get',
      data : {
        LotArea_Code : this.state.changeId
      },
      success:function(res){
        if(res.ReturnOperateStatus == 'True'){
          this.setState({
            visible : false
          })
          var d = [].concat(this.state.data);
          d.splice(this.state.index,1);
          this.setState({
            data : d,
            loading : false
          })
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
	render(){
		return(
			<div className="m-list">
				<Row>
					<SelectForm changeTableState={this.changeTableState} />
				</Row>
				<Row>

          <Table onChange={this.tableChange}  onShowSizeChange={this.showSizechange}
            loading={this.state.loading} 
            columns={columns} 
            dataSource={this.state.data} 
            pagination={{showQuickJumper:true,pageSize:this.state.opts.pageSize,current:this.state.opts.page,showSizeChanger:true,total:this.state.total}}  />
				</Row>
        <Modal 
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
	RuleArea : RuleArea
}