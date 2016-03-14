// 促销管理  奖品管理

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

import { Search } from '../btn-search'; // 查询按钮
import { Export } from '../btn-export'; // 导出excel按钮
import { Add } from '../btn-add'; // 新增按钮
import { Edit } from '../btn-edit'; // 编辑，发布，设置等按钮
import { Del } from '../btn-del'; // 删除

let pageName = '奖品管理'; // 按钮，验证权限使用



var kinds = [];
class SelectForm extends React.Component{
	//mixins: [Form.ValueMixin],

  constructor() {
  	super();
    this.state =  {
      Prize_Name : '', // 奖品名称
      Prize_Type : '', // 奖品类别
      Register_On_S : '', // 注册开始时间
      Register_On_E : '', // 注册结束时间
      excel : 'javascript:;',
      kinds : [],
    };
    this.setValue = this.setValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.disabledEndDate = this.disabledEndDate.bind(this);
  }

  
  // 文本框的值 同步到 state
  setValue(e){
    var name = e.target.id;
  	this.setState({
      [name] : e.target.value
  	})
  }
  

  handleSubmit(e) {
      e&&e.preventDefault();
      var data = _G.assign(this.state, {
          Register_On_S: _G.timeFormat2(new Date(this.state.Register_On_S).getTime(), 'YYYY-MM-DD'),
          Register_On_E: _G.timeFormat2(new Date(this.state.Register_On_E).getTime(), 'YYYY-MM-DD'),
          page : 1
      });
      this.props.changeTableState(data);
      //excel导出 begin
      var _this = this;
      var url = config.__URL + config.sale.prize.excel;
      _G.getExcel({
         url : url,
         data : data,
         callback : function(d){
             var excel = d.ReturnOperateStatus;
             _this.setState({
                 excel : excel
             })
             _this.props.excelChange(excel);
             console.log(_this.state.excel)
         }
      });
      //excel导出 end
  }
  componentDidMount() {
      _G.ajax({
          url: config.__URL + config.sale.prize.kinds,
          type: "get",
          data: {Prize_Name:''},
          success: function(res) {
              console.log(res.Data)
              this.setState({
                  kinds : res.Data
              })
              this.handleSubmit()
          }.bind(this)
      })
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
    var renderKinds = [{'Prize_Type':'全部','Prize_Code':''}].concat(this.state.kinds).map(function(elem,index) {
      return <Option key={index} value={elem.Prize_Type}>{elem.Prize_Type}</Option>;
    })
    return (
    	<div className="fright">
      <Form inline onSubmit={this.handleSubmit}>
      <Row>
        <Col span="24" >
            <div className="fright">
            <ul className="clearfix">
            	<li className="fleft">
	            	<FormItem
		            label="奖品名称："
		            id="Prize_Name">
		              <Input placeholder="" style={{width:100}} id="Prize_Name" name="Prize_Name" onChange={this.setValue} value={this.state.Prize_Name} />
		          </FormItem>
            	</li>
            	<li className="fleft">
	            	<FormItem
		            label="奖品类别："
		            id="Prize_Type">
		            	<Select size="large" placeholder="请选择奖品类别" style={{width: 80}} name="Prize_Type"  value={this.state.Prize_Type} onChange={this.onChange.bind(this,'Prize_Type')}>
		                  {renderKinds}
		              </Select>
		          </FormItem>
            	</li>
              <li className="fleft date-picker">
                <FormItem id="startTime" label="入网时间：" labelCol={{span : 5}} >
                  	<Row span="24" >
                  	<Col span="10">
			            <DatePicker placeholder="开始日期" onChange={this.onChange.bind(this,'Register_On_S')} />
			          </Col>
			          <Col span="1">
			            <p className="ant-form-split">-</p>
			          </Col>
			          <Col span="10">
			            <DatePicker disabledDate={this.disabledEndDate} placeholder="结束日期" onChange={this.onChange.bind(this,'Register_On_E')} />
			          </Col>
			          </Row>
                </FormItem>
              </li>
              <li className="fleft">
                <FormItem>
                <Search Name={pageName} />
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
  var id = tar.getAttribute('data-id'),name=tar.getAttribute('data-name');
  modalState(id,name)
}

const columns = [
// {
//   title: '奖品编码',
//   dataIndex: 'Prize_Code',
//   key: 'Prize_Code',
//   render: function(text,record) {
//   	var href= '/sale/prize/info/'+text;
//     return <Link to={href}>{text}</Link>;
//   }
// }, 
{
  title: '奖品名称',
  dataIndex: 'Prize_Name',
  key: 'Prize_Name'
}, {
  title: '品牌',
  dataIndex: 'Brand',
  key: 'Brand'
}, {
  title: '规格',
  dataIndex: 'Spec',
  key: 'Spec'
},{
  title: '单位',
  dataIndex: 'Unit',
  key: 'Unit'
},{
  title: '奖品类别',
  dataIndex: 'Prize_Type',
  key: 'Prize_Type'
}, {
  title: '入网日期',
  dataIndex: 'RegisterOn',
  key: 'RegisterOn'
},{
  title: '操作',
  key: 'operation',
  render: function(text, record) {
  	var edit = '/sale/prize/edit/'+record.Prize_Code,
  		del = '/sale/prize/del/' + record.Prize_Code
    return <span>
    <Edit Name={pageName} editLink={edit} value="编辑" />
    <span className="ant-divider"></span>
    <Del Name={pageName} id={record.Prize_Code} _name={record.Prize_Name} click={showModal} />
    </span>;
	}
}];



class SalePrize extends React.Component{
	constructor(){
		super();
    this.state = {
      visible : false,
      title : '',
      ModalText : '',
      changeId : false,
      total : 0,
      data :[],
      excel : 'javascript:;',
      opts: {
          page: 1,
          pageSize: 10,
      }
    }
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.changeTableState = this.changeTableState.bind(this);
    this.excelChange = this.excelChange.bind(this);
    this.showTotal = this.showTotal.bind(this);
    this.tableChange = this.tableChange.bind(this);
    this.showSizechange = this.showSizechange.bind(this);
	}

  componentDidMount(){
    modalState = this.showModal;
    
  }
  componentWillUnmount(){
    modalState = false;
  }
  showModal(id,name){
    this.setState({
      visible : true,
      ModalText: '你正要删除 "'+ name +'"的奖品，是否继续？',
      confirmLoading: false,
      changeId : id
    })
  }
  handleOk(e){
    //******************* 冻结，解冻 逻辑 changeId , 然后 关闭****************************
    var opts = {
            Prize_Code: this.state.changeId
        }
        _G.ajax({
            url: config.__URL + config.sale.prize.del,
            type: "get",
            data: opts,
            success: function(res) {
                this.setState({
                    confirmLoading: true
                })
                var d = [],_tmp = this.state.data
                for(var i=0;i<_tmp.length;i++){
                  if(_tmp[i].Prize_Code!=opts.Prize_Code){
                    d.push(_tmp[i])
                  }
                }
                this.setState({
                    data: d,
                    total: this.state.total,
                    opts: this.state.opts
                })
                this.setState({
                    visible: false
                })
            }.bind(this)
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
  
  excelChange(src){
      this.setState({
          excel : src
      })
  }


  // 发送ajax请求，获取table值
    changeTableState(opts) {
        var opts = opts || {};
        opts.page = opts.page || this.state.opts.page;
        opts.pageSize = opts.pageSize || this.state.opts.pageSize;

        this.setState({
            opts: opts
        })
        _G.ajax({
            url: config.__URL + config.sale.prize.list,
            type: "get",
            data: opts,
            success: function(res) {
                var d = [];
                for (var i = 0, l = res.Data.length; i < l; i++) {
                    d[i] = res.Data[i];
                    d[i]['key'] = i;
                    d[i]['RegisterOn'] = _G.timeFormat2(d[i].RegisterOn)
                }
                this.setState({
                    data: d,
                    total: res.TotalCount,
                    opts: opts
                })
            }.bind(this)
        })
    }
  showTotal(){
    return '共'+this.state.total+'条'
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
					<Col span="2" style={{marginRight:10}}>
          <Add Name={pageName} addLink='/sale/prize/add' />
	       </Col>
      		<Col span="2">
          <Export Name={pageName} excel={this.state.excel} />
					</Col>
					<Col span="18" style={{float:'right'}}>
						<SelectForm excelChange={this.excelChange} changeTableState={this.changeTableState} />
					</Col>
				</Row>
				<Row>
					<Table onChange={this.tableChange}  columns={columns} dataSource={this.state.data} 
            pagination={{
                showQuickJumper:true,
                pageSize:this.state.opts.pageSize,
                current:this.state.opts.page,
                showSizeChanger:true,
                total:this.state.total,
                onShowSizeChange:this.showSizechange,
                showTotal:this.showTotal
              }}
          />
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
	SalePrize : SalePrize
}