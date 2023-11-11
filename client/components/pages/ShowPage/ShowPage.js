import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import { GeneralNavbar } from '_components/elements/Navbar';
// import MapContainer from 'components/Maps/ViewOnlyMap';
// import JoinEventButton from 'components/SweetAlerts/JoinEventButton';
import { motion } from 'framer-motion';
import GridLoader from 'react-spinners/GridLoader';
import { BigShareButton } from '_components/elements/PopupButton';
import Footer from '_components/layouts/Footer';
import { useGetShowByIdQuery } from '../../../store/services/show';
import { dummyShowObj } from '../../../constants';
import Tickets from './Tickets';

function Tag(props) {
  return (
    <span className="text-sm font-semibold inline-block py-1 px-2 uppercase rounded-full text-beta bg-lightbeta uppercase last:mr-0 mr-2">
      {props.name}
    </span>
  );
}

Tag.propTypes = {
  name: PropTypes.string.isRequired,
};

export default function ShowPage() {
  const { id } = useParams();
  const isCompleted = false;

  const toggleLike = () => {};
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
  const { data, isLoading } = useGetShowByIdQuery(id);
  const { movie, theater, startTime, endTime } = data || dummyShowObj;
  const { photo, name, description, tags, liked } = movie || {};
  const {
    name: theaterName,
    photo: theaterPhoto,
    location,
    city,
    state,
  } = theater || {};

  const isModerator = false;

  if (!isLoading) {
    return (
      <React.Fragment>
        <GeneralNavbar />

        <div className="flex flex-col md:mx-0 lg:mx-28">
          <div
            // style={{ minHeight: "" }}
            className="flex flex-col md:flex-row flex-nowrap  mt-16 justify-between xs:items-center sm:items-center items-start flex-shrink-0"
          >
            <div className="text-black bg-white rounded-md event-image-div">
              <img
                src={photo}
                className="event-image rounded mt-2"
                alt="event_pic"
              />
            </div>

            <div className="pt-2 px-2 lg:pt-4 flex flex-col event-side-container ml-4">
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col items-center">
                  <div className="text-alpha text-xl font-semibold uppercase pl-1  pt-2">
                    {moment(startTime).format('MMM')}
                  </div>
                  <div className="text-3xl ">
                    {moment(startTime).format('DD')}
                  </div>
                </div>
                <div>
                  <h1
                    className="font-semibold text-2xl text-center ml-4 "
                    style={{ textTransform: 'capitalize' }}
                  >
                    {name}
                  </h1>
                </div>

                {/* TODO: setting as club page */}
                {isModerator ? (
                  <div>
                    <button
                      className="float-right text-lg"
                      onClick={() => console.log("REDIRECT TO SETTING'S PAGE")}
                      type="button"
                    >
                      <i className=" text-md text-gray-700 fas fa-cog" />
                    </button>
                  </div>
                ) : (
                  <div />
                )}
              </div>
              <div className="flex flex-col mt-4 text-md text-gray-700 ">
                {' '}
                <div className="ml-2 flex">
                  <div>
                    <i className="fas fa-map-marker-alt text-lg " />
                  </div>
                  <div className="ml-3">
                    {location}, {city}
                  </div>
                </div>
                <div className="mt-2 ml-2 flex">
                  <div>
                    {' '}
                    <i className="fas fa-clock" />
                  </div>

                  <div className="ml-2">
                    {' '}
                    {moment(startTime).format('MMMM Do YYYY, h:mm:ss A')}
                  </div>
                </div>
                <div className="mt-2 cursor-pointer">
                  <div className="flex flex-col ml-1 mb-1">
                    <div>
                      <span className="font-semibold "> Screening By :</span>
                    </div>
                    <div className="flex flex-row mt-1">
                      <div>
                        <img
                          src={theaterPhoto}
                          alt="HostedClubImage"
                          className="rounded mini-club-image mr-4"
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <div className="font-semibold">{theaterName}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-row  mt-2 lg:mt-auto  ">
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
                    <i className="fas fa-heart" /> {liked ? 'Liked' : 'Like'}
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

              {!isCompleted && (
                <div
                  title="Add to Calendar"
                  className="addeventatc mt-1  text-xs rounded-lg"
                  style={{ fontSize: 'smaller !important' }}
                  data-styling="none"
                >
                  <span className="uppercase">
                    <i className="far fa-calendar-plus text-base" /> &nbsp;Add
                    to Calendar
                  </span>
                  <span className="arrow">&nbsp;</span>
                  <span className="start">{startTime}</span>
                  <span className="end">{endTime}</span>
                  <span className="timezone">{timeZone}</span>
                  <span className="title">{name}</span>
                  <span className="description">{description}</span>
                  <span className="location">
                    {`${location}, ${city}, ${state}`}
                  </span>
                </div>
              )}

              {isCompleted ? (
                <div className="flex justify-center uppercase mt-auto mb-4 text-complete border-green-500 font-semibold rounded-lg py-4">
                  Completed
                </div>
              ) : (
                <div className="flex justify-center mt-2">
                  {/* <BookButton
                    eventid={eventdetails._id}
                    startdate={eventdetails.startdate}
                    current={eventdetails.current_participants}
                    max={eventdetails.maximum_participants}
                    check={checkevent}
                    isInWaiting={isInWaiting}
                    isFull={IsFull}
                  /> */}
                </div>
              )}
            </div>
          </div>
          <div className="mx-4 lg:mx-0 my-4">
            <div className="flex flex-col">
              <div className="flex flex-col lg:flex-row py-4">
                <div className="font-semibold text-gray-800 text-2xl lg:w-1/4">
                  Tickets
                </div>
                <div className="mt-1 text-lg text-gray-700 lg:w-3/4 leading-relaxed">
                  <Tickets />
                </div>
              </div>
              <div className="flex flex-col lg:flex-row py-4">
                <div className="font-semibold text-gray-800 text-2xl lg:w-1/4">
                  Description
                </div>
                <div className="mt-1 text-lg text-gray-700 lg:w-3/4 leading-relaxed">
                  <pre>{description}</pre>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row py-4">
                <div className="font-semibold text-gray-800 text-2xl lg:w-1/4">
                  Tags
                </div>
                <div className="mt-1 text-lg text-gray-700 w-3/4 leading-relaxed">
                  {tags.map((el) => (
                    <Tag name={el.name} key={el._id} />
                  ))}
                </div>
              </div>
              {/* <div
                className="flex flex-col lg:flex-row py-4"
                style={
                  eventdetails.participants_list.length !== 0
                    ? { display: '' }
                    : { display: 'none' }
                }
              >
                <div className="font-semibold text-gray-800 text-2xl lg:w-1/4">
                  People going
                </div>
                {eventdetails.participants_list.length !== 0 ? (
                  <RegisteredMember
                    eventid={id}
                    capacity={eventdetails.maximum_participants}
                  />
                ) : (
                  ''
                )}
              </div> */}
              {/* <div className="flex flex-col lg:flex-row py-4">
                <div className="font-semibold text-gray-800 text-2xl lg:w-1/4">
                  FAQs <br />
                  <AskQuestion event_id={id} />
                </div>
                <div
                  className="mt-1 text-lg  lg:w-3/4 leading-relaxed"
                  style={{ overflowY: 'auto', maxHeight: '400px' }}
                >
                  {eventdetails.faq.length ? (
                    eventdetails.faq.map((el, i) => (
                      <details>
                        <summary className={i === 0 ? 'pt-0' : ''}>
                          {el.question}
                        </summary>
                        <pre>{el.answer}</pre>
                      </details>
                    ))
                  ) : (
                    <i> Nothing added Yet.</i>
                  )}
                </div>
              </div> */}
              {/* <div className="flex flex-col lg:flex-row py-4">
                <div className="font-semibold text-gray-800 text-2xl lg:w-1/4">
                  Location
                </div>
                <div className="mt-1 text-lg text-gray-700 lg:w-3/4 leading-relaxed">
                  <MapContainer data={movie} />
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <br />
        <br />
        <Footer />
      </React.Fragment>
    );
  }
  return (
    <div
      className="flex justify-center items-center"
      style={{ height: '100vh' }}
    >
      <GridLoader color="#36D7B7" size={15} />
    </div>
  );
}
