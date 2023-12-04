/* eslint-disable operator-linebreak */
import React, { useState } from 'react';

import { Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import zxcvbn from 'zxcvbn';

import { useDispatch } from 'react-redux';
import { scoreTitles } from '../../../../constants';
import { secureLocalStorage } from '../../../../utils/secureLocalStorage';
import { signUp } from '../../../../store/features/auth/auth.thunk';

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [checkemail] = useState(false);
  const [strength, setStrength] = useState(0);
  const [formData, SetFormData] = useState({
    password: '',
    repassword: '',
    firstName: '',
    lastName: '',
  });

  // eslint-disable-next-line object-curly-newline
  const { password, repassword, firstName, lastName } = formData;

  const onChange = (e) => {
    if (e.target.name === 'password') {
      setStrength(zxcvbn(e.target.value).score);
    }
    SetFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
    // const config = {
    //   method: 'POST',
    //   header: {
    //     'Content-Type': 'application/json',
    //   },
    //   validateStatus: () => true,
    // };

    // axios
    //   .post('/api/manage/EmailCheck', { email: e.target.value }, config)
    //   .then((res) => {
    //     if (!res.data.is_error) {
    //       setcheckEmail(false);
    //     } else {
    //       setcheckEmail(false);
    //     }
    //   });
  };

  const [checked, setChecked] = useState(false);
  const handleCheck = () => setChecked(!checked);
  const strengthClass = [
    'strength-meter mt-2',
    formData.password.length > 0 ? 'visible' : 'hidden',
  ]
    .join(' ')
    .trim();

  const validateForm = () => {
    const errors = {};
    if (!firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    if (!lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errors.email = 'Invalid email address';
    } else if (checkemail) {
      errors.email = 'Email is already exists';
    }
    if (!password.trim()) {
      errors.password = 'Password is required';
    } else if (password.trim().length < 6) {
      errors.password = 'Minimim 6 characters are required';
    } else if (strength < 1) {
      errors.password = 'Please use strong password.';
    }
    if (!repassword.trim()) {
      errors.repassword = 'Re enter your password';
    } else if (password.trim() !== repassword.trim()) {
      errors.repassword = 'Password does not match';
    } else if (!checked) {
      errors.checkbox = 'You must have to agree our terms and conditions';
    }
    return errors;
  };

  const handleSubmit = async ({ setSubmitting }) => {
    const signUpProfile = {
      firstName,
      lastName,
      email,
      password,
    };

    secureLocalStorage.setItem('signUpProfile', signUpProfile);
    dispatch(signUp(signUpProfile));
    // Redirect to step 2
    // history.push('/auth/register/step2');
    navigate('/auth/registerstep2');
    setSubmitting(false);
  };

  return (
    <div className="container mx-auto px-4 h-full">
      <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-6/12 px-4">
          <div
            className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg
           bg-gray-300 border-0"
          >
            <div className="rounded-t mb-0 px-6 py-6">
              <div className="text-center mb-3">
                <h6 className="text-gray-700 text-lg font-bold">Sign Up</h6>
              </div>
            </div>

            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <Formik
                initialValues={formData}
                validate={validateForm}
                onSubmit={handleSubmit}
              >
                {({
                  errors,
                  touched,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <form>
                    <div className="-mx-3 md:flex">
                      <div className="md:w-1/2 md:mb-0 w-full w-1/2 mb-3 mr-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="reg-firstName"
                        >
                          First Name
                        </label>
                        <input
                          id="reg-firstName"
                          type="text"
                          className="w-full rounded py-3 px-3 text-gray-700 bg-white shadow focus:outline-none
                           focus:shadow-outline text-sm ease-linear transition-all duration-150"
                          placeholder="First Name"
                          name="firstName"
                          value={firstName}
                          onChange={(e) => onChange(e)}
                          onBlur={handleBlur}
                        />
                        <p className="FormError">
                          {errors.firstName &&
                            touched.firstName &&
                            errors.firstName}
                        </p>
                      </div>
                      <div className="md:w-1/2 md:mb-0 w-full w-1/2 m3-6">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="reg-lastName"
                        >
                          Last Name
                        </label>
                        <input
                          id="reg-lastName"
                          type="text"
                          className="w-full rounded py-3 px-3 text-gray-700 bg-white shadow focus:outline-none
                           focus:shadow-outline text-sm ease-linear transition-all duration-150"
                          placeholder="Last Name"
                          name="lastName"
                          value={lastName}
                          onChange={(e) => onChange(e)}
                          onBlur={handleBlur}
                        />
                        <p className="FormError">
                          {errors.lastName &&
                            touched.lastName &&
                            errors.lastName}
                        </p>
                      </div>
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="reg-email"
                      >
                        Email
                      </label>
                      <input
                        id="reg-email"
                        type="email"
                        className="px-3 py-3 placeholder-gray-500 text-gray-700 bg-white rounded text-sm
                         shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={(e) => onEmailChange(e)}
                        onBlur={handleBlur}
                      />
                      <p className="FormError">
                        {errors.email && touched.email && errors.email}
                      </p>
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="reg-password"
                      >
                        Password
                        {formData.password.length > 0 && (
                          <div className="text-right inline-block ">
                            {' '}
                            :&nbsp;
                            <span
                              data-strength={strength}
                              className="text-passstregth font-bold "
                            >
                              {scoreTitles[strength]}
                            </span>
                          </div>
                        )}
                      </label>
                      <p
                        className="text-gray-600 mb-2"
                        style={{ fontSize: '11px' }}
                      >
                        To conform with our Strong Password policy, you are
                        required to use a sufficiently strong password. Password
                        must be more than 6 characters.
                      </p>
                      <div className={strengthClass}>
                        <div
                          className="strength-meter-fill"
                          data-strength={strength}
                        />
                      </div>
                      <input
                        id="reg-password"
                        type="password"
                        className="px-3 py-3 placeholder-gray-500 text-gray-700 mb-2 bg-white rounded
                        text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all
                         duration-150"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={(e) => onChange(e)}
                        onBlur={handleBlur}
                      />

                      <p className="FormError">
                        {errors.password && touched.password && errors.password}
                      </p>
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="reg-re-password"
                      >
                        Re-Type Password
                      </label>
                      <input
                        id="reg-re-password"
                        type="password"
                        className="px-3 py-3 placeholder-gray-500 text-gray-700 bg-white rounded text-sm shadow
                        focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                        placeholder="Re-Type Password"
                        name="repassword"
                        value={repassword}
                        onChange={(e) => onChange(e)}
                        onBlur={handleBlur}
                      />
                      <p className="FormError">
                        {errors.repassword &&
                          touched.repassword &&
                          errors.repassword}
                      </p>
                    </div>
                    <div>
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          id="customCheckLogin"
                          type="checkbox"
                          className="form-checkbox text-gray-800 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                          name="checkbox"
                          value={checked}
                          onChange={(e) => handleCheck(e)}
                          onBlur={handleBlur}
                        />
                        <span className="ml-2 text-sm font-semibold text-gray-700">
                          I agree with the &nbsp;
                          <Link
                            href="#pablo"
                            className="text-blue-500"
                            to="/privacypolicy"
                          >
                            Privacy Policy
                          </Link>
                        </span>
                      </label>
                      <p className="FormError">{errors.checkbox}</p>
                    </div>

                    <div className="text-center mt-6">
                      <button
                        className="bg-lightalpha hover:bg-alpha text-white active:bg-gray-700 text-sm
                        font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none
                        focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                      >
                        Create Account
                      </button>
                    </div>

                    <div className="text-center mt-6">
                      Already a Member ?
                      <a className="text-blue-500" href="login">
                        {' '}
                        Log In
                      </a>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
