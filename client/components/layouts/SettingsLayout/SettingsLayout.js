import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MyTicketsPage } from '../../pages/Settings/MyTicketsPage';
import { AdminNavbar, SideBar } from '../../elements/Navbar';
import { FooterAdmin } from '../Footer';
import { MyShowPage } from '../../pages/Settings/MyShowPage';

export default function SettingsLayout() {
  const { user } = useSelector((state) => state.auth);
  return (
    <React.Fragment>
      <SideBar
        navItems={[
          {
            title: user.isAdmin ? 'My Theaters' : 'My Movies',
            items: [
              {
                title: user.isAdmin ? 'Shows' : 'My tickets',
                icon: user.isAdmin ? 'fas fa-desktop' : 'fas fa-calendar-day',
                link: user.isAdmin ? '/settings/shows' : '/settings/tickets',
              },
            ],
          },
        ]}
      />
      <div className="relative md:ml-64 bg-gray-200">
        <AdminNavbar />
        {/* Header */}
        <div className="relative bg-gradient-primary md:pt-32 pb-20 pt-12" />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Routes>
            <Route path="/tickets" element={<MyTicketsPage />} />
            <Route path="/shows" element={<MyShowPage />} />
            {/* <Redirect from="/testing" to="/auth/login" /> */}
          </Routes>

          <FooterAdmin />
        </div>
      </div>
    </React.Fragment>
  );
}
