import moment from 'moment';
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
	timeFormat : function(t,f){
		if(!t){
			return ''
		}
		var f = f || 'YYYY-MM-DD hh:mm:ss';
		var t = typeof t == 'number'? t : t.replace(/\D/g,'')*1;
		t = new Date(t).getTime();
		t = moment(t).format('YYYY-MM-DD HH:MM:SS');
		return t;
	},
	// ajax
	ajax:function(opts){
		opts.url += /\?\&/.test(opts.url) ? ('&Token='+_G.Token) : ('?Token='+_G.Token);
		$.ajax({
			url : opts.url,
			type : opts.type || 'post',
			data : opts.data || {},
			success : function(res){
				if(res.ReturnOperateStatus == null){
					alert('数据异常，请联系管理员');
					return;
				}
				if(res.ReturnOperateStatus == false){
					alert('操作失败，请重新试试');
					return;
				}
				opts.success(res);
			},
			error:function(res){
				if(res.ReturnOperateStatus == null){
					alert('数据异常，请联系管理员');
					return;
				}
				if(res.ReturnOperateStatus == false){
					alert('操作失败，请重新试试');
					return;
				}
				opts.error && opts.error();
			}
		})
		$.ajax(opts);
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
			del : '/api/SPromotionActivity/DeleteMarketingActivitie', // 删除活动
			publish : '/api/SPromotionActivity/PublishMarketingActivitie', // 发布活动
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
		}
	}
}



function get_data(url,name,params){
	_G.ajax({
		url : config.__URL+url,
		data : params || {},
		type : 'get',
		success:function(res){
			console.log(name,res.Data)
			_G[name] = res.Data;
			if(params && params.callback){
				params.callback(res)
			}
		}
	})
}
get_data(config['sale']['do']['sale_prizeLevel'],'sale_prizeLevel'); // 获取奖品级别
get_data(config['sale']['do']['sale_prizeName'],'sale_prizeName',{

}); // 获取奖品名称
get_data(config['sale']['do']['sale_productName'],'sale_productName'); // 获取产品名称
get_data(config['sale']['do']['sale_area'],'sale_area'); // 获取产品名称

// 获取所有角色信息
get_data(config['user']['role']['all'],'user_role_all');






