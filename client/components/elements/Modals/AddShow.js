/* eslint-disable camelcase */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { Effect, Modal, ModalManager } from 'react-dynamic-modal';
import { Formik } from 'formik';
import moment from 'moment';

Modal.defaultStyles = {};

const customModalStyles = {
  content: {
    width: '70%',
    marginTop: '20px',
    transform: 'translate(-50%, -50%)',
    height: '600px', // <-- This sets the height
    overlfow: 'scroll', // <-- This tells the modal to scroll
  },
};

export default function AddShow(props) {
  const [formData, setFormData] = useState({
    movieId: '',
    lang: 'English',
    screen: 0,
    price: 0,
    starting_date: undefined,
    ending_date: undefined,
    starting_time: undefined,
    ending_time: undefined,
    capacity: 0,
  });

  const {
    movieId,
    screen,
    price,
    starting_date,
    ending_date,
    starting_time,
    ending_time,
    capacity,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const { onRequestClose } = props;

  if (!props.isMovieListLoading && !props.isTheaterDetailsLoading) {
    return (
      <Modal
        onRequestClose={onRequestClose}
        effect={Effect.RotateFromBottom3D}
        style={customModalStyles}
      >
        <div className="flex items-start justify-between p-5 ml-1 border-b border-solid border-gray-300 rounded-t">
          <h3 className="text-2xl font-semibold">Add new show</h3>
          <button
            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
            onClick={ModalManager.close}
          >
            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
              ×
            </span>
          </button>
        </div>
        <div className="px-6 py-4 bg-gray-200">
          <Formik
            initialValues={formData}
            validate={() => {
              const errors = {};
              if (!movieId) {
                errors.movieId = 'Event name is required !';
              } else if (screen.length === 0) {
                errors.screen = 'Screen is required !';
              } else if (!price) {
                errors.price = 'Price is required !';
              } else if (capacity === '0') {
                errors.capacity = 'Valid Capacity is required !';
              } else if (!(capacity > 0)) {
                errors.capacity = 'Capacity should be greater than zero !';
              } else if (!starting_date) {
                errors.starting_date = 'Starting date is required !';
              } else if (!ending_date) {
                errors.ending_date = 'Ending date is required !';
              } else if (
                new Date(starting_date) > new Date(ending_date) ||
                new Date(ending_date) < new Date(starting_date)
              ) {
                errors.ending_date = 'Give proper ending date !';
              } else if (!starting_time) {
                errors.starting_time = 'Starting time is required !';
              } else if (!ending_time) {
                errors.ending_time = 'Ending time is required !';
              } else if (
                new Date(starting_date).getDate() ===
                  new Date(ending_date).getDate() &&
                new Date(starting_date).getMonth() ===
                  new Date(ending_date).getMonth() &&
                new Date(starting_date).getFullYear() ===
                  new Date(ending_date).getFullYear() &&
                moment(starting_time, 'h:mma').isAfter(
                  moment(ending_time, 'h:mma'),
                )
              ) {
                errors.ending_time = 'Give proper ending time!';
              }
              return errors;
            }}
            onSubmit={async () => {
              const finalData = {
                movieId: formData.movieId,
                startTime: new Date(
                  `${formData.starting_date}T${formData.starting_time}`,
                ).toString(),
                endTime: new Date(
                  `${formData.ending_date}T${formData.ending_time}`,
                ).toString(),
                screen: formData.screen,
                capacity: formData.capacity,
                price: +formData.price,
              };
              try {
                await props.createItem(finalData);
                props.refetch();
                ModalManager.close();
              } catch (error) {
                console.error('Error creating item:', error);
              }
            }}
          >
            {({ errors, touched, handleBlur, handleSubmit }) => (
              <form>
                <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
                  Show Information
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Movie
                      </label>
                      <select
                        className="block shadow focus:shadow-outline pr-2  text-sm appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-2half px-4 pr-8 rounded ease-linear transition-all duration-150"
                        id="grid-state"
                        placeholder="Select the movie"
                        style={{ outline: 'none' }}
                        name="movieId"
                        value={movieId}
                        onChange={(e) => onChange(e)}
                      >
                        <option value="">Select Option</option>
                        {props.movieList.map((movie) => (
                          <option value={movie._id} key={movie._id}>
                            {movie.name}
                          </option>
                        ))}
                      </select>
                      <p className="FormError">
                        {errors.movieId && touched.movieId && errors.movieId}
                      </p>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Screen
                      </label>
                      <select
                        className="block shadow focus:shadow-outline pr-2  text-sm appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-2half px-4 pr-8 rounded ease-linear transition-all duration-150"
                        id="grid-state"
                        placeholder="Select the screen"
                        style={{ outline: 'none' }}
                        name="screen"
                        value={screen ? `${screen}-${capacity}` : 0}
                        onChange={(e) => {
                          const splitValue = e.target.value.split('-');
                          setFormData({
                            ...formData,
                            screen: +splitValue[0],
                            capacity: +splitValue[1],
                          });
                        }}
                      >
                        <option value={0}>Select Option</option>
                        {props.theaterDetails.screens.map((screen) => (
                          <option
                            value={`${screen.screenNumber}-${screen.capacity}`}
                            key={screen._id}
                          >
                            {screen.screenNumber}
                          </option>
                        ))}
                      </select>
                      <p className="FormError">
                        {errors.screen && touched.screen && errors.screen}
                      </p>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Price
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={price}
                        onChange={(e) => onChange(e)}
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                        onBlur={handleBlur}
                      />
                      <p className="FormError">
                        {errors.price && touched.price && errors.price}
                      </p>
                    </div>
                  </div>
                </div>
                <hr className="mt-6 border-b-1 border-gray-400" />

                <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
                  Timing
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Starting Date
                      </label>
                      <input
                        type="date"
                        name="starting_date"
                        value={starting_date}
                        onChange={(e) => onChange(e)}
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                        onBlur={handleBlur}
                      />
                      <p className="FormError">
                        {errors.starting_date &&
                          touched.starting_date &&
                          errors.starting_date}
                      </p>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Ending Date
                      </label>
                      <input
                        type="date"
                        name="ending_date"
                        value={ending_date}
                        onChange={(e) => onChange(e)}
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                        onBlur={handleBlur}
                      />
                      <p className="FormError">
                        {errors.ending_date &&
                          touched.ending_date &&
                          errors.ending_date}
                      </p>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Starting Time
                      </label>
                      <input
                        type="time"
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                        name="starting_time"
                        value={starting_time}
                        onChange={(e) => onChange(e)}
                        onBlur={handleBlur}
                      />
                      <p className="FormError">
                        {errors.starting_time &&
                          touched.starting_time &&
                          errors.starting_time}
                      </p>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Ending Time
                      </label>
                      <input
                        type="time"
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                        name="ending_time"
                        value={ending_time}
                        onChange={(e) => onChange(e)}
                        onBlur={handleBlur}
                      />
                      <p className="FormError">
                        {errors.ending_time &&
                          touched.ending_time &&
                          errors.ending_time}
                      </p>
                    </div>
                  </div>
                </div>
                <hr className="mt-6 border-b-1 border-gray-400" />

                <div className="flex items-center justify-end">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={ModalManager.close}
                  >
                    Close
                  </button>
                  <button
                    className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none  ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </Modal>
    );
  }
  return <React.Fragment />;
}
