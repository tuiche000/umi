import React from 'react'
import {
  Button, Icon, Modal, Form, Input, InputNumber,
} from 'antd';
import { connect } from 'dva';

const { TextArea } = Input

interface Props {

}
interface State {
  visible: boolean
}

@connect(
  (props: {}, state: {}) => Object.assign({}, props, state)
)
export default class Stage extends React.Component<Props, State> {
  constructor(props: object) {
    super(props)
    this.state = {
      visible: false,

    }
  }
  fnAddstage = () => {
    this.setState({ visible: true });
  }

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      values.prizeScale = "NUMBER"
      let stages = [...this.props.fyhSetting.stages, values]
      this.props.dispatch({
        type: 'fyhSetting/save',
        payload: {
          stages
        }
      })
      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };
  render() {
    return (
      <div id="stage">
        <Form_stage
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        ></Form_stage>
        <Button type="dashed" onClick={this.fnAddstage} style={{ width: '50%' }}>
          <Icon type="plus" /> Add field
          </Button>
        <div className="stage_list">
          <section>

          </section>
        </div>
      </div>
    )
  }
}

@Form.create({ name: 'form_stage' })
class Form_stage extends React.Component {
  render() {
    const { visible, onCancel, onCreate, form } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };
    return (
      <Modal
        visible={visible}
        title="Create a new collection"
        okText="Create"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical" {...formItemLayout}>
          <Form.Item label="开始次数">
            {getFieldDecorator('timesBegin', {
              rules: [{ required: true, message: 'Please input the title of collection!' }],
            })(<InputNumber />)}
          </Form.Item>
          <Form.Item label="结束次数">
            {getFieldDecorator('timesEnd', {
              rules: [{ required: true, message: 'Please input the title of collection!' }],
            })(<InputNumber />)}
          </Form.Item>
          <Form.Item label="金额">
            {getFieldDecorator('value', {
              rules: [{ required: true, message: 'Please input the value of collection!' }],
            })(<InputNumber />)}
          </Form.Item>
          <Form.Item label="活动名称">
            {getFieldDecorator('name')(<Input type="textarea" />)}
          </Form.Item>
          <Form.Item label="活动副标题">
            {getFieldDecorator('subTitle')(<Input type="textarea" />)}
          </Form.Item>
          <Form.Item label="活动说明">
            {getFieldDecorator('description')(<TextArea rows={3} />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}