import {memo} from "react";
import {TariffData} from "./components/tariffData";
import {TariffDescription} from "./components/tariffDescription";
import {Button} from "react-bootstrap";

export const Tariff = memo(function Tariff() {
    return (
        <div className='m-4'>
            <TariffData/>
            <div className='mt-4'>
                <TariffDescription/>
            </div>
            <Button variant='primary' className='mt-3'>ИЗМЕНИТЬ ТАРИФ</Button>
        </div>
    )
})