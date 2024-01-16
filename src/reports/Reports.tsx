import {memo, useState} from "react";
import {Button, Col, Form, Row, Table} from "react-bootstrap";
import DatePicker from "react-datepicker";

import './Reports.css';
import "react-datepicker/dist/react-datepicker.css";
import {baseURL, phoneNumber} from "../constants";
import {TOKEN_KEY} from "../app";
import {RotateLoader} from "react-spinners";

interface Call {
    callTypeCode: string;
    startDateTime: string;
    endDateTime: string;
    duration: string;
    cost: number;
}

interface Report {
    phoneNumber: number;
    tariffCode: number;
    callsList: Call[];
    totalMinutes: number;
    totalCost: number;
}

export const Reports = memo(function Reports() {
    const date = new Date();
    const prevDate = new Date();
    prevDate.setMonth(prevDate.getMonth() - 1)
    const [startDate, setStartDate] = useState(prevDate);
    const [endDate, setEndDate] = useState(date);
    const [report, setReport] = useState<Report>();
    const [isLoading, setIsLoading] = useState(false);

    const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

    const locale = {
        localize: {
            month: (n: number) => months[n],
        },
        formatLong: {
            date: () => 'yyyy-mm-dd'
        }
    } as Locale;

    const handleDownloadReport = () => {
    }

    const handleChangeStartDate = (e: Date) => {
        setStartDate(e);
    }

    const handleChangeEndDate = (e: any) => {
        setEndDate(e);
    }

    const token = sessionStorage.getItem(TOKEN_KEY);

    const handleGenerateReport = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${baseURL}/tarifficate`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            const response = await res.json();

            if (!res.ok) {
                const message = `An error has occured: ${res.status} - ${res.statusText}`;
                throw new Error(message);
            }

        } catch (err) {
            console.error(err);
        }

        try {
            const formatStartDate = startDate.toISOString().slice(0, -5);
            const formatEndDate = endDate.toISOString().slice(0, -5);
            const res = await fetch(`${baseURL}/report?phoneNumber=${phoneNumber}&dateTimeStart=${formatStartDate}&dateTimeEnd=${formatEndDate}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            console.log(res)
            const response = await res.json();
            setReport(response);
            setIsLoading(false);

            if (!res.ok) {
                const message = `An error has occured: ${res.status} - ${res.statusText}`;
                throw new Error(message);
            }

        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className='m-4'>
            <div className="">
                <Form as={Row}>
                    <Col sm="3">
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label>
                                Начальный месяц
                            </Form.Label>
                            <Col className="w-100">
                                <DatePicker
                                    selected={startDate}
                                    onChange={handleChangeStartDate}
                                    showMonthYearPicker
                                    dateFormat="MMMM, yyyy"
                                    locale={locale}
                                    className="form-control"
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="3">
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label>
                                Конечный месяц
                            </Form.Label>
                            <Col>
                                <DatePicker
                                    selected={endDate}
                                    onChange={handleChangeEndDate}
                                    showMonthYearPicker
                                    dateFormat="MMMM, yyyy"
                                    locale={locale}
                                    className="form-control"
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col className="reports-btn">
                        <Row>
                            <Col sm="3">
                                <Button variant="primary" onClick={handleGenerateReport} className='w-100'>
                                    Сгенерировать
                                </Button>
                            </Col>
                            <Col sm="3">
                                <Button variant="primary" className='w-100' onClick={handleDownloadReport}>
                                    Скачать
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Form>
            </div>
            <h5 className="report-heading">Отчет</h5>
            <hr className="hr-report"/>
            {isLoading && <div className="report-spinner">
                <RotateLoader className="text-center m-auto" color="#5c31f1" size={35} margin={40}/>
            </div>}
            <Table striped hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Тип звонка</th>
                    <th>Минуты</th>
                    <th>Стоимость</th>
                </tr>
                </thead>
                <tbody>
                {!isLoading && report?.callsList?.map((call, index) => {
                    const callType = call.callTypeCode === '01' ? 'Входящий' : 'Исходящий';
                    const duration = call.duration.slice(2).split('M');
                    const secondsValue = duration[1].slice(0, -1);
                    const seconds = secondsValue.length === 1 ? `0${secondsValue}` : secondsValue.length === 2 ? secondsValue : '00';
                    const minutes = duration[0].length === 1 ? `0${duration[0]}` : duration[0];
                    const resultDuration = `${minutes}:${seconds}`;

                    return <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{callType}</td>
                        <td>{resultDuration}</td>
                        <td>{call.cost}</td>
                    </tr>
                })}
                </tbody>
            </Table>
            {!isLoading && report && <h5 className="report-result">Всего: {report?.totalCost} ₽</h5>}
            <br/>
        </div>
    )
})
