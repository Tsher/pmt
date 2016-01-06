//  促销管理   促销活动设置 添加活动

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Checkbox from 'antd/lib/checkbox';
import message from 'antd/lib/message';
import Validation from 'antd/lib/validation';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import DatePicker from 'antd/lib/date-picker';
import InputNumber from 'antd/lib/input-number';
import Tabs from 'antd/lib/tabs';

import Select from 'antd/lib/select';
import Radio from 'antd/lib/radio';

import { createHistory } from 'history';

import {SaleADDTime} from './do-add-time';
import {SaleADDArea} from './do-add-area';
import {SaleADDProduct} from './do-add-product';

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Validator = Validation.Validator;
const Option = Select.Option;
const RadioGroup = Radio.Group;

const FieldMixin = Validation.FieldMixin;

const History = createHistory();

const goBack = History.goBack;

function cx(classNames) {
  if (typeof classNames === 'object') {
    return Object.keys(classNames).filter(function(className) {
      return classNames[className];
    }).join(' ');
  } else {
    return Array.prototype.join.call(arguments, ' ');
  }
}


const msg_error = function(text){
  message.error(text||'数据验证错误,请检查后提交')
}
const msg_success = function(){
  message.success('数据提交成功，等待后台处理')
}


class SaleDoAdd extends React.Component{

  //mixins: [Validation.FieldMixin],

  constructor(props) {
  	super(props);
  	this.state = {
      status : {
        
        name : {}, // 活动名称
        
        url : {}, // 活动url
        
        startTime : {}, // 活动开始时间
        endTime : {}, // 活动结束时间
        
      },
      formData: {
        id : undefined,
        title : '新增促销活动',
        name : undefined, // 活动名称
        url : undefined, // 活动url
        startTime : undefined, // 活动开始时间
        endTime : undefined, // 活动结束时间
        rules : {
          time : [],
          area:[],
          product : []
        }
      }
    };
    this.setField = FieldMixin.setField.bind(this);
    this.handleValidate = FieldMixin.handleValidate.bind(this);
    this.onValidate = FieldMixin.onValidate.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleUrl = this.handleUrl.bind(this);
    this.onChange = this.onChange.bind(this);
    this.disabledEndDate = this.disabledEndDate.bind(this);
    this.setValue = this.setValue.bind(this);

    this.addPrizeTime = this.addPrizeTime.bind(this);
  }

  componentDidMount(){
    // 编辑
    if(this.props.params.id){
      // ajax获取当前id的内容，变更state ****************************

      // 模拟数据
      var state = {
        formData:{


        id : this.props.params.id,
        title : '编辑促销活动',
        url : 'http://www.baidu.com',
        startTime : '2015-12-12 10:30:00',
        endTime : '2016-01-03 10:30:00',
        rules : {
          time : [
            {
            key: 0,
            prizeId: '000001',
            prizeName: '矿泉水1',
            prizeLevel : '1级',
            probability_first : '1.2',
            probability : '0.3',
            prize_startTime : '2015-12-12 23:32:23',
            prize_endTime: '2015-12-23 23:23:23',
            prize_type : 1
          }],
          area : [{
            key: 0,
            areaId : 'a01',
            prizeId: '000001',
            prizeName: '矿泉水1',
            prizeLevel : '1级',
            probability_first : '1.2',
            probability : '0.3',
            prize_startTime : '2015-12-12 23:32:23',
            prize_endTime: '2015-12-23 23:23:23',
            prize_type : 1
          }],
          product : [
            {
            key: 0,
            productId : 'a01',
            prizeId: '000001',
            prizeName: '矿泉水1',
            prizeLevel : '1级',
            probability_first : '1.2',
            probability : '0.3',
            prize_startTime : '2015-12-12 23:32:23',
            prize_endTime: '2015-12-23 23:23:23',
            prize_type : 1
          }
          ]
        }
      }
        }
      this.setState(state);
    }else{
      // 新增 *************

    }
  }

  // 文本框的值 同步到 state
  setValue(e){
    var name = e.target.id;
    var data = Object.assign({},this.state.formData);
    data[name] = e.target.value;

    this.setState({
      formData : data
    })
    var that = this;
    setTimeout(function(){
      console.log(that.state)
    },1000)
  }

  // datepicker change
  onChange(field,value){
    var data = Object.assign({},this.state.formData);
    data[field] = value;
    this.setState({
      formData : data
    })
  }


  // 预览
  handleUrl(){
    if(this.state.url){
      window.open(this.state.url)
    }else{
      msg_error('请填写链接地址')
    }
  }

