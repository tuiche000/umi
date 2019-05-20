import React from 'react';
import { Form, Row, Col, Input, Button, Table, Divider, Modal, Select, Radio, Popconfirm, message, Icon, DatePicker } from 'antd';
// import './index.css'
import { FormComponentProps } from 'antd/lib/form';
import { connect } from 'dva';
import router from "umi/router"

const { Option } = Select;
const { RangePicker } = DatePicker;
interface UserFormProps extends FormComponentProps {
  record?: any,
  fyhList: {
    tableData: object[]
  },
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
@Form.create<UserFormProps>()
export default class AdvancedSearchForm extends React.Component<UserFormProps, BasicLayoutState> {
  constructor(props: UserFormProps) {
    super(props)
    this.state = {
      setUpVisible: false, //  控制批量设置模态框显示隐藏
      EditVisible: false, //  控制编辑模态框显示隐藏
      selectedRowKeys: [], // 表格选择框选定的数据
      record: {}, //编辑选中的数据
      tableColumns: [
        {
          title: '序号',
          dataIndex: 'Serial',
          key: 'Serial',
          align: "center",
        },
        {
          title: '活动ID',
          dataIndex: 'ActivityID',
          key: 'ActivityID',
          align: "center",
        },
        {
          title: '推荐人',
          dataIndex: 'Recommender',
          key: 'Recommender',
          align: "center",
        },
        {
          title: '推荐时间',
          dataIndex: 'RecommendedTime',
          key: 'RecommendedTime',
          align: "center",
        },
        {
          title: '活动名称',
          dataIndex: 'ActivityName',
          key: 'ActivityName',
          align: "center",
        },
        {
          title: '活动副标题',
          dataIndex: 'ActivitySubtitle',
          key: 'ActivitySubtitle',
          align: "center",
        },
        {
          title: '活动说明',
          dataIndex: 'ActivityDescription',
          key: 'ActivityDescription',
          align: "center",
        },
        {
          title: '活动类型',
          dataIndex: 'ActivityType',
          key: 'ActivityType',
          align: "center",
        },
        {
          title: '目前阶段',
          dataIndex: 'CurrentStage',
          key: 'CurrentStage',
          align: "center",
        },
        {
          title: '奖励状态',
          dataIndex: 'RewardStatus',
          key: 'RewardStatus',
          align: "center",
        },
        {
          title: '审核状态',
          dataIndex: 'AuditStatus',
          key: 'AuditStatus',
          align: "center",
        },
        {
          title: '订单类型',
          dataIndex: 'orderType',
          key: 'orderType',
          align: "center",
        },
        {
          title: '操作',
          key: 'action',
          align: "center",
          render: (text: any, record: any) => (
            <span>
              <a href="javascript:;" onClick={this.goDetail.bind(this, record)}>查看详情</a>
            </span>
          ),
        },
      ], // 表格表头
    };

    this.fnDiscontinueUse = this.fnDiscontinueUse.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }
  goDetail(record: any) {
    console.log("111", record)
    router.push("./list/detail")
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
    return (
      <div>
        <Form className="ant-advanced-search-form" onSubmit={this.handleSearch} >
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item {...formItemLayout} label="推荐人">
                {getFieldDecorator('recommender', {
                  rules: [
                    {
                      required: true,
                      message: '请输入推荐人',
                    },
                  ],
                })(<Input placeholder="请输入推荐人" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item {...formItemLayout} label="推荐时间">
                {getFieldDecorator('recommendedTime', {
                  rules: [
                    {
                      required: true,
                      message: '请选择推荐时间',
                    },
                  ],
                })(<RangePicker />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item {...formItemLayout} label="奖励状态" hasFeedback={true}>
                {getFieldDecorator('rewardStatus', {
                  rules: [{ required: true, message: '请选择' }],
                  initialValue: ['issued'],
                })(
                  <Select placeholder="请选择">
                    <Option value="issued">已发放</Option>
                    <Option value="unissued">未发放</Option>
                    <Option value="audit">审核中</Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item {...formItemLayout} label="活动名称">
                {getFieldDecorator('ActivityName', {
                  rules: [
                    {
                      required: true,
                      message: '请输入活动名称',
                    },
                  ],
                })(<Input placeholder="请输入推荐产品" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item {...formItemLayout} label="订单类型" hasFeedback={true}>
                {getFieldDecorator('OrderType', {
                  rules: [{ required: true, message: '请选择' }],
                  initialValue: ["1"],
                })(
                  <Select placeholder="请选择">
                    <Option value="1">正常单</Option>
                    <Option value="2">补单</Option>
                  </Select>,
                )}
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
          </Col>
        </Row>
        <Table rowSelection={rowSelection} columns={this.state.tableColumns} dataSource={this.props.fyhList.tableData} />
      </div>
    );
  }
}


// const WrappedAdvancedSearchForm = Form.create<UserFormProps>()(AdvancedSearchForm);

// export default WrappedAdvancedSearchForm
