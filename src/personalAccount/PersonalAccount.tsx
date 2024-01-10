import {memo} from "react";
import {Nav} from "react-bootstrap";
import {Outlet} from "react-router-dom";

export const PersonalAccount = memo(function PersonalAccount() {
    return (<>
            <Nav variant="tabs" defaultActiveKey="/personalAccount/personalData">
                <Nav.Item>
                    <Nav.Link href="/personalAccount/personalData">Личные данные</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/personalAccount/tariff">Тариф</Nav.Link>
                </Nav.Item>
            </Nav>
            <Outlet />
        </>
    )
})