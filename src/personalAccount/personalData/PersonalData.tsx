import {memo} from "react";
import {User} from "../types";
import {UserData} from "./components/userData";
import {UserForm} from "./components/userForm";
import {useQuery} from "@tanstack/react-query";
import {baseURL, phoneNumber} from "../../constants";
import {TOKEN_KEY} from "../../app";
import {RotateLoader} from "react-spinners";
import {Alert} from "react-bootstrap";

export const PersonalData = memo(function PersonalData() {
    const token = sessionStorage.getItem(TOKEN_KEY);

    const {
        data: user,
        isLoading,
        error,
    } = useQuery<User>({
        queryKey: ['user'],
        queryFn: () =>
            fetch(`${baseURL}/user/info/71111111111`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((res) => res.json()),
    });

    // const user: User = {
    //     fio: "Kurdikov Artem Sergeevich",
    //     phoneNumber: "71111111111",
    //     numberPersonalAccount: 1,
    //     contractDate: "01122022",
    //     region: "RU",
    //     passport: "111",
    //     birthDate: "08082003",
    //     email: "temp@gmail.com"
    // }

    // if (isLoading) {
    //     return (
    //         <div style={{display: 'flex', flexDirection: 'column', height: '75%'}}>
    //             <RotateLoader className="text-center m-auto" color="#5c31f1" size={35} margin={40}/>
    //         </div>
    //     );
    // }
    //

    if (user === undefined || error) {
        return <Alert className="center">Ошибка сервера</Alert>;
    }

    return (
        <div className='m-4'>
            <UserData user={user}/>
            <UserForm user={user} className='mt-4'/>
        </div>)
})