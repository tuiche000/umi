import React from 'react';
import { Form, Row, Col, Input, Button, Table, Divider, Modal, Select, Radio, Popconfirm, Icon } from 'antd';
import { connect } from 'dva';
import { FormComponentProps } from 'antd/lib/form';

const { Option } = Select;
interface UserFormProps extends FormComponentProps {
  record?: any,
  dispatch: Function,
  lvxSetting: {
    tableData: object[]
    EditVisible: boolean,
    pageNo: number,
    seachData: any,
    totalResults: any,
  },
}
interface BasicLayoutState {
  setUpVisible: boolean,
  selectedRowKeys: any[],
  tableData?: any[],
  tableColumns: any[],
  record: any,
  current: number,
}

const limitation = {
  ALL_MEMBER: '全体会员',
  EXCLUDE_EMPLOYEE: '不包含复星员工',
  ONLY_EMPLOYEE: '仅复星员工'
}
const prizeScale = {
  SCALE: '比例',
  NUMBER: '累计金额',
}

@connect(
  (props: {}, state: {}) => Object.assign({}, props, state)
)
class AdvancedSearchForm extends React.Component<UserFormProps, BasicLayoutState> {
  constructor(props: UserFormProps) {
    super(props)
    this.state = {
      setUpVisible: false, //  控制批量设置模态框显示隐藏
      selectedRowKeys: [], // 表格选择框选定的数据
      record: {}, //编辑选中的数据
      current: 1,
      tableColumns: [
        {
          title: '序号',
          dataIndex: 'serial',
          key: 'serial',
          align: "center",
        },
        {
          title: '产品ID',
          dataIndex: 'productId',
          key: 'productId',
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
          dataIndex: 'manager',
          key: 'manager',
          align: "center",
        },
        {
          title: '奖励类型',
          render: (text: {
            prizeScale: 'SINGLE' | 'ACCUMULATIVE'
          }): JSX.Element => {
            return <span>{prizeScale[text.prizeScale]}</span>
          },
          key: 'prizeScale',
          align: "center",
        },
        {
          title: '奖励金',
          dataIndex: 'productPrize',
          key: 'productPrize',
          align: "center",
        },
        {
          title: '热门推荐',
          render: (text: {
            recommended: boolean
          }): JSX.Element => {
            return <span>{text.recommended ? '是' : '否'}</span>
          },
          key: 'recommended',
          align: "center",
        },
        {
          title: '产品排序',
          dataIndex: 'displayOrder',
          key: 'displayOrder',
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

    this.fnDiscontinueUse = this.fnDiscontinueUse.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.setUpShowModal = this.setUpShowModal.bind(this)
    this.setUpHandleOk = this.setUpHandleOk.bind(this)
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'lvxSetting/fetch',
      payload: {
      },
      query: {
        pageNo: 1,
        pageSize: 10,
      }
    })
  }

  confirm = (record: any) => {
    record.enabled = !record.enabled
    this.props.dispatch({
      type: 'lvxSetting/edit',
      payload: record,
      query: this.props.lvxSetting.pageNo,
      fetchPayload: this.props.lvxSetting.seachData
    })
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
      if (!err) {
        let obj = {
          productId: values.productId,
          productName: values.productName,
        }
        // 当对象key值无数据时删除该key
        for (let key in obj) {
          if (!obj[key]) {
            delete obj[key]
          } else {
            obj[key] = obj[key].trim()
          }
        }
        // 将搜索条件给到全局
        this.props.dispatch({
          type: 'lvxSetting/save',
          payload: {
            seachData: obj
          }
        })
        this.props.dispatch({
          type: 'lvxSetting/fetch',
          payload: obj,
          query: {
            pageNo: 1,
            pageSize: 10,
          }
        })
        this.setState({
          current: 1
        })
      }
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
    console.log(record, this.props.lvxSetting.EditVisible)
    this.props.dispatch({
      type: 'lvxSetting/save',
      payload: {
        EditVisible: true
      }
    })
    this.setState({
      record,
    });
  };

  //  编辑点击取消回调
  EditHandleCancel = (e: any) => {
    this.props.dispatch({
      type: 'lvxSetting/save',
      payload: {
        EditVisible: false
      },
      // query:{}
    })
  };


  // 点击分页回调
  onChangePagesize = (page: any) => {
    // 设置全局分页
    this.props.dispatch({
      type: 'lvxSetting/save',
      payload: {
        pageNo: page
      }
    })
    // 手动设置分页
    this.setState({
      current: page
    })
    this.props.dispatch({
      type: 'lvxSetting/fetch',
      payload: this.props.lvxSetting.seachData,
      query: {
        pageNo: page,
        pageSize: 10,
      }
    })
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 8 },
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
              <Form.Item {...formItemLayout} label="产品ID">
                {getFieldDecorator('productId', {
                })(<Input placeholder="请输入产品ID" />)}
              </Form.Item>
            </Col>
            <Col span={12} pull={6}>
              <Form.Item {...formItemLayout} label="产品名称">
                {getFieldDecorator('productName', {
                })(<Input placeholder="请输入产品名称" />)}
              </Form.Item>
            </Col>
            {/* <Col span={12} >
              <Form.Item {...formItemLayout} label="产品类型">
                {getFieldDecorator('productType', {
                  rules: [
                    {
                      required: true,
                      message: '请输入产品类型',
                    },
                  ],
                })(<Input placeholder="请输入产品类型" />)}
              </Form.Item>
            </Col>
            <Col span={12} pull={6}>
              <Form.Item {...formItemLayout} label="产品经理">
                {getFieldDecorator('productManager', {
                  rules: [
                    {
                      required: true,
                      message: '请输入产品经理',
                    },
                  ],
                })(<Input placeholder="请输入产品经理" />)}
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
              批量停用
            </Button>
            <Button type="primary" style={{ marginLeft: 10 }} htmlType="submit" onClick={this.setUpShowModal}>
              批量设置
            </Button>
          </Col>
        </Row> */}

        <Table loading={this.props.loading.global} pagination={{ total: this.props.lvxSetting.totalResults, onChange: this.onChangePagesize, current: this.state.current }} rowKey={((record: object, index: number) => record.id)} rowSelection={rowSelection} columns={this.state.tableColumns} dataSource={this.props.lvxSetting.tableData} />

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
          visible={this.props.lvxSetting.EditVisible}
          // onOk={this.EditHandleOk}
          onCancel={this.EditHandleCancel}
          footer={null}
        >
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
  //  编辑以及批量设置表单点击确定
  setUphandleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.productId = this.props.record.productId
        values.productName = this.props.record.productName
        values.id = this.props.record.id
        if (values.recommended == "true") {
          values.recommended = true
        } else {
          values.recommended = false
        }
        this.props.dispatch({
          type: 'lvxSetting/edit',
          payload: values,
          query: this.props.lvxSetting.pageNo,
          fetchPayload: this.props.lvxSetting.seachData
        })
        // 清空表单
        this.props.form.resetFields()
        // 关闭模态框
        this.props.dispatch({
          type: 'lvxSetting/save',
          payload: {
            EditVisible: false
          }
        })
      }
    })
  }
  render() {
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
          {getFieldDecorator('productId', {
          })(<span>{record ? record.productId : null}</span>)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="产品名称" style={record ? { display: "block" } : { display: "none" }}>
          {getFieldDecorator('productName', {
          })(<span>{record ? record.productName : null}</span>)}
        </Form.Item>
        <Form.Item label="奖励类型" hasFeedback={true}>
          {getFieldDecorator('prizeScale', {
            rules: [{ required: true, message: '请选择奖励类型' }],
            initialValue: record ? record.prizeScale : null,
          })(
            <Select placeholder="请选择奖励类型" allowClear={true}>
              <Option value="SCALE">比例</Option>
              <Option value="NUMBER">固定金额</Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="奖励金">
          {getFieldDecorator('productPrize', {
            rules: [
              {
                required: true,
                message: '请输入比例',
              },
            ],
            initialValue: record ? record.productPrize : null,
          })(<Input placeholder="请输入比例" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="是否热门推荐">
          {getFieldDecorator('recommended', {
            initialValue: record.recommended ? "true" : "false",
          })(
            <Radio.Group>
              <Radio value="true">是</Radio>
              <Radio value="false">否</Radio>
            </Radio.Group>,
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="产品排序">
          {getFieldDecorator('displayOrder', {
            rules: [
              {
                required: true,
                message: '请输入数字',
              },
            ],
            initialValue: record.displayOrder,
          })(<Input placeholder="请输入数字" />)}
        </Form.Item>
        <Form.Item {...RadioItemLayout} label="适用人群">
          {getFieldDecorator('limitation', {
            initialValue: record.limitation,
          })(
            <Radio.Group>
              <Radio value="ALL_MEMBER">全部</Radio>
              <Radio value="ONLY_EMPLOYEE">复星员工</Radio>
              <Radio value="EXCLUDE_EMPLOYEE">不包含复星员工</Radio>
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
