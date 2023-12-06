import {memo} from 'react';
import {TariffCard} from '../TariffCard';

import './TariffSlider.css';

export interface PropsTariffSlider {
    tariffs: {label: string; description: string}[];
}

export const TariffsSlider = memo(function TariffsSlider({tariffs}: PropsTariffSlider) {
    return (
        <div className="movies">
            {tariffs.length === 0 && (
                <div className="alert alert-primary mt-4 col-7 offset-2" role="alert">
                    Фильмы по вашему запросу не найдены. Попробуйте другой запрос
                </div>
            )}

            {tariffs.length !== 0 && (
                <div className="container">
                    <ul className="cards">
                        {tariffs?.map(function (tariff, idx) {
                            return <TariffCard key={idx} tariff={tariff} />;
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
});
