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

var dataIndex = '';

var navData = [
   {
     "name":"北京区",
     "no" : "n00001",
     "desc" : "真是个好地方真是个好地方真是个好地方真是个好地方真是个好地方真是个好地方真是个好地方真是个好地方真是个好地方",
     "keys" : ['key1','key1-1','key1-2']
   },
   {
     "name":"天津区",
     "no" : "n00002",
     "desc" : "真是个好地方",
     "keys" : ['key2','key2-1','key2-2']
   },
   {
     "name":"华北区",
     "no" : "n00003",
     "desc" : "真是个好地方",
     "keys" : ['key1','key1-1','key1-2','key2','key2-1','key2-2']
   },
   {
     "name":"华南区",
     "no" : "n00004",
     "desc" : "真是个好地方",
     "keys" : ['key3','key3-1','key3-2','key3-3','key3-4','key3-5','key3-6']
   },
   {
     "name":"西北区",
     "no" : "n00005",
     "desc" : "真是个好地方",
     "keys" : ['key4','key4-1','key4-2','key4-3','key4-3-1','key4-3-2']
   }
]


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
    this.setState({
      treedata : _data
    });

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
        if(item.children){
          return (<TreeNode disabled title={item.title} key={item.key}>{loop(item.children)}</TreeNode>);
        }else{
          return (<TreeNode disabled title={item.title} key={item.key}></TreeNode>);
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
		json.ModalText = '';
		json.visible=false;
		json.title ='';
		json.changeId=false;
       for(var i=0;i<navData.length;i++){
          json[navData[i].no] = '';
       }
	    this.state = json;
	    this.showModal = this.showModal.bind(this);
	    this.handleOk = this.handleOk.bind(this);
	    this.handleCancel = this.handleCancel.bind(this);
	}

	handleClick(e){
		var n;
		
        for(var i=0;i<navData.length;i++){
            this.setState({
              [navData[i].no] : ''
            })
        }
        for(var i=0;i<navData.length;i++){
           if (navData[i].no == e) {
              n = i;
           };
        }
        var data = {
			showInfo : 'block',
			name : navData[n].name,
	  		no : navData[n].no,
	  		desc : navData[n].desc,
	  		keys : navData[n].keys,
		}
        this.setState({
          [e] : 'on',
          data : data
        })
	}

	handleOk(e){
	    //******************* 冻结，解冻 逻辑 changeId , 然后 关闭****************************
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
				                        navData.map(function(d){
				                          var no = d.no;
				                          var edio = '/base/area/edit/'+no;
				                           return <li key={no} name={d.no} className={this.state[no]} onClick={this.handleClick.bind(this,no)}>
				                                 {d.name}
				                                 <em className="btn">
				                                 <Link to={edio}>修改</Link>
				                                 <i>|</i>
				                                 <a href="javascript:;" onClick={this.showModal} data-id={no} >删除</a></em>
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