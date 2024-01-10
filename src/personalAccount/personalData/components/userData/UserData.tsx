import {memo} from "react";
import {Person} from "../../../types";

import './UserData.css';
import {Heading} from "../../../components";


interface UserDataProps {
    person: Person,
}

export const UserData = memo(function UserData({person}: UserDataProps) {
    return (
        <Heading header={person.fullName} description={person.phone} />
    )
})