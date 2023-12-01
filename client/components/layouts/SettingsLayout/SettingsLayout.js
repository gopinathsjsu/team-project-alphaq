import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { MyTicketsPage } from '../../pages/Settings/MyTicketsPage';
import { AdminNavbar, SideBar } from '../../elements/Navbar';
import { FooterAdmin } from '../Footer';

export default function SettingsLayout() {
  return (
    <React.Fragment>
      <SideBar navItems={[]} />
      <div className="relative md:ml-64 bg-gray-200">
        <AdminNavbar />
        {/* Header */}
        <div className="relative bg-gradient-primary md:pt-32 pb-20 pt-12" />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Routes>
            <Route path="/tickets" element={<MyTicketsPage />} />
            {/* <Redirect from="/testing" to="/auth/login" /> */}
          </Routes>

          <FooterAdmin />
        </div>
      </div>
    </React.Fragment>
  );
}
