import {memo} from 'react';
import {useQuery} from '@tanstack/react-query';
import {CDBIcon} from 'cdbreact';

import {TOKEN_KEY} from '../../routes';
import {User} from '../../../personalAccount/types';
import {baseURL, phoneNumber} from '../../../constants';

import './Header.css';

export const Header = memo(function Header() {
    const token = sessionStorage.getItem(TOKEN_KEY);

    const {data: user} = useQuery<User>({
        queryKey: ['user'],
        queryFn: () =>
            fetch(`${baseURL}/user/info/${phoneNumber}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((res) => res.json()),
    });
    const phone =
        '+' +
        phoneNumber.slice(0, 1) +
        ' ' +
        phoneNumber.slice(1, 4) +
        ' ' +
        phoneNumber.slice(4, 7) +
        ' ' +
        phoneNumber.slice(7, 9) +
        ' ' +
        phoneNumber.slice(9, 11);

    if (!user?.fio.length) {
        return null;
    }

    return (
        <div className="header-container">
            <div className="header-data-container">
                <CDBIcon icon="bi bi-person-fill" className="header-icon" size="lg" />
                <div className="header-container-info-user">
                    <span className="fs-6">{user?.fio}</span>
                    <span className="fs-6" style={{marginTop: '-4px'}}>
                        {phone}
                    </span>
                </div>
            </div>
        </div>
    );
});
