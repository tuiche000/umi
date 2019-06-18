import React from 'react';
import { Card, Divider, Row, Col, Button, Modal, Popconfirm, Icon, Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { connect } from 'dva';

interface UserFormProps extends FormComponentProps {
  lxsList: {
    detailData: {
      id: any,
    }
  },
}
interface interface_state {
  auditFailedVisible: boolean,
}
interface interface_props extends UserFormProps {
  routing: {
    location: {
      query: {
        id: string
      }
    }
  },
  dispath: Function,
}

@connect(
  (props: {}, state: {}) => Object.assign({}, props, state)
)
class Detail extends React.Component<interface_props, interface_state> {
  constructor(props: any) {
    super(props)
    this.state = {
      auditFailedVisible: false, // 审核未通过显示隐藏
    }
    this.auditFailed = this.auditFailed.bind(this)
    this.auditPassConfirm = this.auditPassConfirm.bind(this)
  };
  componentDidMount() {
    console.log(this.props.routing.location.query.id)
    this.props.dispatch({
      type: 'lxsList/detail',
      payload: {
        id: this.props.routing.location.query.id,
      }
    })
  }
  componentWillUnmount() {
    // 组件销毁时清空数据
    this.props.dispatch({
      type: 'lxsList/save',
      payload: {
        detailData: {}
      }
    })
  }

  // 审核通过确定回调函数
  auditPassConfirm() {
    this.props.dispatch({
      type: 'lxsList/examine',
      payload: {
        id: this.props.routing.location.query.id,
        status: "SUCCESSFUL",
      },
      // fetchPayload: this.props.lxsList.seachData,
      // query: this.props.lxsList.pageNo,
    })
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
        let obj = {
          id: this.props.routing.location.query.id,
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
          // fetchPayload: this.props.lxsList.pageNo,
          // query: this.props.lxsList.pageNo,
        })
        this.setState({
          auditFailedVisible: false,
        });
        //  清空表单
        this.props.form.resetFields()
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
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <h2>
          <b>推荐ID：{this.props.lxsList.detailData && this.props.lxsList.detailData.id}</b>
        </h2>
        <Card bordered={false}>
          <div>
            <h3>
              <b>推荐信息</b>
            </h3>
            <Row gutter={32}>
              <Col span={8}>推荐ID：{this.props.lxsList.detailData && this.props.lxsList.detailData.id}</Col>
              <Col span={8}>推荐产品：{this.props.lxsList.detailData && this.props.lxsList.detailData.productName}</Col>
              <Col span={8}>推荐人：{this.props.lxsList.detailData && this.props.lxsList.detailData.recommender}</Col>
              <Col span={8}>推荐时间：{this.props.lxsList.detailData && this.props.lxsList.detailData.recommendDate}</Col>
              <Col span={8}>被推荐人：{this.props.lxsList.detailData && this.props.lxsList.detailData.recommended}</Col>
              <Col span={8}>推荐人手机号：{this.props.lxsList.detailData && this.props.lxsList.detailData.recommender}</Col>
              {/* <Col span={8}>推荐链接：</Col> */}
            </Row>
            {(this.props.lxsList.detailData && !this.props.lxsList.detailData.prizeStatus) && (
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
            )}
          </div>
          <Divider />
          <div>
            <h3>
              <b>订单信息</b>
            </h3>
            <Row gutter={32}>
              <Col span={8}>订单号： {this.props.lxsList.detailData && this.props.lxsList.detailData.orderId}</Col>
              <Col span={8}>总应收：{this.props.lxsList.detailData && this.props.lxsList.detailData.paidPrice}（<span style={{ color: "red" }}>已收：{this.props.lxsList.detailData && this.props.lxsList.detailData.paidPrice}</span>）</Col>
              <Col span={8}>售卖币种：{this.props.lxsList.detailData && this.props.lxsList.detailData.currency}</Col>
              <Col span={8}>下单时间：{this.props.lxsList.detailData && this.props.lxsList.detailData.orderTime}</Col>
              <Col span={8}>产品名称：{this.props.lxsList.detailData && this.props.lxsList.detailData.productSubTitle}</Col>
              <Col span={8}>产品类型：{this.props.lxsList.detailData && this.props.lxsList.detailData.productType}</Col>
              <Col span={8}>产品经理：{this.props.lxsList.detailData && this.props.lxsList.detailData.manager}</Col>
            </Row>
            {/* <Row gutter={20}>
              <Col span={24} style={{ textAlign: 'right' }}>
                <Button type="primary">
                  查看订单
              </Button>
              </Col>
            </Row> */}
          </div>
          <Divider />
          <div>
            <h3>
              <b>奖励信息</b>
            </h3>
            <Row gutter={32}>
              <Col span={8}>奖励金：{this.props.lxsList.detailData && this.props.lxsList.detailData.prize}</Col>
              {(this.props.lxsList.detailData && this.props.lxsList.detailData.prizeScale === "SCALE") && <Col span={8}>奖励比例：比例</Col>}
              {(this.props.lxsList.detailData && this.props.lxsList.detailData.prizeScale === "NUMBER") && <Col span={8}>奖励状态：累计金额</Col>}
              {(this.props.lxsList.detailData && !this.props.lxsList.detailData.prizeStatus) && <Col span={8}></Col>}
              {(this.props.lxsList.detailData && this.props.lxsList.detailData.prizeStatus === "SUCCESSFUL") && <Col span={8}>奖励状态：审核成功</Col>}
              {(this.props.lxsList.detailData && this.props.lxsList.detailData.prizeStatus === "FAILED") && <Col span={8}>奖励状态：审核失败</Col>}
            </Row>
            {/* <Row gutter={20}>
              <Col span={24} style={{ textAlign: 'right' }}>
                <Button type="primary">
                  修改
              </Button>
              </Col>
            </Row> */}
          </div>
          <Divider />
          {(this.props.lxsList.detailData && this.props.lxsList.detailData.prizeStatus) && (
            <div>
              <div>
                <h3>
                  <b>审核信息</b>
                </h3>
                <Row gutter={32}>
                  <Col span={8}>审核人：{this.props.lxsList.detailData && this.props.lxsList.detailData.reviewer}</Col>
                  <Col span={8}>审核时间：{this.props.lxsList.detailData && this.props.lxsList.detailData.reviewDate}</Col>
                  {(this.props.lxsList.detailData && !this.props.lxsList.detailData.prizeStatus) && <Col span={8}></Col>}
                  {(this.props.lxsList.detailData && this.props.lxsList.detailData.prizeStatus === "SUCCESSFUL") && <Col span={8}>审核状态：审核成功</Col>}
                  {(this.props.lxsList.detailData && this.props.lxsList.detailData.prizeStatus === "FAILED") && <Col span={8}>审核状态：审核失败</Col>}
                  <Col span={8}>备注：{this.props.lxsList.detailData && this.props.lxsList.detailData.reason}</Col>
                </Row>
              </div>
              <Divider />
            </div>
          )}
        </Card>

        {/* 批量设置模态框 */}
        <Modal
          visible={this.state.auditFailedVisible}
          onOk={this.auditFailedHandleOk}
          onCancel={this.auditFailedleCancel}
        >
          <h4><b>请填写失败原因（请谨慎填写，用户将会看到失败原因）</b></h4>
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
              {getFieldDecorator('remarks', {
                // rules: [{ required: true, message: '请输入备注' }],
              })(
                <Input
                  placeholder="请输入备注"
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
