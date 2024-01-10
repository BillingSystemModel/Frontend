import {HTMLAttributes, memo} from "react";
import {Person} from "../../../types";
import {Col, Form, Row} from "react-bootstrap";

interface UserFormProps extends HTMLAttributes<HTMLDivElement>{
    person: Person;
}

export const UserForm = memo(function UserForm(props: UserFormProps){
    const {person, className, ...other} = props;

    return (
        <div className={className}>
        <Form>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
            <Form.Label column sm="3">
                Номер лицевого счета
            </Form.Label>
            <Col sm="5">
                <Form.Control type="text" defaultValue={person.personalAccountNumber} disabled/>
            </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
            <Form.Label column sm="3">
                Дата заключения договора
            </Form.Label>
            <Col sm="5">
                <Form.Control type="date" defaultValue={person.conclusionContractDate}  disabled/>
            </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
            <Form.Label column sm="3">
                Регион
            </Form.Label>
            <Col sm="5">
                <Form.Control type="text" defaultValue={person.region} disabled/>
            </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
            <Form.Label column sm="3">
                Паспорт
            </Form.Label>
            <Col sm="5">
                <Form.Control type="text" defaultValue={person.passport}/>
            </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
            <Form.Label column sm="3">
                Дата рождения
            </Form.Label>
            <Col sm="5">
                <Form.Control type="date" defaultValue={person.birthDate}/>
            </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
            <Form.Label column sm="3">
                Email
            </Form.Label>
            <Col sm="5">
                <Form.Control type="text" defaultValue={person.email}/>
            </Col>
        </Form.Group>
    </Form>
        </div>)
})