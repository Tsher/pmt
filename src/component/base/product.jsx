// 基础信息  产品信息管理
import React from 'react';

class BaseProduct extends React.Component{
	constructor(){
		super();
	}
	render(){
		return(
			<h1>产品信息管理</h1>
		)
	}
}
module.exports = {
	BaseProduct : BaseProduct
}