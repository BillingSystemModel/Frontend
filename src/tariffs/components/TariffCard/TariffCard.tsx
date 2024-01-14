import {memo, useMemo} from 'react';
import {Button, Card} from 'react-bootstrap';

import {Tariff} from '../../types';

import '../TariffSlider/TariffSlider.css';
import {getTariffCost} from '../../logic/filterTariffs';

export interface PropsTariff {
    tariff: Tariff;
}

export const TariffCard = memo(function TariffCard({tariff}: PropsTariff) {
    const {id, telephonyPackage, title, description, internetPackage} = tariff;

    const tariffCost = useMemo(() => getTariffCost(tariff), [tariff]);

    return (
        <li className="card">
            <Card.Body className="tariff-card-body">
                <Card.Title>
                    {id} - {title}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{description}</Card.Subtitle>
                <div>
                    <div>
                        Стоимость тарифа - <span className="fw-bold">{tariffCost}</span>
                    </div>
                    <div>
                        Кол-во минут - <span className="fw-bold">{telephonyPackage?.packOfMinutes ?? 0}</span>
                    </div>
                    <div>
                        Кол-во сообщений - <span className="fw-bold">0</span>
                    </div>
                    <div>
                        Кол-во Гб интернета -
                        <span className="fw-bold">{Number((internetPackage?.packOfMB ?? 0) / 1024).toFixed(2)}</span>
                    </div>
                </div>
                <Button className="tariff-card-submit">Подключить</Button>
            </Card.Body>
        </li>
    );
});
