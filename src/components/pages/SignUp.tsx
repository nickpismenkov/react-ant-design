import React, { FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signup, setError } from '../../store/actions/authActions';
import { RootState } from '../../store';
import { Row, Col, Form, Input, Button, message, Typography } from 'antd';

const { Title } = Typography;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const SignUp: React.FC = () => {
  const [firstName, setFirstName] = React.useState('');
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
    dispatch(signup({ email, password, firstName }, () => setLoading(false)));
  };

  const finishFailed = (errorInfo: any) => message.error(errorInfo);

  return (
    <Row>
      <Col span={12} offset={6}>
        {error && finishFailed(error)}
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={submitHandler}
          onFinishFailed={finishFailed}
        >
          <Title>Sign Up</Title>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input
              value={firstName}
              onChange={(e) => setFirstName(e.currentTarget.value)}
            />
          </Form.Item>

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

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default SignUp;
