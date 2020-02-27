import React from 'react';
import { Redirect } from 'react-router-dom';
import Login from './Login';
import { connect } from 'react-redux';
import { iState } from '../../../redux/store';
import { getUserDataAction, loginUserAction } from '../../../redux/user-reducer';

interface LoginContainerProps {
    isAuth: boolean,
    isFetching: boolean
    loginUserAction: (email: string, password: string) => Promise<void>
}

class LoginContainer extends React.Component<LoginContainerProps> {
    constructor(props: LoginContainerProps) {
        super(props);

        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onSubmitHandler(values: any) {
        console.log(values)
    }

    render() {
        const {isAuth, isFetching} = this.props;

        return <>
            {
                isAuth ? <Redirect to='/store' />
                :
                <Login isFetching={isFetching} onSubmit={this.onSubmitHandler} />
            }
        </>
    }
}

let mapStateToProps = (state: iState) => ({
    isAuth: state.user.isAuth,
    isFetching: state.user.isFetching
})

export default connect(mapStateToProps, { getUserDataAction, loginUserAction })(LoginContainer);