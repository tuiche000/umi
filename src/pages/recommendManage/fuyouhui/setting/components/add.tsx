import React from 'react'
import Stage from './stage'
import router from "umi/router"
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
  DatePicker,
  Radio,
  Descriptions
} from 'antd';

const { Option } = Select;
const { TextArea } = Input;
const AutoCompleteOption = AutoComplete.Option;
const { RangePicker } = DatePicker;
const DescriptionsItem = Descriptions.Item;

@Form.create({ name: 'register' })
export default class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  handleConfirmBlur = (e: any) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule: any, value: any, callback: any) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule: any, value: any, callback: any) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleWebsiteChange = (value: any) => {
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
      <div>
        <h3>新增活动设置</h3>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item
            label={
              <span>
                活动名称
            </span>
            }
          >
            {getFieldDecorator('ActivityName', {
              rules: [{ required: true, message: '请输入活动名称', whitespace: true }],
            })(<Input />)}
          </Form.Item>
          <Form.Item
            label={
              <span>
                活动副标题
            </span>
            }
          >
            {getFieldDecorator('ActivitySubtitle', {
              // rules: [{ required: true, message: '请输入活动名称', whitespace: true }],
            })(<Input />)}
          </Form.Item>
          <Form.Item
            label={
              <span>
                活动说明
            </span>
            }
          >
            {getFieldDecorator('ActivityDescription', {
              // rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="有效期" hasFeedback={true}>
            {getFieldDecorator('validity', {
              rules: [
                {
                  required: true,
                  message: '请选择推荐时间',
                },
              ],
            })(<RangePicker />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="奖励类型">
            {getFieldDecorator('RewardType', {
              rules: [
                {
                  required: true,
                  message: '请选择奖励类型',
                },
              ],
            })(
              <Radio.Group>
                <Radio value="1">单次奖励</Radio>
                <Radio value="2">累计奖励</Radio>
              </Radio.Group>,
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="适用人群">
            {getFieldDecorator('IntendedFor', {
              rules: [
                {
                  required: true,
                  message: '请选择适用人群',
                },
              ],
            })(
              <Radio.Group>
                <Radio value="all">全部</Radio>
                <Radio value="staff">复星员工</Radio>
                <Radio value="isNotStaff">不包含复星员工</Radio>
              </Radio.Group>,
            )}
          </Form.Item>

          <Form.Item label="阶段" {...tailFormItemLayout}>
            <Descriptions bordered>
              <DescriptionsItem label="开始时间">Cloud Database</DescriptionsItem>
              <DescriptionsItem label="结束时间">Prepaid</DescriptionsItem>
              <DescriptionsItem label="活动名称">YES</DescriptionsItem>
              <DescriptionsItem label="阶段1活动副标题" span={3}>2018-04-24 18:00:00</DescriptionsItem>
              <DescriptionsItem label="活动说明" span={3}>
              活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明
              活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明
              活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明
              </DescriptionsItem>
            </Descriptions>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Stage />
          </Form.Item>



          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              保存
          </Button>
            <Button style={{ marginLeft: 20 }} type="primary" htmlType="submit" onClick={() => router.goBack()}>
              返回
          </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
