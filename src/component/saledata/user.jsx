// 促销数据管理  消费者参与流水
import React from 'react';
import Col from 'antd/lib/col';
import { DatePicker } from 'antd/lib';
import { Button } from 'antd/lib';
import Form from 'antd/lib/form';
import message from 'antd/lib/message';
import Chart from 'rc-echarts';
import Icon from 'antd/lib/icon';

const FormItem = Form.Item;

import '../../entry/config';
import { Search } from '../btn-search'; // 查询按钮
import { Export } from '../btn-export'; // 导出excel按钮
import { Add } from '../btn-add'; // 新增按钮
import { Edit } from '../btn-edit'; // 编辑，发布，设置等按钮
import { Del } from '../btn-del'; // 删除

let pageName = '消费者参与流水'; // 按钮，验证权限使用
const saledataUserList = config.__URL + config.saledata.user.list;

var changeTableState;

class DateRange extends React.Component{
  constructor() {
    super();
    this.state =  {
        MA_StartTime : '',
        MA_EndTime : ''
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.onChange = this.onChange.bind(this);
      this.disabledEndDate = this.disabledEndDate.bind(this);
  }
  componentDidMount(){
    this.handleSubmit();
  }
  disabledEndDate(endValue) {
    if (!endValue || !this.state.MA_StartTime) {
      return false;
    }
    return endValue.getTime() <= this.state.MA_StartTime.getTime();
  }
  onChange(field, value) {
    this.setState({
      [field]: value,
    });
  }
  handleSubmit(e) {
    // ********************************************************** ajax提交数据，获取table的data值
    e&&e.preventDefault();

    this.props.changeTableState(this.state);
  }
  render() {
    return <div>
      <div style={{width:945, height:60}}>
        <Form inline onSubmit={this.handleSubmit}>
        <Col span="2">
        <div style={{fontSize:14,lineHeight:2.4}}>扫码日期：</div>
        </Col>
          <Col span="3">
          <DatePicker value={this.state.MA_StartTime} placeholder="开始日期" onChange={this.onChange.bind(this,'MA_StartTime')} />
        </Col>
        <Col span="1">
          <p className="ant-form-split">-</p>
        </Col>
         <Col span="3">
          <DatePicker value={this.state.MA_EndTime} disabledDate={this.disabledEndDate} placeholder="结束日期" onChange={this.onChange.bind(this,'MA_EndTime')} />
        </Col>
        <Col span="3">
        <FormItem>
        <div style={{marginLeft:10}}>
        <Search Name={pageName} />
        </div>
          </FormItem>
        </Col>
      </Form>
      </div>
    </div>;
  }
};

class SaleDataUser extends React.Component{
	constructor(){
		super();
    this.state =  {
        data : [],
        opts : {
          page :1,
          pageSize : 10,
        },
      };

    this.changeTableState = this.changeTableState.bind(this);
	}

  componentDidMount(){

    changeTableState = this.changeTableState;
    //modalState = this.showModal;

    this.setState({
      data : []
    })
    
  }



  // 发送ajax请求
  changeTableState(opts){

    this.setState({
      opts : opts
    })
    
    //opts.EntityCode = 'DEFAULT';
    var that = this;
    var optsD = _G.assign({},opts);

    optsD.MA_StartTime = ''+_G.timeFormat( new Date(opts.MA_StartTime).getTime() );
    optsD.MA_EndTime = ''+_G.timeFormat( new Date(opts.MA_EndTime).getTime() );

    _G.ajax({
      url : saledataUserList,
      type: "get",
      data : optsD,
      success:function(res){
        var d = [];
        for(var i=0,l=res.Data.length;i<l;i++){
          var json = {}
          if (res.Data[i].Province_Name) {
            json.name = res.Data[i].Province_Name.replace('市','').replace('省','');
            json.value = res.Data[i].ScanCount;
            d.push(json);
          }
        }
        this.setState({
          data : d,
          opts : opts
        })

      }.bind(this)

    })

  }

