import React from 'react';
import { Card, Divider, Row, Col, Button, Modal, Popconfirm, Icon, Form, Input, Checkbox } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { connect } from 'dva';

interface UserFormProps extends FormComponentProps {

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
  dispatch: Function,
  bjlList: {
    detailData: {}
  },
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
    this.props.dispatch({
      type: 'bjlList/detail',
      payload: {
        id: this.props.routing.location.query.id
      }
    })
  }
  // 审核通过确定回调函数
  auditPassConfirm() {
    this.props.dispatch({
      type: 'bjlList/review',
      payload: {
        id: this.props.routing.location.query.id,
        status: "SUCCESSFUL",
      }
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
        console.log('Received values of form: ', values);
        let obj = {
          id: this.props.routing.location.query.id,
          status: "FAILED",
          reason: values.reason,
          remark: values.remark,
        }
        // 当对象key值无数据时删除该key
        for (let key in obj) {
          if (!obj[key] && obj[key] !== 0) {
            delete obj[key]
          }
        }
        this.props.dispatch({
          type: 'bjlList/review',
          payload: obj
        })
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
    const { getFieldDecorator } = this.props.form;
    console.log(this.props.bjlList.detailData)
    return (
      <div>
        <h2>
          <b>ID：{this.props.bjlList.detailData.id}</b>
        </h2>
        <Card bordered={false}>
          <div>
            <h3>
              <b>推荐信息</b>
            </h3>
            <Row gutter={32}>
              <Col span={8}>补发ID：{this.props.bjlList.detailData.id}</Col>
              <Col span={8}>推荐方式：{this.props.bjlList.detailData.channel == 0 ? "复游会" : "旅行社"}</Col>
              <Col span={8}>用户名：{this.props.bjlList.detailData.mobile}</Col>
              <Col span={8}>补发时间：{this.props.bjlList.detailData.reissueDate}</Col>
              <Col span={8}>用户手机号：{this.props.bjlList.detailData.mobile}</Col>
            </Row>
            {this.props.bjlList.detailData.reviewStatus === 0 && (
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
              <Col span={8}>订单号： {this.props.bjlList.detailData.outOrderId}</Col>
              <Col span={8}>总应收：{this.props.bjlList.detailData.orderPrize}（<span style={{ color: "red" }}>已收：{this.props.bjlList.detailData.orderPrize}</span>）</Col>
              <Col span={8}>售卖币种：{this.props.bjlList.detailData.currencyId}(元)</Col>
              <Col span={8}>下单时间：{this.props.bjlList.detailData.orderTime}</Col>
              <Col span={8}>产品名称：{this.props.bjlList.detailData.productName}</Col>
              {/* <Col span={8}>产品类型：自由行</Col>
              <Col span={8}>产品经理：admin</Col> */}
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
              <Col span={8}>奖励金：{this.props.bjlList.detailData.prize}</Col>
              <Col span={8}>奖励类型：固定金额</Col>
              <Col span={8}>奖励状态：{this.props.bjlList.detailData.prizeStatus === 0 ? '未发放' : '已发放'}</Col>
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
          <div>
            <h3>
              <b>审核信息</b>
            </h3>
            <Row gutter={32}>
              <Col span={8}>审核人：{this.props.bjlList.detailData.reviewer}</Col>
              <Col span={8}>审核时间：{this.props.bjlList.detailData.reviewDate}</Col>
              {this.props.bjlList.detailData.reviewStatus === 0 && <Col span={8}>审核状态：待审核</Col>}
              {this.props.bjlList.detailData.reviewStatus === 1 && <Col span={8}>审核状态：审核成功</Col>}
              {this.props.bjlList.detailData.reviewStatus === 2 && <Col span={8}>审核状态：审核失败</Col>}
              <Col span={8}>备注：{this.props.bjlList.detailData.remark}</Col>
              <Col span={8}>失败原因：{this.props.bjlList.detailData.reason}</Col>
            </Row>
          </div>
          <Divider />
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
              {getFieldDecorator('remark', {
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
