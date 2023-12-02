import React from 'react';
import { Link } from 'react-router-dom';
import { createPopper } from '@popperjs/core';
import { useSelector } from 'react-redux';

export default function UserMenu() {
  const { user } = useSelector((state) => state.auth);
  const intials = [user.firstName, user.lastName]
    .map((n) => n[0].toUpperCase())
    .join('');

  const [show, setShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current);
    setShow(true);
  };
  const closeDropdownPopover = () => {
    setShow(false);
  };
  const logout = () => {
    // dispatch(logout());
    // ! should call logout api but we don't have it yet
    localStorage.removeItem('accessToken');
    window.location.reload();
  };

  const menu = [
    {
      title: 'My Profile',
      icon: 'fas fa-user',
      link: '/',
    },
    // {
    //   title: 'My Clubs',
    //   icon: 'fa-users',
    //   link: '/profile/myclubs',
    // },

    {
      title: user.isAdmin ? 'My Shows' : 'My tickets',
      icon: user.isAdmin ? 'fas fa-desktop' : 'fas fa-calendar-day',
      link: user.isAdmin ? '/settings/shows' : '/settings/tickets',
    },
    // {
    //   title: 'Manage Events',
    //   icon: 'fa-sliders-h',
    //   link: '/profile/manage/events',
    // },
    // {
    //   title: 'Rate our Website',
    //   icon: 'fa-star-half-alt',
    //   link: 'https://forms.gle/JPfRcA3FYgqqBeip6',
    // },
    // {
    //   title: 'Be a Bug Police',
    //   icon: 'fa-bug',
    // },
    { type: 'Separator' },
    {
      title: 'Log Out',
      icon: 'fas fa-sign-out-alt',
      link: '/',
      onClick: logout,
    },
  ];

  return (
    <div
      onMouseEnter={(e) => {
        e.preventDefault();
        openDropdownPopover();
      }}
      onMouseLeave={(e) => {
        e.preventDefault();
        closeDropdownPopover();
      }}
    >
      <a className="text-gray-600 block" href="#pablo" ref={btnDropdownRef}>
        <div className="items-center flex ">
          <span
            style={{ background: '#9383c3' }}
            className="w-10 h-10 text-sm text-white border-white bg-gray-300 inline-flex items-center justify-center rounded-full  overflow-hidden border font-semibold"
          >
            {intials}
          </span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={`${
          show ? 'block' : 'hidden'
        } bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-xl min-w-48 font-semibold`}
      >
        {menu.map(({ type, title, link, icon, ...rest }) =>
          type === 'Separator' ? (
            <div
              key={type}
              className="h-0 my-1 border border-solid border-gray-200"
            />
          ) : (
            <Link
              key={title}
              to={link}
              className="text-sm py-2 px-4 font-semibold block w-full whitespace-no-wrap bg-transparent text-gray-700 hover:bg-blue-100"
              {...rest}
            >
              <i
                className={`${icon} text-gray-700 mr-2`}
                style={{ color: 'inherit' }}
              />{' '}
              {title}
            </Link>
          ),
        )}

        {/* <a
            href="https://forms.gle/JPfRcA3FYgqqBeip6"
            className="text-sm py-2 px-4 font-semibold block w-full whitespace-no-wrap bg-transparent text-gray-700 hover:bg-blue-100"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fas fa-star-half-alt text-gray-700 mr-2" /> Rate our
            Website
          </a>
          <a
            href="https://forms.gle/mf5rCqLFSDeikiYT6"
            className="text-sm py-2 px-4 font-semibold block w-full whitespace-no-wrap bg-transparent text-gray-700 hover:bg-blue-100"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fas fa-bug text-gray-700 mr-2" /> Be a Bug Police
          </a> */}
        {/* <div className="h-0 my-1 border border-solid border-gray-200" /> */}
      </div>
    </div>
  );
}
