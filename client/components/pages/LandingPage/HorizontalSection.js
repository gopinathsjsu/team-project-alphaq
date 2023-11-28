import React from 'react';

import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { InfoCard } from '_components/elements/Card';

import { cardTypes } from '../../../constants';

export default function HorizontalSection({
  listOfItems = [],
  title = 'Movies',
  style = {},
  type = cardTypes.MOVIE,
}) {
  return (
    <section className="bg-white block m-4 xs:m-0 xs:mt-2" {...style}>
      <div className="p-8 mx-6 sm:p-10 xs:p-0 sm:mx-0">
        <div className="mb-6">
          <div className="flex flex-row xs:flex-col xs:justify-center xs:items-center">
            <h4 className="text-3xl xs:text-2xl ml-1 font-semibold leading-normal mt-0 mb-2 text-alpha">
              {title}
            </h4>
            <motion.button
              className="text-beta font-semibold ml-auto xs:ml-1 mr-2 hover:text-lightbeta"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link to="/search">
                {' '}
                Load More &nbsp;
                <i className="fas fa-angle-double-right" />
              </Link>
            </motion.button>
          </div>
        </div>
        <div className="flex flex-wrap gap-1 justify-start xs:justify-center">
          {listOfItems.map((data) =>
            type ? <InfoCard key={data._id} data={data} /> : '',
          )}
        </div>
      </div>
    </section>
  );
}

HorizontalSection.defaultProps = {
  listOfItems: [],
  isEvent: true,
  title: 'Events',
  style: {},
  type: cardTypes.MOVIE,
};

HorizontalSection.propTypes = {
  listOfItems: PropTypes.array,
  isEvent: PropTypes.bool,
  title: PropTypes.string,
  type: PropTypes.string,
  style: PropTypes.object,
};
