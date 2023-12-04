import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MyTicketsPage } from '../../pages/Settings/MyTicketsPage';
import { AdminNavbar, SideBar } from '../../elements/Navbar';
import { FooterAdmin } from '../Footer';
import { MyShowPage } from '../../pages/Settings/MyShowPage';
import SubscriptionPage from '../../pages/Settings/SubscriptionPage/SubscriptionPage';

const userNavItems = [
  {
    title: 'My Account',
    items: [
      {
        title: 'Subsciption',
        icon: 'fas fa-desktop',
        link: '/settings/subscription',
      },
      {
        title: 'My Tickets',
        icon: 'fas fa-calendar-day',
        link: '/settings/tickets',
      },
    ],
  },
];

const adminNavItems = [
  {
    title: 'My Theater',
    items: [
      {
        title: 'Shows',
        icon: 'fas fa-desktop',
        link: '/settings/shows',
      },
    ],
  },
];

export default function SettingsLayout() {
  const { user } = useSelector((state) => state.auth);
  return (
    <React.Fragment>
      <SideBar navItems={user.isAdmin ? adminNavItems : userNavItems} />
      <div className="relative md:ml-64 bg-gray-200">
        <AdminNavbar />
        {/* Header */}
        <div className="relative bg-gradient-primary md:pt-32 pb-20 pt-12" />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Routes>
            <Route path="/tickets" element={<MyTicketsPage />} />
            <Route path="/subscription" element={<SubscriptionPage />} />
            <Route path="/shows" element={<MyShowPage />} />
            {/* <Redirect from="/testing" to="/auth/login" /> */}
          </Routes>

          <FooterAdmin />
        </div>
      </div>
    </React.Fragment>
  );
}
