import React from 'react';
import { Icon, Layout } from 'antd';
import { NavLink } from 'react-router-dom';
import './Header.sass';

interface HeaderProps {

}

const Header: React.FC<HeaderProps> = () => {
    return (
        <Layout.Sider className='Header' breakpoint={'lg'} collapsedWidth={'0'} theme="dark">
            <div className='logo'>
                <NavLink to={'/store'} >StoreMe {'&'} Sport</NavLink>
            </div>

            <nav className='header-menu'>
                <NavLink className='header-menu-item' to={`/store/products`} activeClassName='selected'>
                    <Icon style={{fontSize: 22}} type="exclamation-circle" theme={'twoTone'} twoToneColor="#52c41a" />
                    <span className="nav-text">New</span>
                </NavLink>

                <NavLink to={`/store/men`} activeClassName='selected'>
                    <Icon style={{fontSize: 22}} type="right-circle" theme={'twoTone'} />
                    <span className="nav-text">Men</span>
                </NavLink>

                <NavLink to={`/store/women`} activeClassName='selected'>
                    <Icon style={{fontSize: 22}} type="right-circle" theme={'twoTone'} twoToneColor="#eb2f96" />
                    <span className="nav-text">Women</span>
                </NavLink>

                <NavLink to={`/store/all`} activeClassName='selected'>
                    <Icon style={{fontSize: 22}} type="right-circle" theme={'twoTone'} twoToneColor="#a9a9a9"/>
                    <span className="nav-text">For All</span>
                </NavLink>
            </nav>
        </Layout.Sider>
    )
}

export default Header;