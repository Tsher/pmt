
import React from 'react';
import Tree from 'antd/lib/tree';
import message from 'antd/lib/message';
const TreeNode = Tree.TreeNode;




var _data = [
  {
    title : 'dom1111',
    key : 'key1',
    children:[
      {
        title : 'dom1-1',
        key : 'key1-1'
      },
      {
        title : 'dom1-2',
        key : 'key1-2'
      }
    ]
  },
  {
    title : 'dom2',
    key : 'key2',
    children:[
      {
        title : 'dom2-1',
        key : 'key2-1'
      },
      {
        title : 'dom2-2',
        key : 'key2-2'
      }
    ]
  }
];


const msg = function(){
  message('')
}


class TreeView  extends React.Component{
  
  handler(e){
    e.preventDeafult();
  }
  constructor(){
    super();
    this.state = {
      treedata : [],
      checkedKeys : [],
      selectedKeys : []
    }
    this.checkhandle = this.checkhandle.bind(this);
  }
  componentWillMount(){
    
    this.setState({
      treedata : _data,
      selectedKeys:['key1']
    });
    // var script = document.createElement('script');
    // script.src = '/api/test';
    // document.getElementsByTagName('head')[0].appendChild(script);
    
  }
  change(d){
    this.setState({
      treedata : d
    })
  }
  componentWillUnmount(){
    
  }
  addChild(e){
    
    return false;
  }
  checkhandle(info){
    this.setState({
      selectedKeys : [info.node.props.eventKey],
      checkedKeys : [info.node.props.eventKey]
    })
    console.log(this.state.checkedKeys)
  }
  rightClickhandler(info){
  	alert(info.event.pageX)
    console.log(info.event.pageX,info.event.pageY,info.node.props.eventKey)
  }
  render(){
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
    return   (
    	<div>
        	<Tree multiple={false} checkedKeys={this.state.checkedKeys} checkable={true} onCheck={this.checkhandle} onRightClick={this.rightClickhandler}>
          	{treeNodes}
        	</Tree>
      	</div>
      	)
  }
}


module.exports = {
	TreeView :TreeView
}