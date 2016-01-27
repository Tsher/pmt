import moment from 'moment';

import message from 'antd/lib/message';
const msg_error = function(text){
  message.error(text||'数据验证错误,请检查后提交')
}
const msg_success = function(){
  message.success('数据提交成功，等待后台处理')
}

// 全局方法
window['_G']={
	Token : '',
	// 用户性别
	userSex : function(n){
		return n==1?'男':'女'
	},
	// 用户状态
	userStatus:function(n){
		var status = '全部';
		if(n==0){
			status = '在职'
		}
		if(n==1){
			status = '离职'
		}
		return status
	},
	// 活动 奖品级别
	sale_prizeLevel:[],
	// 活动 奖品名称
	sale_prizeName:[],
	// 活动 产品名称
	sale_productName:[],
	// 活动  销售区域
	sale_area : [],
	// 所有角色信息
	user_role_all : [],
	timeFormat2:function(t,f){
		if(!t){
			return ''
		}
		var f = f || 'YYYY-MM-DD HH:mm:ss';
		var t = typeof t == 'number'? t : t.replace(/\D/g,'')*1;
		t = new Date(t);
		t = moment(t).format(f);
		return t;
	},
	// 
	timeFormat : function(t,f){
		if(!t){
			return ''
		}
		var f = f || 'YYYY-MM-DD HH:mm:ss';
		//var t = typeof t == 'number'? t : t.replace(/\D/g,'')*1;
		t = new Date(t);
		//t = moment(t).format(f);
		var y = t.getFullYear(),
			m = t.getMonth()*1+1,
			d = t.getDate(),
			h = t.getHours(),
			mm = t.getMinutes(),
			s = t.getSeconds();
		m = m < 10 ? '0'+m : m;
		d = d < 10 ? '0'+d : d;
		h = h < 10 ? '0'+h : h;
		mm = mm < 10 ? '0'+mm : mm;
		s = s < 10 ? '0'+s : s;
		return y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s;
	},
	// ajax
	ajax:function(opts){
		if( opts.url.indexOf('/SLogin/') < 0 ){
			opts.url += /\?/.test(opts.url) ? ('&Token='+_G.Token) : ('?Token='+_G.Token);
		}
		var opt = opts;

		$.ajax({
			url : opts.url,
			type : opts.type || opts.method || 'post',
			data : opts.data || {},
			success : function(res){
				if( !res.Data && res.ReturnOperateStatus == null){
					msg_error('数据异常，请联系管理员',opts.url,opts.data);
					return;
				}
				if(!res.Data && res.ReturnOperateStatus == false){
					msg_error('操作失败，请重新试试',opts.url,opts.data);
					return;
				}
				opts.success(res);
			},
			error:function(res){
				if(res.ReturnOperateStatus == null){
					msg_error('数据异常，请联系管理员',opts.url);
					return;
				}
				if(res.ReturnOperateStatus == false){
					msg_error('操作失败，请重新试试',opts.url);
					return;
				}
				opts.error && opts.error();
			}
		})
	},
	get_data : get_data,
}


