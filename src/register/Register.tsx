import React, {memo} from 'react';
import {Button, Form} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

import {LeftPanelLogo} from '../app/components';
import {Routes, TOKEN_KEY} from '../app';

import './Register.css';

const baseURL = 'http://localhost:8080/crm/api';

export const Register = memo(function Register() {
    const navigate = useNavigate();

    const handleClick = async () => {
        const userRegister = {
            fullName: 'Art Art',
            phoneNumber: '72221111111',
            password: '1234',
        };

        try {
            const res = await fetch(`${baseURL}/auth/register`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userRegister),
            });

            if (!res.ok) {
                const message = `An error has occured: ${res.status} - ${res.statusText}`;
                throw new Error(message);
            }

            const token = await res.text();

            // Поместить в session storage и номер теелфона для запросов
            sessionStorage.setItem(TOKEN_KEY, token);
            navigate(Routes.PERSONAL_DATA, {replace: true});
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="register-page">
            <LeftPanelLogo />
            <div className="register-right-panel">
                <div className="register-form-container">
                    <div className="register-form-title-container">
                        <span className="register-form-title">Добро пожаловать!</span>
                        <span className="register-form-subtitle">Зарегистрируйтесь, чтобы начать</span>
                    </div>
                    <Form className="register-form-group">
                        <Form.Group className="mb-3" controlId="formPlaintextName">
                            <Form.Control placeholder="Фамилия и Имя" type="text" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPlaintextPhone">
                            <Form.Control placeholder="Номер телефона" type="text" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPlaintextPassword">
                            <Form.Control placeholder="Пароль" type="password" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPlaintextReturnPassword">
                            <Form.Control placeholder="Повторный ввод пароля" type="password" />
                        </Form.Group>

                        <Button className="register-submit-button" onClick={handleClick}>
                            Зарегистрироваться
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
});
