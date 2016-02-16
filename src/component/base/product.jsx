// 基础信息  产品信息管理

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
import Tree from 'antd/lib/tree';
const TreeNode = Tree.TreeNode;

const RadioGroup = Radio.Group;


const confirm = Modal.confirm;
const history = createHistory();

const FormItem = Form.Item;



import '../../entry/config';


// 用户列表api  http://172.31.0.49:8088/api/SUser/GetUsers?EntityCode=DEFAULT&page=0&pageSize=100
// page ：当前请求页
// pageSize : 每页条数
// EntityCode : DEFAULT 

const baseProductList = config.__URL + config.base.product.list;
const baseGetIndustry  = config.__URL + config.base.product.GetIndustry;
const baseProductDel = config.__URL + config.base.product.del;


class SelectForm extends React.Component{
	//mixins: [Form.ValueMixin],

  constructor() {
  	super();
    this.state =  {
      Product_Name : undefined, // 产品名称
      Brand: undefined, // 产品品牌
      Register_On_S : undefined, // 注册开始时间
      Register_On_E : undefined, // 注册结束时间
    };
    this.setValue = this.setValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.disabledEndDate = this.disabledEndDate.bind(this);
  }
  
  componentDidMount(){
      this.handleSubmit();
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

    console.log(this.state)

    var data = _G.assign({},this.state);
    data.Register_On_S = ''+_G.timeFormat2( new Date(data.Register_On_S).getTime() , 'YYYY-MM-DD' );
    data.Register_On_E = ''+_G.timeFormat2( new Date(data.Register_On_E).getTime() , 'YYYY-MM-DD');
    this.props.changeTableState(data);


    // message.success('收到表单值~~~ ：' + JSON.stringify(this.state, function(k, v) {
    //   if (typeof v === 'undefined') {
    //     return '';
    //   }
    //   return v;
    // }));
  }

  // datepicker change
  onChange(field,value){
    if(field == 'Register_On_S' && this.state.Register_On_E){
      if(value.getTime() > this.state.Register_On_E.getTime()){
        this.setState({
          Register_On_E : value,
          Register_On_S : value
        })
        return;
      }
    }
    this.setState({
      [field] : value
    })
  }
  

