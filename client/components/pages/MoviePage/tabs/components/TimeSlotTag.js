import React from 'react';
import PropTypes from 'prop-types';

const getRelevantCSSClass = (status) => {
  if (status === 0) {
    return 'bg-lightgreen text-green';
  }
  if (status === 1) {
    return 'bg-lightyellow text-lightyellow-filler';
  }
  return 'bg-lightred text-lightred-filler';
};

export default function TimeSlotTag({ status, children, ...other }) {
  return (
    <span
      className={`${getRelevantCSSClass(
        status,
      )} text-xs hover:shadow-md font-semibold inline-block py-1 px-2 uppercase rounded-full mr-1 mb-1 text-center`}
      {...other}
    >
      {children}
    </span>
  );
}

TimeSlotTag.propTypes = {
  status: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};
