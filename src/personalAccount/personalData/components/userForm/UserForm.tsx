import {HTMLAttributes, memo, useState} from "react";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {SubmitHandler, useForm} from "react-hook-form";

import './UseForm.css';

import {User} from "../../../types";
import classNames from "classnames";
import {TOKEN_KEY} from "../../../../app";
import {baseURL, phoneNumber} from "../../../../constants";
import {FormType, PasswordForm} from "./types";

interface UserFormProps extends HTMLAttributes<HTMLDivElement> {
    user: User;
}

export const UserForm = memo(function UserForm(props: UserFormProps) {
    const {user, className} = props;
    const [showModal, setShowModal] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [formChanger, setFormChanger] = useState<FormType>();
    const [keyReset, setKeyReset] = useState<string>();
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [oldPasswordError, setOldPasswordError] = useState(false)

    const {
        register: passportRegister,
        handleSubmit: passportHandleSubmit,
        watch: passportWatch,
        setValue: passportSetValue,
        // formState: {errors},
    } = useForm<{ passport: string }>();
    const {
        register: birthDateRegister,
        handleSubmit: birthDateHandleSubmit,
        watch: birthDateWatch,
        setValue: birthDateSetValue,
        // formState: {errors},
    } = useForm<{ birthDate: string }>();
    const {
        register: emailRegister,
        handleSubmit: emailHandleSubmit,
        watch: emailWatch,
        setValue: emailSetValue,
        // formState: {errors},
    } = useForm<{ email: string }>();
    const {
        register: passwordRegister,
        reset: passwordReset,
        handleSubmit: passwordHandleSubmit,
        watch: passwordWatch,
        setValue: passwordSetValue,
        // formState: {errors},
    } = useForm<{ password: PasswordForm }>();

    const userDateContract = user.contractDate.slice(4) + '-' + user.contractDate.slice(2, 4) + '-' + user.contractDate.slice(0, 2);
    const userBirthDate = user.birthDate.slice(4) + '-' + user.birthDate.slice(2, 4) + '-' + user.birthDate.slice(0, 2);

    let showPassportButton = passportWatch("passport") ? passportWatch("passport") !== user.passport : false;
    const showBirthDateButton = birthDateWatch("birthDate") ? birthDateWatch("birthDate") !== userBirthDate : false;
    const showEmailButton = emailWatch("email") ? emailWatch("email") !== user.email : false;

    const token = sessionStorage.getItem(TOKEN_KEY);

    const handlePassportSubmit: SubmitHandler<{ passport: string }> = (data) => {
        setFormChanger(data);
        setShowModal(true);
    }

    const handleBirthDateSubmit: SubmitHandler<{ birthDate: string }> = (data) => {
        const formatBirthDate = data.birthDate.split("-").reverse().join("");
        setFormChanger({birthDate: formatBirthDate});
        setShowModal(true);
    }

    const handleEmailSubmit: SubmitHandler<{ email: string }> = (data) => {
        setFormChanger(data);
        setShowModal(true);
    }

    const handlePasswordSubmit: SubmitHandler<{ password: PasswordForm }> = async (data) => {
        const postPassword = {
            username: phoneNumber,
            currentPassword: data.password.oldPassword,
            newPassword: data.password.repeatedNewPassword,
        };

        try {
            const res = await fetch(`${baseURL}/auth/changePassword`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postPassword),
            });

            const response = await res.json();

            if (!res.ok) {
                const message = `An error has occured: ${res.status} - ${res.statusText}`;
                throw new Error(message);
            }

            if (!response.success) {
                if (response.message !== 'New password matches current password') {
                    setOldPasswordError(true);
                } else {
                    setShowPasswordModal(false);
                    setOldPasswordError(false);
                    passwordReset();
                }
            } else {
                setShowPasswordModal(false);
                setOldPasswordError(false);
                passwordReset();
            }
        } catch (err) {
            console.error(err);
        }
    }

    const handleChangeForm = async () => {
        const postUser = {
            ...user,
            ...formChanger,
        };

        try {
            const res = await fetch(`${baseURL}/user/info/${phoneNumber}`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postUser),
            });

            if (!res.ok) {
                const message = `An error has occured: ${res.status} - ${res.statusText}`;
                throw new Error(message);
            }
        } catch (err) {
            console.error(err);
        }

        const key = Object.keys(formChanger!)[0];
        // @ts-ignore
        user[key as keyof User] = Object.values(formChanger!)[0];
        setShowModal(false);
    }

    const handleFormChangerReset = (event: any) => {
        setKeyReset(event.target.id);
        setShowCancelModal(true);
    }

    const handleResetForm = () => {
        if (keyReset === 'passport') {
            passportSetValue("passport", user.passport);
        } else if (keyReset === 'birthDate') {
            birthDateSetValue("birthDate", userBirthDate);
        } else if (keyReset === 'email') {
            emailSetValue("email", user.email);
        }
        setShowCancelModal(false);
    }

    const handleOpenPasswordModal = () => {
        setShowPasswordModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setShowCancelModal(false);
    }

    const handleClosePasswordModal = () => {
        setShowPasswordModal(false);
        passwordReset();

    }

    const isPasswordChangeDisabled = passwordWatch("password.newPassword") !== passwordWatch("password.repeatedNewPassword")
        || !passwordWatch("password.oldPassword") || !passwordWatch("password.newPassword")
        || !passwordWatch("password.repeatedNewPassword");

    const isEqualPasswords = passwordWatch("password.newPassword") === passwordWatch("password.repeatedNewPassword") || !passwordWatch("password.repeatedNewPassword");

    return (
        <div className={classNames('user-form', className)}>
            <Form>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="3">
                        Номер лицевого счета
                    </Form.Label>
                    <Col sm="5">
                        <Form.Control type="text" defaultValue={user.numberPersonalAccount} disabled/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="3">
                        Дата заключения договора
                    </Form.Label>
                    <Col sm="5">
                        <Form.Control type="date" defaultValue={userDateContract} disabled/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="3">
                        Регион
                    </Form.Label>
                    <Col sm="5">
                        <Form.Control type="text" defaultValue={user.region} disabled/>
                    </Col>
                </Form.Group>
            </Form>

            <Form onSubmit={passportHandleSubmit(handlePassportSubmit)}>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="3">
                        Паспорт
                    </Form.Label>
                    <Col sm="5">
                        <Form.Control type="text" defaultValue={user.passport} {...passportRegister("passport")}/>
                    </Col>
                    {showPassportButton && <>
                        <Col className='save-btn'>
                            <Button variant="link" type="submit">
                                Сохранить
                            </Button>
                            <Button id="passport" variant="link" onClick={handleFormChangerReset}>
                                Отменить
                            </Button>
                        </Col>
                    </>
                    }
                </Form.Group>
            </Form>

            <Form onSubmit={birthDateHandleSubmit(handleBirthDateSubmit)}>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="3">
                        Дата рождения
                    </Form.Label>
                    <Col sm="5">
                        <Form.Control type="date" defaultValue={userBirthDate} {...birthDateRegister("birthDate")}/>
                    </Col>
                    {showBirthDateButton && <>
                        <Col className='save-btn'>
                            <Button variant="link" type="submit">
                                Сохранить
                            </Button>
                            <Button id='birthDate' variant="link" onClick={handleFormChangerReset}>
                                Отменить
                            </Button>
                        </Col>
                    </>
                    }
                </Form.Group>
            </Form>

            <Form onSubmit={emailHandleSubmit(handleEmailSubmit)}>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="3">
                        Email
                    </Form.Label>
                    <Col sm="5">
                        <Form.Control type="text" defaultValue={user.email} {...emailRegister("email")}/>
                    </Col>
                    {showEmailButton && <>
                        <Col className='save-btn'>
                            <Button variant="link" type="submit">
                                Сохранить
                            </Button>
                            <Button id="email" variant="link" onClick={handleFormChangerReset}>
                                Отменить
                            </Button>
                        </Col>
                    </>
                    }
                </Form.Group>
            </Form>

            <Button variant="link" onClick={handleOpenPasswordModal} className='change-pwd'>
                Изменить пароль
            </Button>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Подтвердите действие</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Вы уверены, что хотите сохранить изменения?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Нет
                    </Button>
                    <Button onClick={handleChangeForm}>Да</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showCancelModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Подтвердите действие</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Вы уверены, что хотите отменить изменения?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Нет
                    </Button>
                    <Button onClick={handleResetForm}>Да</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showPasswordModal} onHide={handleClosePasswordModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Изменить пароль</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={passwordHandleSubmit(handlePasswordSubmit)}>
                        <Form.Group className="mb-3">
                            <Col sm="11">
                                <Form.Control type="password"
                                              placeholder="Старый пароль" {...passwordRegister("password.oldPassword")}
                                              isInvalid={oldPasswordError}/>
                                <Form.Control.Feedback type="invalid">
                                    Старый пароль введен неверно
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Col sm="11">
                                <Form.Control type="password"
                                              placeholder="Новый пароль" {...passwordRegister("password.newPassword")}/>
                            </Col>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Col sm="11">
                                <Form.Control type="password"
                                              placeholder="Повторить новый пароль" {...passwordRegister("password.repeatedNewPassword")}
                                              isInvalid={!isEqualPasswords}/>
                                <Form.Control.Feedback type="invalid">
                                    Пароль не совпадает с введенным выше паролем
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Col sm="11">
                            <Button type="submit" className="pwd-submit-btn" disabled={isPasswordChangeDisabled}>
                                Изменить
                            </Button>
                        </Col>
                    </Form>
                </Modal.Body>
            </Modal>

        </div>)
})