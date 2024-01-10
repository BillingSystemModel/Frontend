import {memo, useMemo} from 'react';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import {Routes} from './Routes';
import {Layout} from '../components';
import {Tariffs} from '../../tariffs';
import {PersonalAccount} from "../../personalAccount/PersonalAccount";
import {PersonalData} from "../../personalAccount/personalData";
import {Tariff} from "../../personalAccount/tariff";

export const Router = memo(function Router() {
    const router = useMemo(
        () =>
            createBrowserRouter(
                createRoutesFromElements(
                    <Route path={Routes.MAIN_PAGE} element={<Layout/>}>
                        {/*    Сюда помещаем роуты*/}

                        {/*Тарифы*/}
                        <Route path={Routes.TARIFFS} element={<Tariffs/>}/>

                        {/*Личный кабинет*/}
                        <Route path={Routes.PERSONAL_ACCOUNT} element={<PersonalAccount />}>
                            <Route path={Routes.PERSONAL_DATA} element={<PersonalData />} />
                            <Route path={Routes.TARIFF} element={<Tariff />} />
                        </Route>
                        </Route>,
                            ),
                            ),
                            [],
                            );

                            return <RouterProvider router={router} />;
                        });
