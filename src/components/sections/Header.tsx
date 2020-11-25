import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { signout } from '../../store/actions/authActions';
import { Button, PageHeader } from 'antd';

const Header: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state: RootState) => state.auth);

  const logoutClickHandler = () => dispatch(signout);

  return (
    <PageHeader
      className="site-page-header"
      title={<Link to={!authenticated ? '/' : '/dashboard'}>Auth</Link>}
      subTitle="This is my first auth app"
      extra={
        !authenticated
          ? [
              <Button key={1} onClick={() => history.push('/signup')}>
                Sign Up
              </Button>,
              <Button key={2} onClick={() => history.push('/signin')}>
                Sign In
              </Button>,
            ]
          : [
              <Button key={1} onClick={logoutClickHandler}>
                Sign Out
              </Button>,
            ]
      }
    />
  );
};

export default Header;