  // 更新 中奖率
  addPrizeTime(type,data){

    var states = Object.assign({},this.state);
    states.formData.rules[type] = data;
    this.setState(states);
    var that = this;
    setTimeout(function(){
      console.log('更新 中奖率');
      console.log(that.state)
    },1000)
  }


  renderValidateStyle(item) {

    const formData = this.state.formData;
    const status = this.state.status;
    console.log(item)
    const classes = cx({
      'error': status[item].errors,
      'validating': status[item].isValidating,
      'success': formData[item] && !status[item].errors && !status[item].isValidating
    });

    return classes;
  }

  handleReset(e) {
    // 返回***********************************
    goBack();

    // this.refs.validation.reset();
    // this.setState({
    //   status: {
    //     select: {},
    //     string:{},
    //     textarea:{}
    //   },
    //   formData: {
    //     select: undefined,
    //     string: undefined,
    //     textarea:undefined
    //   }
    // });
    e.preventDefault();
  }

  handleSubmit(e) {
    //***********************************等待ajax提交数据 ******** 区分 新增 或者 编辑
    e.preventDefault();
    // this.setState({
    //   isEmailOver: true
    // });
    const validation = this.refs.validation;
    validation.validate((valid) => {
      if (!valid) {
        console.log('error in form');
        msg_error()
        return;
      } else {
        console.log('submit');
      }
      console.log(this.state.formData);
      msg_success();
    });
  }

  disabledEndDate(endValue){
    if (!endValue || !this.state.startTime) {
      return false;
    }
    return endValue.getTime() <= this.state.startTime.getTime();
  }

  // checkUserState(rule, value, callback) {
  //   if (!value){
  //     callback(new Error('请选择用户状态!'));
  //   } else {
  //     callback();
  //   }
  // }

  // checkRoleName(rule, value, callback) {
  //   if (!value) {
  //     callback(new Error('请输入角色名称'));
  //   } else {
  //     callback();
  //   }
  // }

  render() {
    const formData = this.state.formData;
    const status = this.state.status;

    return (
      <div className="m-form">
        <div className="m-form-title">{this.state.formData.title}</div>
        <div className="m-form-con">
        
      <Form inline onSubmit={this.handleSubmit}>
      <Row>
        <Col span="24" >
            <div>
            <ul className="clearfix">
              <li className="fleft">
                <FormItem
                label="活动名称："
                id="name">
                  <Input placeholder="" id="name" name="name" onChange={this.setValue} value={this.state.formData.name} />
              </FormItem>
              </li>
              <li className="fleft">
                <FormItem
                label="活动彩页："
                id="url">
                  <Input placeholder="" id="url" name="url" onChange={this.setValue} value={this.state.formData.url} />
                  <Button type="primary" onClick={this.handleUrl} data-url={formData.url}>浏览</Button>
              </FormItem>
              </li>
              <li className="fleft date-picker">
                <FormItem id="startTime" label="注册时段：" labelCol={{span : 5}} >
                    <Row span="24" >
                    <Col span="10">
                  <DatePicker placeholder="开始日期" onChange={this.onChange.bind(this,'startTime')} />
                </Col>
                <Col span="1">
                  <p className="ant-form-split">-</p>
                </Col>
                <Col span="10">
                  <DatePicker disabledDate={this.disabledEndDate} placeholder="结束日期" onChange={this.onChange.bind(this,'endTime')} />
                </Col>
                </Row>
                </FormItem>
              </li>
              
            </ul>
            
            
          </div>
        </Col>
        </Row>
      </Form>
      
        <div className="m-form-title">抽奖设置</div>
        <Tabs defaultActiveKey="1" >
          <TabPane tab="时间区间中奖率" key="1">
            <SaleADDTime addPrizeTime={this.addPrizeTime} data={this.state.formData.rules.time} />
          </TabPane>
          <TabPane tab="区域中奖率" key="2">
            <SaleADDArea addPrizeTime={this.addPrizeTime} data={this.state.formData.rules.area} />
          </TabPane>
          <TabPane tab="产品种类中奖率" key="3">
            <SaleADDProduct addPrizeTime={this.addPrizeTime} data={this.state.formData.rules.product} />
          </TabPane>
        </Tabs>


      
      </div>
        <div className="m-form-btns">
        <Row>
          <Col span="4" offset="2">
          <Button type="primary" onClick={this.handleSubmit}>确定</Button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button type="primary" onClick={this.handleReset}>取消</Button>
          </Col>
        </Row>
          
        </div>
      </div>
    );
  }
};



module.exports = {
  SaleDoAdd : SaleDoAdd
}


