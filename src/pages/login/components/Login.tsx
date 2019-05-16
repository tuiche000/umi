import React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import styles from './Login.css';
import { FormComponentProps } from 'antd/lib/form';
import { connect } from 'dva';
import router from 'umi/router';

interface UserFormProps extends FormComponentProps {
  dispatch: Function
}

@connect(
  (props: {}, state: {}) => Object.assign({}, props, state)
)
@Form.create({ name: 'normal_login' })
export default class NormalLoginForm extends React.Component<UserFormProps> {
  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log(this.props)
        // console.log('Received values of form: ', values);
        this.props.dispatch({
          type: 'login/asyncLogin',
          payload: ''
        })
        router.replace('/')    
      }
    });
  };

  componentDidMount = (): void => {
    // console.log(this.props)
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div id="#components-form-demo-normal-login">
        <Form onSubmit={this.handleSubmit} className={styles.loginForm}>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="用户名"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="密码"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>记住我</Checkbox>)}
            <a className={styles.forgot} href="">
              Forgot password
          </a>
            <Button type="primary" htmlType="submit" className={styles.FormButton}>
              登录
          </Button>
            {/* Or <a href="">register now!</a> */}
          </Form.Item>
        </Form>
      </div>
    );
  }
}