import {memo} from "react";
import {Col, Container, Row} from "react-bootstrap";

import './TariffDescription.css';

export const TariffDescription = memo(function TariffDescription() {
    return (
        <Container className='tariff-description'>
            <Row className='mb-4'>
                <Col sm={3}>Абонентская плата</Col>
                <Col sm={5}>
                    <p className='tariff-description-info'>450 ₽/МЕС</p>
                    <p className='tariff-description-date'>Ближайшее списание: 11.02.2024</p>
                </Col>
            </Row>

            <Row className='mb-5'>
                <Col sm={3}>Звонки</Col>
                <Col sm={5}>
                    <p className='tariff-description-info'>300 МИН</p>
                </Col>
            </Row>

            <Row className='mb-5'>
                <Col sm={3}>Интернет</Col>
                <Col sm={5}>
                    <p className='tariff-description-info'>10 ГБ</p>
                </Col>
            </Row>

            <Row className='mb-5'>
                <Col sm={3}>SMS</Col>
                <Col sm={5}>
                    <p className='tariff-description-info'>20 ШТ</p>
                </Col>
            </Row>
        </Container>
    )
})