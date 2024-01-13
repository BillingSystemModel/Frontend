import {memo} from 'react';
import {TariffCard} from '../TariffCard';

import {Tariff} from '../../types';

import './TariffSlider.css';

export interface PropsTariffSlider {
    tariffs: Tariff[] | undefined;
}

export const TariffsSlider = memo(function TariffsSlider({tariffs}: PropsTariffSlider) {
    if (!tariffs) {
        return null;
    }

    return (
        <div className="movies">
            {tariffs?.length === 0 && (
                <div className="alert alert-primary mt-4 col-7 offset-2" role="alert">
                    Тарифов по вашему запросу не найдено. Используйте другой запрос.
                </div>
            )}

            {tariffs?.length !== 0 && (
                <div className="container">
                    <ul className="cards">
                        {tariffs?.map((tariff, idx) => {
                            return <TariffCard key={idx} tariff={tariff} />;
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
});
