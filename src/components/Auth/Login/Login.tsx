import React from 'react';
import AuthLayout from '../components/AuthLayout';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';
import { RenderInputForm } from '../../../assets/InputForm';
import { Button, Icon } from 'antd';
import './Login.sass';
import { NavLink } from 'react-router-dom';

interface LoginProps {
    isFetching: boolean
}

const Login: React.FC<LoginProps & InjectedFormProps<{}, LoginProps>> = ({ isFetching, handleSubmit }) => {
    return (
        <AuthLayout height={'500'} bigTitle='Login' handleSubmit={handleSubmit} >
            <Field
                placeholder={'Your email address'} 
                label={'Email'} 
                type={'email'} 
                name={'email'} 
                component={RenderInputForm} 
                className={'auth-input'}
            />

            <Field
                password={true}
                placeholder={'Your password'} 
                label={'Password'} 
                type={''} 
                name={'password'} 
                component={RenderInputForm} 
                className={'auth-input'}
            />

            <div className='login-btns'>
                <Button htmlType='submit' className={'login-button'} type={'primary'} size={'large'} >
                    Login

                    {
                        isFetching && <Icon spin={true} style={{marginLeft: 20}} type="loading" />
                    }
                </Button>
                    
                <NavLink to='/signUp'>
                    <Button type={'link'}>
                        Don't have account?
                    </Button>
                </NavLink>
            </div>
        </AuthLayout>
    )
}

const FormedComponent: any = reduxForm<{}, LoginProps>({ 
    form: 'login'
})(Login);

export default FormedComponent;