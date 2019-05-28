import React from 'react'
import Stage from './stage'
import { connect } from 'dva';
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
  Descriptions,
  Popconfirm,
  message
} from 'antd';

const { Option } = Select;
const { TextArea } = Input;
const AutoCompleteOption = AutoComplete.Option;
const { RangePicker } = DatePicker;
const DescriptionsItem = Descriptions.Item;

interface intStage {
  "stage": number,
  "name": string,
  "subTitle": string,
  "description": string,
  "image": string,
  "timesBegin": number,
  "timesEnd": number,
  "prizeScale": string,
  "value": number
}

interface IntProp {
  routing: {
    location: {
      state?: {
        id: string,
        activityName: string,
        beginDate: Date,
        enabled: boolean,
        endDate: Date,
        limitation: string,
        ruleType: string,
        serial: number,
        stages: any[],
      }
    }
  }
}

@connect(
  (props: {}, state: {}) => Object.assign({}, props, state)
)
@Form.create({ name: 'register' })
export default class RegistrationForm extends React.Component<IntProp, any> {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      if (!err) {
        values.beginTime = values.validity[0]
        values.endTime = values.validity[1]
        values.stages = this.props.fyhSetting.stages
        console.log('Received values of form: ', values);

        this.props.dispatch({
          type: 'fyhSetting/add',
          payload: values
        })
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
    let autoCompleteResult: any;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  };

  onConfirm = (record: intStage, index: number) => {
    this.props.dispatch({
      type: 'fyhSetting/del',
      payload: index
    })
  }

  componentDidMount() {
    // if (this.props.routing.location.state) {}
  }

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
            {getFieldDecorator('activityName', {
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
            {getFieldDecorator('activitySubtitle', {
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
            {getFieldDecorator('activityDescription', {
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
            {getFieldDecorator('ruleType', {
              rules: [
                {
                  required: true,
                  message: '请选择奖励类型',
                },
              ],
            })(
              <Radio.Group>
                <Radio value="SINGLE">单次奖励</Radio>
                <Radio value="ACCUMULATIVE">累计奖励</Radio>
              </Radio.Group>,
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="适用人群">
            {getFieldDecorator('limitation', {
              rules: [
                {
                  required: true,
                  message: '请选择适用人群',
                },
              ],
            })(
              <Radio.Group>
                <Radio value="ALL_MEMBER">全部</Radio>
                <Radio value="EXCLUDE_EMPLOYEE">复星员工</Radio>
                <Radio value="ONLY_EMPLOYEE">不包含复星员工</Radio>
              </Radio.Group>,
            )}
          </Form.Item>
          {
            this.props.fyhSetting.stages.map((item: intStage, index: number) => {
              return (
                <Form.Item label={`阶段${index + 1}`} wrapperCol={{
                  xs: { span: 24 },
                  sm: { span: 16 },
                }
                } key={item.name} >
                  <Descriptions bordered >
                    <DescriptionsItem label="开始次数">
                      <span>{item.timesBegin}</span>
                    </DescriptionsItem>
                    <DescriptionsItem label="结束次数"><span>{item.timesEnd}</span></DescriptionsItem>
                    <DescriptionsItem label="活动名称"><span>{item.name}</span></DescriptionsItem>
                    <DescriptionsItem label="奖励金额" ><span>{item.value}</span></DescriptionsItem>
                    <DescriptionsItem label="活动副标题" span={2}><span>{item.subTitle}</span></DescriptionsItem>
                    <DescriptionsItem label="活动说明" span={3}>
                      <span>{item.description}</span>
                    </DescriptionsItem>
                  </Descriptions>
                  <Popconfirm
                    title="Are you sure delete this task?"
                    onConfirm={this.onConfirm.bind(this, item, index)}
                    onCancel={(e) => {
                      console.log(e);
                      message.error('Click on No');
                    }}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button type="danger">删除</Button>
                  </Popconfirm>
                </Form.Item>
              )
            })
          }
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
