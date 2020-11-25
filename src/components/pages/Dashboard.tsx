import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSuccess } from '../../store/actions/authActions';
import { RootState } from '../../store';
import { Layout, Alert, message } from 'antd';

const { Content } = Layout;

const Dashboard: React.FC = () => {
  const { user, needVerification, success } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      dispatch(setSuccess(''));
    }
  }, [success, dispatch]);

  const needVerificationAlert = () =>
    message.warning('Please, verify your account.');

  return (
    <Content>
      {needVerification && needVerificationAlert()}
      <div>
        <Alert message={`Welcome, ${user?.firstName}`} type="info" />
      </div>
    </Content>
  );
};

export default Dashboard;
