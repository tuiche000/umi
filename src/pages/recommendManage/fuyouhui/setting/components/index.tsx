import React from 'react';
import { Form, Row, Col, Input, Button, Table, Divider, Modal, Select, Radio, Popconfirm, Icon ,DatePicker} from 'antd';
import { connect } from 'dva';
import { FormComponentProps } from 'antd/lib/form';

const { Option } = Select;
interface UserFormProps extends FormComponentProps {
  record?: any,
  dispatch: Function,
  lvxSetting: {
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
class AdvancedSearchForm extends React.Component<UserFormProps, BasicLayoutState> {
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
          align:"center",
        },
        {
          title: '活动ID',
          dataIndex: 'id',
          key: 'activityID',
          align:"center",
        },
        {
          title: '活动名称',
          dataIndex: 'activityName',
          key: 'activityName',
          width: 200,
          align:"center",
        },
        {
          title: '有效期',
          dataIndex: 'validity',
          key: 'validity',
          align:"center",
        },
        {
          title: '适用人群',
          dataIndex: 'IntendedFor',
          key: 'IntendedFor',
          align:"center",
        },
        {
          title: '操作',
          key: 'action',
          width: 120,
          align:"center",
          render: (text: any, record: any) => (
            <span>
              <a href="javascript:;" onClick={this.EditShowModal.bind(this, record)}>编辑</a>
              <Divider type="vertical" />
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

    this.fnNewlyAdded = this.fnNewlyAdded.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'fyhSetting/fetch',
      payload: ''
    })
  }

  // 新增
  fnNewlyAdded() {
    alert("1")
  }

  // 搜索按钮
  handleSearch = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
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
                {getFieldDecorator('ActivityName', {
                  rules: [
                    {
                      required: true,
                      message: '请输入活动名',
                    },
                  ],
                })(<Input placeholder="请输入活动名" />)}
              </Form.Item>
            </Col>
            <Col span={12} pull={6}>
              <Form.Item {...formItemLayout} label="活动时间">
              {getFieldDecorator('date-picker', { 
                rules: [{ type: 'object', required: true, message: '请选择活动时间' }],
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
            <Button type="primary" htmlType="submit" onClick={this.fnNewlyAdded}>
              新增
            </Button>
          </Col>
        </Row>
        <Table rowKey={((record: object, index: number) => record.id )} rowSelection={rowSelection} columns={this.state.tableColumns} dataSource={this.props.fyhSetting.tableData} />

        {/* 编辑模态框 */}
        <Modal
          visible={this.state.EditVisible}
          onOk={this.EditHandleOk}
          onCancel={this.EditHandleCancel}
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

    const RadioItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    }

    return (
      <Form {...formItemLayout} onSubmit={this.setUphandleSubmit}>
        <Form.Item {...formItemLayout} label="产品ID" style={record ? { display: "block" } : { display: "none" }}>
          {getFieldDecorator('productID', {
            // initialValue: record ? record.Bonus : null,
          })(<span>{record ? record.productID : null}</span>)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="产品名称" style={record ? { display: "block" } : { display: "none" }}>
          {getFieldDecorator('productName', {
            // initialValue: record ? record.Bonus : null,
          })(<span>{record ? record.productName : null}</span>)}
        </Form.Item>
        <Form.Item label="奖励类型" hasFeedback={true}>
          {getFieldDecorator('RewardType', {
            rules: [{ required: true, message: '请选择奖励类型' }],
            initialValue: record ? "proportion" : null,
          })(
            <Select placeholder="请选择奖励类型">
              <Option value="proportion">比例</Option>
              <Option value="fixedAmount">固定金额</Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="奖励金">
          {getFieldDecorator('Bonus', {
            rules: [
              {
                required: true,
                message: '请输入比例',
              },
            ],
            initialValue: record ? record.Bonus : null,
          })(<Input placeholder="请输入比例" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="是否热门推荐">
          {getFieldDecorator('radio-group')(
            <Radio.Group>
              <Radio value="true">是</Radio>
              <Radio value="false">否</Radio>
            </Radio.Group>,
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="产品排序">
          {getFieldDecorator('ProductSequencing', {
            rules: [
              {
                required: true,
                message: '请输入数字',
              },
            ],
          })(<Input placeholder="请输入数字" />)}
        </Form.Item>
        <Form.Item {...RadioItemLayout} label="适用人群">
          {getFieldDecorator('radio-group')(
            <Radio.Group>
              <Radio value="all">全部</Radio>
              <Radio value="staff">复星员工</Radio>
              <Radio value="isNotStaff">不包含复星员工</Radio>
            </Radio.Group>,
          )}
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
