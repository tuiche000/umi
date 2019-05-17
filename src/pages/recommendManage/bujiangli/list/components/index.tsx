import React from 'react';
import { Form, Row, Col, Input, Button, Table, Divider, Modal, Select, Radio, Popconfirm, message, Icon, DatePicker } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import router from "umi/router"
import { connect } from 'dva';

const { Option } = Select;
const { RangePicker } = DatePicker;
interface ComponentProps {
  record?: any,
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
          render: (text: any, record: any) => (
            <span>
              <Popconfirm
                title="Are you sure？"
                icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
              >
                <a href="javascript:;">停用</a>
              </Popconfirm>
            </span>
          ),
        },
      ], // 表格表头
    };

    this.fnDiscontinueUse = this.fnDiscontinueUse.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'bjlList/fetch',
      payload: ''
    })
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
      labelCol: { span: 5 },
      wrapperCol: { span: 9 },
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
    return (
      <div>
        <Form className="ant-advanced-search-form" onSubmit={this.handleSearch} >
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item {...formItemLayout} label="操作人">
                {getFieldDecorator('recommender', {
                  rules: [
                    {
                      required: true,
                      message: '请输入操作人',
                    },
                  ],
                })(<Input placeholder="请输入操作人" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item {...formItemLayout} label="补发时间">
                {getFieldDecorator('recommendedTime', {
                  rules: [
                    {
                      required: true,
                      message: '请选择补发时间',
                    },
                  ],
                })(<RangePicker />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item {...formItemLayout} label="奖励状态" hasFeedback={true}>
                {getFieldDecorator('recommendation', {
                  rules: [{ required: true, message: '请选择' }],
                  initialValue: ['yes'],
                })(
                  <Select placeholder="请选择">
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
                  rules: [
                    {
                      required: true,
                      message: '请输入用户名',
                    },
                  ],
                })(<Input placeholder="请输入用户名" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item {...formItemLayout} label="用户手机号">
                {getFieldDecorator('recommendedPerson', {
                  rules: [
                    {
                      required: true,
                      message: '请输入用户手机号',
                    },
                  ],
                })(<Input placeholder="请输入用户手机号" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item {...formItemLayout} label="审核状态" hasFeedback={true}>
                {getFieldDecorator('auditStatus', {
                  rules: [{ required: true, message: '请选择' }],
                  initialValue: ['pass'],
                })(
                  <Select placeholder="请选择">
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
            <Button type="primary" htmlType="submit" onClick={this.fnDiscontinueUse} style={{marginLeft: 10}}>
              新增
            </Button>
          </Col>
        </Row>
        <Table rowSelection={rowSelection} columns={this.state.tableColumns} dataSource={this.props.bjlList.tableData} />
      </div>
    );
  }
}
