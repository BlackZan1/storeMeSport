import React from 'react';
import { registerUserAction } from '../../../redux/user-reducer';
import { iState } from '../../../redux/store';
import { Redirect } from 'react-router-dom';
import SignUp from './SignUp';
import { connect } from 'react-redux';

interface SignUpContainerProps {
    isFetching: boolean
    isAuth: boolean
    registerUserAction: (email: string, name: string, password: string) => Promise<void>
}

interface iSignUpValues {
    email: string
    password: string
    name: string
}

interface iSignUpState {
    isSuccess: boolean
}

class SignUpContainer extends React.Component<SignUpContainerProps, iSignUpState> {
    constructor(props: SignUpContainerProps) {
        super(props)

        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.state = {
            isSuccess: false
        }
    }

    private onSubmitHandler(values: iSignUpValues) {
        let { email, password, name } = values;

        console.log(this.props)

        this.props.registerUserAction(email, name, password);
        this.setState({
            isSuccess: true
        })
    }

    render() {
        const { isFetching, isAuth } = this.props;
        const { isSuccess } = this.state;

        return (
            isSuccess || isAuth ? 
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