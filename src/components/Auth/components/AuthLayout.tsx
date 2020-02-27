import React, { FormEvent } from 'react';
import { Layout, Divider } from 'antd';
import bgWave from '../../../public/img/bg-wave.png';
import './Auth.sass';

interface AuthLayoutProps {
    bigTitle: string
    height: string | number
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void
    children?: React.ReactNode
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ bigTitle, handleSubmit, children, height }) => {
    return (
        <Layout.Content>
            <form className='auth-content' style={{ height: `${height}px` }} onSubmit={handleSubmit}>
                <Divider orientation='left' className='auth-logo'>StoreMe {'&'} Sport</Divider>

                <h1 className='auth-title'>{ bigTitle }</h1>

                {
                    children
                }

                <img className='auth-abs-img' src={bgWave} alt="Error :("/>
            </form>
        </Layout.Content>
    )
}

export default AuthLayout;