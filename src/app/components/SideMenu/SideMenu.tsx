import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
import {memo, useCallback, useState} from 'react';
import './sideMenu.css';
import {Routes, TOKEN_KEY} from '../../routes';
import {Button, Modal} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

export const SideMenu = memo(function SideMenu() {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleLogOut = useCallback(() => {
        sessionStorage.setItem(TOKEN_KEY, '');
        setShowModal(false);
        navigate(Routes.LOGIN);
    }, [setShowModal, navigate]);

    const handleOpen = useCallback(() => {
        setShowModal(true);
    }, [setShowModal]);

    const handleClose = useCallback(() => {
        setShowModal(false);
    }, [setShowModal]);

    return (
        <>
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
                            <a href={Routes.PERSONAL_ACCOUNT}>Личный кабинет</a>
                        </CDBSidebarMenuItem>
                        <CDBSidebarMenuItem className="side-menu-item" icon="bi bi-justify">
                            <a href={Routes.TARIFFS}>Тарифы</a>
                        </CDBSidebarMenuItem>
                        <CDBSidebarMenuItem className="side-menu-item" icon="bi bi-newspaper">
                            <a href={Routes.REPORTS}>Отчеты</a>
                        </CDBSidebarMenuItem>
                    </CDBSidebarMenu>
                </CDBSidebarContent>

                <CDBSidebarFooter className="side-menu-item">
                    <CDBSidebarMenuItem icon="bi bi-box-arrow-right">
                        <div onClick={handleOpen}>Выйти</div>
                    </CDBSidebarMenuItem>
                </CDBSidebarFooter>
            </CDBSidebar>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Подтвердите действие</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Выход</h4>
                    <p>Вы точно уверены, что хотите выйти?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Нет
                    </Button>
                    <Button onClick={handleLogOut}>Да</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
});
