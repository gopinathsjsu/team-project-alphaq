import React, { useEffect } from 'react';

import { ReactNotifications } from 'react-notifications-component';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import '../../../styles/css/customcss.css';
import '../../../styles/css/tailwindcss.css';
import '../../../styles/css/mediaqueries.css';

import LostPage from '_components/pages/LostPage';

import AuthLayout from '../../layouts/AuthLayout';
import LandingPage from '../../pages/LandingPage';
import { MoviePage } from '../../pages/MoviePage';
import { ShowPage } from '../../pages/ShowPage';
import { loginWithAccessToken } from '../../../store/features/auth/auth.thunk';

export default function Main() {
  const dispatch = useDispatch();
  const { isValidatingUser, loggedIn } = useSelector((state) => state.auth);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    dispatch(loginWithAccessToken(accessToken));
  }, [dispatch]);

  return (
    !isValidatingUser && (
      <React.Fragment>
        <ReactNotifications />
        {/* <Navigation />
        <main className={styles.root}> */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="movie/:id" element={<MoviePage />} />
          <Route path="show/:id" element={<ShowPage />} />
          <Route
            path="auth/*"
            element={loggedIn ? <Navigate replace to="/" /> : <AuthLayout />}
          />
          <Route
            path="settings/*"
            element={loggedIn ? <SettingsPage /> : <Navigate replace to="/" />}
          />
          <Route path="*" element={<LostPage />} />
        </Routes>
        {/* </main>
        <Footer /> */}
      </React.Fragment>
    )
  );
}
