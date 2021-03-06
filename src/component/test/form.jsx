import React from 'react';
import {Form,Input,Col,Datepicker} from 'antd';

const FormItem = Form.Item;


class FormTest extends React.Component{
	render(){
		return (
			<Form horizontal>
    <FormItem
      label="失败校验："
      labelCol={{span: 5}}
      wrapperCol={{span: 12}}
      validateStatus="error"
      help="请输入数字和字母组合">
      <Input defaultValue="无效选择" id="error" />
    </FormItem>

    <FormItem
      label="警告校验："
      labelCol={{span: 5}}
      wrapperCol={{span: 12}}
      validateStatus="warning">
      <Input defaultValue="前方高能预警" id="warning" />
    </FormItem>

    <FormItem
      label="校验中："
      labelCol={{span: 5}}
      wrapperCol={{span: 12}}
      hasFeedback
      validateStatus="validating"
      help="信息审核中...">
      <Input defaultValue="我是被校验的内容" id="validating" />
    </FormItem>

    <FormItem
      label="成功校验："
      labelCol={{span: 5}}
      wrapperCol={{span: 12}}
      hasFeedback
      validateStatus="success">
      <Input defaultValue="我是正文" id="success" />
    </FormItem>

    <FormItem
      label="警告校验："
      labelCol={{span: 5}}
      wrapperCol={{span: 12}}
      hasFeedback
      validateStatus="warning">
      <Input defaultValue="前方高能预警" id="warning" />
    </FormItem>

    <FormItem
      label="失败校验："
      labelCol={{span: 5}}
      wrapperCol={{span: 12}}
      hasFeedback
      validateStatus="error"
      help="请输入数字和字母组合">
      <Input defaultValue="无效选择" id="error" />
    </FormItem>

    <FormItem
      label="Datepicker："
      labelCol={{span: 5}}
      validateStatus="error">
      <Col span="6">
        <Datepicker />
      </Col>
      <Col span="1">
        <p className="ant-form-split">-</p>
      </Col>
      <Col span="6">
        <Datepicker />
      </Col>
      <Col span="19" offset="5">
        <p className="ant-form-explain">请输入正确选项</p>
      </Col>
    </FormItem>
  </Form>
		)
	}
}

modules.exports = {
	FormTest : FormTest
}