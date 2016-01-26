// 基础信息  企业信息管理
import React from 'react';

import '../../entry/config';
const baseInfoList = config.__URL + config.base.info.list;

var SetHtml = React.createClass({
	index : 0,
	iNow : 0,
    getInitialState:function(){        
        return {
            Entity_Name:'',
            Entity_Category:'',

        }
    },
    componentDidMount:function(){
        _G.ajax({
          url : baseInfoList,
          type: "get",
          success:function(res){
            var d;
            d = res.Data;
            
            this.setState(d)

          }.bind(this)

        })
    },
	render:function(){
		return <div>
            <div className="exports">
               <h2>企业基本信息</h2>
               <p><strong>企业名称</strong>{this.state.Entity_Name}</p>
               <p><strong>企业性质</strong>{this.state.Entity_Category}</p>
               <p><strong>行政区划</strong>{this.state.Entity_Region}</p>
               <p><strong>注册地址</strong>{this.state.Entity_Address}</p>
               <p><strong>邮寄地址</strong>{this.state.Entity_PostAddress}</p>
               <p><strong>邮政编码</strong>{this.state.Entity_PostCode}</p>
               <p><strong>注册时间</strong>{_G.timeFormat2(this.state.Entity_RegisterOn,'YYYY-MM-DD')}</p>
            </div>
            <div className="exports">
               <h2>企业联系信息</h2>
               <p><strong>指定联系人</strong>{this.state.Entity_Contacts}</p>
               <p><strong>手机</strong>{this.state.Phone}</p>
               <p><strong>固定电话</strong>{this.state.Fixed_Telephone}</p>
               <p><strong>传真</strong>{this.state.Fax}</p>
               <p><strong>电子邮箱</strong>{this.state.Entity_Email}</p>
            </div>
		    
		</div>
	}
})


class BaseInfo extends React.Component{
	constructor(){
		super();
	}
	render(){
		return(
			<div className="m-list">
			    <SetHtml />
			</div>
		)
	}
}
module.exports = {
	BaseInfo : BaseInfo
}