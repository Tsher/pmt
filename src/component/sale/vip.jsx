// 促销管理  会员管理

import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import Form from 'antd/lib/form';
import message from 'antd/lib/message';
import Table from 'antd/lib/table';
import { Link } from 'react-router';
import { createHistory } from 'history';
import Modal from 'antd/lib/modal';
import Popover from 'antd/lib/popover';
import DatePicker from 'antd/lib/date-picker';
import Radio from 'antd/lib/radio';

const RadioGroup = Radio.Group;
const confirm = Modal.confirm;
const history = createHistory();
const FormItem = Form.Item;

class SelectForm extends React.Component {
    //mixins: [Form.ValueMixin],
    constructor() {
        super();
        this.state = {
            Member_SName: '', // 昵称
            Member_Name: '', // 登录名
            Register_On_S: '', // 注册开始时间
            Register_On_E: '', // 注册结束时间
            Member_Phone: '', // 手机号
            excel : 'javascript:;',
        };
        this.setValue = this.setValue.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.disabledEndDate = this.disabledEndDate.bind(this);
    }

    // 文本框的值 同步到 state
    setValue(e) {
        var name = e.target.name;
        this.setState({
            [name]: e.target.value
        })
    }


    handleSubmit(e) {
        // ********************************************************** ajax提交数据，获取table的data值
        e&&e.preventDefault();
        this.setState({
            Register_On_S: _G.timeFormat2(new Date(this.state.Register_On_S).getTime(), 'YYYY-MM-DD'),
            Register_On_E: _G.timeFormat2(new Date(this.state.Register_On_E).getTime(), 'YYYY-MM-DD')
        })
        this.props.changeTableState(this.state);


        //excel导出 begin
        var _this = this;
        var url = config.__URL + config.sale.user.excel;
        var data = this.state;
        _G.getExcel({
           url : url,
           data : data,
           callback : function(d){
               var excel = d.ReturnOperateStatus;
               _this.setState({
                   excel : excel
               })
           }
        });
        //excel导出 end

    }
    componentDidMount() {
        this.handleSubmit()
    }

    // datepicker change
    onChange(field, value) {
        this.setState({
            [field]: value
        })
    }

    disabledEndDate(endValue) {
        if (!endValue || !this.state.Register_On_S) {
            return false;
        }
        return endValue.getTime() <= this.state.Register_On_S.getTime();
    }

    render() {
      return(
        <div className="fright">
          <Form inline onSubmit={this.handleSubmit}>
              <Row>
                  <Col span="24">
                      <div className="fright">
                          <ul className="clearfix">
                              <li className="fleft">
                                  <FormItem label="登录名：">
                                      <Input placeholder="" name="Member_Name" onChange={this.setValue} value={this.state.Member_Name} />
                                  </FormItem>
                              </li>
                              <li className="fleft">
                                  <FormItem label="昵称：" >
                                      <Input placeholder="" name="Member_SName" onChange={this.setValue} value={this.state.Member_SName} />
                                  </FormItem>
                              </li>
                              <li className="fleft date-picker">
                                  <FormItem id="Register_On_S" label="注册时段：" labelCol={{span : 5}}>
                                      <Row span="24">
                                          <Col span="10">
                                              <DatePicker placeholder="开始日期"  onChange={this.onChange.bind(this, 'Register_On_S')} />
                                          </Col>
                                          <Col span="1">
                                              <p className="ant-form-split">-</p>
                                          </Col>
                                          <Col span="10">
                                              <DatePicker disabledDate={this.disabledEndDate} placeholder="结束日期" onChange={this.onChange.bind(this, 'Register_On_E')} />
                                          </Col>
                                      </Row>
                                  </FormItem>
                              </li>
                              <li className="fleft">
                                  <FormItem label="手机号：">
                                      <Input placeholder="" name="Member_Phone" onChange={this.setValue} value={this.state.Member_Phone} />
                                  </FormItem>
                              </li>
                              <li className="fleft">
                                  <FormItem>
                                      <Button type="primary" shape="circle" size="large" htmlType="submit">
                                          <Icon type="search" />
                                      </Button>
                                  </FormItem>
                              </li>
                              <li className="fleft">
                                  <FormItem>
                                      <a href={this.state.excel}>
                                        <Button type="primary" size="large"><Icon type="download" /><span>导出报表</span></Button>
                                      </a>
                                  </FormItem>
                              </li>
                          </ul>
                      </div>
                  </Col>
              </Row>
          </Form>
        </div>
      )
    }
}

let modalState;

function showModal(e) {
    Event.stop(e);
    var tar = Event.target(e);
    var id = tar.getAttribute('data-id'),
        state = tar.getAttribute('data-state'),
        text = state ? '解冻' : '冻结';
    modalState(id, state, text)
}

