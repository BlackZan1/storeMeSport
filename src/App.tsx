import React, { useEffect } from 'react';
import './App.css';
import './styles/animate.css';
import Header from './components/Header/Header';
import { Layout } from 'antd';
import useRoutes from './assets/Routes';
import { connect } from 'react-redux';
import { getUserDataAction } from './redux/user-reducer';
import { getCartDataAction } from './redux/cart-reducer';

interface AppProps {
  getUserDataAction: (token: string) => Promise<void>
  getCartDataAction: (token: string) => Promise<void>
}

interface iStorageItem {
  token: string
}

const App: React.FC<AppProps> = ({ getUserDataAction, getCartDataAction }) => {
  const routes = useRoutes();

  useEffect(() => {
    if(localStorage.getItem('storeMe&')?.length) {
      let item: string | null = localStorage.getItem('storeMe&');
      let lcitem: iStorageItem = JSON.parse(item || '');

      getUserDataAction(lcitem.token);
      getCartDataAction(lcitem.token);
    }
  }, [ getUserDataAction, getCartDataAction ])

  return (
    <Layout>
      <Header />

      <Layout className='Container'>
        { routes }
      </Layout>
    </Layout>
  );
}

export default connect(null, { getUserDataAction, getCartDataAction })(App);
