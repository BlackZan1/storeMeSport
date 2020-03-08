import React from 'react';
import { connect } from 'react-redux';
import { BigLoader } from '../../assets/Loader';
import { iState } from '../../redux/store';
import UserPage from './UserPage';
import { iUser } from '../../redux/user-reducer';

interface UserPageContainerProps {
    isFetching: boolean
    user: iUser
}

const UserPageContainer: React.FC<UserPageContainerProps> = ({ isFetching, user }) => {


    return <>
        {
            isFetching ?
            <BigLoader />
            :
            <UserPage user={user} />
        }
    </>
}

let mapStateToProps = (state: iState) => ({
    isFetching: state.user.isFetching,
    user: state.user.user,
    cart: state.dataCart.data
})

export default connect(mapStateToProps, {})(UserPageContainer)