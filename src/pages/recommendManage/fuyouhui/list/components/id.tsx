import React from 'react';
import { Card, Divider, Row, Col, Button, Modal, Popconfirm, Icon, Form, Input, Table , Popover } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { connect } from 'dva';
import router from "umi/router"

const { TextArea } = Input;

interface UserFormProps extends FormComponentProps {
  fyhList: {
    detailData: {
      memberRecommendPrize: any[],
    }
  },
}
interface interface_state {
  auditFailedVisible: boolean,
  tableColumns: any[],
  selectedRowKeys: any[],
  resetFields: any,
  recode: any,
}
interface interface_props extends UserFormProps {
  routing: {
    location: {
      query: {
        id: string
      }
    }
  }
}
@connect(
  (props: {}, state: {}) => Object.assign({}, props, state)
)
class Detail extends React.Component<interface_props, interface_state> {
  constructor(props: any) {
    super(props)
    this.state = {
      resetFields: null,
      auditFailedVisible: false, // 审核失败显示隐藏
      selectedRowKeys: [], // 表格选择框选定的数据
      recode: {}, // 审查失败数据
      tableColumns: [
        {
          title: '序号',
          dataIndex: 'Serial',
          key: 'Serial',
          align: "center",
        },
        {
          title: '推荐ID',
          dataIndex: 'id',
          key: 'id',
          align: "center",
        },
        {
          title: '推荐时间',
          dataIndex: 'recommendDate',
          key: 'recommendDate',
          align: "center",
        },
        {
          title: '被推荐人',
          dataIndex: 'recommended',
          key: 'recommended',
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

  componentDidMount() {
    this.props.dispatch({
      type: 'fyhList/detail',
      payload: {
        id: this.props.routing.location.query.id
      }
    })
  }
  // 审核成功确定回调函数
  auditPassConfirm(item: any) {
    this.props.dispatch({
      type: 'fyhList/review',
      payload: {
        id: item.id,
        status: "SUCCESSFUL",
      },
      id:this.props.routing.location.query.id
    })
  }
  // 审核失败 模态框显示
  auditFailed(recode: any) {
    this.setState({
      auditFailedVisible: true,
      recode,
    });
  }

  //  审核失败模态框点击确定回调
  auditFailedHandleOk = (e: any) => {
    // 表单验证
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        this.setState({
          auditFailedVisible: false,
        });
        this.props.dispatch({
          type: 'fyhList/review',
          payload: {
            id: this.state.recode.id,
            status: "FAILED",
            reason: values.reason,
          },
          id:this.props.routing.location.query.id
        })
      }
    });
  };

  //  审核失败模态框点击取消回调
  auditFailedleCancel = (e: any) => {
    this.setState({
      auditFailedVisible: false,
    });
  };

  render() {
    const { getFieldDecorator, resetFields } = this.props.form;
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
              <Col span={6}>用户ID：{this.props.fyhList.detailData.id}</Col>
              <Col span={6}>用户名：{this.props.fyhList.detailData.recommender}</Col>
              <Col span={6}>手机号：</Col>
              <Col span={6}>注册时间：{this.props.fyhList.detailData.recommendDate}</Col>
            </Row>
          </div>
          <Divider />
          <div>
            <h3>
              <b>拉新奖励</b>
            </h3>
          </div>
          {
            this.props.fyhList.detailData.memberRecommendPrize && this.props.fyhList.detailData.memberRecommendPrize.map((item: any, index: any) => {
              return (
                <div key={index} style={item.recommends ? { display: 'block' } : { display: "none" }}>
                  <Row gutter={32}>
                    <Col span={4}>阶段{item.stage + 1}</Col>
                    <Col span={4}>是否发放奖励：{item.status === "SUCCESSFUL" ? "是" : "否"}</Col>
                    <Col span={4}>奖励金：{item.prize}元</Col>
                    {item.recommendReviews && item.recommendReviews[0].status  ? null : <Col span={4}>是否成功审核: </Col>}
                    {item.recommendReviews && item.recommendReviews[0].status === "SUCCESSFUL" ? <Col span={4}>是否成功审核：是 </Col> : null}
                    {item.recommendReviews && item.recommendReviews[0].status === "FAILED" ? <Popover  content={<span>{item.recommendReviews[0].reason}</span>}><Col span={4}>是否成功审核：否 </Col></Popover> : null}
                    <Col span={4}>审核人：{item.recommendReviews && item.recommendReviews[0].reviewer}</Col>
                    <Col span={4}>审核时间：{item.recommendReviews && item.recommendReviews[0].reviewDate}</Col>
                  </Row>
                  <Row gutter={20} style={item.recommendReviews ? { display: "none" } : { display: "block" }}>
                    <Col span={24} style={{ textAlign: 'right' }}>
                      <Popconfirm
                        title="Are you sure？"
                        onConfirm={this.auditPassConfirm.bind(this, item)}
                        icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                      >
                        <Button type="primary">
                          审核成功
                        </Button>
                      </Popconfirm>
                      <Button type="primary" style={{ marginLeft: 10 }} onClick={this.auditFailed.bind(this, item)}>
                        审核失败
                      </Button>
                    </Col>
                  </Row>
                  <Table rowSelection={rowSelection} rowKey={((item: object, index: number) => item.id)} columns={this.state.tableColumns} loading={this.props.loading.global} dataSource={item.recommends && item.recommends} pagination={false} />
                  <Divider />
                </div>
              )
            })
          }
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
                rules: [{ required: true, message: '请输入失败原因' }],
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
