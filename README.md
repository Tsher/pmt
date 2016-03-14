# antd-demo

## 开发环境

```
node 最新版
```

## Code Style

https://github.com/airbnb/javascript

## 开发

shell 运行
```
npm run dev
```

访问 http://127.0.0.1:8000 

## 发布

shell 运行
```
npm run build
```
发布脚本运行完，
1、需要把源码目录下的 index.html,jquery-1.11.3.js , jquery.ajaxfileupload.js, moment.min.js, tools.js 复制到
dist/antd-demo/下面
2、dist/antd-demo/1.0.0 目录中的 0.js至 35.js 复制到 dist/下面
3、修改index.html页面中路径
	a: ./index.css 修改为 ./1.0.0/index.css
	b: ./common.js 修改为 ./1.0.0/common.js
	c: ./index.js 修改为 ./1.0.0/index.js


## 源码

目录：
/src
	/common 样式，字体，图片
	/component 组件
		/base 基础数据管理
			/area-add.jsx 区域管理-添加编辑
			/area.jsx  区域列表页
			/info.jsx 公司信息
			/product.jsx 产品管理-列表页
			/product-add.jsx 产品管理-添加编辑
		/rules 营销规则
			/area.jsx 批次区域管理-列表页
			/area-add.jsx 批次区域管理-添加编辑
			/number.jsx 积分规则-列表页
			/number-add.jsx 积分规则-添加编辑
		/sale 促销管理
			/do.jsx 促销活动管理-列表页
			/do-add.jsx 促销活动-添加编辑
			/do-add-time.jsx 促销活动-时间规则
			/do-add-area.jsx 促销活动-区域规则
			/do-add-product.jsx 促销规则-产品规则
			/prize.jsx 奖品管理
			/prize-add.jsx 添加奖品
			/prize-edit.jsx 编辑奖品
			/prize-info.jsx 奖品信息
			/vip.jsx 会员管理-列表页
			/vip-info.jsx 会员管理-信息页
			/user.jsx 促销人员-列表页
			/user-add.jsx 促销人员-添加
			/user-edit.jsx 促销人员-编辑
			/user-info.jsx 促销人员-信息
		/saledata 促销数据管理
			/prize.jsx 奖品兑换流水
			/push.jsx 话费充值流水
			/push-info.jsx 话费流水详情
			/round.jsx 抽奖流水
			/round-info.jsx 抽奖流水详情
			/user.jsx 消费者参与流水
			/send.jsx 发送短信流水
			/send-info.jsx 短信详情
		/user 用户管理
			/user.jsx 用户管理
			/user-add.jsx 添加，编辑用户
			/user-role.jsx 用户权限设置
			/role.jsx 角色列表
			/role-add.jsx 添加，编辑角色
			/role-set.jsx 编辑权限
			/group.jsx 组织机构管理
			/group-add.jsx 组织机构管理-添加编辑
		/btn-add.jsx 新增按钮
		/btn-del.jsx 删除按钮
		/btn-edit.jsx 修改按钮
		/btn-export.jsx 导出excel按钮
		/btn-search.jsx 查询按钮
		/change-password.jsx 修改密码
		/layout.jsx 页面主结构页
		/left-menu.jsx 左侧菜单
		/login.jsx 登录页
		/welcome.jsx 欢迎页
	/entry 入口页
		/config.jsx 公共配置方法页
		/index.jsx 入口页
		/router.jsx 路由页