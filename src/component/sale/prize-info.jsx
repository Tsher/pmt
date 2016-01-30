//  促销数据   奖品  新增 and 编辑

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
import Upload from 'antd/lib/upload';
import Icon from 'antd/lib/icon';

import Select from 'antd/lib/select';
import Radio from 'antd/lib/radio';

import { createHistory } from 'history';

const FormItem = Form.Item;
const Validator = Validation.Validator;
const Option = Select.Option;
const RadioGroup = Radio.Group;

const FieldMixin = Validation.FieldMixin;

const History = createHistory();

const goBack = History.goBack;

const msg_error = function() {
    message.error('数据验证错误,请检查后提交')
}
const msg_success = function() {
    message.success('数据提交成功，等待后台处理')
}

class SalePrizeInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '', // 奖品id
            title: '奖品信息',
            Prize_Name: '', // 奖品名称
            Unit: '', // 单位
            Prize_Type: '', // 奖品类别
            Image: '', // 奖品图片
            Brand: '', // 品牌
            RegisterOn: '', // 入网日期
            Spec: '' // 规格
        };

        this.handleReset = this.handleReset.bind(this);
        this.renderPic = this.renderPic.bind(this);
    }

    componentDidMount() {
        var opts = {
            Prize_Code: this.props.params.id
        }
        _G.ajax({
            url: config.__URL + config.sale.prize.info,
            type: "get",
            data: opts,
            success: function(res) {
                this.setState(Object.assign(res.Data[0],{RegisterOn:_G.timeFormat2(res.Data[0].RegisterOn)}))
            }.bind(this)
        })
    }

    handleReset(e) {
        e.preventDefault();
        goBack();
    }

    renderPic() {
        if (this.state.Image) {
            return (<img src={this.state.Image} style={{width: '100%'}} />)
        }
    }

    render() {
      return (
        <div className="m-form">
            <div className="m-form-title">{this.state.title}</div>
            <div className="m-form-con">
                <Form horizontal>
                    <Row>
                        <Col span="8">
                            <FormItem label="单位：" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                                <Input disabled name="Unit" value={this.state.Unit}/>
                            </FormItem>
                            <FormItem label="入网日期：" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                                <Input disabled name="RegisterOn" value={this.state.RegisterOn}/>
                            </FormItem>
                            <FormItem label="品牌：" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                                <Input disabled name="Brand" value={this.state.Brand} />
                            </FormItem>
                            <FormItem label="规格：" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                                <Input disabled name="Spec" value={this.state.Spec}/>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="奖品名称："labelCol={{span: 8}} wrapperCol={{span: 12}}>
                                <Input disabled name="Prize_Name" value={this.state.Prize_Name} />
                            </FormItem>
                            <FormItem label="奖品类别：" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                                <Select name="Prize_Type" value={this.state.Prize_Type} disabled>
                                    <Option value="话费">话费</Option>
                                    <Option value="微信红包">微信红包</Option>
                                    <Option value="实物">实物</Option>
                                    <Option value="视频网站会员">视频网站会员</Option>
                                    <Option value="电影票">电影票</Option>
                                    <Option value="电子券">电子券</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="奖品图片：" labelCol={{span: 8}} wrapperCol={{span: 12}}>
                                {this.renderPic}
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
            <div className="m-form-btns">
                <Row>
                    <Col span="8" offset="2">
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Button type="primary" onClick={this.handleReset}>确定</Button>
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
  SalePrizeInfo : SalePrizeInfo
}


