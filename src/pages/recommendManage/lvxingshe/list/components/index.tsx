import React from 'react';
import { Form, Row, Col, Input, Button, Table, Divider, Modal, Select, Popconfirm, Icon, DatePicker, Popover } from 'antd';
// import './index.css'
import { FormComponentProps } from 'antd/lib/form';
import { connect } from 'dva';
import moment from 'moment';


const { Option } = Select;
const { RangePicker } = DatePicker;
const reviewStatus = {
  0: '待审核',
  1: '审核成功',
  2: '审核失败'
}

interface UserFormProps extends FormComponentProps {
  record?: any,
  lxsList: {
    tableData: object[],
    auditFailedVisible: boolean,
    seachData: any,
    pageNo: number,
    totalResults:any,
  },
  dispatch: Function,
}
interface BasicLayoutState {
  setUpVisible: boolean,
  EditVisible: boolean,
  selectedRowKeys: any[],
  tableData?: any[],
  tableColumns: any[],
  record: any,
  auditFailedVisible: boolean,
  current: number,
}

@connect(
  (props: {}, state: {}) => Object.assign({}, props, state)
)
@Form.create<UserFormProps>()
class AdvancedSearchForm extends React.Component<UserFormProps, BasicLayoutState> {
  constructor(props: UserFormProps) {
    super(props)
    this.state = {
      current: 1, // 手动设置分页
      auditFailedVisible: false,  // 控制审核失败模态框显示隐藏
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
        //   title: '推荐ID',
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
          title: '产品名称',
          dataIndex: 'productName',
          width: 200,
          key: 'productName',
          align: "center",
        },
        // {
        //   title: '平台类型',
        //   dataIndex: 'PlatformType',
        //   key: 'PlatformType',
        //   align: "center",
        // },
        // {
        //   title: '是否推荐成功',
        //   dataIndex: 'Recommendation',
        //   key: 'Recommendation',
        //   align: "center",
        // },
        {
          title: '被推荐人',
          dataIndex: 'recommended',
          key: 'recommended',
          align: "center",
        },
        // {
        //   title: '推荐方式',
        //   dataIndex: 'RecommendedWay',
        //   key: 'RecommendedWay',
        //   align: "center",
        // },
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
          title: '操作',
          key: 'action',
          width: 180,
          align: "center",
          render: (text: any, record: any) => (
            <span style={record.reviewStatus === 0 ? { display: "inline-block" } : { display: "none" }}>
              <Popconfirm
                title="Are you sure？"
                onConfirm={this.confirm.bind(this, record)}
                icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
              >
                <a href="javascript:;">审核成功</a>
              </Popconfirm>
              <Divider type="vertical" />
              <a href="javascript:;" onClick={this.auditFailed.bind(this, record)} >审核失败</a>
            </span>
          ),
        },
      ], // 表格表头
    };

    this.fnDiscontinueUse = this.fnDiscontinueUse.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.auditFailed = this.auditFailed.bind(this)
  }

  componentDidMount(): void {
    this.props.dispatch({
      type: 'lxsList/fetch',
      query: {
        pageNo: 1,
        pageSize: 10,
      }
    })
  }

  confirm = (record: any) => {
    console.log(this.props.lxsList.pageNo, this.props.lxsList.seachData)
    this.props.dispatch({
      type: 'lxsList/examine',
      payload: {
        id: record.id,
        status: "SUCCESSFUL",
      },
      fetchPayload: this.props.lxsList.seachData,
      query: this.props.lxsList.pageNo,
    })
  }

  // 审核失败模态框显示
  auditFailed(record: any) {
    this.props.dispatch({
      type: 'lxsList/save',
      payload: {
        auditFailedVisible: true
      }
    })
    this.setState({
      record,
    });
  }

  //  审核失败模态框点击取消回调
  auditFailedleCancel = (e: any) => {
    this.props.dispatch({
      type: 'lxsList/save',
      payload: {
        auditFailedVisible: false
      }
    })
  };

  // 批量停用模态框
  fnDiscontinueUse() {
    let that = this
    Modal.confirm({
      content: '批量处理审核数据',
      okText: '审核成功',
      cancelText: '审核失败',
      icon: null,
      centered: true,
      onOk() {
        // console.log(that.state.selectedRowKeys)
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
      let obj = {
        productName: values.productName && values.productName.trim(),
        recommendBeginDate: this.formatDate(values.recommendDate && values.recommendDate.length != 0 ? values.recommendDate[0]._d : undefined),
        recommendEndDate: this.formatDate(values.recommendDate && values.recommendDate.length != 0 ? values.recommendDate[1]._d : undefined),
        recommender: values.recommender && values.recommender.trim(),
        reviewStatus: values.reviewStatus,
        prizeStatus: values.prizeStatus,
      }
      // 当对象key值无数据时删除该key
      for (let key in obj) {
        if (!obj[key] && obj[key] !== 0) {
          delete obj[key]
        }
      }
      // 将搜索条件数据给到全局
      this.props.dispatch({
        type: 'lxsList/save',
        payload: {
          seachData: obj
        }
      })   
      this.props.dispatch({
        type: 'lxsList/fetch',
        payload: obj,
        query: {
          pageNo: 1,
          pageSize: 10,
        }
      })
      this.setState({
        current:1
      })
    });
  };

  onChangePagesize = (page: any) => {

    // 将页码给到全局
    this.props.dispatch({
      type: 'lxsList/save',
      payload: {
        pageNo: page
      }
    })
    // 手动设置分页
    this.setState({
      current: page,
    });
    this.props.dispatch({
      type: 'lxsList/fetch',
      payload: this.props.lxsList.seachData,
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
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
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
                })(<RangePicker format="YYYY-MM-DD" disabledDate={disabledDate} />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              {/* <Form.Item {...formItemLayout} label="是否推荐成功" hasFeedback={true}>
                {getFieldDecorator('recommendation', {
                  rules: [{ required: true, message: '请选择' }],
                  initialValue: ['yes'],
                })(
                  <Select placeholder="请选择">
                    <Option value="yes">是</Option>
                    <Option value="no">否</Option>
                  </Select>,
                )}
              </Form.Item> */}
            </Col>
            <Col span={8}>
              <Form.Item {...formItemLayout} label="推荐产品">
                {getFieldDecorator('productName', {
                  // rules: [
                  //   {
                  //     required: true,
                  //     message: '请输入推荐产品',
                  //   },
                  // ],
                })(<Input placeholder="请输入推荐产品" />)}
              </Form.Item>
            </Col>
            {/* <Col span={8}>
              <Form.Item {...formItemLayout} label="被推荐人">
                {getFieldDecorator('recommended', {
                  rules: [
                    {
                      required: true,
                      message: '请输入被推荐人',
                    },
                  ],
                })(<Input placeholder="请输入被推荐人" />)}
              </Form.Item>
            </Col> */}
            <Col span={8}>
              <Form.Item {...formItemLayout} label="奖励状态" hasFeedback={true}>
                {getFieldDecorator('prizeStatus', {
                  // rules: [{ required: true, message: '请选择' }],
                  // initialValue:[1],
                })(
                  <Select placeholder="请选择" allowClear={true}>
                    <Option value={1}>已发放</Option>
                    <Option value={0}>未发放</Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item {...formItemLayout} label="审核状态" hasFeedback={true}>
                {getFieldDecorator('reviewStatus', {
                  // rules: [{ required: true, message: '请选择' }],
                  // initialValue: [1],
                })(
                  <Select placeholder="请选择" allowClear={true}>
                    <Option value={1}>审核成功</Option>
                    <Option value={2}>审核失败</Option>
                    <Option value={0}>待审核</Option>
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
        {/* <Row gutter={20}>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit" onClick={this.fnDiscontinueUse}>
              批量审核
            </Button>
          </Col>
        </Row> */}
        <Table rowSelection={rowSelection} pagination={{ total: this.props.lxsList.totalResults, onChange: this.onChangePagesize, current: this.state.current }} rowKey={((record: object, index: number) => record.id)} columns={this.state.tableColumns} loading={this.props.loading.global} dataSource={this.props.lxsList.tableData} />

        {/* 审核失败 */}
        <Modal
          visible={this.props.lxsList.auditFailedVisible}
          onCancel={this.auditFailedleCancel}
          footer={null}
        >
          <h4><b>请填写失败原因（请谨慎填写，用户将会看到失败原因）</b></h4>
          <SetUpFrom record={this.state.record}></SetUpFrom>
        </Modal>
      </div>
    );
  }
}

@connect(
  (props: {}, state: {}) => Object.assign({}, props, state)
)
class SetupModel extends React.Component<UserFormProps> {
  //  批量设置表单点击确定
  auditFailedHandleOk = (e: any) => {
    // 表单验证
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        let obj = {
          id: this.props.record.id,
          status: "FAILED",
          reason: values.reason,
          remark: values.remark,
        }
        // 当对象key值无数据时删除该key
        for (let key in obj) {
          if (!obj[key]) {
            delete obj[key]
          }
        }
        this.props.dispatch({
          type: 'lxsList/examine',
          payload: obj,
          fetchPayload: this.props.lxsList.pageNo,
          query: this.props.lxsList.pageNo,
        })
        this.props.dispatch({
          type: 'lxsList/save',
          payload: {
            auditFailedVisible: false
          }
        })
        //  清空表单
        this.props.form.resetFields()
      }
    });
  };

  render() {

    // if(!this.props.lxsList.auditFailedVisible) {
    //   this.props.form.resetFields()
    // }

    const { getFieldDecorator } = this.props.form

    return (
      <Form onSubmit={this.auditFailedHandleOk}>
        <Form.Item>
          {getFieldDecorator('reason', {
            rules: [{ required: true, message: '请输入原因' }],
          })(
            <Input
              placeholder="请输入原因"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remark', {
            // rules: [{ required: true, message: '请输入备注' }],
          })(
            <Input
              placeholder="请输入备注"
            />,
          )}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 10 }}>
          <Button type="primary" htmlType="submit">
            确定
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

const WrappedAdvancedSearchForm = Form.create<UserFormProps>()(AdvancedSearchForm);
const SetUpFrom = Form.create<UserFormProps>()(SetupModel);

export default WrappedAdvancedSearchForm
