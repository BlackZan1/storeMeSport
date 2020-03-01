import React, { useState } from 'react';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';
import { Button, Icon, Checkbox } from 'antd';
import { NavLink } from 'react-router-dom';
import { RenderInputForm } from '../../../assets/InputForm';
import AuthLayout from '../components/AuthLayout';
import './SignUp.sass';

interface SignUpProps {
    isFetching: boolean
}

const SignUp: React.FC<SignUpProps & InjectedFormProps<{}, SignUpProps>> = ({ handleSubmit, isFetching, ...props }) => {
    let [checked, setChecked] = useState<boolean>(false);

    const onChangeCheckboxHandler = () => {
        setChecked(!checked);
    }

    console.log(handleSubmit)

    return (      
        <AuthLayout key={'2'} height={'740'} bigTitle={'Create account'} handleSubmit={handleSubmit}>
            <Field 
                placeholder={'Email address'} 
                label={'Email'} 
                type={'email'} 
                name={'email'} 
                component={RenderInputForm} 
                className={'auth-input'}
            />

            <Field 
                placeholder={'Name'} 
                label={'Name'} 
                type={'text'} 
                name={'name'} 
                component={RenderInputForm} 
                className={'auth-input'}
            />

            <Field
                password={true}
                placeholder={'Password'} 
                label={'Password'} 
                type={''} 
                name={'password'} 
                component={RenderInputForm} 
                className={'auth-input'}
            /> 

            <Field
                password={true}
                placeholder={'Repeat your password'} 
                label={'Repeat password'} 
                type={''} 
                name={'checkPassword'} 
                component={RenderInputForm} 
                className={'auth-input'}
            />   

            <Checkbox className='signup-checkbox' name='checked' checked={checked} onChange={onChangeCheckboxHandler} >
                I agree all Term of Use                    
            </Checkbox>

            <div className='signup-btns'>
                <Button className='signup-button' type={'danger'} size={'large'} htmlType={'submit'} disabled={!checked} >
                    Sign Up

                    {
                        isFetching && <Icon spin={true} style={{marginLeft: 20}} type="loading" />
                    }
                </Button>

                <NavLink to={'/login'}>
                    <Button className='signup-button' type={'link'} size={'large'}>Already have an account</Button>
                </NavLink>
            </div>
        </AuthLayout>
    )
}

interface ValidateProps {
    email?: string
    name?: string
    password?: string
    checkPassword?: string
}

const validate = (values: ValidateProps): ValidateProps  => {
    const errors: ValidateProps = {}
    const { email, name, password, checkPassword } = values;

    // Email
    if(!email) {
        errors.email = 'Email is required'
    }
    else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        errors.email = 'Invalid email'
    }
    // Name
    if(!name) {
        errors.name = 'Name is required'
    }
    else if(name.length < 3) {
        errors.name = 'Name must be more than 3 symbols'
    }
    // Password
    if(!password) {
        errors.password = 'Password is required'
    }
    else if(password.length > 32) {
        errors.password = 'Must not be more than 32 symbols'
    }
    else if(password.length < 9) {
        errors.password = 'Must be more than 9 symbols'
    }
    // Check password
    if(!checkPassword) {
        errors.checkPassword = 'Please repeat your password'
    }
    else if(checkPassword !== password) {
        errors.checkPassword = 'Repeat password correct'
    }

    return errors;
}

const FormedComponent: any = reduxForm<{}, SignUpProps>({
    form: 'signUp',
    validate
})(SignUp);

export default FormedComponent;

