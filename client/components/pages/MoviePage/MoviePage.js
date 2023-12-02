/* eslint-disable max-len */
import React from 'react';

import { motion } from 'framer-motion';
import Moment from 'moment';
import { useParams } from 'react-router';
import GridLoader from 'react-spinners/GridLoader';

import { GeneralNavbar } from '_components/elements/Navbar';
import Footer from '_components/layouts/Footer';

import { dummyMovieObj } from '../../../constants';
import { useGetMovieByIdQuery } from '../../../store/services/movie';
import { BigShareButton } from '../../elements/PopupButton';
import { Tags } from '../../library/Tags';

import Tabs from './tabs/index';

export default function MoviePage() {
  const { id } = useParams();

  const { data, isLoading } = useGetMovieByIdQuery(id);
  const {
    photo,
    // _id,
    name,
    releaseDate,
    studio,
    description,
    // director,
    tags = [],
    liked = false,
    duration = 123,
    imdbRating = 10,
  } = data || dummyMovieObj;

  const toggleLike = () => {};

  return isLoading ? (
    <div
      className="flex justify-center items-center"
      style={{ height: '100vh' }}
    >
      <GridLoader color="#36D7B7" size={15} />
    </div>
  ) : (
    <React.Fragment>
      <GeneralNavbar />
      <div
        style={{
          marginTop: 65,
          backgroundColor: '#fafafa',
        }}
      >
        <div className="flex flex-col flex-wrap lg:mx-20">
          <div
            className="flex flex-col md:flex-row flex-wrap md:flex-nowrap mt-4 justify-between xs:items-center
           sm:items-center items-start flex-shrink-0 "
          >
            <div className="club-image-div">
              <img
                className="overflow-hidden object-contain rounded-lg club-image"
                alt="club_background_photo"
                src={photo}
              />
            </div>
            <div className="bg-white rounded p-6 border leading-relaxed club-side-container">
              <div className="text-3xl font-bold">{name}</div>
              <div className="text-base mt-2 text-gray-600 ml-2">
                <i className="far fa-star text-sm" />
                &nbsp;&nbsp;
                {imdbRating}
                /10
                <br />
                <i className="fas fa-calendar-day text-sm" />
                &nbsp;&nbsp;&nbsp;
                {Moment(releaseDate).format('DD MMM YYYY')}
                <br />
                <i className="fas fa-film text-sm" />
                &nbsp;&nbsp; {studio} <br />
                <i className="fas fa-hourglass-start text-sm" />
                &nbsp;&nbsp;&nbsp;
                {duration} <br />
              </div>
              <div className="p-1 my-2 leading-wide">
                <Tags data={tags} />
              </div>
              <div className="flex flex-row justify-center my-2">
                <div className="w-6/12">
                  <motion.button
                    className={
                      !liked
                        ? 'w-full text-likealpha bg-white shadow border border-solid hover:bg-alpha hover:text-white active:bg-red-600  font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                        : 'w-full text-white bg-brightalpha shadow hover:bg-white border border-solid hover:text-alpha active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                    }
                    type="button"
                    onClick={toggleLike}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <i className="fas fa-heart" /> Like
                  </motion.button>
                </div>
                &nbsp;
                <div className="w-6/12 self-end">
                  <BigShareButton
                    shareUrl={window.location.href}
                    title={name}
                    description={description}
                    tags={tags}
                  />
                </div>
              </div>

              <div
                // className={isAdmin ? "hidden" : "flex justify-center"}
                className="flex justify-center"
              >
                <button
                  className=" w-full  hover:bg-lightalpha shadow border border-solid  bg-alpha text-white active:bg-lightalpha font-bold uppercase text-xs px-4 py-2 rounded-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  //   onClick={() => this.successJoined()}
                >
                  <i className="fas fa-user-plus " />
                  &nbsp; Book
                </button>
              </div>
            </div>
          </div>
          <div className="bg-white rounded border mt-4 p-2 mb-8">
            <Tabs />
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}
