import {memo, useCallback, useState} from 'react';
import {CDBInput} from 'cdbreact';

import './Tariffs.css';
import {Button} from 'react-bootstrap';
import {TariffsSlider} from './components';

export const Tariffs = memo(function Tariffs() {
    const [search, setSearch] = useState<string>();

    const tariffs: {label: string; description: string}[] = [
        {label: 'Тариф', description: 'Лучший тариф'},
        {label: 'Тариф', description: 'Лучший тариф'},
        {label: 'Тариф', description: 'Лучший тариф'},
        {label: 'Тариф', description: 'Лучший тариф'},
        {label: 'Тариф', description: 'Лучший тариф'},
    ];

    const handleChangeInput = useCallback(
        (e: any) => {
            setSearch(e.target.value);
        },
        [setSearch],
    );

    // if (error) {
    //     return <Alert></Alert>;
    // }

    // if (isLoading) {
    //     return <Spinner>Загрузка...</Spinner>;
    // }

    return (
        <div className="tariffs-page">
            <div className="tariffs-search-container">
                <CDBInput
                    type="text"
                    value={search}
                    onChange={handleChangeInput}
                    placeholder="Поиск по названию"
                    color="primary"
                    className="tariffs-search-input"
                />
                <Button className="tariffs-button">Фильтр</Button>
            </div>
            <div className="tariffs-slider-container">
                <TariffsSlider tariffs={tariffs} />
            </div>
        </div>
    );
});
