import React, { useEffect } from 'react';
import './App.css';
import './styles/animate.css';
import Header from './components/Header/Header';
import { Layout } from 'antd';
import useRoutes from './assets/Routes';
import { connect } from 'react-redux';
import { getUserDataAction } from './redux/user-reducer';

interface AppProps {
  getUserDataAction: (token: string, userId: string | number) => Promise<void>
}

interface iStorageItem {
  userId: string
  token: string
}

const App: React.FC<AppProps> = ({ getUserDataAction }) => {
  const routes = useRoutes();

  useEffect(() => {
    if(localStorage.getItem('storeMe&')?.length) {
      let item: string | null = localStorage.getItem('storeMe&');
      let lcitem: iStorageItem = JSON.parse(item || '');

      getUserDataAction(lcitem.token, lcitem.userId);
    }
  }, [ getUserDataAction ])

  return (
    <Layout>
      <Header />

      <Layout className='Container'>
        { routes }
      </Layout>
    </Layout>
  );
}

export default connect(null, { getUserDataAction })(App);
