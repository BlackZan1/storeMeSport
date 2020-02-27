import React, { useState } from 'react';
import Search from 'antd/lib/input/Search';
import './Search.sass';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { SearchByNameAction } from '../../redux/store-reducer';
import { Avatar, Icon } from 'antd';
import { NavLink } from 'react-router-dom';

interface SearchProps {
    SearchByNameAction: (name: string) => void
}

const SearchContainer: React.FC<SearchProps> = ({ SearchByNameAction }) => {
    let [value, setValue] = useState<string>('');
    let isAuth = false;

    const onChangeHandle = (ev: React.ChangeEvent<HTMLInputElement>) => {
        let v: string = ev.target.value;

        setValue(v);
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
            <Avatar size="large" icon="user" className='user-avatar' />
            :
            <div className='auth-nav'> 
                <NavLink to='/signUp'>Sign up <Icon type="user-add" /></NavLink>
                <NavLink to='/login'>Login <Icon type="user" /></NavLink>
            </div>
        }
        
    </div>
}

let ComposedComponent = compose(
    connect(null, {SearchByNameAction})
)(SearchContainer);

export default ComposedComponent;