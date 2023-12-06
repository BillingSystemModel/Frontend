import {memo} from 'react';
import {Card} from 'react-bootstrap';

import '../TariffSlider/TariffSlider.css';

export interface PropsTariff {
    tariff: {label: string; description: string};
}

export const TariffCard = memo(function TariffCard({tariff}: PropsTariff) {
    return (
        <li className="card">
            <Card.Body>
                <Card.Title>{tariff.label}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{tariff.description}</Card.Subtitle>
                <Card.Text>
                    {`Описание тарифа.\n Стоимость тарифа.\n Кол-во минут.\n Кол-во сообщений.\n Кол-во мб интернета.`}
                </Card.Text>
                <Card.Link href="#" className="">
                    Подключить
                </Card.Link>
            </Card.Body>
        </li>
    );
});
