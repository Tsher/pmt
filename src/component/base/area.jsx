// 基础信息  销售区域管理
import React from 'react';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import {Link} from 'react-router';
import { createHistory } from 'history';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Modal from 'antd/lib/modal';
const FormItem = Form.Item;
import Tree from 'antd/lib/tree';
const TreeNode = Tree.TreeNode;


const confirm = Modal.confirm;

const history = createHistory();

import '../../entry/config';
const regionUrl = config.__URL + config.base.area.region;
const salesRegionUrl = config.__URL + config.base.area.salesRegion;
const salesRegionOneUrl = config.__URL + config.base.area.salesRegionOne;
const baseAreaDel = config.__URL + config.base.area.del;

var changeTableState;

var dataIndex = '';


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
	      showInfo : 'none' , // none 隐藏， block 显示   右侧详细信息
	    };

	    this.handleCancel = this.handleCancel.bind(this);
	    this.handleOk = this.handleOk.bind(this);
	    this.handleCancel = this.handleCancel.bind(this);
	}

  componentDidMount(){
  	_G.ajax({
	  url : regionUrl,
	  type: "get",
	  success:function(res){
	    var d = res.Data;
	    //_data[0].Children.push(d[0])
	    _data[0].Children = d;
	    //setData(d)
	    this.setState({
	      treedata : _data
	    });	    
	  }.bind(this)

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
  
  render(){
  	var adata = {
  		showInfo : 'none',
  		name : '',
  		no : '',
  		desc : '',
  		keys : [],
  	};
  	if (this.props.adata != undefined) {
  		adata = this.props.adata;
  	};
	const loop = (data) => {
      return data.map( (item) => {
        if(item.Children){
          return (<TreeNode disabled title={item.Name} key={item.Code}>{loop(item.Children)}</TreeNode>);
        }else{
          return (<TreeNode disabled title={item.Name} key={item.Code}></TreeNode>);
        }
      } )
    }
    const parseTree = (data) => loop(data);
    let treeNodes = parseTree(this.state.treedata);
	return(
			<div>
				<Col span="8" style={{ display : adata.showInfo }} >
						<div className="border border-raduis">
							<div className="title"> {adata.name} </div>
							<div className="con">
								<Form inline >
									<FormItem id="no" label="区域编号: " labelCol={{span:8}} wrapperCol={{span: 14,offset:1}}>
										<Input disabled name="no" value={adata.no}  />
									</FormItem>
									
									<FormItem id="desc" label="区域描述: " labelCol={{span:8}} wrapperCol={{span: 14,offset:1}}>
										<Input style={{width:'170px',height:'100px'}} disabled name="desc" type="textarea"  value={adata.desc}  />
									</FormItem>
								</Form>
							</div>
						</div>
					</Col>
					<Col span="8"  style={{ display : adata.showInfo }} >
						<div className="border border-raduis">
							<div className="title">区域树</div>
							<div className="con">
								<Tree checkable defaultExpandAll checkedKeys={adata.keys}>
					          		{treeNodes}
					        	</Tree>
							</div>
						</div>
					</Col>
			</div>
		)
	}
}


class BaseArea extends React.Component{
	constructor(){
		super();
		var json = {}
		/*json.ModalText = '';
		json.visible=false;
		json.title ='';
		json.changeId=false;
       for(var i=0;i<navData.length;i++){
          json[navData[i].no] = '';
       }*/
	    this.state = {
	    	Data : [],
	    };
	    this.showModal = this.showModal.bind(this);
	    this.handleOk = this.handleOk.bind(this);
	    this.handleCancel = this.handleCancel.bind(this);
	    this.handleClick  = this.handleClick.bind(this);
	}

	componentDidMount(){
		_G.ajax({
		  url : salesRegionUrl,
		  type: "get",
		  success:function(res){
		    var d = res.Data;
		    this.setState({
		      Data : d
		    });
		    
		  }.bind(this)

		})
	}
  	

	handleClick(e){
		var tar = e.target;
		if(tar.nodeName == 'A') return;
		var n;
        for(var i=0;i<this.state.Data.length;i++){
        	var s = this.state.Data[i];
            this.setState({
              [s.SalesRegion_Code] : ''
            })
        }
        

        _G.ajax({
		  url : salesRegionOneUrl,
		  type: "get",
		  data : {SalesRegion_Code:tar.id},
		  success:function(res){
		    var d = res.Data;
		    var data={
		    	keys : []
		    };
		    data.keys = d.RegionNos.split(',');
		    data.name = d.SalesRegion_Name;
		    data.no = d.SalesRegion_Code;
		    data.desc = d.Region_Description;

		    this.setState({
	          [tar.id] : 'on',
	          data : data
	        })
		    
		  }.bind(this)

		})

        
	}

	handleOk(e){
	    //******************* 冻结，解冻 逻辑 changeId , 然后 关闭****************************
	    this.setState({
	      confirmLoading:true
	    })
	    console.log(this.state.changeId)
	    var code = this.state.changeId;

	    _G.ajax({
	      url : baseAreaDel,
	      method : 'get',
	      data : {SalesRegion_Code:code},
	      success:function(res){
	        if(res.ReturnOperateStatus == 'True'){
	          this.setState({
	            visible : false
	          })
	          console.log('删除成功');
	          var d = [].concat(this.state.Data);
	          d.splice(d[this.state.index],1);
	          console.log(this.state.index)
	          var ad = this.state.data;
	          ad.showInfo = 'none';
	          this.setState({
	            Data : d,
	            loading : false,
	            data:ad,
	          })
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

	showModal(e){
		Event.stop(e);
	    var tar = Event.target(e);
	    var id = tar.getAttribute('data-id');
	    this.setState({
	    	visible : true,
	    	ModalText: '你正要删除 "'+ id +'"的区域，是否继续？',
	    	confirmLoading: false,
	    	changeId : id
	    })
	}

    render(){
	
	return(
			<div className="m-list">
				<Row>
					<Col span="4">
				        <Link to='/base/area/add'>
							<Button type="primary" size="large"><Icon type="plus" /><span>新增销售区域</span></Button>
				        </Link>
					</Col>
				</Row>
				<Row>
					<Col span="8">
						<div className="border border-raduis">
							<div className="title">区域列表</div>
							<div className="con">
								<div className="navList">
				                     <ul>
				                     {
				                        this.state.Data.map(function(d){
				                          var code = d.SalesRegion_Code;
				                          var edio = '/base/area/edit/'+code;
				                           return <li key={code} id={code} name={code} className={this.state[code]} onClick={this.handleClick}>
				                                 {d.SalesRegion_Name}
				                                 <em className="btn">
				                                 <Link to={edio}>修改</Link>
				                                 <i>|</i>
				                                 <a href="javascript:;" onClick={this.showModal} data-id={code} >删除</a></em>
				                           </li>
				                        }.bind(this))
				                     }
				                     </ul>
				                </div>
							</div>
						</div>
					</Col>
					<RightBox adata={this.state.data} />
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
	BaseArea : BaseArea
}