import React from 'react';
import { Form, Row, Col, Input, Button, Table, Divider, Modal, Select, Radio, Popconfirm, Icon, DatePicker } from 'antd';
import { connect } from 'dva';
import { FormComponentProps } from 'antd/lib/form';
import router from "umi/router"
import moment from 'moment';

const { Option } = Select;
const { RangePicker } = DatePicker;
const limitation = {
  ALL_MEMBER: '全体会员',
  EXCLUDE_EMPLOYEE: '不包含复星员工',
  ONLY_EMPLOYEE: '仅复星员工'
}
const ruleType = {
  SINGLE: '单次奖励',
  ACCUMULATIVE: '累计奖励',
}
interface UserFormProps extends FormComponentProps {
  record?: any,
  dispatch: Function,
  fyhSetting: {
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
  AtableData: any,
}

@connect(
  (props: {}, state: {}) => Object.assign({}, props, state)
)
class AdvancedSearchForm extends React.Component<UserFormProps, BasicLayoutState> {
  constructor(props: UserFormProps) {
    super(props)
    this.state = {
      setUpVisible: false, //  控制批量设置模态框显示隐藏
      EditVisible: false, //  控制编辑模态框显示隐藏
      selectedRowKeys: [], // 表格选择框选定的数据
      record: {}, //编辑选中的数据       this.props.fyhSetting.tableData
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
        //   key: 'activityID',
        //   align: "center",
        // },
        {
          title: '活动名称',
          dataIndex: 'activityName',
          key: 'activityName',
          width: 200,
          align: "center",
        },
        {
          title: '奖励类型',
          render: (text: {
            ruleType: 'SINGLE' | 'ACCUMULATIVE'
          }): JSX.Element => {
            return <span>{ruleType[text.ruleType]}</span>
          },
          key: 'ruleType',
          align: "center",
        },
        {
          title: '有效期',
          dataIndex: 'endDate',
          key: 'endDate',
          align: "center",
        },
        {
          title: '适用人群',
          render: (text: {
            limitation: 'ALL_MEMBER' | 'EXCLUDE_EMPLOYEE' | 'ONLY_EMPLOYEE'
          }): JSX.Element => {
            return <span>{limitation[text.limitation]}</span>
          },
          key: 'limitation',
          align: "center",
        },
        {
          title: '操作',
          key: 'action',
          width: 120,
          align: "center",
          render: (text: any, record: any) => (
            <span>
              <a href="javascript:;" onClick={this.EditShowModal.bind(this, record)}>编辑</a>
              <Divider type="vertical" />
              <Popconfirm
                title="Are you sure？"
                onConfirm={this.confirm.bind(this, record)}
                icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
              >
                <a href="javascript:;">{text.enabled ? '停用' : "启用"}</a>
              </Popconfirm>
            </span>
          ),
        },
      ], // 表格表头
    };

