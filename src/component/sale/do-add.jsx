//  促销管理   促销活动设置 添加活动

var _extends = _G.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
import moment from 'moment';

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


import '../../entry/config';
const saleDoAdd = config.__URL + config.sale['do']['add']; // 新增活动列表
const saleDoEdit = config.__URL + config.sale['do']['edit']; // 修改活动
const saleDoInfo = config.__URL + config.sale['do']['one']; // 获取某一个活动信息

class SaleDoAdd extends React.Component{

  //mixins: [Validation.FieldMixin],

  constructor(props) {
    super(props);
    this.state = {
      status : {
        
        MA_Name : {}, // 活动名称
        MA_BrochureURL : {}, // 活动url
        MA_InitialDraw : {},
        MA_StartTime : {}, // 活动开始时间
        MA_EndTime : {}, // 活动结束时间
        
      },
      formData: {
        id : undefined,
        title : '新增促销活动',
        MA_Name : undefined, // 活动名称
        MA_BrochureURL : undefined, // 活动url
        MA_InitialDraw : undefined, // 初始首次抽奖次数
        MA_StartTime : undefined, // 活动开始时间
        MA_EndTime : undefined, // 活动结束时间
        PromotionDetail : {
          time : [],
          area : [],
          product : []
        }, // 所有活动中奖率
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
    this.sendEndTime = this.sendEndTime.bind(this);
    this.delPrizeTime = this.delPrizeTime.bind(this);
  }

  componentDidMount(){
    // 编辑
    if(this.props.params.id){
      // ajax获取当前id的内容，变更state ****************************

      _G.ajax({
        url : saleDoInfo,
        type : 'get',
        data :{
          MA_Code : this.props.params.id
        },
        success : function(res){
          var data = {},
              ar = res.DataDetail;
            data = {
              title : '编辑促销活动',
              MA_Name : res.Data.MA_Name , // 活动名称
              MA_BrochureURL : res.Data.MA_BrochureURL, // 活动url
              MA_InitialDraw : res.Data.MA_InitialDraw+'', // 初始首次抽奖次数
              MA_StartTime : _G.timeFormat2(res.Data.MA_StartTime,'YYYY-MM-DD hh:mm:ss'), // 活动开始时间
              MA_EndTime : _G.timeFormat2(res.Data.MA_EndTime,'YYYY-MM-DD hh:mm:ss'), // 活动结束时间
              
              PromotionDetail : {
                time : [],
                area : [],
                product : []
              }, // 所有活动中奖率
            };
            console.log(data)
            ar.map(function(item){
              item.SActivityTime = _G.timeFormat2(item.SActivityTime);
              item.EActivityTime = _G.timeFormat2(item.EActivityTime);
              if(item.MarketingType == '区域抽奖'){
                // 获取销售区域
                _G.get_data(config['sale']['do']['sale_area'],'sale_area',{
                  SalesRegion_Name : ''
                },function(res){
                  res.Data.map(function(it){
                    if(it.SalesRegion_Code == item.SalesRegion_Code){
                      item.SalesRegion_Name = it.SalesRegion_Name
                    }
                  })
                  item.key = data.PromotionDetail.area.length;
                  data.PromotionDetail.area.push(item);
                }); 
                return;
              }
              if(item.MarketingType == '时间抽奖'){
                item.key = data.PromotionDetail.time.length;
                data.PromotionDetail.time.push(item);
                return
              }
              if(item.MarketingType == '产品抽奖'){
                item.key = data.PromotionDetail.product.length;
                data.PromotionDetail.product.push(item);
                return
              }
            })
            console.log('当前奖品数据：')
            console.log(data);
            this.setState({
              formData : data
            })
        }.bind(this)
      })
      
    }else{
      // 新增 *************

    }
  }

  // 文本框的值 同步到 state
  setValue(e){
    var name = e.target.id;
    var data = _G.assign({},this.state.formData);
    if(name == 'MA_InitialDraw'){
        data[name] = ''+ (parseInt(e.target.value)||'');
    }else{
        data[name] = e.target.value;
    }
    

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
    var data = _G.assign({},this.state.formData);
    data[field] = value;
    this.setState({
      formData : data
    })
  }


  // 预览
  handleUrl(){
    if(this.state.formData.MA_BrochureURL){
      window.open(this.state.formData.MA_BrochureURL)
    }else{
      msg_error('请填写链接地址')
    }
  }

  // 更新 中奖率
  addPrizeTime(type,data,cb){
    // type 类型
    // data 子节点传进来的数据，this.state
    function t(s){
      console.log(new Date(s).getTime())
      return new Date(s).getTime();
    }
    console.log('活动时间');
    console.log(this.state.formData.MA_StartTime,this.state.formData.MA_EndTime)
    if(!this.state.formData.MA_StartTime || !this.state.formData.MA_EndTime){
      msg_error('请先选择活动时间');
      return;
    }
    
    var types = {
        time : '时间抽奖',
        area : '区域抽奖',
        product : '产品抽奖'
    }

    // 新增,编辑，需要判断时间重叠
    //if(!data.index && data.index != 0){
      // 时间排重
      var startTime = t(data.SActivityTime),
          endTime = t(data.EActivityTime);
      if( startTime > t(this.state.formData.MA_EndTime) || endTime < t(this.state.formData.MA_StartTime)  || endTime < startTime){
        msg_error('时间不在活动范围内，请重新填写');
        return;
      }
      var s = true;
      var d = [];
      
      d= d.concat(this.state.formData.PromotionDetail.area);
      d= d.concat(this.state.formData.PromotionDetail.product);
      d = d.concat(this.state.formData.PromotionDetail.time);
      
      
      // 时间重叠判断,
      // 1、时间不允许重复，
      // 2、时间抽奖中，如果时间有交叉的话，不能是相同奖品
      // 3、区域抽奖中，如果时间有交叉的话，不能是相同区域、相同产品、相同奖品。（不选产品的话说明是这个区域下的所有产品）
      // 4、产品抽奖中，如果时间有交叉的话，不能是相同产品、相同奖品

      for(var i =0,l=d.length; i<l; i++){
        // 时间交叉
        if( startTime >= t(d[i].SActivityTime) && startTime <= t(d[i].EActivityTime) || 
            endTime <= t(d[i].EActivityTime) && endTime >= t(d[i].SActivityTime) ||
            startTime == t(d[i].SActivityTime) || endTime == t(d[i].EActivityTime) ){
          
          //s = false;

          // 时间类型, 不同奖品
          if( type == 'time'  ){
            if(d[i].Prize_Code != data.Prize_Code ){
              s = s&&true
            }else{
              s = false;
            }
          }

          // 区域抽奖，不同区域、不同产品、不同奖品
          if( type == 'area'){
            // 区域，产品，奖品有一个不同即可
            if(d[i].SalesRegion_Code != data.SalesRegion_Code || d[i].Product_Code != data.Product_Code || d[i].Prize_Code != data.Prize_Code ){
              console.log('area true')
              s = s&&true
            }else{
              console.log('area false')
              s = false;
            }
            // // 相同产品
            // if(d[i].Product_Code != data.Product_Code ){
            //   s = true
            // }else{
            //   s = false;
            // }
            // // 相同奖品
            // if(d[i].Prize_Code != data.Prize_Code ){
            //   s = true
            // }else{
            //   s = false;
            // }
          }

          // 产品抽奖中，如果时间有交叉的话，不能是相同产品、相同奖品
          if( type== 'product' ){
            // 产品、奖品 有一个不同即可
            if(d[i].Product_Code != data.Product_Code || d[i].Prize_Code != data.Prize_Code ){
              s = s&&true
            }else{
              s = false;
            }
            // // 相同奖品
            // if(d[i].Prize_Code != data.Prize_Code ){
            //   s = true
            // }else{
            //   s = false;
            // }
          }


        }
        // if(startTime == t(d[i].SActivityTime) || endTime == t(d[i].EActivityTime) ){
        //   s = false;
        // }
        // 允许重叠的情况
        // if( types[data.prize_type] == d[i].MarketingType && data.Prize_Code != d[i].Prize_Code){
        //     s = true;
        // }
        // 类型相同并且不是同一奖品时
        // if( types[type] == d[i].MarketingType && data.Prize_Code != d[i].Prize_Code){
        //     s = true;
        // }

        // 区域抽奖类别下 ： 同一个产品、同一个奖品、同一个时间，但是销售区域不一样
        // if( type == 'area' ){
        //   if( d[i].Prize_Code == data.Prize_Code && 
        //       d[i].Product_Code == data.Product_Code && 
        //       d[i].SActivityTime == data.SActivityTime && 
        //       d[i].EActivityTime == data.EActivityTime &&
        //       d[i].SalesRegion_Code != data.SalesRegion_Code){
        //     s = true;
        //   }
        // }

        // 不同产品、同一个奖品、同一个时间、同一个销售区域
        

      }
      
      if(!s){
        msg_error('时间重叠，请重新填写');
        return;
      }


    //}

    var all = _G.assign({},this.state.formData);
    // 修改
    if(data.index || data.index == 0 ){
      console.log('x')
      console.log(data.SActivityTime)
      console.log(_G.timeFormat(data.SActivityTime))
      all.PromotionDetail[type][data.index] = {
        key : data.index,
        Prize_Code : data.Prize_Code, // 奖品编码,
        Prize_Name : data.Prize_Name, // 奖品名称
        Prize_Level : data.Prize_Level, // 奖品级别名称
        Product_Code : data.Product_Code, // 产品编码
        Product_Name : data.Product_Name, // 产品名称
        Prize_Level_Name : data.Prize_Level_Name, // 奖品级别
        FirstWinningRate : data.FirstWinningRate, // 首次中奖率
        SalesRegion_Code : data.SalesRegion_Code, // 销售区域编码
        SalesRegion_Name : data.SalesRegion_Name, // 销售区域名称
        WinningPlaces : data.WinningPlaces, // 次数
        MarketingType : types[type], // 活动类型
        NFirstWinningRate :  data.NFirstWinningRate, // 非首次中奖率
        SActivityTime : _G.timeFormat(data.SActivityTime), // 中奖时间
        EActivityTime : _G.timeFormat(data.EActivityTime), // 中奖时间
      }
    }else{
      // 新增
      all.PromotionDetail[type][all.PromotionDetail[type].length] = {
        key : all.PromotionDetail[type].length,
        Prize_Code : data.Prize_Code, // 奖品编码,
        Prize_Name : data.Prize_Name, // 奖品名称
        Prize_Level : data.Prize_Level, // 奖品级别名称
        Product_Code : data.Product_Code, // 产品编码
        Product_Name : data.Product_Name, // 产品名称
        SalesRegion_Code : data.SalesRegion_Code, // 销售区域编码
        SalesRegion_Name : data.SalesRegion_Name, // 销售区域名称
        WinningPlaces : data.WinningPlaces, // 次数
        Prize_Level_Name : data.Prize_Level_Name, // 奖品级别
        FirstWinningRate : data.FirstWinningRate, // 首次中奖率
        MarketingType : types[type], // 活动类型
        NFirstWinningRate :  data.NFirstWinningRate, // 非首次中奖率
        SActivityTime : _G.timeFormat(data.SActivityTime), // 中奖时间
        EActivityTime : _G.timeFormat(data.EActivityTime), // 中奖时间
      }
    }
	 
    this.setState({
      formData : all
    });
    cb&&cb();
    console.log('更新 中奖率');
    console.log(this.all);

  }

  // 删除
  delPrizeTime(type,index){
    console.log(type,index)
    var all = _G.assign({},this.state.formData);
    
    all.PromotionDetail[type].splice(index,1); // 删除data中index = changeId 的值, 
    console.log(all)
    // 重置key
    all.PromotionDetail[type].map(function(item,i){
      all.PromotionDetail[type][i].key = i;
    })

    this.setState({
      formData : all
    })

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

  sendEndTime(){
    return this.state.formData.MA_EndTime
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
    var data = _G.assign({},this.state.formData);
    var d = [];
    d = d.concat(data.PromotionDetail.time);
    d = d.concat(data.PromotionDetail.area);
    d = d.concat(data.PromotionDetail.product);
    data.PromotionDetail = d;
    console.log('新增，修改促销活动数据如下：');
    console.log(data);
    if( !data.MA_EndTime || !data.MA_InitialDraw || !data.MA_Name || !data.MA_StartTime || !data.PromotionDetail.length){
        msg_error('内容不完整，请填写相应内容');
        return;
    }
    var url = this.props.params.id ? saleDoEdit+'?MA_Code='+ this.props.params.id : saleDoAdd;
    _G.ajax({
      url : url,
      type : 'post',
      data : {
        JsonValue : JSON.stringify(data)
      },
      success : function(res){
        if(res.ReturnOperateStatus == 'True'){
          goBack();
          return;
        }
        if(res.ReturnOperateStatus == 'False'){
          msg_error(res.Msg);
          return;
        }
        console.log('add success')
      },
      error:function(){
        msg_error('添加失败了，请重新试试');
      }
    })
    console.log(this.state.formData);
    
  }

  disabledEndDate(endValue){
    if (!endValue || !this.state.MA_StartTime) {
      return false;
    }
    return endValue.getTime() <= this.state.MA_StartTime.getTime();
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
                id="MA_Name">
                  <Input placeholder="" style={{width:100}} id="MA_Name" name="MA_Name" onChange={this.setValue} value={this.state.formData.MA_Name} />
              </FormItem>
              </li>
              <li className="fleft">
                <FormItem
                label="活动彩页："
                id="MA_BrochureURL">
                  <Input placeholder="" style={{width:100}} id="MA_BrochureURL" name="MA_BrochureURL" onChange={this.setValue} value={this.state.formData.MA_BrochureURL} />
                  <Button type="primary" onClick={this.handleUrl} data-url={formData.MA_BrochureURL}>浏览</Button>
              </FormItem>
              </li>
              <li className="fleft">
                <FormItem
                label="初始首次参与抽奖次数："
                id="MA_InitialDraw">
                  <Input placeholder="" style={{width:50}} id="MA_InitialDraw" name="MA_InitialDraw" onChange={this.setValue} value={this.state.formData.MA_InitialDraw} />
              </FormItem>
              </li>
              <li className="fleft date-picker">
                <FormItem id="MA_StartTime" label="活动时间：" labelCol={{span : 5}} >
                    <Row span="24" >
                    <Col span="10">
                  <DatePicker placeholder="开始日期" value={this.state.formData.MA_StartTime} onChange={this.onChange.bind(this,'MA_StartTime')} />
                </Col>
                <Col span="1">
                  <p className="ant-form-split">-</p>
                </Col>
                <Col span="10">
                  <DatePicker disabledDate={this.disabledEndDate} value={this.state.formData.MA_EndTime} placeholder="结束日期" onChange={this.onChange.bind(this,'MA_EndTime')} />
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
            <SaleADDTime addPrizeTime={this.addPrizeTime} delPrizeTime={this.delPrizeTime} data={this.state.formData.PromotionDetail.time} endTime={this.sendEndTime} />
          </TabPane>
          <TabPane tab="区域中奖率" key="2">
            <SaleADDArea addPrizeTime={this.addPrizeTime} delPrizeTime={this.delPrizeTime} data={this.state.formData.PromotionDetail.area} />
          </TabPane>
          <TabPane tab="产品种类中奖率" key="3">
            <SaleADDProduct addPrizeTime={this.addPrizeTime} delPrizeTime={this.delPrizeTime} data={this.state.formData.PromotionDetail.product} />
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


