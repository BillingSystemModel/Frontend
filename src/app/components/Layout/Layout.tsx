import {memo} from 'react';
import {Outlet} from 'react-router-dom';

export const Layout = memo(function Layout() {
    // Наш App.tsx
    return (
        <div>
            {/*<SideMenu />*/}
            Hello!
            <Outlet />
        </div>
    );
});
