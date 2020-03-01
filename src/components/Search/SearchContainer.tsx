import React, { useState } from 'react';
import Search from 'antd/lib/input/Search';
import './Search.sass';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { SearchByNameAction } from '../../redux/store-reducer';
import { Avatar, Icon, Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { iState } from '../../redux/store';
import { iUser, logOutAction } from '../../redux/user-reducer';

interface SearchProps {
    isAuth: boolean
    user: iUser
    token: string
    logOutAction: (token: string) => Promise<void>
    SearchByNameAction: (name: string) => void
}

const SearchContainer: React.FC<SearchProps> = ({ SearchByNameAction, token, logOutAction, isAuth, user: { name, email, purchases, balance } }) => {
    let [value, setValue] = useState<string>('');

    const onChangeHandle = (ev: React.ChangeEvent<HTMLInputElement>) => {
        let v: string = ev.target.value;

        setValue(v);
    }

    const LogOutHandle = () => {
        logOutAction(token);
    }

    const onSearchHandle = () => {
        if(value) SearchByNameAction(value);
    }

    return <div className='store-header'>
        <Search
            placeholder={'Search in SportMe & Store'}
            onChange={onChangeHandle}
            onSearch={onSearchHandle}
            className='search-input'
            value={value}
        />
        
        {
            isAuth ?
            <div>
                <Avatar size="large" icon="user" className='user-avatar' />

                <div>
                    { name }
                </div>

                <Button type={'link'} onClick={LogOutHandle} >
                    Log Out
                </Button>
            </div>
            :
            <div className='auth-nav'> 
                <NavLink to='/signUp'>Sign up <Icon type="user-add" /></NavLink>
                <NavLink to='/login'>Login <Icon type="user" /></NavLink>
            </div>
        }
        
    </div>
}

let mapStateToProps = (state: iState) => ({
    user: state.user.user,
    token: state.user.token,
    isAuth: state.user.isAuth
})

let ComposedComponent = compose(
    connect(mapStateToProps, {SearchByNameAction, logOutAction})
)(SearchContainer);

export default ComposedComponent;