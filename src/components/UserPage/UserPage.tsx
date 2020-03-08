import React from 'react';
import { iUser } from '../../redux/user-reducer';

interface UserPageProps {
    user: iUser
}

const UserPage: React.FC<UserPageProps> = ({ user }) => {
    return (
        <div>
            { user.name }
        </div>
    )
}

export default UserPage;