const columns = [{
    title: '会员编号',
    dataIndex: 'Member_Code',
    key: 'Member_Code',
    render: function(text, record) {
      var href= '/sale/vip/info/'+text;
      return <Link to={href}>{text}</Link>;
    }
}, {
    title: '昵称',
    dataIndex: 'Member_SName',
    key: 'Member_SName'
}, {
    title: '电子邮箱',
    dataIndex: 'Member_Email',
    key: 'Member_Email'
}, {
    title: '手机号',
    dataIndex: 'Member_Phone',
    key: 'Member_Phone'
}, {
    title: '注册时间',
    dataIndex: 'RegisterTime',
    key: 'RegisterTime'
}, {
    title: '会员状态',
    dataIndex: 'Member_Status',
    key: 'Member_Status'
}, {
    title: '操作',
    key: 'operation',
    render: function(text, record) {
      return <span><a href="#" onClick={showModal} data-id={record.Member_Code} data-state={record.Member_Status} >{record.Member_Status =='正常'?'冻结':'解冻'}</a></span>;
    }
}];

class SaleVip extends React.Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            title: '',
            ModalText: '',
            changeId: false,
            total: 0,
            data: [],
            opts: {
                page: 1,
                pageSize: 10,
            }
        }
        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.changeTableState = this.changeTableState.bind(this);
        this.tableChange = this.tableChange.bind(this);
        this.showSizechange = this.showSizechange.bind(this);
    }

    componentDidMount() {
        modalState = this.showModal;
    }
    componentWillUnmount() {
        modalState = false;
    }
    showModal(id, state, text) {
        this.setState({
            visible: true,
            ModalText: '你正要' + text + ' "' + id + '"的用户，是否继续？',
            confirmLoading: false,
            changeId: id
        })
    }

    // 点击分页
    tableChange(pagination){
        var opts = _G.assign({},this.state.opts);
        opts.page = pagination.current;
        opts.pageSize = pagination.pageSize;
        this.changeTableState(opts);
    }
    // 每页数据条数变化
    showSizechange(current, pageSize){
        var opts = _G.assign({},this.state.opts);
        opts.page = current;
        opts.pageSize = pageSize;
        this.changeTableState(opts);
    }

    handleOk(e) {
        //******************* 冻结，解冻 逻辑 changeId , 然后 关闭****************************
        var opts = {
            Member_Code: this.state.changeId
        }
        _G.ajax({
            url: config.__URL + config.sale.vip.freeze,
            type: "get",
            data: opts,
            success: function(res) {
                var _tmp = this.state.data
                for(var i=0;i<_tmp.length;i++){
                  if(_tmp[i].Member_Code==opts.Member_Code){
                    _tmp[i]['Member_Status'] = _tmp[i]['Member_Status'] =='正常'?'冻结':'正常'
                  }
                }
                this.setState({
                    data: _tmp,
                    visible: false
                })
            }.bind(this)
        })
    }
    handleCancel(e) {
        this.setState({
            visible: false
        })
    }

    // 发送ajax请求，获取table值
    changeTableState(opts) {
        var opts = opts || {};
        opts.page = opts.page || this.state.opts.page;
        opts.pageSize = opts.pageSize ||  this.state.opts.pageSize;
        this.setState({
          opts : opts
        })
        _G.ajax({
            url: config.__URL + config.sale.vip.list,
            type: "get",
            data: opts,
            success: function(res) {
                var d = [];
                for (var i = 0, l = res.Data.length; i < l; i++) {
                    d[i] = res.Data[i];
                    d[i]['key'] = res.Data[i].User_Code;
                    d[i]['RegisterTime'] = _G.timeFormat2(d[i].RegisterTime)
                }
                this.setState({
                    data: d,
                    total : res.TotalCount
                })
            }.bind(this)
        })
    }

    render() {
      return(
        <div className="m-list">
            <Row>
                <Col span="24">
                    <SelectForm changeTableState={this.changeTableState} />
                </Col>
            </Row>
            <Row>
                <Table 
                  onChange={this.tableChange}
                  onShowSizeChange={this.showSizechange}
                  columns={columns} 
                  dataSource={this.state.data} 
                  pagination={{showQuickJumper:true,pageSize:this.state.opts.pageSize,current:this.state.opts.page,showSizeChanger:true,total:this.state.total}} />
            </Row>
            <Modal visible={this.state.visible} onOk={this.handleOk} confirmLoading={this.state.confirmLoading} onCancel={this.handleCancel}>
                <p>{this.state.ModalText}</p>
            </Modal>
        </div>
      )
    }
}
module.exports = {
    SaleVip: SaleVip
}