	render(){
		return(
			<div className="m-list">
			     <DateRange changeTableState={this.changeTableState} />
           <div  id="map" style={{width:945}}>
            <Map data={this.state.data} />
          </div>
			</div>
		)
	}
}

class Map extends React.Component{
    render() {
    const options = {
      title : {
        text: '消费者扫码量',
        subtext: '',
        x:'center'
    },
    tooltip : {
        trigger: 'item'
    },
    legend: {
        orient: 'vertical',
        x:'left',
        data:['消费者扫码量']
    },
    dataRange: {
        x: 'left',
        y: 'bottom',
        splitList: [
            {start: 1500},
            {start: 900, end: 1500},
            {start: 310, end: 1000},
            {start: 200, end: 300},
            {start: 10, end: 200, label: '10 到 200（自定义label）'},
            {start: 5, end: 5, label: '5（自定义特殊颜色）', color: 'black'},
            {end: 10}
        ],
        color: ['#E0022B', '#E09107', '#A3E00B']
    },
    toolbox: {
        show: true,
        orient : 'vertical',
        x: 'right',
        y: 'center',
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    roamController: {
        show: true,
        x: 'right',
        mapTypeControl: {
            'china': true
        }
    },
    series : [
        {
            name: '消费者扫码量',
            type: 'map',
            mapType: 'china',
            roam: false,
            itemStyle:{
                normal:{
                    label:{
                        show:true,
                        textStyle: {
                           color: "rgb(249, 249, 249)"
                        }
                    }
                },
                emphasis:{label:{show:true}}
            },
            data:[
                {name: '北京',value: Math.round(Math.random()*2000)},
                {name: '天津',value: Math.round(Math.random()*2000)},
                {name: '上海',value: Math.round(Math.random()*2000)},
                {name: '重庆',value: Math.round(Math.random()*2000)},
                {name: '河北',value: 0},
                {name: '河南',value: Math.round(Math.random()*2000)},
                {name: '云南',value: 5},
                {name: '辽宁',value: 305},
                {name: '黑龙江',value: Math.round(Math.random()*2000)},
                {name: '湖南',value: 200},
                {name: '安徽',value: Math.round(Math.random()*2000)},
                {name: '山东',value: Math.round(Math.random()*2000)},
                {name: '新疆',value: Math.round(Math.random()*2000)},
                {name: '江苏',value: Math.round(Math.random()*2000)},
                {name: '浙江',value: Math.round(Math.random()*2000)},
                {name: '江西',value: Math.round(Math.random()*2000)},
                {name: '湖北',value: Math.round(Math.random()*2000)},
                {name: '广西',value: Math.round(Math.random()*2000)},
                {name: '甘肃',value: Math.round(Math.random()*2000)},
                {name: '山西',value: Math.round(Math.random()*2000)},
                {name: '内蒙古',value: Math.round(Math.random()*2000)},
                {name: '陕西',value: Math.round(Math.random()*2000)},
                {name: '吉林',value: Math.round(Math.random()*2000)},
                {name: '福建',value: Math.round(Math.random()*2000)},
                {name: '贵州',value: Math.round(Math.random()*2000)},
                {name: '广东',value: Math.round(Math.random()*2000)},
                {name: '青海',value: Math.round(Math.random()*2000)},
                {name: '西藏',value: Math.round(Math.random()*2000)},
                {name: '四川',value: Math.round(Math.random()*2000)},
                {name: '宁夏',value: Math.round(Math.random()*2000)},
                {name: '海南',value: Math.round(Math.random()*2000)},
                {name: '台湾',value: Math.round(Math.random()*2000)},
                {name: '香港',value: Math.round(Math.random()*2000)},
                {name: '澳门',value: Math.round(Math.random()*2000)}
            ]
        }
    ]
    };
    return (
      <Chart {...options} onReady={this.ready}>
        <Chart.Map
          name="消费者扫码量"
          data={this.props.data} />
      </Chart>
    );
  }
}

module.exports = {
	SaleDataUser : SaleDataUser
}