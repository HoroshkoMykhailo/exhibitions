import React from 'react';
import { AppBar, Toolbar, Box } from '@mui/material';
import { AppRoute, Colors, HeaderHeight } from '~/constants/constants';
import './controlBar.css';
import { CustomButton } from '~/components/components';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '~/store/slices/userSlice';
import { AppDispatch } from '~/store/store';

interface ControlBarProps {
  isAuthenticated: boolean;
  myPosts?: boolean;
}

const ControlBar: React.FC<ControlBarProps> = ({
  isAuthenticated,
  myPosts=false
}) => {

  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const onLogout = () => {
    dispatch(logout());
    navigate(AppRoute.LOGIN);
  }

  const handleLogin = () => {
    navigate(AppRoute.LOGIN);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: Colors.backgroundPrimary, height: HeaderHeight }}>
      <Toolbar>
        <Box className="controlContainer">
        {isAuthenticated ? (
          <>
            <CustomButton width={120} onClick={onLogout}>
              Logout
            </CustomButton >
            <CustomButton width={220} link={myPosts ? AppRoute.STRIPE : AppRoute.HOME}>
              {myPosts ? 'To Stripe' : 'My Posts'}
            </CustomButton>
            <CustomButton width={120} fontSize={"2rem"} link={AppRoute.NEW_POST}>
              +
            </CustomButton>
          </>
        ) : (
          <CustomButton width={120} onClick={handleLogin}>
            Login
          </CustomButton>
        )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export { ControlBar };