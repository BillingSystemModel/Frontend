import {memo, useMemo} from 'react';
import {Button, Card} from 'react-bootstrap';

import {Tariff} from '../../types';

import '../TariffSlider/TariffSlider.css';

export interface PropsTariff {
    tariff: Tariff;
}

export const TariffCard = memo(function TariffCard({tariff}: PropsTariff) {
    console.log(tariff);
    const {telephonyPackage, title, description, internetPackage} = tariff;

    const tariffCostMinutes = useMemo(() => {
        if (telephonyPackage === null) {
            return 0;
        }
        return telephonyPackage.packCostPerMinute
            ? telephonyPackage.packCost * telephonyPackage.packOfMinutes
            : telephonyPackage.packCost;
    }, [telephonyPackage]);

    const tariffCostInternet = useMemo(() => {
        if (internetPackage === null) {
            return 0;
        }
        return internetPackage.packCostPerMB
            ? internetPackage.packCost * internetPackage.packOfMB
            : internetPackage.packCost;
    }, [internetPackage]);

    //9.3 и 9.8
    return (
        <li className="card">
            <Card.Body className="tariff-card-body">
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{description}</Card.Subtitle>
                <Card.Text>
                    <div>
                        Стоимость тарифа - <span className="fw-bold">{tariffCostMinutes + tariffCostInternet}</span>
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
                </Card.Text>
                <Button className="tariff-card-submit">Подключить</Button>
            </Card.Body>
        </li>
    );
});
