import React from 'react';
import { DatePicker, Button, message } from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import router from "umi/router"
import locale from 'antd/lib/date-picker/locale/zh_CN';

const { RangePicker } = DatePicker;

interface UserFormProps {

}
interface BasicLayoutState {
  dateString: any,
}
@connect(
  (props: {}, state: {}) => Object.assign({}, props, state)
)
export default class AdvancedSearchForm extends React.Component<UserFormProps, BasicLayoutState> {
  constructor(props: UserFormProps) {
    super(props)
    this.state = {
      dateString: [], // 选择日期
    };
    this.onChange = this.onChange.bind(this)
    this.ExportRewardData = this.ExportRewardData.bind(this)
    this.ExportConsumptionData = this.ExportConsumptionData.bind(this)
    this.ExportTotalData = this.ExportTotalData.bind(this)
  }

  onChange(value: any, dateString: any[]) {
    // console.log('Selected Time: ', value);
    // console.log('Formatted Selected Time: ', dateString);
    this.setState({
      dateString,
    })
  }

  // 导出发放奖励数据
  ExportRewardData() {
    if (!this.state.dateString[0]) {
      message.error('请选择日期');
    } else {
      window.location.href = `http://unitest.fosunholiday.com/api/mms/spread/backend/accounts/export/prize/issue?startDate=${this.state.dateString[0]}&endDate=${this.state.dateString[1]}`
    }
  }

  // 导出消费奖励数据
  ExportConsumptionData() {
    if (!this.state.dateString[0]) {
      message.error('请选择日期');
    } else {
      window.location.href = `http://unitest.fosunholiday.com/api/mms/spread/backend/accounts/export/prize/deduction?startDate=${this.state.dateString[0]}&endDate=${this.state.dateString[1]}`
    }
  }

  // 总数据导出
  ExportTotalData() {
    if (!this.state.dateString[0]) {
      message.error('请选择日期');
    } else {
      window.location.href = `http://unitest.fosunholiday.com/api/mms/spread/backend/accounts/export/prize/sum?startDate=${this.state.dateString[0]}&endDate=${this.state.dateString[1]}`
    }
  }
  render() {
    // 获取当前时间给到日期控件
    const dateFormat = 'YYYY-MM-DD';
    const disabledDate = (current: any) => {
      // Can not select days after today
      return current && current > moment().endOf('day');
    }
    return (
      <div className="dataOutput">
        <div>
          <RangePicker
            // defaultValue={[moment(startDatastr, dateFormat), moment(endDatastr, dateFormat)]}
            format={dateFormat}
            onChange={this.onChange}
            disabledDate={disabledDate}
            locale={locale}
          />
        </div>
        <br />
        <Button type="primary" size="large" shape="round" icon="download" onClick={this.ExportRewardData}>导出发放奖励数据</Button>
        <br />
        <br />
        <Button type="primary" size="large" shape="round" icon="download" onClick={this.ExportConsumptionData}>导出消费奖励数据</Button>
        <br />
        <br />
        <Button type="primary" size="large" shape="round" icon="download" onClick={this.ExportTotalData}>总数据导出</Button>
      </div>
    );
  }
}

