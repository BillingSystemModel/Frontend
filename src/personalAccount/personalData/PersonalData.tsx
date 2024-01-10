import {memo} from "react";
import {Person} from "../types";
import {UserData} from "./components/userData";
import {UserForm} from "./components/userForm";

export const PersonalData = memo(function PersonalData() {
    const person: Person = {
        fullName: 'Иванов Иван Иванович',
        phone: '+7 909 222 11 27',
        conclusionContractDate: '10.01.2024',
        birthDate: '09.09.2002',
        personalAccountNumber:'17139493949',
        region: 'Карелия Республика',
        passport: '1818 920361',
        email: 'olololo@mail.ru',
    }

    return (<div className='m-4'>
        <UserData person={person}/>
        <UserForm person={person} className='mt-4'/>
    </div>)
})