  disabledEndDate(endValue){
    if (!endValue || !this.state.Register_On_S) {
      return false;
    }
    return endValue.getTime() <= this.state.Register_On_S.getTime();
  }

 
  render() {
    return (
    	<div className="fright">
      <Form inline onSubmit={this.handleSubmit}>
      <Row>
        <Col span="24" >
            <div className="fright">
            <ul className="clearfix">
            	<li className="fleft">
	            	<FormItem
		            label="产品名称："
		            id="Product_Name">
		              <Input placeholder="" style={{width:80}} id="Product_Name" name="Product_Name" onChange={this.setValue} value={this.state.Product_Name} />
		          </FormItem>
            	</li>
            	<li className="fleft">
	            	<FormItem
		            label="品牌："
		            id="Brand">
		              <Input placeholder="" style={{width:80}} id="Brand" name="Brand" onChange={this.setValue} value={this.state.Brand} />
		          </FormItem>
            	</li>
              <li className="fleft date-picker">
                <FormItem id="Register_On_S" label="入网日期：" labelCol={{span : 5}} >
                  	<Row span="24" >
                  	<Col span="10">
			            <DatePicker placeholder="开始日期" onChange={this.onChange.bind(this,'Register_On_S')} value={this.state.Register_On_S} />
			          </Col>
			          <Col span="1">
			            <p className="ant-form-split">-</p>
			          </Col>
			          <Col span="10">
			            <DatePicker disabledDate={this.disabledEndDate} placeholder="结束日期" value={this.state.Register_On_E} onChange={this.onChange.bind(this,'Register_On_E')} />
			          </Col>
			          </Row>
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
  var id = tar.getAttribute('data-id'),index=tar.getAttribute('data-index'),name=tar.getAttribute('data-name');
  modalState(id,index,name);
}

const columns = [{
  title: '产品名称',
  dataIndex: 'Product_Name',
  key: 'Product_Name',
}, {
  title: '产品简称',
  dataIndex: 'SName',
  key: 'SName'
}, {
  title: '单位',
  dataIndex: 'Preparation_Unit',
  key: 'Preparation_Unit'
}, {
  title: '商品码',
  dataIndex: 'Append_Code',
  key: 'Append_Code'
}, {
  title: '品牌',
  dataIndex: 'Brand',
  key: 'Brand'
},{
  title: '规格',
  dataIndex: 'Product_Spec',
  key: 'Product_Spec'
},{
  title: '有效期',
  dataIndex: 'Validity',
  key: 'Validity'
},{
  title: '入网日期',
  dataIndex: 'Register_Time',
  key: 'Register_Time'
}, {
  title: '操作',
  key: 'operation',
  render: function(text, record,index) {
  	var edit = '/base/product/edit/'+record.Product_Code,
  		del = '/base/product/del/' + record.Product_Code
    return <span><Link to={edit}>编辑</Link><span className="ant-divider"></span><a href="#" onClick={showModal} data-id={record.Product_Code} data-name={record.Product_Name} data-index={index} data-text="删除" >删除</a></span>;
	}
}];



class BaseProduct extends React.Component{
	constructor(){
		super();
    this.state = {
      visible : false,
      title : '',
      ModalText : '',
      changeId : false,
      index:false,
      total : 0,
      treedata : [],
      selectedKeys:[],
      addBtnStatus : false,
      data:[],
      level:{},
      opts : {
        page :1,
        pageSize : 10,
      },
    }
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.checkhandle = this.checkhandle.bind(this);
    this.changeTableState = this.changeTableState.bind(this);
    this.tableChange = this.tableChange.bind(this);
    this.showSizechange = this.showSizechange.bind(this);
    this.renderButton = this.renderButton.bind(this);
	}

  componentDidMount(){
    modalState = this.showModal;

    _G.ajax({
      url : baseGetIndustry,
      type : 'get',
      success : function(res){

        


        var that = this,level={};
        console.log(res.Data)
        function loop(d){
          d.map(function(item){
            console.log(item.Code)
            level[item.Code] = item.Industry_Level;
            if(item.Children){
              loop(item.Children)
            }
          })
        }
        loop(res.Data)
        

        console.log(level)
        this.setState({
          treedata : res.Data,
          level : level
        });

      }.bind(this)
    })
    
    
  }
  componentWillUnmount(){
    modalState = false;
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

  changeTableState(opts){
    var opts = opts || {};
    opts.page = opts.page || this.state.opts.page;
    opts.pageSize = opts.pageSize ||  this.state.opts.pageSize;

    this.setState({
      opts : opts
    })

    var that = this;

    _G.ajax({
      url : baseProductList,
      type: "get",
      data : opts,
      success:function(res){
        console.log(res.Data)
        var d = [];
        for(var i=0,l=res.Data.length;i<l;i++){
          d[i]=res.Data[i];
          d[i]['key'] = res.Data[i].Product_Code;
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
      ModalText: '你正要删除 "'+ name +'"的产品，是否继续？',
      confirmLoading: false,
      changeId : id,
      index:index
    })
  }

  handleOk(e){
    //******************* 冻结，解冻 逻辑 changeId , 然后 关闭****************************
    console.log(this.state.changeId,this.state.index)

    // 删除
    _G.ajax({
      url : baseProductDel,
      type : 'get',
      data :{
        Product_Code : this.state.changeId
      },
      success:function(res){

        var data = [].concat(this.state.data);
        data.splice(this.state.index,1);
        this.setState({
          data : data
        })

      }.bind(this)
    })

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
  handleClick(e){
    console.log(e);
  }

  // 点击树菜单
  checkhandle(info){
    var level=[],that=this,state=0,key;

    info.checkedKeys.map( function(item,index){
      level[index] = that.state.level[item];
      if(that.state.level[item] == 3){
        key = item;
      }
    } )
    console.log(level)
    level.map(function(item,index){
      if(item == 3){
        state++;
      }
    })
    if(state==1){
      this.setState({
        selectedKeys : info.checkedKeys,
        addBtnStatus : 1
      })
    }else{
      this.setState({
        selectedKeys : info.checkedKeys,
        addBtnStatus : 0
      })
    }
    //******************* ajax 请求，选中树节点的数据 **********************************
    
  }

  renderButton(){
    if(this.state.addBtnStatus){
      var url = '/base/product/add/'+this.state.selectedKeys[0];
      return (<Link to={url}>
              <Button type="primary" size="large"><Icon type="plus" /><span>新增</span></Button>
            </Link>)
    }
    return (<Button size="large"><Icon type="plus" /><span>新增</span></Button>)
  }

	render(){

    var that = this,level={};
    const loop = (data) => {
      return data.map( (item) => {
        level[item.Code] = item.Industry_Level;
        if(item.Children){
          return (<TreeNode title={item.Name} key={item.Code} level={item.Industry_Level}>{loop(item.Children)}</TreeNode>);
        }else{
          return (<TreeNode title={item.Name} key={item.Code} level={item.Industry_Level}></TreeNode>);
        }
      } )
    }
    const parseTree = (data) => loop(data);
    let treeNodes = parseTree(this.state.treedata);



		return(
			<div className="m-list">
				<Row>
					<Col span="5">
						{this.renderButton()}
                        <Link to='/base/product/exports'>
							<Button type="primary" size="large"><Icon type="download" /><span>导出报表</span></Button>
	          			</Link>
					</Col>
					
					<Col span="19">
						<SelectForm changeTableState={this.changeTableState} addBtnStatus={this.state.addBtnStatus} />
					</Col>
				</Row>
				<Row>
          <Col span="4">
            <div className="border border-raduis base-product">
              <div className="title">产品类别</div>
              <div className="con">
                <Tree multiple={false} checkable={true} onCheck={this.checkhandle}>
                        {treeNodes}
                    </Tree>
              </div>
            </div>
          </Col>
          <Col span="20">
					 <Table onChange={this.tableChange}  onShowSizeChange={this.showSizechange}
            columns={columns} dataSource={this.state.data} 
            pagination={{showQuickJumper:true,pageSize:10,current:1,showSizeChanger:true,total:this.state.total}}  />
          </Col>
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
	BaseProduct : BaseProduct
}