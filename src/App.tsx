import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';
import HeaderComponent from './components/sections/Header';
import SignUp from './components/pages/SignUp';
import SignIn from './components/pages/SignIn';
import ForgotPassword from './components/pages/ForgotPassword';
import HomePage from './components/pages/HomePage';
import Dashboard from './components/pages/Dashboard';
import PrivateRoute from './components/auth/PrivateRoute';
import PublicRoute from './components/auth/PublicRoute';
import firebase from './firebase/config';
import {
  getUserById,
  setLoading,
  setNeedVerification,
} from './store/actions/authActions';
import { RootState } from './store';
import { Space, Spin } from 'antd';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.auth);

  React.useEffect(() => {
    dispatch(setLoading(true));
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(setLoading(true));
        await dispatch(getUserById(user.uid));
        if (!user.emailVerified) {
          dispatch(setNeedVerification());
        }
      }
      dispatch(setLoading(false));
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  if (loading) {
    return (
      <Space size="middle">
        <Spin size="large" />
      </Space>
    );
  }

  return (
    <BrowserRouter>
      <HeaderComponent />
      <Switch>
        <PublicRoute path="/" component={HomePage} exact />
        <PublicRoute path="/signup" component={SignUp} exact />
        <PublicRoute path="/signin" component={SignIn} exact />
        <PublicRoute path="/forgot-password" component={ForgotPassword} exact />
        <PrivateRoute path="/dashboard" component={Dashboard} exact />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
