// 删除按钮

import React from 'react';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import {Link} from 'react-router';
import { createHistory } from 'history';
import Input from 'antd/lib/input';
import message from 'antd/lib/message';



const history = createHistory();


const msg_error = function(text){
  message.error(text||'数据错误,请检查后重新提交')
}
const msg_success = function(text){
  message.success(text||'数据提交成功，等待后台处理')
}


import '../entry/config';

class Del extends React.Component{ 
	constructor(){
		super();
    this.state = {
      hasRole : true,
      excel : false
    };


	}

  componentDidMount(){
    var that = this;
    setTimeout(function(){
      var hasRole = _G.hasRole(that.props.Name,4);
      that.setState({
        hasRole : hasRole
      })
    },500)
    
  }

  componentWillUnmount(){
    
  }
  
  render(){
    if(this.state.hasRole){
      if(this.props.type == 'vip'){
        return <a href="#" onClick={this.props.click} data-name={this.props._name}  data-id={this.props.id} data-state={this.props.state} >{this.props.value}</a>
      }
      if(this.props.do){
        return (<a href="#" onClick={this.props.click} data-id={this.props.id} data-index={this.props.index} data-rstatus={this.props.status}>{this.props.value}</a>)
      }
      return (<a href="#" onClick={this.props.click || function(){}} data-index={this.props.index || 0} data-name={this.props._name || ''} data-id={this.props.id || ''  } >删除</a>)
    }
	return(<span></span>)
	}
}
module.exports = {
	Del : Del
}