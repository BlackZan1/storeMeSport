import React from 'react';
import { registerUserAction } from '../../../redux/user-reducer';
import { iState } from '../../../redux/store';
import { Redirect } from 'react-router-dom';
import SignUp from './SignUp';
import { connect } from 'react-redux';

interface SignUpContainerProps {
    isAuth: boolean
    isFetching: boolean
    registerUserAction: (email: string, name: string, password: string) => Promise<void>
}

interface iSignUpValues {
    email: string
    password: string
    name: string
}

class SignUpContainer extends React.Component<SignUpContainerProps> {
    constructor(props: SignUpContainerProps) {
        super(props)

        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    private onSubmitHandler(values: iSignUpValues) {
        let { email, password, name } = values;

        console.log(this.props)

        this.props.registerUserAction(email, name, password);
    }

    render() {
        const { isAuth, isFetching } = this.props;

        return (
            isAuth ? 
            <Redirect to='/login' />
            :
            <SignUp isFetching={isFetching} onSubmit={this.onSubmitHandler} />
        )
    }
}

let mapStateToProps = (state: iState) => ({
    isAuth: state.user.isAuth,
    isFetching: state.user.isFetching
})

export default connect(mapStateToProps, { registerUserAction })(SignUpContainer);