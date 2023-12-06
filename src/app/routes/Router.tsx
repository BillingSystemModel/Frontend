import {memo, useMemo} from 'react';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import {Routes} from './Routes';
import {Layout} from '../components';
import {Tariffs} from '../../tariffs';

export const Router = memo(function Router() {
    const router = useMemo(
        () =>
            createBrowserRouter(
                createRoutesFromElements(
                    <Route path={Routes.MAIN_PAGE} element={<Layout />}>
                        {/*    Сюда помещаем роуты*/}

                        {/*Тарифы*/}
                        <Route path={Routes.TARIFFS} element={<Tariffs />} />
                    </Route>,
                ),
            ),
        [],
    );

    return <RouterProvider router={router} />;
});
