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
  }
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
    console.log(this.props)
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <h2>
          <b>ID：{this.props.routing.location.query.id}</b>
        </h2>
        <Card bordered={false}>
          <div>
            <h3>
              <b>推荐信息</b>
            </h3>
            <Row gutter={32}>
              <Col span={8}>补发ID：2265xxxx</Col>
              <Col span={8}>推荐方式：旅行社</Col>
              <Col span={8}>用户名：杨幂</Col>
              <Col span={8}>补发时间：2019-01-22 09:09:09</Col>
              <Col span={8}>用户手机号：139000000000</Col>
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
              <b>订单信息</b>
            </h3>
            {/* <Row gutter={32}>
              <Col span={8}>订单号： 9208</Col>
              <Col span={8}>总应收：１000.00（<span style={{ color: "red" }}>已收：1000.00</span>）</Col>
              <Col span={8}>售卖币种：RMB(元)</Col>
              <Col span={8}>下单时间：2019-01-22 19:09:09</Col>
              <Col span={8}>产品名称：三亚5天4夜自由行套餐 (【春季特惠·畅玩双湾】三亚ClubMed一价全包2晚+三亚亚特兰蒂斯2晚海景双床房（无限次游玩水世界、水族馆）+亚特兰蒂斯入住期间制定餐厅晚餐85折—三亚奢华之旅)ID:2040 (自由行套餐|三亚——三亚) </Col>
              <Col span={8}>产品类型：自由行</Col>
              <Col span={8}>产品经理：admin</Col>
            </Row>
            <Row gutter={20}>
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
              <Col span={8}>奖励金：100</Col>
              <Col span={8}>奖励类型：固定金额</Col>
              <Col span={8}>奖励状态：未发放</Col>
            </Row>
            <Row gutter={20}>
              <Col span={24} style={{ textAlign: 'right' }}>
                <Button type="primary">
                  修改
              </Button>
              </Col>
            </Row>
          </div>
          <Divider />
          <div>
            <h3>
              <b>审核信息</b>
            </h3>
            <Row gutter={32}>
              <Col span={8}>审核人：xxxx</Col>
              <Col span={8}>审核时间：2019-03-04 12:19:33</Col>
              <Col span={8}>审核状态：审核通过</Col>
              <Col span={8}>备注：xxxxxxxxxxxxxxxxxxxxxxxx</Col>
              <Col span={8}>失败原因：xxx</Col>
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