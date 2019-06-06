import React from 'react';
import { DatePicker, Button } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

interface UserFormProps {

}
interface BasicLayoutState {
  dateString: any,
}

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
    console.log('Formatted Selected Time: ', dateString);
    this.setState({
      dateString,
    })
  }

  // 导出发放奖励数据
  ExportRewardData() {
    console.log("1", this.state.dateString)
  }

  // 导出消费奖励数据
  ExportConsumptionData() {
    console.log("2", this.state.dateString)
  }

  // 总数据导出
  ExportTotalData() {
    console.log("3", this.state.dateString)
  }
  render() {
    // 获取当前时间给到日期控件
    const dateFormat = 'YYYY/MM/DD';
    // const date = new Date();
    // const startDatastr = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
    // const endDatastr = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + (date.getDate() + 7);
    const disabledDate = (current: any) => {
      // Can not select days before today and today
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
          />
        </div>
        <br />
        <Button type="primary" size="large" onClick={this.ExportRewardData}>导出发放奖励数据</Button>
        <br />
        <br />
        <Button type="primary" size="large" onClick={this.ExportConsumptionData}>导出消费奖励数据</Button>
        <br />
        <br />
        <Button type="primary" size="large" onClick={this.ExportTotalData}>总数据导出</Button>
      </div>
    );
  }
}

