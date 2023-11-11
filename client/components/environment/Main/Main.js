import React, { useEffect, useState } from 'react';

import R from 'ramda';
import { ReactNotifications } from 'react-notifications-component';
import { useDispatch } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';

import '../../../styles/css/customcss.css';
import '../../../styles/css/tailwindcss.css';
import '../../../styles/css/mediaqueries.css';

// import Footer from '_components/layouts/Footer';
// import Navigation from '_components/layouts/Navigation';
// import HomePage from '_components/pages/HomePage';
import LoginPage from '_components/pages/LoginPage';
import LostPage from '_components/pages/LostPage';
import RegisterPage from '_components/pages/RegisterPage';
import SettingsPage from '_components/pages/SettingsPage';
import TodoPage from '_components/pages/TodoPage';
// import WelcomePage from '_components/pages/WelcomePage';

import { attemptGetUser } from '_store/thunks/user';

import AuthLayout from '../../layouts/AuthLayout';
import LandingPage from '../../pages/LandingPage';
import { MoviePage } from '../../pages/MoviePage';
import { ShowPage } from '../../pages/ShowPage';

export default function Main() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(attemptGetUser())
      .then(() => setLoading(false))
      .catch(R.identity)
      .finally(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    !loading && (
      <React.Fragment>
        <ReactNotifications />
        {/* <Navigation />
        <main className={styles.root}> */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="movie/:id" element={<MoviePage />} />
          <Route path="show/:id" element={<ShowPage />} />
          <Route path="auth/*" element={<AuthLayout />} />
          <Route path="home" element={<LandingPage />} />
          <Route path="todo" element={<TodoPage />} />
          <Route path="settings/*" element={<SettingsPage />} />
          <Route path="*" element={<LostPage />} />
        </Routes>
        {/* </main>
        <Footer /> */}
      </React.Fragment>
    )
  );
}
