import React from 'react';
import { Layout, Divider } from 'antd';
import bgWave from '../../../public/img/bg-wave.png';
import { Form } from 'redux-form';
import './Auth.sass';

interface AuthLayoutProps {
    bigTitle: string
    height: string | number
    handleSubmit: any
    children?: React.ReactNode
    submit?: any
}

const AuthLayout: React.FC<AuthLayoutProps> = React.memo(({ bigTitle, handleSubmit, children, height, submit }) => {
    // const onSubmitHandler = (ev: FormEvent<HTMLFormElement>) => {
    //     ev.preventDefault()
    // } 
    
    return (
        <Layout.Content>
            <Form className='auth-content' style={{ height: `${height}px` }} onSubmit={handleSubmit}>
                <Divider orientation='left' className='auth-logo'>StoreMe {'&'} Sport</Divider>

                <h1 className='auth-title'>{ bigTitle }</h1>

                {
                    children
                }

                <img className='auth-abs-img' src={bgWave} alt="Error :("/>
            </Form>
        </Layout.Content>
    )
})

export default AuthLayout;