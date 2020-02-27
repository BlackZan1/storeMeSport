import React from 'react';
import { Input, Form } from 'antd';
import './InputForm.sass';

type iInput = {
    name: string    
    onBlur: Function
    onChange: Function
    onDragStart: Function
    onDrop: Function
    onFocus: Function
    value: string
}

interface InputFormProps {
    meta: {
        touched: boolean
        error: any
        warning: any
    }
    placeholder: string
    label: string
    type: string
    className: string
    password?: boolean
    input: iInput
}

interface iArguments {
    className: string
    placeholder: string
    type: string
}

export const RenderInputForm: React.FC<InputFormProps> = ({meta: {touched, error, warning}, password, ...props}) => {
    const { className, placeholder, type, label, input } = props;
    const inputArguments: iArguments = {
        className,
        placeholder,
        type,
        ...input
    }

    const validationError = touched && error

    return <>
        <label className='input-label'>{ label }</label>

        <Form.Item validateStatus={validationError ? 'error' : 'success'} hasFeedback={validationError ? false : true} style={{display: 'flex', flexDirection: 'column'}}>
            {
                password ? <Input.Password { ...inputArguments } />
                :
                <Input { ...inputArguments } />
            }

            {
                touched && <>
                    {
                        error && <span className='input-message'>{error}</span>
                    }

                    {
                        warning && <span className='input-message'>{warning}</span>
                    }
                </>
            }
        </Form.Item>
    </>
}