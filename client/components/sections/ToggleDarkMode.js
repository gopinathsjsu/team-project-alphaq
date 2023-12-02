/* eslint-disable react/prop-types */
import React from 'react';
import { motion } from 'framer-motion';

const spring = {
  type: 'spring',
  stiffness: 700,
  damping: 30,
};

export default function ToggleDarkMode({ isOn, ...props }) {
  return (
    <div className="switch" data-isOn={isOn} {...props}>
      <motion.div className="handle" layout transition={spring} />
    </div>
  );
}
