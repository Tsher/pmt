import React from 'react';
import { Route, Redirect, IndexRoute,} from 'react-router';

import { Welcome } from '../component/welcome';

import { UserGroup } from '../component/user/group';
import { UserGroupAdd } from '../component/user/group-add';

import { UserRole } from '../component/user/role';
import { UserRoleAdd } from '../component/user/role-add';
import { UserRoleSet } from '../component/user/role-set';

import { UserUser } from '../component/user/user';
import { UserUserAdd } from '../component/user/user-add';
import { UserUserRole } from '../component/user/user-role';

import { BaseInfo } from '../component/base/info';
import { BaseProduct } from '../component/base/product';
import { BaseProductAdd } from '../component/base/product-add';
import { BaseArea } from '../component/base/area';
import { BaseAreaAdd } from '../component/base/area-add';

import { RuleArea } from '../component/rules/area';
import { RuleAreaAdd } from '../component/rules/area-add';
import { RuleNumber } from '../component/rules/number';
import { RuleNumberAdd } from '../component/rules/number-add';

import { SaleDo } from '../component/sale/do';
import { SaleDoAdd } from '../component/sale/do-add';


import { SalePrize } from '../component/sale/prize';
import { SalePrizeAdd } from '../component/sale/prize-add';
import { SalePrizeInfo } from '../component/sale/prize-info';
import { SalePrizeEdit } from '../component/sale/prize-edit';


import { SaleUser } from '../component/sale/user';
import { SaleUserInfo } from '../component/sale/user-info';
import { SaleUserEdit } from '../component/sale/user-edit';
import { SaleUserAdd } from '../component/sale/user-add';

import { SaleVip } from '../component/sale/vip';
import { SaleVipInfo } from '../component/sale/vip-info';

import { SaleDataPush } from '../component/saledata/push';
import { SaleDataPushInfo } from '../component/saledata/push-info';
import { SaleDataPrize } from '../component/saledata/prize';
import { SaleDataUser } from '../component/saledata/user';
import { SaleDataSend } from '../component/saledata/send';
import { SaleDataSendInfo } from '../component/saledata/send-info';
import { SaleDataRound } from '../component/saledata/round';
import { Login } from '../component/login';
import { ChangePassword } from '../component/change-password';
import { SaleDataRoundInfo } from '../component/saledata/round-info';

import {Layout} from '../component/layout';



function validate(nextState, transition) {
	
	let token = Cookie.read('Token');
	_G.Token = token;
	// 验证token是否有效
	if(!token){
		if(nextState.location.pathname == '/login') return;
		transition(nextState,'/login');
        return;
	}
        _G.UserRole = JSON.parse( Cookie.read('UserRole1') + Cookie.read('UserRole2') );
}

const Router = (
	<Route path="/" component={Layout} onEnter={validate} >
		<Route path="/login" component={Login}></Route>
		
		<Route path="/change-password" component={ChangePassword}></Route>


		<Route path="/base" component={Welcome} ></Route>
		<Route path="/base/info" component={BaseInfo}></Route>
		<Route path="/base/product" component={BaseProduct}></Route>
		<Route path="/base/product/add/:hid" component={BaseProductAdd}></Route>
		<Route path="/base/product/edit/:id" component={BaseProductAdd}></Route>
		<Route path="/base/area" component={BaseArea}></Route>
		<Route path="/base/area/add" component={BaseAreaAdd}></Route>
		<Route path="/base/area/edit/:id" component={BaseAreaAdd}></Route>

		<Route path="/user" component={Welcome} ></Route>

		// 用户管理  组织结构管理
		<Route path="/user/group" component={UserGroup}></Route>
		<Route path="/user/group/add/:id" component={ UserGroupAdd }></Route>
		<Route path="/user/group/edit/:id" component={ UserGroupAdd }></Route>

		// 用户管理 企业角色管理
		<Route path="/user/role" component={UserRole}></Route>
		<Route path="/user/role/add" component={ UserRoleAdd }></Route>
		<Route path="/user/role/edit/:id" component={ UserRoleAdd }></Route>
		<Route path="/user/role/set/:id" component={ UserRoleSet }></Route>

		// 用户管理  企业用户管理
		<Route path="/user/user" component={UserUser}></Route>
		<Route path="/user/user/add" component={ UserUserAdd }></Route>
		<Route path="/user/user/edit/:id" component={ UserUserAdd }></Route>
		<Route path="/user/user/role/:id" component={ UserUserRole }></Route>

		<Route path="/rule" component={Welcome} ></Route>
		<Route path="/rule/area" component={RuleArea}></Route>
		<Route path="/rule/area/add" component={RuleAreaAdd}></Route>
		<Route path="/rule/area/edit/:id" component={RuleAreaAdd}></Route>


		<Route path="/rule/number" component={RuleNumber}></Route>
		<Route path="/rule/number/add" component={RuleNumberAdd}></Route>
		<Route path="/rule/number/edit/:id" component={RuleNumberAdd}></Route>

		<Route path="/sale" component={Welcome} ></Route>
		<Route path="/sale/do" component={SaleDo}></Route>
		<Route path="/sale/do/add" component={SaleDoAdd}></Route>
		<Route path="/sale/do/edit/:id" component={SaleDoAdd}></Route>

		<Route path="/sale/prize" component={SalePrize}></Route>
		<Route path="/sale/prize/add" component={SalePrizeAdd}></Route>
		<Route path="/sale/prize/info/:id" component={SalePrizeInfo}></Route>
		<Route path="/sale/prize/edit/:id" component={SalePrizeEdit}></Route>

		<Route path="/sale/user" component={SaleUser}></Route>
		<Route path="/sale/user/info/:id" component={SaleUserInfo}></Route>
		<Route path="/sale/user/edit/:id" component={SaleUserEdit}></Route>
		<Route path="/sale/user/add" component={SaleUserAdd}></Route>

		<Route path="/sale/vip" component={SaleVip}></Route>
		<Route path="/sale/vip/info/:id" component={SaleVipInfo}></Route>


		<Route path="/saledata" component={Welcome} ></Route>
		<Route path="/saledata/push" component={SaleDataPush}></Route>
		<Route path="/saledata/push/info/:id" component={SaleDataPushInfo}></Route>
		<Route path="/saledata/prize" component={SaleDataPrize}></Route>
		<Route path="/saledata/user" component={SaleDataUser}></Route>
		<Route path="/saledata/Send" component={SaleDataSend}></Route>
		<Route path="/saledata/Send/info/:id" component={SaleDataSendInfo}></Route>
		<Route path="/saledata/round" component={SaleDataRound}></Route>
		<Route path="/saledata/round/info/:id" component={SaleDataRoundInfo}></Route>

		<IndexRoute component={Welcome} />

	</Route>
);

module.exports = Router;