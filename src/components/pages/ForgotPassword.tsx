import React, { FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  sendPasswordResetEmail,
  setError,
  setSuccess,
} from '../../store/actions/authActions';
import { RootState } from '../../store';
import { Layout, Form, Input, Button, message } from 'antd';

const { Content } = Layout;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const { error, success } = useSelector((state: RootState) => state.auth);

  React.useEffect(() => {
    if (error) {
      dispatch(setError(''));
    }
    if (success) {
      dispatch(setSuccess(''));
    }
  }, [error, dispatch, success]);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    await dispatch(sendPasswordResetEmail(email, 'Email Sent.'));
    setLoading(false);
  };

  const finishFailed = (errorInfo: any) => message.error(errorInfo);
  const finishSuccess = (success: string) => message.success(success);

  return (
    <Content>
      {error && finishFailed(error)}
      {success && finishSuccess(success)}
      <div>
        <h1>Reset Password</h1>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={submitHandler}
          onFinishFailed={finishFailed}
        >
          <Form.Item name={['email']} label="Email" rules={[{ type: 'email' }]}>
            <Input
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Send Password reset email
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Content>
  );
};

export default ForgotPassword;
