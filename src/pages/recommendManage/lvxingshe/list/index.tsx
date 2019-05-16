import React from 'react';
import { Form, Row, Col, Input, Button, Table, Divider, Modal, Select, Radio, Popconfirm, message, Icon, DatePicker } from 'antd';
import './index.css'
import { FormComponentProps } from 'antd/lib/form';
import moment from 'moment';

const { Option } = Select;
const { RangePicker } = DatePicker;
interface UserFormProps extends FormComponentProps {
  record?: any,
}
interface BasicLayoutState {
  setUpVisible: boolean,
  EditVisible: boolean,
  selectedRowKeys: any[],
  tableData: any[],
  tableColumns: any[],
  record: any,
}

class AdvancedSearchForm extends React.Component<UserFormProps, BasicLayoutState> {
  constructor(props: UserFormProps) {
    super(props)
    this.state = {
      setUpVisible: false, //  控制批量设置模态框显示隐藏
      EditVisible: false, //  控制编辑模态框显示隐藏
      selectedRowKeys: [], // 表格选择框选定的数据
      record: {}, //编辑选中的数据
      tableData: [
        {
          key: '1',
          serial: 1,
          productID: 12,
          productName: '昆明5天3夜自由行包含机票住宿景点票',
          productType: "自由行",
          productManager: "admin",
          RewardType: "比例",
          Bonus: 21222,
          PopularRecommendation: "是",
          ProductSequencing: 1,
          IntendedFor: "yu",
        },
        {
          key: '2',
          serial: 2,
          productID: 42,
          productName: '昆明5天3夜自由行包含机票住宿景点票',
          productType: "自由行",
          productManager: "admin",
          RewardType: "比例",
          Bonus: 21222,
          PopularRecommendation: "是",
          ProductSequencing: 1,
          IntendedFor: "yu",
        },
        {
          key: '3',
          serial: 3,
          productID: 32,
          productName: '昆明5天3夜自由行包含机票住宿景点票',
          productType: "自由行",
          productManager: "admin",
          RewardType: "比例",
          Bonus: "2.5%",
          PopularRecommendation: "是",
          ProductSequencing: 1,
          IntendedFor: "yu",
        },
      ], // 表格数据
      tableColumns: [

        {
          title: '序号',
          dataIndex: 'serial',
          key: 'serial',
          align: "center",
        },
        {
          title: '产品ID',
          dataIndex: 'productID',
          key: 'productID',
          align: "center",
        },
        {
          title: '产品名称',
          dataIndex: 'productName',
          key: 'productName',
          width: 200,
          align: "center",
        },
        {
          title: '产品类型',
          dataIndex: 'productType',
          key: 'productType',
          align: "center",
        },
        {
          title: '产品经理',
          dataIndex: 'productManager',
          key: 'productManager',
          align: "center",
        },
        {
          title: '奖励类型',
          dataIndex: 'RewardType',
          key: 'RewardType',
          align: "center",
        },
        {
          title: '奖励金',
          dataIndex: 'Bonus',
          key: 'Bonus',
          align: "center",
        },
        {
          title: '热门推荐',
          dataIndex: 'PopularRecommendation',
          key: 'PopularRecommendation',
          align: "center",
        },
        {
          title: '产品排序',
          dataIndex: 'ProductSequencing',
          key: 'ProductSequencing',
          align: "center",
        },
        {
          title: '适用人群',
          dataIndex: 'IntendedFor',
          key: 'IntendedFor',
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
    this.setUpShowModal = this.setUpShowModal.bind(this)
    this.setUpHandleOk = this.setUpHandleOk.bind(this)

  }

  // 批量停用模态框
  fnDiscontinueUse() {
    let that = this
    Modal.confirm({
      content: '是否停用你所选择的产品',
      okText: '确认',
      cancelText: '取消',
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

  // 批量设置开启模态框回调
  setUpShowModal = () => {
    this.setState({
      setUpVisible: true,
      record: {},
    });
  };

  //  批量设置点击确定回调
  setUpHandleOk = (e: any) => {
    this.setState({
      setUpVisible: false,
    });
  };


  //  批量设置点击取消回调
  setUpHandleCancel = (e: any) => {
    this.setState({
      setUpVisible: false,
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
      labelCol: { span: 5 },
      wrapperCol: { span: 9 },
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
              <Form.Item {...formItemLayout} label="是否推荐成功" hasFeedback={true}>
                {getFieldDecorator('recommendation', {
                  rules: [{ required: true, message: '请选择' }],
                  initialValue: ['yes'],
                })(
                  <Select placeholder="请选择">
                    <Option value="yes">是</Option>
                    <Option value="no">否</Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item {...formItemLayout} label="推荐产品">
                {getFieldDecorator('recommendedProducts', {
                  rules: [
                    {
                      required: true,
                      message: '请输入推荐产品',
                    },
                  ],
                })(<Input placeholder="请输入推荐产品" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item {...formItemLayout} label="被推荐人">
                {getFieldDecorator('recommendedPerson', {
                  rules: [
                    {
                      required: true,
                      message: '请输入被推荐人',
                    },
                  ],
                })(<Input placeholder="请输入被推荐人" />)}
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
              批量停用
            </Button>
            <Button type="primary" style={{ marginLeft: 10 }} htmlType="submit" onClick={this.setUpShowModal}>
              批量设置
            </Button>
          </Col>
        </Row>
        <Table rowSelection={rowSelection} columns={this.state.tableColumns} dataSource={this.state.tableData} />

        {/* 批量设置模态框 */}
        <Modal
          visible={this.state.setUpVisible}
          onOk={this.setUpHandleOk}
          onCancel={this.setUpHandleCancel}
        >
          <SetUpFrom></SetUpFrom>
        </Modal>

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
