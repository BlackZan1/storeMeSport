import React, { useCallback, useState } from 'react';
import { Field } from 'redux-form';
import { RenderInputForm } from '../assets/InputForm';

// interface iInput {
//     password: boolean
//     placeholder: string 
//     label: string 
//     type: string 
//     name: string  
//     className: string
//     id?: string
// } 

const useInputForm = () => {
    let [value, setValue] = useState<string>('');

    const configInput = useCallback((placeholder: string, id: string, label: string, type: string, name: string, className: string) => {
        return (
            <Field
                placeholder={placeholder} 
                label={label} 
                type={type} 
                name={name}
                id={id}
                component={RenderInputForm} 
                className={className}
            />
        )
    }, [])

    return {
        value, 
        configInput
    }
}