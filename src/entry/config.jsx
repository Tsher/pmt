import moment from 'moment';
import { createHistory } from 'history';
import message from 'antd/lib/message';
const msg_error = function(text){
  message.error(text||'数据验证错误,请检查后提交')
}
const msg_success = function(){
  message.success('数据提交成功，等待后台处理')
}
const history = createHistory();

// 全局方法
window['_G']={
	Token : '',
  UserRole : [],
  UserRoleHash : false,
  hasRole : function(name,fun){
    if(!name || !fun) return false;
    
    return _G.UserRoleHash[name] ? (_G.UserRoleHash[name].indexOf(fun) > -1 ? true : false) : false;
  },
	assign : function (target) { 
		for (var i = 1; i < arguments.length; i++) { 
			var source = arguments[i]; 
			for (var key in source) { 
				if (Object.prototype.hasOwnProperty.call(source, key)) { 
					target[key] = source[key]; 
				} 
			} 
		} 
		return target; 
	},
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
		if(f == 'YYYY-MM-DD'){
			return y + '-' + m + '-' + d 
		}
		return y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s;
	},
	// ajax
	ajax:function(opts){
		console.log(opts.url);
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
					msg_error('数据异常，请联系管理员！',opts.url,opts.data);
					return;
				}
				if(res.ReturnOperateStatus == 'False'){
					msg_error(res.Msg||'操作失败，请重新试试',opts.url,opts.data);
					return;
				}
				opts.success(res);
			},
			error:function(res){
				msg_error('数据异常，请联系管理员',opts.url);
				// if(res.ReturnOperateStatus == null){
				// 	msg_error('数据异常，请联系管理员',opts.url);
				// 	return;
				// }
				// if(res.ReturnOperateStatus == 'False'){
				// 	msg_error('操作失败，请重新试试',opts.url);
				// 	return;
				// }
				opts.error && opts.error();
			}
		})
	},
	getExcel:function(opts){
		var url = opts.url;
		var data = this.assign({},opts.data);
		var callback = opts.callback;
		var type = opts.type || 'get';
		var str = '';
		this.ajax({
			url:url,
			type:type,
			data : data,
			success : function(res){
				callback(res)
			}

		})
	},
	get_data : get_data,
}


