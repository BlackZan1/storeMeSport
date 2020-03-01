import React, { useEffect, useState } from 'react';
import AuthLayout from '../components/AuthLayout';
import { reduxForm, InjectedFormProps, Field, formValueSelector } from 'redux-form';
import { RenderInputForm } from '../../../assets/InputForm';
import { Button, Icon } from 'antd';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import './Login.sass';

interface LoginProps {
    isFetching: boolean
    email: string
    password: string
}

const Login: React.FC<LoginProps & InjectedFormProps<{}, LoginProps>> = ({  handleSubmit, isFetching, ...props }) => {
    let [isOk, setIsOk] = useState<boolean>(false);

    useEffect(() => {
        if(props.email !== undefined && props.password !== undefined) {
            if(props.email.length > 5 && props.password.length >= 9) setIsOk(true);
            else setIsOk(false);
        }
    }, [props.email, props.password])
    
    return (
        <AuthLayout key={'1'} height={'500'} bigTitle={'Login'} handleSubmit={handleSubmit}>
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
                <Button 
                    htmlType={'submit'} 
                    className={'login-button'} 
                    type={'primary'} 
                    size={'large'}
                    style={{width: '120px'}}
                    disabled={!isOk}
                >
                    Login

                    {
                        isFetching && <Icon spin={true} style={{marginLeft: 20}} type="loading" />
                    }
                </Button>
                    
                <NavLink to='/signUp'>
                    <Button type={'link'} size={'large'}>
                        Don't have account?
                    </Button>
                </NavLink>
            </div>
        </AuthLayout>
    )
}

interface ValidateProps {
    email?: string
    password?: string
}

const validate = (values: ValidateProps): ValidateProps => {
    const errors: ValidateProps = {};
    const { email, password } = values;

    // Email
    if(email) {
        if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) errors.email = 'Invalid email';
    }
    // Password
    if(password) {
        if(password.length < 9) errors.password = 'Must be more than 9 symbols';

        else if(password.length > 32) errors.password = 'Must not be more than 32 symbols';
    }

    return errors;
}

const selector = formValueSelector('login');

let component: any = connect(state => {
    const { email, password } = selector(state, 'email', 'password')

    return {
        email,
        password
    }
})(Login);

component = reduxForm<{}, LoginProps>({ 
    form: 'login',
    validate
})(component);

export default component;