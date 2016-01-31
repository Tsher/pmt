// 促销数据管理  奖品兑换流水
import React from 'react';
import Col from 'antd/lib/col';
import { DatePicker } from 'antd/lib';
import { Button } from 'antd/lib';
import Form from 'antd/lib/form';
import message from 'antd/lib/message';
import Icon from 'antd/lib/icon';
import Echarts from 'echarts/echarts'
import chartmap from 'echarts/chart/map'
import ecConfig from 'echarts/config';

const FormItem = Form.Item;

import '../../entry/config';
const saledataPrizeList = config.__URL + config.saledata.prize.list;

var changeTableState;
var optionData=[];

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
    e.preventDefault();
    
    this.props.changeTableState(this.state);
  }
  render() {
    return <div>
      <div style={{width:945, height:60}}>
        <Form inline onSubmit={this.handleSubmit}>
        <Col span="2">
        <div style={{fontSize:14,lineHeight:2.4}}>兑换日期：</div>
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
          <Button type="primary" shape="circle" size="large"  htmlType="submit" style={{marginLeft:10}}>
                <Icon type="search" />
              </Button>
          </FormItem>
        </Col>
      </Form>
      </div>
    </div>;
  }
};

class SaleDataPrize extends React.Component{
	constructor(){
		super();
        this.state =  {
         data : [],
        }
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
        
        //opts.EntityCode = 'DEFAULT';
        var that = this;
        var optsD = _G.assign({},opts);

        optsD.MA_StartTime = ''+_G.timeFormat( new Date(opts.MA_StartTime).getTime() );
        optsD.MA_EndTime = ''+_G.timeFormat( new Date(opts.MA_EndTime).getTime() );

        _G.ajax({
          url : saledataPrizeList,
          type: "get",
          data : optsD,
          success:function(res){
            var d = [];
            optionData = [
               {
                "name":"长沙市",
                "value":"100"
               }
            ];

            for(var i=0,l=res.Data.length;i<l;i++){
              var json = {}
              if (res.Data[i].Region_Name) {
                json.name = res.Data[i].Region_Name;
                json.value = res.Data[i].AwardNum;
                d.push(json);
                optionData.push(json)
              }
            }
            
            this.setState({
              data : d
            })

          }.bind(this)

        })

      }


  
	render(){
		return(
			<div className="m-list">
			 <DateRange changeTableState={this.changeTableState} />
          <PrizeChart data={this.state.data} />
			</div>
		)
	}
}


const option = {
    tooltip : {
        trigger: 'item'
    },
    toolbox: {
        show : true,
        orient: 'vertical',
        x:'right',
        y:'center',
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false}
        }
    },
    series : [
        {
            tooltip: {
                trigger: 'item',
                formatter: '{b}'
            },
            name: '选择器',
            type: 'map',
            mapType: 'china',
            mapLocation: {
                x: 'left',
                y: 'top',
                width: '30%'
            },
            roam: true,
            selectedMode : 'single',
            itemStyle:{
                //normal:{label:{show:true}},
                emphasis:{label:{show:true}}
            },
            data:[
                {name: '北京', selected:true},
                {name: '天津', selected:false},
                {name: '上海', selected:false},
                {name: '重庆', selected:false},
                {name: '河北', selected:false},
                {name: '河南', selected:false},
                {name: '云南', selected:false},
                {name: '辽宁', selected:false},
                {name: '黑龙江', selected:false},
                {name: '湖南', selected:false},
                {name: '安徽', selected:false},
                {name: '山东', selected:false},
                {name: '新疆', selected:false},
                {name: '江苏', selected:false},
                {name: '浙江', selected:false},
                {name: '江西', selected:false},
                {name: '湖北', selected:false},
                {name: '广西', selected:false},
                {name: '甘肃', selected:false},
                {name: '山西', selected:false},
                {name: '内蒙古', selected:false},
                {name: '陕西', selected:false},
                {name: '吉林', selected:false},
                {name: '福建', selected:false},
                {name: '贵州', selected:false},
                {name: '广东', selected:false},
                {name: '青海', selected:false},
                {name: '西藏', selected:false},
                {name: '四川', selected:false},
                {name: '宁夏', selected:false},
                {name: '海南', selected:false},
                {name: '台湾', selected:false},
                {name: '香港', selected:false},
                {name: '澳门', selected:false}
            ]
        }
    ],
    animation: false
};


    
var PrizeChart= React.createClass({

  componentDidMount: function(){
    var MyChart= Echarts.init(document.getElementById('map'))
    MyChart.on(ecConfig.EVENT.MAP_SELECTED, function (param){
        console.log(optionData)
        var selected = param.selected;
        var selectedProvince;
        var name;
        for (var i = 0, l = option.series[0].data.length; i < l; i++) {
            name = option.series[0].data[i].name;
            option.series[0].data[i].selected = selected[name];
            if (selected[name]) {
                selectedProvince = name;
            }
        }
        if (typeof selectedProvince == 'undefined') {
            option.series.splice(1);
            option.legend = null;
            option.dataRange = null;
            MyChart.setOption(option, true);
            return;
        }
        option.series[1] = {
            name: '消费者奖品兑换',
            type: 'map',
            mapType: selectedProvince,
            itemStyle:{
                normal:{label:{show:true}},
                emphasis:{label:{show:true}}
            },
            mapLocation: {
                x: '35%'
            },
            roam: true,
            data:optionData
        };
        option.legend = {
            x:'right',
            data:['消费者奖品兑换']
        };
        option.dataRange = {
            orient: 'horizontal',
            x: 'right',
            min: 0,
            max: 1000,
            color:['orange','yellow'],
            text:['高','低'],           // 文本，默认为数值文本
            splitNumber:0
        };
        MyChart.setOption(option, true);
    });
    MyChart.setOption(option);
  },
  render: function(){
    return (
      <div id="map" style={{width:945, height:600}}>
      </div>
    )
  }
})



module.exports = {
	SaleDataPrize : SaleDataPrize
}