// api 配置表
window['config'] = {
	__URL : (function(){
		var url = 'http://'+ location.hostname + location.pathname;
		url = url.replace(/\/{1,}$/,'');
		url += '/PMTS';
		if(location.port){
			url = 'http://101.200.221.152/PMT/PMTS';
		}
		return url
	})(), // API全局url

	// 菜单
	menu : '/api/BaseAPI/GetMenu',
	// 用户管理
	user:{
		// 企业用户
		user:{
			list : '/api/SUser/GetUsers',
			add : '/api/SUser/PostUser',
			edit : '/api/SUser/PostUpUser',
			info : '/api/SUser/GetUser',
			del : '/api/SUser/DeleteUser',
			role : '/api/SUser/GetUserRole', // 获取用户角色信息
			nation : '/api/SUser/GetNation', // 民族
			status : '/api/SUser/GetUserStatus', // 状态
			part : '/api/SUser/GetOrganization', // 部门
			all : '/api/SRole/GetAllRoles', // 所有角色信息
			save : '/api/SUser/SaveUserRole', // 保存角色设置
			excel : '/api/SUser/ExportExcelUser',//导出excel
		},
		// 角色管理
		role : {
			list : '/api/SRole/GetRoles',
			del : '/api/SRole/DeleteRole',
			all : '/api/SRole/GetAllRoles', // 获取所有角色信息
			type : '/api/SRole/GetRole_Type', // 获取 角色类型
			get : '/api/SRole/GetRole', // 获取单个角色信息
			update : '/api/SRole/PutRole', // 修改角色信息
			add : '/api/SRole/PostRole', // 新增角色信息
			saveRole : '/api/SRole/PostSetRole', // 保存角色权限

			getRole : '/api/SRole/GetSetRole', // 获取角色权限
			excel : '/api/SRole/ExportExcelRole',//导出excel
		},
		// 组织机构管理
		group : {
			list : '/api/SOrganization/GetOrganizations',//获取所有组织结构信息
			info : '/api/SOrganization/GetOrganization',//获取指定组织结构信息
			del : '/api/SOrganization/DeleteOrganization',//删除组织结构
			types : '/api/SOrganization/GetOrganizationTypes',//获取部门属性列表
			add : '/api/SOrganization/AddOrganization',//新增组织结构
			edit : '/api/SOrganization/UpdateOrganization',//修改组织结构
		}
	},
	// 基础管理
	base : {
		// 产品管理
		product:{
			list : '/api/SProduct/GetProduct', 
			GetIndustry : '/api/SProduct/GetIndustry', // 获取行业
			one : '/api/SProduct/GetProduct',
			dic : '/api/SProduct/GetProductDic', // 有效期类型
			unit : '/api/SProduct/GetProductUnit', // 计量单位
			upload : '/api/SProduct/UpProImage', // 上传图片
			update : '/api/SProduct/PutProduct', // 修改
			add : '/api/SProduct/PostProduct', // 新增提交
			edit : '/api/SProduct/PutProduct', // 修改提交
			del : '/api/SProduct/DeleteProduct', // 删除
			excel : '/api/SProduct/ProductToExcel',//导出excel
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
			del:'/api/SSaleRegion/DeleteSSaleRegion',
			regionOne : '/api/SSaleRegion/GetRegions_SalesRegionCode_ParentCode',
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
			excel : '/api/SPromotionActivity/ExportExcelActivity',//导出excel
		},
		'vip':{
			list : '/api/SMember/GetMemberBy',	//获取会员列表
			info : '/api/SMember/GetMember',	//获取会员信息
			freeze:'/api/SMember/PutMember',	//冻结解冻会员
			resetPwd:'/api/SMember/ResetPwd',	//重置会员密码
			excel : '/api/SMember/MemberExcel',//导出excel

		},
		'user':{
			list : '/api/SSalesPersonMana/GetSalesPersonBy',	//获取促销人员列表
			info : '/api/SSalesPersonMana/GetSalesPerson',		//获取促销人员信息
			province : '/api/SSalesPersonMana/GetProvince',		//获取省份信息
			city : '/api/SSalesPersonMana/GetCity',				//获取城市信息
			area : '/api/SSalesPersonMana/GetArea',				//获取地区
			add : '/api/SSalesPersonMana/PostSalesPerson',		//添加促销人员
			edit : '/api/SSalesPersonMana/PutSalesPerson',		//修改促销人员
			del : '/api/SSalesPersonMana/DeleteSalesPerson',	// 删除促销人员
			resetPwd:'/api/SSalesPersonMana/ResetPwd',			//重置会员密码
			excel : '/api/SSalesPersonMana/SalesPersonExcel',//导出excel
		},
		'prize':{
			list : '/api/SPrizeMana/GetPrizeBy',		//获取奖品列表
			info : '/api/SPrizeMana/GetPrize',			//获取奖品信息
			kinds : '/api/SPrizeMana/GetPrizetype', 	//获取种类
			add : '/api/SPrizeMana/PostPrize', 		//添加奖品
			upload : '/api/SPrizeMana/UpProImage', 		//上传图片
			edit : '/api/SPrizeMana/PutPrize', 		//修改奖品
			del : '/api/SPrizeMana/DeletePrize',		// 删除奖品
			excel : '/api/SPrizeMana/PrizeExcel',//导出excel
		}
	},
	// 促销数据
	saledata : {
		round : {
			list : '/api/SReport/GetCustomerDraw_Report', // 消费者抽奖流水
			info : '/api/SReport/GetAwardList',//点击数量二级页面
			excel : '/api/SReport/ExportExcel_CustomerDraw_Report',//导出excel
		},
		send : {
			list : '/api/SSendTextMsgs/SendText', // 发送短信流水
			info : '/api/SSendTextMsgs/GetTextDetails',//点击数量二级页面
			excel : '/api/SSendTextMsgs/TextMessagesExcel',//导出excel
		},
		push : {
			list : '/api/SRecharge/Recharge', // 话费充值流水
			info : '/api/SRecharge/GetRechargeDetails',//点击数量二级页面
			excel : '/api/SRecharge/RechargeToExcel',//导出excel
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
			type : '/api/SIntegralRule/GetIntegralRuleTypes',//获取类型
			del : '/api/SIntegralRule/DeleteRule', // 删除
			excel : '/api/SIntegralRule/ExportExcelRule',//导出excel
		},
		area : {
			list : '/api/SBatchRegion/GetBatchRegion',//获取指定页的批次区域
			search : '/api/SBatchRegion/GetBatchRegionList',//按条件查询批次区域
			add :'/api/SBatchRegion/PostBatchRegion',//添加批次区域
			edit:'/api/SBatchRegion/PutBatchRegion',//更新批次区域
			del :'/api/SBatchRegion/DeleteBatchRegion',//删除批次区域
			excel:'/api/SBatchRegion/BatchRegionToExcel',//导出批次区域到EXCEL
			seles : '/api/SBatchRegion/GetSalesRegion',//销售区域下拉菜单
			listOne : '/api/SBatchRegion/GetBatchRegionByCode',//获取单条数据
		}
	},
	// 登录，修改密码
	login : '/api/SLogin/LoginIn', // 登录
	valCode : '/api/SLogin/GetValidateCode', // 验证码
	checkValCode : '/api/SLogin/CheckVailidateCode', // 校验验证码
	updatePWD : '/api/SUser/UpdateUserPwd', // 修改密码
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
if(_G.Token){
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
}

(function(window,undefined){

var PENDING = undefined, FULFILLED = 1, REJECTED = 2;

var isFunction = function(obj){
	return 'function' === typeof obj;
}
var isArray = function(obj) {
  	return Object.prototype.toString.call(obj) === "[object Array]";
}
var isThenable = function(obj){
  	return obj && typeof obj['then'] == 'function';
}

var transition = function(status,value){
	var promise = this;
	if(promise._status !== PENDING) return;
	// 所以的执行都是异步调用，保证then是先执行的
	setTimeout(function(){
		promise._status = status;
		publish.call(promise,value);
	});
}
var publish = function(val){
	var promise = this,
    	fn,
    	st = promise._status === FULFILLED,
    	queue = promise[st ? '_resolves' : '_rejects'];
    
    while(fn = queue.shift()) {
        val = fn.call(promise, val) || val;
    }
    promise[st ? '_value' : '_reason'] = val;
    promise['_resolves'] = promise['_rejects'] = undefined;
}

var Promise = function(resolver){
	if (!isFunction(resolver))
	    throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	if(!(this instanceof Promise)) return new Promise(resolver);

	var promise = this;
	promise._value;
	promise._reason;
	promise._status = PENDING;
	promise._resolves = [];
	promise._rejects = [];
	
	var resolve = function(value){
		transition.apply(promise,[FULFILLED].concat([value]));
	}
	var reject = function(reason){
		transition.apply(promise,[REJECTED].concat([reason]));
	}
	
	resolver(resolve,reject);
}

Promise.prototype.then = function(onFulfilled,onRejected){
	var promise = this;
	// 每次返回一个promise，保证是可thenable的
	return Promise(function(resolve,reject){
		function callback(value){
	      var ret = isFunction(onFulfilled) && onFulfilled(value) || value;
	      if(isThenable(ret)){
	        ret.then(function(value){
	           resolve(value);
	        },function(reason){
	           reject(reason);
	        });
	      }else{
	        resolve(ret);
	      }
	    }
	    function errback(reason){
	    	reason = isFunction(onRejected) && onRejected(reason) || reason;
	    	reject(reason);
	    }
		if(promise._status === PENDING){
       		promise._resolves.push(callback);
       		promise._rejects.push(errback);
       	}else if(promise._status === FULFILLED){ // 状态改变后的then操作，立刻执行
       		callback(promise._value);
       	}else if(promise._status === REJECTED){
       		errback(promise._reason);
       	}
	});
}

Promise.prototype.catch = function(onRejected){
	return this.then(undefined, onRejected)
}

Promise.prototype.delay = function(ms){
	return this.then(function(val){
		return Promise.delay(ms,val);
	})
}

Promise.delay = function(ms,val){
	return Promise(function(resolve,reject){
		setTimeout(function(){
			resolve(val);
		},ms);
	})
}

Promise.resolve = function(arg){
	return Promise(function(resolve,reject){
		resolve(arg)
	})
}

Promise.reject = function(arg){
	return Promise(function(resolve,reject){
		reject(arg)
	})
}

Promise.all = function(promises){
	if (!isArray(promises)) {
    	throw new TypeError('You must pass an array to all.');
  	}
  	return Promise(function(resolve,reject){
  		var i = 0,
  			result = [],
  			len = promises.length;

  		function resolver(index) {
	      return function(value) {
	        resolveAll(index, value);
	      };
	    }

	    function rejecter(reason){
	    	reject(reason);
	    }

	    function resolveAll(index,value){
	    	result[index] = value;
	    	if(index == len - 1){
	    		resolve(result);
	    	}
	    }

  		for (; i < len; i++) {
  			promises[i].then(resolver(i),rejecter);
  		}
  	});
}

Promise.race = function(promises){
	if (!isArray(promises)) {
    	throw new TypeError('You must pass an array to race.');
  	}
  	return Promise(function(resolve,reject){
  		var i = 0,
  			len = promises.length;

  		function resolver(value) {
  			resolve(value);
	    }

	    function rejecter(reason){
	    	reject(reason);
	    }

  		for (; i < len; i++) {
  			promises[i].then(resolver,rejecter);
  		}
  	});
}

window.Promise = Promise;

})(window);





