import React, { useEffect } from 'react';
import './app.css';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from 'antd';
import { routes } from './routes/config';
import Router from './routes/router';
import MainHeader from './components/header/header';
import { mainAxios } from './libs/axios';
import { useAuth, useUser } from './hooks';
import { CssKeyObject } from './types/css-basic-type';

const styles: CssKeyObject = {
  marginSpace: {
    height: '4em',
  },
};

const App = () => {
  const auth = useAuth();
  const user = useUser();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      mainAxios.defaults.headers.common.Authorization = token;
      auth.isLoggedIn = true;
      user.me();
    }
  });

  return (
    <Layout>
      <BrowserRouter>
        <MainHeader />
        <div style={styles.marginSpace} />
        <Router routes={routes} />
      </BrowserRouter>
    </Layout>
  );
};

export default App;