// api 配置表
window['config'] = {
	__URL : 'http://101.200.221.152/PMTService', // API全局url
	// 用户管理
	user:{
		// 企业用户
		user:{
			list : '/api/SUser/GetUsers',
			add : '/api/SUser/PostUser',
			edit : '/api/SUser/PostUpUser',
			info : '/api/SUser/GetUser',
			del : '/api/SUser/DeleteUser',
			role : '/api/SUser/GetUserRole', //获取用户角色信息
		},
		// 角色管理
		role : {
			list : '/api/SRole/GetRoles',
			del : '/api/SRole/DeleteRole',
			all : '/api/SRole/GetAllRoles', // 获取所有角色信息
			type : '/api/SRole/GetRole_Type', // 获取 角色类型
		},
		// 组织机构管理
		group : {
			list : '/api/SOrganization/GetOrganizations',
		}
	},
	// 基础管理
	base : {
		// 产品管理
		product:{
			list : '/api/'
		},
		info : {
			list : '/api/SEnterprise/GetEnterprise'
		},
		area : {
			region:'/api/SSaleRegion/GetRegions',
			salesRegion : '/api/SSaleRegion/GetSaleRegion',
			salesRegionOne:'/api/SSaleRegion/GetSaleRegion_SalesRegion_Code',
			add:'/api/SSaleRegion/PostSalesRegion',
			edit : '/api/SSaleRegion/UpdateSalesRegion',
			del:'/api/SSaleRegion/DeleteSSaleRegion'
		}
	},
	// 促销设置
	sale : {
		'do':{
			list : '/api/SPromotionActivity/GetMarketingActivities', // 获取指定页的活动
			sale_prizeLevel : '/api/SPromotionActivity/GetAwards', // 获取奖品级别
			sale_prizeName : '/api/SPrizeMana/GetPrizeCatalog', // 获取奖品名称
			sale_productName : '/api/SProduct/GetProductByName', // 获取产品名称
			sale_area : '/api/SSaleRegion/GetSaleRegionList', // 获取销售区域
			add : '/api/SPromotionActivity/AddMarketingActivitie', // 新增活动
			edit : '/api/SPromotionActivity/UpdateMarketingActivitie', // 修改活动
			one : '/api/SPromotionActivity/GetMarketingActivitie', // 获取指定活动信息
			del : '/api/SPromotionActivity/DeleteMarketingActivitie', // 删除活动
			publish : '/api/SPromotionActivity/PublishMarketingActivitie', // 发布活动
		},
		'vip':{
			list : '/api/SMember/GetMemberBy',	//获取会员列表
			info : '/api/SMember/GetMember',	//获取会员信息
			freeze:'/api/SMember/PutMember',	//冻结解冻会员
			resetPwd:'/api/SMember/ResetPwd'	//重置会员密码

		},
		'user':{
			list : '/api/SSalesPersonMana/GetSalesPersonBy',	//获取促销人员列表
			info : '/api/SSalesPersonMana/GetSalesPerson',		//获取促销人员信息
			province : '/api/SSalesPersonMana/GetProvince',		//获取省份信息
			city : '/api/SSalesPersonMana/GetCity',				//获取城市信息
			add : '/api/SSalesPersonMana/PostSalesPerson',		//添加促销人员
			edit : '/api/SSalesPersonMana/PutSalesPerson',		//修改促销人员
			del : '/api/SSalesPersonMana/DeleteSalesPerson',	// 删除促销人员
			resetPwd:'/api/SSalesPersonMana/ResetPwd'			//重置会员密码
		},
		'prize':{
			list : '/api/SPrizeMana/GetPrizeBy',		//获取奖品列表
			info : '/api/SPrizeMana/GetPrize',			//获取奖品信息
			kinds : '/api/SPrizeMana/GetPrizeCatalog', 	//获取种类
			add : '/api/SPrizeMana /PostPrize', 		//添加奖品
			upload : '/api/SPrizeMana/UpProImage', 		//上传图片
			edit : '/api/SPrizeMana /PutPrize', 		//修改奖品
			del : '/api/SPrizeMana /DeletePrize'		// 删除奖品
		}
	},
	// 促销数据
	saledata : {
		round : {
			list : '/api/SReport/GetCustomerDraw_Report', // 消费者抽奖流水
		},
		send : {
			list : '/api/SSendTextMsgs/SendText', // 发送短信流水
		},
		push : {
			list : '/api/SRecharge/Recharge', // 话费充值流水
		},
		user : {
			list : '/api/SReport/GetCusmorJoin_Report', // 消费者参与流水
		},
		prize : {
			list : '/api/SReport/GetAwardExchange_Report', // 奖品兑换流水
		}
	},
	// 营销规则
	rule : {
		number : {
			list : '/api/SIntegralRule/GetIntegralRules', // 积分规则
			add : '/api/SIntegralRule/AddRule',  // 增加积分规则
			edit : '/api/SIntegralRule/UpdateRule',   // 编辑积分规则
			editList : '/api/SIntegralRule/GetRule',   // 获取指定积分规则
		},
		area : {
			list : '/api/SBatchRegion/GetBatchRegion',//获取指定页的批次区域
			search : '/api/SBatchRegion/GetBatchRegionList',//按条件查询批次区域
			add:'/api/SBatchRegion/PostBatchRegion',//添加批次区域
			edit:'/api/SBatchRegion/PutBatchRegion',//更新批次区域
			del:'/api/SBatchRegion/PutBatchRegion',//删除批次区域
			excel:'/api/SBatchRegion/ BatchRegionToExcel',//导出批次区域到EXCEL
		}
	},
	// 登录，修改密码
	login : '/api/SLogin/LoginIn', // 登录
	valCode : '/api/SLogin/GetValidateCode', // 验证码
	checkValCode : '/api/SLogin/CheckVailidateCode', // 校验验证码
	updatePWD : '/api/SLogin/UpdateUserPwd', // 修改密码
}



function get_data(url,name,params,cb){
	if(!_G.Token) return;
	_G.ajax({
		url : config.__URL+url,
		data : params || {},
		type : 'get',
		success:function(res){
			console.log(name,res.Data)
			_G[name] = res.Data;
			cb&&cb(res);
		}
	})
}
// 获取奖品级别
get_data(config['sale']['do']['sale_prizeLevel'],'sale_prizeLevel'); 

// 获取奖品名称
get_data(config['sale']['do']['sale_prizeName'],'sale_prizeName',{
	Prize_Name : ''
}); 

// 获取产品名称
get_data(config['sale']['do']['sale_productName'],'sale_productName',{
	Product_Name : ''
}); 

// 获取销售区域
get_data(config['sale']['do']['sale_area'],'sale_area',{
	SalesRegion_Name : ''
}); 

// 获取所有角色信息
get_data(config['user']['role']['all'],'user_role_all');






