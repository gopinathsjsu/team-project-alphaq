import React from 'react';
import { Route, Routes } from 'react-router-dom';

// components

import AdminNavbar from 'components/Navbars/AdminNavbar.js';
import Sidebar from 'components/Sidebar/ProfileSidebar.js';
import FooterAdmin from 'components/Footers/FooterAdmin.js';

export default function Admin() {
  return (
    <React.Fragment>
      <Sidebar />
      <div className="relative md:ml-64 bg-gray-200">
        <AdminNavbar />
        {/* Header */}
        <div className="relative bg-gradient-primary md:pt-32 pb-20 pt-12" />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Routes>
            <Route path="/tickets" element={<LoginPage />} />
            {/* <Redirect from="/testing" to="/auth/login" /> */}
          </Routes>

          <FooterAdmin />
        </div>
      </div>
    </React.Fragment>
  );
}
