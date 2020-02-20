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
                <NavLink className='header-menu-item' to={`/store/products`}>
                    <Icon type="right-circle" />
                    <span className="nav-text">New</span>
                </NavLink>

                <NavLink to={`/store/men`}>
                    <Icon type="right-circle" />
                    <span className="nav-text">Men</span>
                </NavLink>

                <NavLink to={`/store/women`}>
                    <Icon type="right-circle" />
                    <span className="nav-text">Women</span>
                </NavLink>

                <NavLink to={`/store/all`}>
                    <Icon type="right-circle" />
                    <span className="nav-text">All</span>
                </NavLink>
            </nav>
        </Layout.Sider>
    )
}

export default Header;