import React, {memo} from 'react';
import {Button, Form} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';

import {LeftPanelLogo} from '../app/components';
import {Routes} from '../app';
import {TOKEN_KEY} from '../app/routes/RequireAuth';

import './Login.css';

const baseURL = 'http://localhost:8080/crm/api';

export const Login = memo(function Login() {
    const navigate = useNavigate();

    const handleClick = async () => {
        const postData = {
            phoneNumber: '71111111111',
            password: '1',
        };

        try {
            const res = await fetch(`${baseURL}/auth/login`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });

            console.log(res.body);

            if (!res.ok) {
                const message = `An error has occured: ${res.status} - ${res.statusText}`;
                throw new Error(message);
            }

            const token = await res.text();

            sessionStorage.setItem(TOKEN_KEY, token);
            navigate(Routes.PERSONAL_DATA, {replace: true});
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="login-page">
            <LeftPanelLogo />
            <div className="login-right-panel">
                <div className="login-form-container">
                    <div className="login-form-title-container">
                        <span className="login-form-title">И снова здравствуйте!</span>
                        <span className="login-form-subtitle">Добро пожаловать</span>
                    </div>
                    <Form className="login-form-group">
                        <Form.Group className="mb-3" controlId="formPlaintextPhone">
                            <Form.Control placeholder="Номер телефона" type="text" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPlaintextPassword">
                            <Form.Control placeholder="Пароль" type="password" />
                        </Form.Group>

                        <Button className="login-submit-button" onClick={handleClick}>
                            Войти
                        </Button>
                    </Form>

                    <Link className="login-register" to={Routes.REGISTER}>
                        Зарегистрироваться
                    </Link>
                </div>
            </div>
        </div>
    );
});