    this.goNewlyAdded = this.goNewlyAdded.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'fyhSetting/fetch',
      query: {
        pageNo: 1,
        pageSize: 10,
      }
    })
  }

  confirm = (record: any) => {
    record.enabled = !record.enabled
    this.props.dispatch({
      type: 'fyhSetting/edit',
      payload: record
    })
  }

  // 新增跳转
  goNewlyAdded() {
    router.push('./setting/add')
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
      if (!err) {
        let obj = {
          activityName: values.activityName,
          activityDate: this.formatDate(values.activityDate ? values.activityDate._d : undefined),
        }
        // 当对象key值无数据时删除该key
        for (let key in obj) {
          if (!obj[key]) {
            delete obj[key]
          }
        }
        this.props.dispatch({
          type: 'fyhSetting/fetch',
          payload: obj,
          query: {
            pageNo: 1,
            pageSize: 10,
          }
        })
      }
    });
  };

  // 编辑开启模态框回调
  EditShowModal = (record: any) => {
    console.log(record)
    this.setState({
      EditVisible: true,
      record,
    });
  };
  //  编辑点击确定回调
  EditHandleOk = (e: any) => {
    this.setState({
      EditVisible: false,
    });
  };


  //  编辑点击取消回调
  EditHandleCancel = (e: any) => {
    this.setState({
      EditVisible: false,
    });
  };

  onChangePagesize = (page: any) => {
    this.props.dispatch({
      type: 'fyhSetting/fetch',
      query: {
        pageNo: page,
        pageSize: 10,
      }
    })
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 6 },
    }
    const { getFieldDecorator } = this.props.form
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
            <Col span={12} >
              <Form.Item {...formItemLayout} label="活动名">
                {getFieldDecorator('activityName', {
                  // rules: [
                  //   {
                  //     required: true,
                  //     message: '请输入活动名',
                  //   },
                  // ],
                })(<Input placeholder="请输入活动名" />)}
              </Form.Item>
            </Col>
            <Col span={12} pull={6}>
              <Form.Item {...formItemLayout} label="活动时间">
                {getFieldDecorator('activityDate', {
                  // rules: [{ type: 'object', required: true, message: '请选择活动时间' }],
                })(<DatePicker />)}
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
            <Button type="primary" htmlType="submit" onClick={this.goNewlyAdded}>
              新增
            </Button>
          </Col>
        </Row>
        <Table rowKey={((record: object, index: number) => record.id)} pagination={{ total: this.props.fyhSetting.totalResults, onChange: this.onChangePagesize }} loading={this.props.loading.global} rowSelection={rowSelection} columns={this.state.tableColumns} dataSource={this.props.fyhSetting.tableData} />

        {/* 编辑模态框 */}
        <Modal
          visible={this.state.EditVisible}
          onOk={this.EditHandleOk}
          onCancel={this.EditHandleCancel}
          width={600}
        >
          <SetUpFrom record={this.state.record}></SetUpFrom>
        </Modal>
      </div>
    );
  }
}

class SetupModel extends React.Component<UserFormProps> {
  //  批量设置表单点击确定
  setUphandleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    })
  }
  render() {
    console.log(this.props.record)
    const { getFieldDecorator } = this.props.form

    // 点击编辑从父组件中得到的数据
    let record = this.props.record

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }

    const dateFormat = 'YYYY-MM-DD';
    return (
      <Form {...formItemLayout} onSubmit={this.setUphandleSubmit}>
        <Form.Item {...formItemLayout} label="活动ID" style={record ? { display: "block" } : { display: "none" }}>
          {getFieldDecorator('activityID', {
          })(<span>{record ? record.id : null}</span>)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="活动名称" style={record ? { display: "block" } : { display: "none" }}>
          {getFieldDecorator('activityName', {
          })(<span>{record ? record.activityName : null}</span>)}
        </Form.Item>
        <Form.Item label="有效期" hasFeedback={true}>
          {getFieldDecorator('endDate', {
            rules: [
              {
                required: true,
                message: '请选择推荐时间',
              },
            ],
            initialValue: [moment(record.beginDate.split(" ")[0], dateFormat), moment(record.endDate.split(" ")[0], dateFormat)],
          })(<RangePicker />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="奖励类型">
          {getFieldDecorator('ruleType', {
            initialValue: record.ruleType,
          })(
            <Radio.Group>
              <Radio value="SINGLE">单次奖励</Radio>
              <Radio value="ACCUMULATIVE">累计奖励</Radio>
            </Radio.Group>,
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="适用人群">
          {getFieldDecorator('limitation', {
            initialValue: record.limitation,
          })(
            <Radio.Group>
              <Radio value="ALL_MEMBER">全部</Radio>
              <Radio value="EXCLUDE_EMPLOYEE">复星员工</Radio>
              <Radio value="ONLY_EMPLOYEE">不包含复星员工</Radio>
            </Radio.Group>,
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="阶段1">
          {getFieldDecorator('stage_one', {
            rules: [
              {
                required: true,
                message: '请输入数字',
              },
            ],
          })(<Input placeholder="请输入数字" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="阶段2">
          {getFieldDecorator('stage_two', {
            rules: [
              {
                required: true,
                message: '请输入数字',
              },
            ],
          })(<Input placeholder="请输入数字" />)}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
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
