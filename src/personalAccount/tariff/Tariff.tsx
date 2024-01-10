import {memo} from "react";
import {TariffData} from "./components/tariffData";
import {TariffDescription} from "./components/tariffDescription";

export const Tariff = memo(function Tariff(){
    return (
        <div className='m-4'>
            <TariffData />
            <TariffDescription />
        </div>
    )
})