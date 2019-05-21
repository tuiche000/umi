import React from 'react';
import { Card, Divider, Row, Col, Button, Modal, Popconfirm, Icon, Form, Input, Table } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { connect } from 'dva';

const { TextArea } = Input;

interface UserFormProps extends FormComponentProps {

}
interface interface_state {
  auditFailedVisible: boolean,
  tableColumns: any[],
  selectedRowKeys: any[],
  tableData: any[],
  resetFields:any,
}
interface interface_props extends UserFormProps {

}
@connect(
  (props: {}, state: {}) => Object.assign({}, props, state)
)
class Detail extends React.Component<interface_props, interface_state> {
  constructor(props: any) {
    super(props)
    this.state = {
      resetFields:null,
      auditFailedVisible: false, // 审核未通过显示隐藏
      selectedRowKeys: [], // 表格选择框选定的数据
      tableData: [
        {
          key: "1",
          Serial: 1,
          RecommendID: 445,
          ActivityName: "按国家规范",
          ActivityType: "dsf",
          RecommendedTime: "2019/01/01",
          RecommendedPerson: "hsadu",
          RegistrationTime: "2019/10/10"
        },
        {
          key: "2",
          Serial: 2,
          RecommendID: 445,
          ActivityName: "按国家规范",
          ActivityType: "dsf",
          RecommendedTime: "2019/01/01",
          RecommendedPerson: "hsadu",
          RegistrationTime: "2019/10/10"
        },
      ], // 表格数据
      tableColumns: [
        {
          title: '序号',
          dataIndex: 'Serial',
          key: 'Serial',
          align: "center",
        },
        {
          title: '推荐ID',
          dataIndex: 'RecommendID',
          key: 'RecommendID',
          align: "center",
        },
        {
          title: '活动名称',
          dataIndex: 'ActivityName',
          key: 'ActivityName',
          align: "center",
        },
        {
          title: '活动类型',
          dataIndex: 'ActivityType',
          key: 'ActivityType',
          align: "center",
        },
        {
          title: '推荐时间',
          dataIndex: 'RecommendedTime',
          key: 'RecommendedTime',
          align: "center",
        },
        {
          title: '被推荐人',
          dataIndex: 'RecommendedPerson',
          key: 'RecommendedPerson',
          align: "center",
        },
        {
          title: '被推荐人注册时间',
          dataIndex: 'RegistrationTime',
          key: 'RegistrationTime',
          align: "center",
        },
      ], // 表格表头
    }
    this.auditFailed = this.auditFailed.bind(this)
    this.auditPassConfirm = this.auditPassConfirm.bind(this)
  };

  // 审核通过确定回调函数
  auditPassConfirm() {
    console.log("11")
  }
  // 审核未通过模态框显示
  auditFailed() {
    this.setState({
      auditFailedVisible: true,
    });
  }
  //  审核未通过模态框点击确定回调
  auditFailedHandleOk = (e: any) => {
    // 表单验证
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.setState({
          auditFailedVisible: false,
        });
      }
    });
  };

  //  审核未通过模态框点击取消回调
  auditFailedleCancel = (e: any) => {
    this.setState({
      auditFailedVisible: false,
    });
  };

  render() {
    const { getFieldDecorator , resetFields } = this.props.form;
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
        <Card bordered={false}>
          <div>
            <h3>
              <b>基础信息</b>
            </h3>
            <Row gutter={32}>
              <Col span={6}>用户ID：3410xxxx</Col>
              <Col span={6}>用户名：昆明5天</Col>
              <Col span={6}>手机号：188888888888</Col>
              <Col span={6}>注册时间：2019/10/10</Col>
            </Row>
            <Row gutter={20}>
              <Col span={24} style={{ textAlign: 'right' }}>
                <Popconfirm
                  title="Are you sure？"
                  onConfirm={this.auditPassConfirm}
                  icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                >
                  <Button type="primary">
                    审核通过
                    </Button>
                </Popconfirm>
                <Button type="primary" style={{ marginLeft: 10 }} onClick={this.auditFailed}>
                  审核未通过
              </Button>
              </Col>
            </Row>
          </div>
          <Divider />
          <div>
            <h3>
              <b>拉新奖励</b>
            </h3>
            <Row gutter={32}>
              <Col span={4}>阶段二</Col>
              <Col span={4}>是否发放奖励：否</Col>
              <Col span={4}>奖励金：50元</Col>
              <Col span={4}>是否通过审核：是</Col>
              <Col span={4}>审核人：公司</Col>
              <Col span={4}>审核时间：2019/10/10</Col>
            </Row>
            <Table rowSelection={rowSelection} columns={this.state.tableColumns} loading={this.props.loading.global} dataSource={this.state.tableData} pagination={false} />
          </div>
          <Divider />
          <div>
            <Row gutter={32}>
              <Col span={4}>阶段一</Col>
              <Col span={4}>是否发放奖励：否</Col>
              <Col span={4}>奖励金：50元</Col>
              <Col span={4}>是否通过审核：是</Col>
              <Col span={4}>审核人：公司</Col>
              <Col span={4}>审核时间：2019/10/10</Col>
            </Row>
            <Table rowSelection={rowSelection} columns={this.state.tableColumns} loading={this.props.loading.global} dataSource={this.state.tableData} pagination={false} />
          </div>
        </Card>

        {/* 批量设置模态框 */}
        <Modal
          visible={this.state.auditFailedVisible}
          onOk={this.auditFailedHandleOk}
          onCancel={this.auditFailedleCancel}
        >
  
          <Form onSubmit={this.auditFailedHandleOk}>
            <Form.Item label="失败原因">
              {getFieldDecorator('reason', {
                // rules: [{ required: true, message: '请输入失败原因' }],
              })(
                <TextArea
                  placeholder="请输入失败原因"
                />,
              )}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
const warpDetail = Form.create<UserFormProps>()(Detail);
export default warpDetail
