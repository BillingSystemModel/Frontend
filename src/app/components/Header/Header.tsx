import {memo} from 'react';
import './Header.css';
import {CDBIcon} from 'cdbreact';

export const Header = memo(function Header() {
    // const {name, phoneNumber} = useLocalStorage('user')
    const name = 'Иван Иванов';
    const phoneNumber = '+7 909 222 11 27';

    return (
        <div className="header-container">
            <div className="header-data-container">
                <CDBIcon icon="bi bi-person-fill" className="header-icon" size="lg" />
                <div className="header-container-info-user">
                    <span className="fs-6">{name}</span>
                    <span className="fs-6" style={{marginTop: '-4px'}}>
                        {phoneNumber}
                    </span>
                </div>
            </div>
        </div>
    );
});
