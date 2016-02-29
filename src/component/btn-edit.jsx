// 编辑按钮

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

class Edit extends React.Component{ 
	constructor(){
		super();
    this.state = {
      hasRole : true,
      excel : false
    };


	}

  componentDidMount(){
    setTimeout(function(){
      var hasRole = _G.hasRole(this.props.Name,3);
      this.setState({
        hasRole : hasRole
      })
    }.bind(this),500)
    
  }

  componentWillUnmount(){
    
  }
  
  render(){
    if(this.state.hasRole){
      return (<span><Link to={this.props.editLink}>{this.props.value}</Link></span>)
    }
	return(<span></span>)
	}
}
module.exports = {
	Edit : Edit
}