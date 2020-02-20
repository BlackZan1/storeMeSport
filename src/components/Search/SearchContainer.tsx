import React, { useState } from 'react';
import Search from 'antd/lib/input/Search';
import './Search.sass';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { SearchByNameAction } from '../../redux/store-reducer';

interface SearchProps {
    SearchByNameAction: (name: string) => void
}

const SearchContainer: React.FC<SearchProps> = ({ SearchByNameAction }) => {
    let [value, setValue] = useState<string>('');

    const onChangeHandle = (ev: React.ChangeEvent<HTMLInputElement>) => {
        let v: string = ev.target.value;

        setValue(v);
    }

    const onSearchHandle = () => {
        if(value) SearchByNameAction(value);
    }

    return (
        <Search
            placeholder={'Search in SportMe & Store'}
            onChange={onChangeHandle}
            onSearch={onSearchHandle}
            className='search-input'
            value={value}
        />
    )
}

let ComposedComponent = compose(
    connect(null, {SearchByNameAction})
)(SearchContainer);

export default ComposedComponent;