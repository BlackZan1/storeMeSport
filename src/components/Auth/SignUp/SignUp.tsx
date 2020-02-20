import React from 'react';
import { reduxForm, Field } from 'redux-form';

const SignUp: React.FC = () => {
    return (
        <div>
            Hello SignUp Page
        </div>
    )
}

export default reduxForm({
    form: 'signUp'
})(SignUp);