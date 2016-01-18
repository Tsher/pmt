// 基础信息  企业信息管理
import React from 'react';

var data = [
    {
    	"title" : "企业基本信息",
    	"info" : [
    	    {
    	    	"tit":"企业名称","name":"河南杜康创新酒业有限公司"
    	    },
    	    {
    	    	"tit":"企业类型","name":"生产企业"
    	    },
    	    {
    	    	"tit":"行政区划","name":"河南省洛阳市"
    	    },
    	    {
    	    	"tit":"注册地址","name":"河南杜康创新酒业有限公司"
    	    },
    	    {
    	    	"tit":"邮寄地址","name":"河南杜康创新酒业有限公司"
    	    },
    	    {
    	    	"tit":"邮政编码","name":"河南杜康创新酒业有限公司"
    	    },
    	    {
    	    	"tit":"注册时间","name":"河南杜康创新酒业有限公司"
    	    }
    	]
    },
    {
    	"title" : "企业联系信息",
    	"info" : [
    	    {
    	    	"tit":"指定联系人","name":"河南杜康"
    	    },
    	    {
    	    	"tit":"手机","name":"138888888"
    	    },
    	    {
    	    	"tit":"固定电话","name":"010-8888888"
    	    },
    	    {
    	    	"tit":"传真","name":"010-8888888"
    	    },
    	    {
    	    	"tit":"电子邮箱","name":"888888@126.com"
    	    }
    	]
    }
]

var SetHtml = React.createClass({
	index : 0,
	iNow : 0,
	render:function(){
		return <div>
		    {
		    	data.map(function (n) {
		    		this.index++;
			    	return <div key={this.index} className="exports">
			    	   <h2>{n.title}</h2>
			    	   {
			    	   	n.info.map(function(name){
			    	   		this.iNow++;
			    	   	   return <p key={this.iNow}><strong>{name.tit}</strong>{name.name}</p>
			    	    }.bind(this))
			    	   }
			    	</div>
			    }.bind(this))
		    }
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