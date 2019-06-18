import React from 'react'
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';
import { connect } from 'dva';

const { Option } = Select;
const { TextArea } = Input;
const AutoCompleteOption = AutoComplete.Option;

@connect(
  (props: {}, state: {}) => Object.assign({}, props, state)
)
@Form.create({ name: 'register' })
export default class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        for (let key in values) {
          if (!values[key] && values[key] !== 0) {
            delete values[key]
          }
        }
        this.props.dispatch({
          type: 'bjlList/creat',
          payload: values
        })
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>,
    );

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        {/* <Form.Item
          label={
            <span>
              用户账号
            </span>
          }
        >
          {getFieldDecorator('mobile', {
            rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
          })(<Input placeholder="请输入用户账号" />)}
        </Form.Item> */}
        <Form.Item label="手机号码">
          {getFieldDecorator('mobile', {
            rules: [{ required: true, message: 'Please input your phone number!' }],
          })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} placeholder="请输入手机号码"/>)}
        </Form.Item>
        <Form.Item
          label={
            <span>
              奖励
            </span>
          }
        >
          {getFieldDecorator('prize', {
            rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
          })(<Input placeholder="请输入奖励" />)}
        </Form.Item>
        <Form.Item label="所属平台" hasFeedback>
          {getFieldDecorator('channel', {
            rules: [{ required: true, message: '请选择所属平台' }],
          })(
            <Select placeholder="请选择所属平台">
              <Option value="0">复游会</Option>
              <Option value="1">旅行社</Option>
            </Select>,
          )}
        </Form.Item>

        <Form.Item
          label={
            <span>
              订单ID
            </span>
          }
        >
          {getFieldDecorator('outOrderId', {
          })(<Input placeholder="请输入订单ID" />)}
        </Form.Item>

        <Form.Item label="备注" hasFeedback>
          {getFieldDecorator('remark', {
          })(
            <TextArea rows={4} placeholder="请输入备注" />,
          )}
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            确定
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
