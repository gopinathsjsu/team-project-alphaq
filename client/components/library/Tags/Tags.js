import React from 'react';

import PropTypes from 'prop-types';

export default function Tags({ data = [] }) {
  return (
    <React.Fragment>
      {data.map((el) => (
        <span
          key={el._id}
          className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-beta bg-lightbeta
           mr-1 mt-1"
        >
          {el.name}
        </span>
      ))}
    </React.Fragment>
  );
}

Tags.propTypes = {
  data: PropTypes.array.isRequired,
};
