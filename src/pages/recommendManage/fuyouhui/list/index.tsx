import React from 'react';
import { DatePicker, Button } from 'antd';
import moment from 'moment';
// import styles from './index.css';

const { RangePicker } = DatePicker;

interface UserFormProps {

}
interface BasicLayoutState {

}

export default class AdvancedSearchForm extends React.Component<UserFormProps, BasicLayoutState> {
  constructor(props: UserFormProps) {
    super(props)
    this.state = {
      dateString: [], // 选择日期
    };
    this.onChange = this.onChange.bind(this)
  }

  onChange(value: any, dateString: any[]) {
    // console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
    this.setState({
      dateString,
    })
  }

  render() {

    // 获取当前时间给到日期控件
    const dateFormat = 'YYYY/MM/DD';
    const date = new Date();
    const startDatastr = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
    const endDatastr = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + (date.getDate() + 7);

    return (
      <div className="dataOutput">
        <div>
          <RangePicker
            defaultValue={[moment(startDatastr, dateFormat), moment(endDatastr, dateFormat)]}
            format={dateFormat}
            onChange={this.onChange}
          />
        </div>
        <br />
        <Button type="primary" size="large">导出发放奖励数据</Button>
        <br />
        <br />
        <Button type="primary" size="large">导出消费励数据</Button>
        <br />
        <br />
        {/* <div style={{height:"60px"}}></div> */}
        <Button type="primary" size="large">总数据导出</Button>
      </div>
    );
  }
}

