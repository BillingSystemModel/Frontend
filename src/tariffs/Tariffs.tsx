import {memo, useCallback, useMemo, useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {RotateLoader} from 'react-spinners';
import {Alert, Button} from 'react-bootstrap';

import {TariffsSlider} from './components';
import {Tariffs as TariffsI} from './types';
import {TOKEN_KEY} from '../app';

import './Tariffs.css';

const baseURL = 'http://localhost:8080/crm/api';

export const Tariffs = memo(function Tariffs() {
    const token = sessionStorage.getItem(TOKEN_KEY);
    const {
        data: resTariffs,
        isLoading,
        error,
    } = useQuery<TariffsI>({
        queryKey: ['tariffs'],
        queryFn: () =>
            fetch(`${baseURL}/tariffs`, {
                method: 'get',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((res) => res.json()),
    });

    const [search, setSearch] = useState<string>();

    const filteredTariffs = useMemo(() => {
        if (!search) {
            return resTariffs?.tariffs;
        }
        const lowerSearch = search.toLowerCase();
        return resTariffs?.tariffs.filter((tariff) => tariff.title.toLowerCase().includes(lowerSearch));
    }, [resTariffs?.tariffs, search]);

    const handleChangeInput = useCallback(
        (e: any) => {
            setSearch(e.target.value);
        },
        [setSearch],
    );

    if (isLoading) {
        return (
            <div style={{display: 'flex', flexDirection: 'column', height: '75%'}}>
                <RotateLoader className="text-center m-auto" color="#5c31f1" size={35} margin={40} />
            </div>
        );
    }

    if (error) {
        return <Alert className="center">Ошибка сервера</Alert>;
    }

    return (
        <div className="tariffs-page">
            <div className="tariffs-search-container">
                <input
                    type="text"
                    value={search}
                    onChange={handleChangeInput}
                    className="form-control tariffs-search-input"
                    placeholder="Поиск по названию"
                    aria-label="Поиск по названию"
                />
                <Button className="tariffs-button">Фильтр</Button>
            </div>
            <div className="tariffs-slider-container">
                <TariffsSlider tariffs={filteredTariffs} />
            </div>
        </div>
    );
});
