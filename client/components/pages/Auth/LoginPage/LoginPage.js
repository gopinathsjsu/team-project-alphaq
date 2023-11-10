/* eslint-disable operator-linebreak */
import React, { useCallback, useState } from 'react';

import { Formik } from 'formik';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  const [formData, setData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setData({ ...formData, [e.target.name]: e.target.value });

  const validate = useCallback(() => {
    const errors = {};
    if (!email) {
      errors.email = 'Email or username is required !';
    } else if (!password) {
      errors.password = 'Password is required !';
    }
    return errors;
  }, [email, password]);

  const onSubmit = useCallback(() => {
    // ! SIGN IN LOGIC HERE
  }, []);

  return (
    <React.Fragment>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div
              className="relative flex flex-col min-w-0 break-words w-full mb-4
             shadow-lg rounded-lg bg-gray-300 border-0"
            >
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center">
                  <h1 className="text-gray-600 text-sm font-bold">Sign in</h1>
                </div>
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <Formik
                  initialValues={formData}
                  validate={validate}
                  onSubmit={onSubmit}
                >
                  {({
                    errors,
                    touched,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Username or Email
                        </label>
                        <input
                          type="text"
                          className="px-3 py-3 placeholder-gray-400 text-gray-700
                          bg-white rounded text-sm shadow focus:outline-none
                          focus:shadow-outline w-full ease-linear transition-all duration-150"
                          placeholder="Email"
                          name="email"
                          value={email}
                          onChange={(e) => onChange(e)}
                          onBlur={handleBlur}
                        />
                        <p className="FormError">
                          {errors.email && touched.email && errors.email}
                        </p>
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          className="px-3 py-3 placeholder-gray-400
                           text-gray-700 bg-white rounded text-sm
                            shadow focus:outline-none focus:shadow-outline
                             w-full ease-linear transition-all duration-150"
                          placeholder="Password"
                          name="password"
                          value={password}
                          onChange={(e) => onChange(e)}
                          onBlur={handleBlur}
                        />
                        <p className="FormError">
                          {errors.password &&
                            touched.password &&
                            errors.password}
                        </p>
                      </div>
                      <div className="text-center mt-6">
                        <button
                          className="bg-lightalpha
                        hover:bg-alpha text-white active:bg-gray-700 text-sm
                        font-bold uppercase px-6 py-3 rounded shadow
                        hover:shadow-lg outline-none focus:outline-none mr-1 mb-1
                        w-full ease-linear transition-all duration-150"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          Sign In
                        </button>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
            <div className="flex flex-wrap relative text-lg font-semibold">
              <div className="w-1/2">
                <Link to="../forgot" className="text-gray-300">
                  <small>Forgot password ?</small>
                </Link>
              </div>
              <div className="w-1/2 text-right">
                <Link to="../register" className="text-gray-300">
                  <small>Create new account</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      )
    </React.Fragment>
  );
}
