import React from 'react';
import { Form, Row, Col, Input, Button, Table, Modal, Select, DatePicker, Popover } from 'antd';
// import './index.css'
import { FormComponentProps } from 'antd/lib/form';
import { connect } from 'dva';
import router from "umi/router"

const { Option } = Select;
const { RangePicker } = DatePicker;
const reviewStatus = {
  0: '待审核',
  1: '审核成功',
  2: '审核失败'
}
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
          dataIndex: 'serial',
          key: 'serial',
          align: "center",
        },
        // {
        //   title: '活动ID',
        //   dataIndex: 'id',
        //   key: 'id',
        //   align: "center",
        // },
        {
          title: '推荐人',
          dataIndex: 'recommender',
          key: 'recommender',
          align: "center",
        },
        {
          title: '推荐时间',
          dataIndex: 'recommendDate',
          key: 'recommendDate',
          align: "center",
        },
        {
          title: '活动名称',
          dataIndex: 'activitytName',
          key: 'activitytName',
          align: "center",
        },
        {
          title: '活动副标题',
          dataIndex: 'activitytSubTitle',
          key: 'activitytSubTitle',
          align: "center",
        },
        {
          title: '活动说明',
          dataIndex: 'activitytDestription',
          key: 'activitytDestription',
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
          render: (text: {
            prizeStatus: Number
          }): JSX.Element => {
            return <span>{text.prizeStatus === 0 ? '未发放' : '已发放'}</span>
          },
          key: 'prizeStatus',
          align: "center",
        },
        {
          title: '审核状态',
          key: 'reviewStatus',
          align: "center",
          render: (text: {
            reviewStatus: 0 | 1 | 2
          }, record: any): JSX.Element => {
            return (
              <span>
                {text.reviewStatus !== 2 && <span>{reviewStatus[text.reviewStatus]}</span>}
                {text.reviewStatus === 2 && <Popover content={<span>{record.reason}</span>}><span>{reviewStatus[text.reviewStatus]}</span></Popover>}
              </span>
            )
          },
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

  componentDidMount(): void {
    this.props.dispatch({
      type: 'fyhList/fetch',
      query: {
        pageNo: 1,
        pageSize: 10,
      }
    })
  }
  goDetail(record: any) {
    router.push("./list/detail?id=" + record.id)
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

  // 将获取到的标准时间转换格式
  formatDate(date: any) {
    if (date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? '0' + m : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      return y + '-' + m + '-' + d;
    } else {
      return undefined
    }
  }
  // 搜索按钮
  handleSearch = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log(values)
      if (!err) {
        let obj = {
          activitytSubTitle: values.activitytSubTitle && values.activitytSubTitle.trim(),
          recommender: values.recommender && values.recommender.trim(),
          activitytName: values.activitytName && values.activitytName.trim(),
          recommendBeginDate: this.formatDate(values.recommendDate && values.recommendDate.length != 0 ? values.recommendDate[0]._d : undefined),
          recommendEndDate: this.formatDate(values.recommendDate && values.recommendDate.length != 0 ? values.recommendDate[1]._d : undefined),
        }
        // 当对象key值无数据时删除该key
        for (let key in obj) {
          if (!obj[key]) {
            delete obj[key]
          }
        }
        this.props.dispatch({
          type: 'fyhList/fetch',
          payload: obj,
          query: {
            pageNo: 1,
            pageSize: 10,
          }
        })
      }
    });
  };

  onChangePagesize = (page: any) => {
    this.props.dispatch({
      type: 'fyhList/fetch',
      paload:this.props.form.getFieldsValue(),
      query: {
        pageNo: page,
        pageSize: 10,
      }
    })
  }

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
                  // rules: [
                  //   {
                  //     required: true,
                  //     message: '请输入推荐人',
                  //   },
                  // ],
                })(<Input placeholder="请输入推荐人" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item {...formItemLayout} label="推荐时间">
                {getFieldDecorator('recommendDate', {
                  // rules: [
                  //   {
                  //     required: true,
                  //     message: '请选择推荐时间',
                  //   },
                  // ],
                })(<RangePicker />)}
              </Form.Item>
            </Col>
            {/* <Col span={8}>
              <Form.Item {...formItemLayout} label="奖励状态" hasFeedback={true}>
                {getFieldDecorator('prizeStatus', {
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
            </Col> */}
            <Col span={8}>
              <Form.Item {...formItemLayout} label="活动名称">
                {getFieldDecorator('activitytName', {
                  // rules: [
                  //   {
                  //     required: true,
                  //     message: '请输入活动名称',
                  //   },
                  // ],
                })(<Input placeholder="请输入推荐产品" />)}
              </Form.Item>
            </Col>
            {/* <Col span={8}>
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
            </Col> */}
            {/* <Col span={8}>
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
            </Col> */}
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

        {/* <Row gutter={20}>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit" onClick={this.fnDiscontinueUse}>
              批量审核
            </Button>
          </Col>
        </Row> */}
        
        <Table rowSelection={rowSelection} rowKey={((record: object, index: number) => record.id)} pagination={{ total: this.props.fyhList.totalResults, onChange: this.onChangePagesize }} columns={this.state.tableColumns} dataSource={this.props.fyhList.tableData} loading={this.props.loading.global} />
      </div>
    );
  }
}


// const WrappedAdvancedSearchForm = Form.create<UserFormProps>()(AdvancedSearchForm);

// export default WrappedAdvancedSearchForm
