// 促销数据管理  奖品兑换流水
import React from 'react';
import Col from 'antd/lib/col';
import { DatePicker } from 'antd/lib';
import { Button } from 'antd/lib';
import Form from 'antd/lib/form';
import message from 'antd/lib/message';
import Chart from 'rc-echarts';

const FormItem = Form.Item;

class DateRange extends React.Component{
  constructor() {
    super();
    this.state =  {
        startTime : undefined,
        endTime : undefined
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.onChange = this.onChange.bind(this);
      this.disabledStartDate = this.disabledStartDate.bind(this);
      this.disabledEndDate = this.disabledEndDate.bind(this);
  }
  disabledStartDate(startValue) {
    if (!startValue || !this.state.endValue) {
      return false;
    }
    return startValue.getTime() >= this.state.endValue.getTime();
  }
  disabledEndDate(endValue) {
    if (!endValue || !this.state.startValue) {
      return false;
    }
    return endValue.getTime() <= this.state.startValue.getTime();
  }
  onChange(field, value) {
    this.setState({
      [field]: value,
    });
  }
  handleSubmit(e) {
    // ********************************************************** ajax提交数据，获取table的data值
    e.preventDefault();
    
    message.success('收到表单值~~~ ：' + JSON.stringify(this.state, function(k, v) {
      if (typeof v === 'undefined') {
        return '';
      }
      return v;
    }));
  }
  render() {
    return <div>
      <div style={{width:945, height:60}}>
        <Form inline onSubmit={this.handleSubmit}>
          <Col span="3">
          <DatePicker placeholder="开始日期" onChange={this.onChange.bind(this,'startTime')} />
        </Col>
        <Col span="1">
          <p className="ant-form-split">-</p>
        </Col>
         <Col span="3">
          <DatePicker disabledDate={this.disabledEndDate} placeholder="结束日期" onChange={this.onChange.bind(this,'endTime')} />
        </Col>
        <Col span="3">
        <FormItem>
          <Button type="primary" htmlType="submit" style={{marginLeft:10}}>查询</Button>
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
	}
	render(){
		return(
			<div className="m-list">
			     <DateRange />
           <div id="map" style={{width:945}}>
            <Map />
          </div>
			</div>
		)
	}
}

class Map extends React.Component{
    render() {
    const options = {
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
                {name: '北京', selected:false},
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
    return (
      <Chart {...options} onReady={this.ready}>
        <Chart.Map
          name="消费者扫码量"
          data={[
                {name: '北京',value:100},
                {name: '天津',value: 200}
              ]} />

      </Chart>
    );
  }
}



module.exports = {
	SaleDataPrize : SaleDataPrize
}