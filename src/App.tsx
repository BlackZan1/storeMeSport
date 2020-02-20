import React from 'react';
import './App.css';
import './styles/animate.css';
import Header from './components/Header/Header';
import { Layout } from 'antd';
import useRoutes from './assets/Routes';

const App: React.FC = () => {
  const routes = useRoutes();

  return (
    <Layout>
      <Header />

      <Layout className='Container'>
        { routes }
      </Layout>
    </Layout>
  );
}

export default App;
