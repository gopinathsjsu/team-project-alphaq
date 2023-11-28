import { useEffect, useRef, useState } from 'react';

export default function useComponentVisible(initialIsVisible) {
  const [navbarOpen, setNavbarOpen] = useState(initialIsVisible);
  const ref = useRef(null);

  const handleHideDropdown = (event) => {
    if (event.key === 'Escape') {
      setNavbarOpen(false);
    }
  };

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setNavbarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleHideDropdown, true);
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('keydown', handleHideDropdown, true);
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return { ref, navbarOpen, setNavbarOpen };
}
