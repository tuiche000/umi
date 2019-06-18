import React from 'react';
import { Form, Row, Col, Input, Button, Table, Divider, Modal, Select, Radio, Popconfirm, message, Icon, DatePicker } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import router from "umi/router"
import { connect } from 'dva';
import moment from 'moment';
import 'antd/lib/locale-provider/zh_CN';

moment.locale('zh-cn');

const { Option } = Select;
const { RangePicker } = DatePicker;
const reviewStatus = {
  0: '待审核',
  1: '审核成功',
  2: '审核失败'
}
const channel = {
  0: '复游会',
  1: '旅行社',
  2: '好物商城'
}
interface ComponentProps {
  record?: any,
  dispatch: Function,
  bjlList: {
    seachData: {},
    totalResults: number,
    tableData: {},
  },
  loading:any,
}
interface BasicLayoutState {
  setUpVisible: boolean,
  EditVisible: boolean,
  selectedRowKeys: any[],
  tableData?: any[],
  tableColumns: any[],
  record: any,
  current: number,
}

@connect(
  (props: {}, state: {}) => Object.assign({}, props, state)
)
@Form.create<FormComponentProps>()
export default class AdvancedSearchForm extends React.Component<ComponentProps, BasicLayoutState> {
  constructor(props: ComponentProps) {
    super(props)
    this.state = {
      current: 1, // 分页页码
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
        {
          title: '补发ID',
          dataIndex: 'id',
          key: 'id',
          align: "center",
        },
        {
          title: '操作人',
          dataIndex: 'operator',
          key: 'operator',
          align: "center",
        },
        {
          title: '补发时间',
          dataIndex: 'reissueDate',
          key: 'reissueDate',
          align: "center",
        },
        {
          title: '所属平台',
          render: (text: {
            channel: 0 | 1 | 2
          }): JSX.Element => {
            return <span>{channel[text.channel]}</span>
          },
          key: 'channel',
          align: "center",
        },
        // {
        //   title: '用户名',
        //   dataIndex: 'PlatformType',
        //   key: 'PlatformType',
        //   align: "center",
        // },
        {
          title: '用户手机号码',
          dataIndex: 'mobile',
          key: 'mobile',
          align: "center",
        },
        {
          title: '奖励金额',
          dataIndex: 'prize',
          key: 'prize',
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
              <span>{reviewStatus[text.reviewStatus]}</span>
            )
          },
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

    // this.fnDiscontinueUse = this.fnDiscontinueUse.bind(this)
    this.fnAdd = this.fnAdd.bind(this)
    // this.fnDetail = this.fnDetail.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'bjlList/fetch',
      query: {
        pageNo: 1,
        pageSize: 10,
      },
      payload: {
        channel: 1,
      }
    })
  }

  // 跳转详情
  fnDetail(record: {
    id: string
  }) {
    router.push(`./bujiangli/detail?id=${record.id}`)
  }

  // 跳转新增
  fnAdd() {
    router.push('./bujiangli/add')
  }

  // 批量审核模态框
  // fnDiscontinueUse() {
  //   let that = this
  //   Modal.confirm({
  //     content: '批量处理审核数据',
  //     okText: '审核通过',
  //     cancelText: '审核未通过',
  //     icon: null,
  //     centered: true,
  //     onOk() {
  //       console.log(that.state.selectedRowKeys)
  //     }
  //   });
  // }

  // 点击搜索按钮
  handleSearch = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      let obj = {
        mobile: values.mobile && values.mobile.trim(),
        beginDate: this.formatDate(values.reissueDate && values.reissueDate.length != 0 ? values.reissueDate[0]._d : undefined),
        endDate: this.formatDate(values.reissueDate && values.reissueDate.length != 0 ? values.reissueDate[1]._d : undefined),
        reviewStatus: values.reviewStatus,
        prizeStatus: values.prizeStatus,
        channel: 1,
      }
      // 当对象key值无数据时删除该key
      for (let key in obj) {
        if (!obj[key] && obj[key] !== 0) {
          delete obj[key]
        }
      }
      // 将搜索条件数据给到全局
      this.props.dispatch({
        type: 'bjlList/save',
        payload: {
          seachData: obj
        }
      })
      this.props.dispatch({
        type: 'bjlList/fetch',
        query: {
          pageNo: 1,
          pageSize: 10,
        },
        payload: obj
      })
      // 手动设置分页页码为1
      this.setState({
        current: 1
      })
    });
  };
  onChangePagesize = (page: any) => {

    // 将页码给到全局
    this.props.dispatch({
      type: 'bjlList/save',
      payload: {
        pageNo: page
      }
    })
    // 手动设置分页页码
    this.setState({
      current: page,
    });
    this.props.dispatch({
      type: 'bjlList/fetch',
      payload: this.props.bjlList.seachData,
      query: {
        pageNo: page,
        pageSize: 10,
      }
    })
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
  render() {
    const locale ={
      "lang": {
        "placeholder": "Select date",
        "rangePlaceholder": ["Start date", "End date"],
        "today": "Today",
        "now": "Now",
        "backToToday": "Back to today",
        "ok": "Ok",
        "clear": "Clear",
        "month": "Month",
        "year": "Year",
        "timeSelect": "Select time",
        "dateSelect": "Select date",
        "monthSelect": "Choose a month",
        "yearSelect": "Choose a year",
        "decadeSelect": "Choose a decade",
        "yearFormat": "YYYY",
        "dateFormat": "M/D/YYYY",
        "dayFormat": "D",
        "dateTimeFormat": "M/D/YYYY HH:mm:ss",
        "monthFormat": "MMMM",
        "monthBeforeYear": false,
        "previousMonth": "Previous month (PageUp)",
        "nextMonth": "Next month (PageDown)",
        "previousYear": "Last year (Control + left)",
        "nextYear": "Next year (Control + right)",
        "previousDecade": "Last decade",
        "nextDecade": "Next decade",
        "previousCentury": "Last century",
        "nextCentury": "Next century"
      },
    }
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
            {/* <Col span={8}>
              <Form.Item {...formItemLayout} label="操作人">
                {getFieldDecorator('operator', {
                })(<Input placeholder="请输入操作人" />)}
              </Form.Item>
            </Col> */}
            <Col span={8}>
              <Form.Item {...formItemLayout} label="补发时间">
                {getFieldDecorator('reissueDate', {
                })(<RangePicker allowClear={true} disabledDate={disabledDate} locale={locale}/>)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item {...formItemLayout} label="奖励状态" hasFeedback={true}>
                {getFieldDecorator('prizeStatus', {
                  // initialValue: ['0'],
                })(
                  <Select placeholder="请选择" allowClear={true}>
                    <Option value={0}>已发放</Option>
                    <Option value={1}>未发放</Option>
                    <Option value={2}>审核中</Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
            {/* <Col span={8}>
              <Form.Item {...formItemLayout} label="用户名">
                {getFieldDecorator('recommendedProducts', {
                })(<Input placeholder="请输入用户名" />)}
              </Form.Item>
            </Col> */}
            <Col span={8}>
              <Form.Item {...formItemLayout} label="用户手机号">
                {getFieldDecorator('mobile', {
                })(<Input placeholder="请输入用户手机号" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item {...formItemLayout} label="审核状态" hasFeedback={true}>
                {getFieldDecorator('reviewStatus', {
                  // initialValue: ['pass'],
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
        <Row gutter={20}>
          <Col span={24} style={{ textAlign: 'right' }}>
            {/* <Button type="primary" htmlType="submit" onClick={this.fnDiscontinueUse}>
              批量审核
            </Button> */}
            <Button type="primary" htmlType="submit" onClick={this.fnAdd} style={{ marginLeft: 10 }}>
              新增
            </Button>
          </Col>
        </Row>
        <Table loading={this.props.loading.global} rowSelection={rowSelection} pagination={{ total: this.props.bjlList.totalResults, onChange: this.onChangePagesize, current: this.state.current }} rowKey={((record: object, index: number) => record.id)} columns={this.state.tableColumns} dataSource={this.props.bjlList.tableData} />
      </div>
    );
  }
}
