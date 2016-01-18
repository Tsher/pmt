import moment from 'moment';
// 全局方法
window['_G']={
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
	timeFormat : function(t,f){
		if(!t){
			return ''
		}
		var f = f || 'YYYY-MM-DD hh:mm:ss';
		var t = t.replace(/\D/g,'')*1;
		t = new Date(t).getTime();
		t = moment(t).format('YYYY-MM-DD HH:MM:SS');
		return t;
	},
	// ajax
	ajax:function(){}
}


// api 配置表

window['config'] = {
	__URL : 'http://172.31.0.49:8088', // API全局url
	// 用户管理
	user:{
		// 企业用户
		user:{
			list : '/api/SUser/GetUsers',
			add : '/api/SUser/PostUser',
			edit : '/api/SUser/PutUser',
			info : '/api/SUser/GetUser',
			del : '/api/SUser/DeleteUser',
		}
	}
}

