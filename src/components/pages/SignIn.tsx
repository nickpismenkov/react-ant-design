import React, { FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signin, setError } from '../../store/actions/authActions';
import { RootState } from '../../store';
import { Layout, Form, Input, Button, message } from 'antd';
import { Link } from 'react-router-dom';

const { Content } = Layout;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const SignIn: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const { error } = useSelector((state: RootState) => state.auth);

  React.useEffect(() => {
    if (error) {
      dispatch(setError(''));
    }
  }, [error, dispatch]);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    dispatch(signin({ email, password }, () => setLoading(false)));
  };

  const finishFailed = (errorInfo: any) => message.error(errorInfo);

  return (
    <Content>
      {error && finishFailed(error)}
      <div>
        <h1>Sign Up</h1>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={submitHandler}
          onFinishFailed={finishFailed}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                type: 'email',
                message: 'Please input your email!',
              },
            ]}
          >
            <Input
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </Form.Item>

          <Form.Item>
            <Link to="/forgot-password">
              <Button type="link">Forgot Password</Button>
            </Link>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Content>
  );
};

export default SignIn;
