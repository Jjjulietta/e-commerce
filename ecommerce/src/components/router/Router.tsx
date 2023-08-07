import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from '../main_page/MainPage';
import CatalogPage from '../catalog_page/CatalogPage';
import AboutUsPage from '../about_us_page/AboutUsPage';
import BasketPage from '../basket_page/BasketPage';
import RegistrationPage from '../registration_page/RegistrationPage';
import LogInPage from '../login_page/login_page';
import MyProfilePage from '../my_profile_page/MyProfilePage';
import Page404 from '../page_404/Page404';

const RouterComponent = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/catalog" element={<CatalogPage />} />
                <Route path="/about" element={<AboutUsPage />} />
                <Route path="/basket" element={<BasketPage />} />
                <Route path="/registration" element={<RegistrationPage />} />
                <Route path="/login" element={<LogInPage />} />
                <Route path="/my-profile" element={<MyProfilePage />} />
                <Route path="*" element={<Page404 />} />
            </Routes>
        </div>
    );
};

export default RouterComponent;
