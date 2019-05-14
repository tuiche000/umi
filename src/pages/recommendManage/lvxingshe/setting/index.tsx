import React from 'react';
import { Form, Row, Col, Input, Button, Table, Divider, Modal, Select, Radio, Popconfirm, message,Icon  } from 'antd';
import './index.css'
import { FormComponentProps } from 'antd/lib/form';


const columns = [
  // align:"center",
  {
    title: '序号',
    dataIndex: 'serial',
    key: 'serial',
    // render: (text:any) => <a href="javascript:;">{text}</a>,
    // align:'center',
  },
  {
    title: '产品ID',
    dataIndex: 'productId',
    key: 'productId',
  },
  {
    title: '产品名称',
    dataIndex: 'productName',
    key: 'productName',
  },
  {
    title: '产品类型',
    dataIndex: 'productType',
    key: 'productType',
  },
  {
    title: '产品经理',
    dataIndex: 'productManager',
    key: 'productManager',
  },
  {
    title: '奖励类型',
    dataIndex: 'RewardType',
    key: 'RewardType',
  },
  {
    title: '奖励金',
    dataIndex: 'Bonus',
    key: 'Bonus',
  },
  {
    title: '热门推荐',
    dataIndex: 'PopularRecommendation',
    key: 'PopularRecommendation',
  },
  {
    title: '产品排序',
    dataIndex: 'ProductSequencing',
    key: 'ProductSequencing',
  },
  {
    title: '适用人群',
    dataIndex: 'IntendedFor',
    key: 'IntendedFor',
  },
  {
    title: '操作',
    key: 'action',
    render: (text: any, record: any) => (
      <span>
        <a href="javascript:;">编辑{record.name}</a>
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
];

const data = [
  {
    key: '1',
    serial: 'John Brown',
    productId: 12,
    productName: '昆明5天3夜自由行包含机票住宿景点票',
    productType: "自由行",
    productManager: "admin",
    RewardType: "比例",
    Bonus: 21222,
    PopularRecommendation: "是",
    ProductSequencing: 1,
    IntendedFor: "yu",
    // tags: ['nice', 'developer'],
  },
  {
    key: '2',
    serial: 'Jim Green',
    productId: 42,
    productName: '昆明5天3夜自由行包含机票住宿景点票',
    productType: "自由行",
    productManager: "admin",
    RewardType: "比例",
    Bonus: 21222,
    PopularRecommendation: "是",
    ProductSequencing: 1,
    IntendedFor: "yu",
    // tags: ['loser'],
  },
  {
    key: '3',
    serial: 'Joe Black',
    productId: 32,
    productName: '昆明5天3夜自由行包含机票住宿景点票',
    productType: "自由行",
    productManager: "admin",
    RewardType: "比例",
    Bonus: "2.5%",
    PopularRecommendation: "是",
    ProductSequencing: 1,
    IntendedFor: "yu",
    // tags: ['cool', 'teacher'],
  },
];

const { Option } = Select;
interface UserFormProps extends FormComponentProps {

}
interface BasicLayoutState {
  visible: boolean,
  selectedRows: any[]
}

class AdvancedSearchForm extends React.Component<UserFormProps, BasicLayoutState> {
  constructor(props:UserFormProps) {
    super(props)
    this.state = {
      visible: false, //  控制模态框显示隐藏
      selectedRows:[], // 表格选择框选定的数据
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
      onOk(){
        console.log(that.state.selectedRows,data)
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
      visible: true,
    });
  };

  //  批量设置点击确定回调
  setUpHandleOk = (e: any) => {
    this.setState({
      visible: false,
    });
  };


  //  批量设置点击取消回调
  setUpHandleCancel = (e: any) => {
    this.setState({
      visible: false,
    });
  };


  render() {

    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 8 },
    }
    const { getFieldDecorator } = this.props.form
    const rowSelection = {
      onChange: (selectedRowKeys: any, selectedRows: any) => {
        this.setState({
          selectedRows,
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
                  rules: [
                    {
                      required: true,
                      message: '请输入产品ID',
                    },
                  ],
                })(<Input placeholder="请输入产品ID" />)}
              </Form.Item>
            </Col>
            <Col span={12} pull={6}>
              <Form.Item {...formItemLayout} label="产品名称">
                {getFieldDecorator('productName', {
                  rules: [
                    {
                      required: true,
                      message: '请输入产品名称',
                    },
                  ],
                })(<Input placeholder="请输入产品名称" />)}
              </Form.Item>
            </Col>
            <Col span={12} >
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
            <Col span={12} pull={6} >
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
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />

        {/* 批量设置模态框 */}
        <Modal
          // okText="确定"
          visible={this.state.visible}
          onOk={this.setUpHandleOk}
          onCancel={this.setUpHandleCancel}
        >
          <SetUpFrom></SetUpFrom>
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
    const { getFieldDecorator } = this.props.form

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }
    return (
      <Form {...formItemLayout} onSubmit={this.setUphandleSubmit}>
        <Form.Item label="奖励类型" hasFeedback={true}>
          {getFieldDecorator('RewardType', {
            rules: [{ required: true, message: '请选择奖励类型' }],
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
        <Form.Item {...formItemLayout} label="适用人群">
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
