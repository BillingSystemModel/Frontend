import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
import {memo} from 'react';
import './sideMenu.css';
import {Routes} from '../../routes';

export const SideMenu = memo(function SideMenu() {
    return (
        <CDBSidebar
            backgroundColor="#5227CC"
            breakpoint={720}
            className=""
            maxWidth="230px"
            minWidth="80px"
            textColor="#fff"
            toggled={false}
        >
            <CDBSidebarHeader>
                <div className="side-menu-header-container">
                    <div className="side-menu-kklr">KKLR</div>
                    <div className="side-menu-logo-container">
                        <div style={{marginBottom: '-2px'}}>Billing</div>
                        <div style={{marginTop: '-2px'}}>system</div>
                    </div>
                </div>
            </CDBSidebarHeader>
            <CDBSidebarContent>
                <CDBSidebarMenu>
                    <CDBSidebarMenuItem className="side-menu-item" icon="bi bi-person-fill" iconSize="lg">
                        <a href={Routes.PERSONAL_AREA}>Личный кабинет</a>
                    </CDBSidebarMenuItem>
                    <CDBSidebarMenuItem className="side-menu-item" icon="bi bi-justify">
                        <a href={Routes.TARIFFS}>Тарифы</a>
                    </CDBSidebarMenuItem>
                    <CDBSidebarMenuItem className="side-menu-item" icon="bi bi-newspaper">
                        <a href={Routes.REPORT}>Отчеты</a>
                    </CDBSidebarMenuItem>
                </CDBSidebarMenu>
            </CDBSidebarContent>

            <CDBSidebarFooter className="side-menu-item">
                <CDBSidebarMenuItem icon="bi bi-box-arrow-right">Выйти</CDBSidebarMenuItem>
            </CDBSidebarFooter>
        </CDBSidebar>
    );
});
