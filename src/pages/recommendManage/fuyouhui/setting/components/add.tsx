import React from 'react'
import Stage from './stage'
import { connect } from 'dva';
import router from "umi/router"
import moment from 'moment';
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
import { FormStage } from './stage'
import  'antd/lib/locale-provider/zh_CN';

moment.locale('zh-cn');
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
        validity?: any[],
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
    visible: false, // 弹出框是否显示
    currentEdit: {}, // 当前编辑的数据
    type: 'add', // 枚举，add=> 添加，  edit=>修改
    data: {}, // 编辑数据
  };

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      if (!err) {
        values.beginTime = values.validity[0]
        values.endTime = values.validity[1]
        values.stages = this.props.fyhSetting.stages
        if (this.state.type == 'add') {
          this.props.dispatch({
            type: 'fyhSetting/add',
            payload: values
          })
        } else {
          values.id = this.state.data.id
          values.type = 'edit'
          this.props.dispatch({
            type: 'fyhSetting/edit',
            payload: values
          })
        }
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
  // 弹出框点确定
  handleCreate = (data) => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      let stage = Object.assign({}, data, values)
      const stages = this.props.fyhSetting.stages
      const index = stages.findIndex((item: any) => {
        return item.stage === stage.stage
      })
      stages[index] = stage
      this.props.dispatch({
        type: 'fyhSetting/save',
        payload: {
          stages
        }
      })
      // console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
    });
  }

  saveFormRef = formRef => {
    this.formRef = formRef;
  };
  // 
  onEdit = (value: intStage, e: Event): void => {
    this.setState({
      visible: true,
      currentEdit: value
    })
  }

  componentDidMount() {
    let editData = this.props.routing.location.state
    if (editData) {
      let dateFormat = 'YYYY-MM-DD'
      let validity = [moment(editData.beginDate, dateFormat), moment(editData.endDate, dateFormat)]
      this.props.dispatch({
        type: 'fyhSetting/save',
        payload: {
          stages: editData.stages
        }
      })
      this.setState({
        type: 'edit',
        data: editData,
        validity
      })
    }
  }

  render() {
    const locale ={
      "lang": {
        "placeholder": "Select date",
        "rangePlaceholder": ["Start date", "End date"],
        "today": "Today",
        "now": "Now",
        "backToToday": "Back to today",
        "ok": "Ok",
        "clear": "Clear",
        "month": "Month",
        "year": "Year",
        "timeSelect": "Select time",
        "dateSelect": "Select date",
        "monthSelect": "Choose a month",
        "yearSelect": "Choose a year",
        "decadeSelect": "Choose a decade",
        "yearFormat": "YYYY",
        "dateFormat": "M/D/YYYY",
        "dayFormat": "D",
        "dateTimeFormat": "M/D/YYYY HH:mm:ss",
        "monthFormat": "MMMM",
        "monthBeforeYear": false,
        "previousMonth": "Previous month (PageUp)",
        "nextMonth": "Next month (PageDown)",
        "previousYear": "Last year (Control + left)",
        "nextYear": "Next year (Control + right)",
        "previousDecade": "Last decade",
        "nextDecade": "Next decade",
        "previousCentury": "Last century",
        "nextCentury": "Next century"
      },
    }
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
        <h3>{this.state.type == 'add' ? '新增活动设置' : '编辑活动设置'}</h3>
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
              initialValue: this.state.data.activityName
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
              initialValue: this.state.data.activitySubtitle
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
              initialValue: this.state.data.activityDescription
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
              initialValue: (this.state.validity && this.state.validity[0]._i) && this.state.validity 
            })(<RangePicker local={locale} />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="奖励类型">
            {getFieldDecorator('ruleType', {
              rules: [
                {
                  required: true,
                  message: '请选择奖励类型',
                },
              ],
              initialValue: this.state.data.ruleType
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
              initialValue: this.state.data.limitation
            })(
              <Radio.Group>
                <Radio value="ALL_MEMBER">全部</Radio>
                <Radio value="EXCLUDE_EMPLOYEE">复星员工</Radio>
                <Radio value="ONLY_EMPLOYEE">不包含复星员工</Radio>
              </Radio.Group>,
            )}
          </Form.Item>
          {
            (this.props.fyhSetting.stages || []).map((item: intStage, index: number) => {
              return (
                <Form.Item label={`阶段${index + 1}`} wrapperCol={{
                  xs: { span: 24 },
                  sm: { span: 16 },
                }
                } key={item.stage} >
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
                      message.error('Click on No');
                    }}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button type="danger">删除</Button>
                  </Popconfirm>
                  <Button style={{ marginLeft: 10 }} onClick={e => this.onEdit(item, e)}>编辑</Button>
                </Form.Item>
              )
            })
          }
          <Form.Item {...tailFormItemLayout}>
            <Stage />
          </Form.Item>

          <FormStage
            data={this.state.currentEdit}
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            onCancel={(): void => {
              this.setState({
                visible: false
              })
            }}
            onCreate={this.handleCreate}
          ></FormStage>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              保存
          </Button>
            <Button style={{ marginLeft: 10 }} type="primary" onClick={() => router.goBack()}>
              返回
          </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
