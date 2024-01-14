import {memo} from "react";
import {User} from "../../../types";

import './UserData.css';
import {Heading} from "../../../components";


interface UserDataProps {
    user: User,
}

export const UserData = memo(function UserData({user}: UserDataProps) {
    return (
        <Heading header={user.fio} description={user.phoneNumber}/>
    )
})