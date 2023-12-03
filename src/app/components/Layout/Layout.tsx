import {memo} from 'react';
import {Outlet} from 'react-router-dom';
import {SideMenu} from '../SideMenu/SideMenu';
import './Layout.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export const Layout = memo(function Layout() {
    // Наш App.tsx
    return (
        <div className="layout-container">
            <SideMenu />
            <Outlet />
        </div>
    );
});
