import React from 'react';
import { Form, Row, Col, Input, Button, Table, Divider, Modal, Select, Radio, Popconfirm, message, Icon, DatePicker } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import router from "umi/router"
import { connect } from 'dva';
import moment from 'moment';

const { Option } = Select;
const { RangePicker } = DatePicker;
interface ComponentProps {
  record?: any,
  dispatch: Function,
}
interface BasicLayoutState {
  setUpVisible: boolean,
  EditVisible: boolean,
  selectedRowKeys: any[],
  tableData?: any[],
  tableColumns: any[],
  record: any,
}

@connect(
  (props: {}, state: {}) => Object.assign({}, props, state)
)
@Form.create<FormComponentProps>()
export default class AdvancedSearchForm extends React.Component<ComponentProps, BasicLayoutState> {
  constructor(props: ComponentProps) {
    super(props)
    this.state = {
      setUpVisible: false, //  控制批量设置模态框显示隐藏
      EditVisible: false, //  控制编辑模态框显示隐藏
      selectedRowKeys: [], // 表格选择框选定的数据
      record: {}, //编辑选中的数据
      tableColumns: [
        {
          title: '序号',
          dataIndex: '0',
          key: '0',
          align: "center",
        },
        {
          title: '补发ID',
          dataIndex: '1',
          key: '1',
          align: "center",
        },
        {
          title: '操作人',
          dataIndex: 'Recommender',
          key: 'Recommender',
          align: "center",
        },
        {
          title: '补发时间',
          dataIndex: 'RecommendedTime',
          key: 'RecommendedTime',
          align: "center",
        },
        {
          title: '所属平台',
          dataIndex: 'ProductName',
          key: 'ProductName',
          align: "center",
        },
        {
          title: '用户名',
          dataIndex: 'PlatformType',
          key: 'PlatformType',
          align: "center",
        },
        {
          title: '用户手机号码',
          dataIndex: 'Recommendation',
          key: 'Recommendation',
          align: "center",
        },
        {
          title: '奖励金额',
          dataIndex: 'RecommendedPerson',
          key: 'RecommendedPerson',
          align: "center",
        },
        {
          title: '奖励状态',
          dataIndex: 'RecommendedWay',
          key: 'RecommendedWay',
          align: "center",
        },
        {
          title: '审核状态',
          dataIndex: 'AuditStatus',
          key: 'AuditStatus',
          align: "center",
        },
        {
          title: '操作',
          key: 'action',
          width: 120,
          align: "center",
          render: (text: any, record: any) => {
            return (
              <span>
                <a href="javascript:;" onClick={this.fnDetail.bind(this, record)}>查看详情</a>
              </span>
            )
          },
        },
      ], // 表格表头
    };

    this.fnDiscontinueUse = this.fnDiscontinueUse.bind(this)
    this.fnAdd = this.fnAdd.bind(this)
    // this.fnDetail = this.fnDetail.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  componentDidMount() {
    // this.props.dispatch({
    //   type: 'bjlList/fetch',
    //   payload: ''
    // })
    console.log(this.props)
  }

  // 详情
  fnDetail(record: {
    id: string
  }) {
    router.push(`./bujiangli/detail?id=${record.id}`)
  }

  // 新增
  fnAdd() {
    router.push('./bujiangli/add')
  }

  // 批量停用模态框
  fnDiscontinueUse() {
    let that = this
    Modal.confirm({
      content: '批量处理审核数据',
      okText: '审核通过',
      cancelText: '审核未通过',
      icon: null,
      centered: true,
      onOk() {
        console.log(that.state.selectedRowKeys)
      }
    });
  }

  // 搜索按钮
  handleSearch = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
    });
  };

  render() {

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 14 },
    }
    const { getFieldDecorator } = this.props.form

    // 表格被选择时的回调函数
    const rowSelection = {
      onChange: (selectedRowKeys: any, selectedRows: any) => {
        this.setState({
          selectedRowKeys,
        })
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
    };
    const disabledDate = (current: any) => {
      // Can not select days after today
      return current && current > moment().endOf('day');
    }
    return (
      <div>
        <Form className="ant-advanced-search-form" onSubmit={this.handleSearch} >
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item {...formItemLayout} label="操作人">
                {getFieldDecorator('recommender', {
                })(<Input placeholder="请输入操作人" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item {...formItemLayout} label="补发时间">
                {getFieldDecorator('recommendedTime', {
                })(<RangePicker allowClear={true} disabledDate={disabledDate} />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item {...formItemLayout} label="奖励状态" hasFeedback={true}>
                {getFieldDecorator('recommendation', {
                  // initialValue: ['0'],
                })(
                  <Select placeholder="请选择" allowClear={true}>
                    <Option value="0">已发放</Option>
                    <Option value="1">未发放</Option>
                    <Option value="2">审核中</Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item {...formItemLayout} label="用户名">
                {getFieldDecorator('recommendedProducts', {
                })(<Input placeholder="请输入用户名" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item {...formItemLayout} label="用户手机号">
                {getFieldDecorator('recommendedPerson', {
                })(<Input placeholder="请输入用户手机号" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item {...formItemLayout} label="审核状态" hasFeedback={true}>
                {getFieldDecorator('auditStatus', {
                  // initialValue: ['pass'],
                })(
                  <Select placeholder="请选择" allowClear={true}>
                    <Option value="pass">审核通过</Option>
                    <Option value="notPass">审核未通过</Option>
                    <Option value="wait">待审核</Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: 'center' }}>
              <Button type="primary" htmlType="submit">
                搜索
            </Button>
            </Col>
          </Row>
        </Form>
        <br />
        <Row gutter={20}>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit" onClick={this.fnDiscontinueUse}>
              批量审核
            </Button>
            <Button type="primary" htmlType="submit" onClick={this.fnAdd} style={{ marginLeft: 10 }}>
              新增
            </Button>
          </Col>
        </Row>
        <Table loading={this.props.loading.global} rowSelection={rowSelection} columns={this.state.tableColumns} dataSource={this.props.bjlList.tableData} />
      </div>
    );
  }
}
