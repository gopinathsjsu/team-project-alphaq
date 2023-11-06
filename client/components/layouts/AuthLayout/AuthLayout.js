import React from 'react';

import { Route, Routes } from 'react-router-dom';
import Particles from 'react-tsparticles';

import ForgotPasswordPage from '_components/pages/Auth/ForgotPassPage';
import LoginPage from '_components/pages/Auth/LoginPage';
import RegisterPage, {
  InterestPage,
} from '_components/pages/Auth/RegisterPage';

export default function Auth() {
  return (
    <React.Fragment>
      {/* <Navbar transparent /> */}
      <main>
        <section className="relative w-full h-full py-10 pb-6 min-h-screen">
          <div className="absolute top-0 w-full h-full bg-gradient-alpha bg-no-repeat bg-full">
            <div
              className="overflow-hidden"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
            >
              <Particles
                params={{
                  particles: {
                    number: {
                      value: 160,
                      density: { enable: true, value_area: 800 },
                    },
                    color: { value: '#ffffff' },
                    shape: {
                      type: 'circle',
                      stroke: { width: 0, color: '#000000' },
                      polygon: { nb_sides: 5 },
                      image: { src: 'img/github.svg', width: 100, height: 100 },
                    },
                    opacity: {
                      value: 1,
                      random: true,
                      anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0,
                        sync: false,
                      },
                    },
                    size: {
                      value: 3,
                      random: true,
                      anim: {
                        enable: false,
                        speed: 4,
                        size_min: 0.3,
                        sync: false,
                      },
                    },
                    line_linked: {
                      enable: false,
                      distance: 150,
                      color: '#ffffff',
                      opacity: 0.4,
                      width: 1,
                    },
                    move: {
                      enable: true,
                      speed: 1,
                      direction: 'none',
                      random: true,
                      straight: false,
                      out_mode: 'out',
                      bounce: false,
                      attract: { enable: false, rotateX: 600, rotateY: 600 },
                    },
                  },
                  interactivity: {
                    detect_on: 'canvas',
                    events: {
                      onhover: { enable: true, mode: 'bubble' },
                      onclick: { enable: true, mode: 'repulse' },
                      resize: true,
                    },
                    modes: {
                      grab: { distance: 400, line_linked: { opacity: 1 } },
                      bubble: {
                        distance: 250,
                        size: 0,
                        duration: 2,
                        opacity: 0,
                        speed: 3,
                      },
                      repulse: { distance: 400, duration: 0.4 },
                      push: { particles_nb: 4 },
                      remove: { particles_nb: 2 },
                    },
                  },
                  retina_detect: true,
                }}
              />
            </div>
          </div>
          {/* <Switch>
            <Route path="/auth/login" exact component={Login} />
            <Route path="/auth/register" exact component={Register} />
            <Route path="/auth/register/step2" exact component={Register2} />
            <Route path="/auth/register/step3" exact component={Register3} />
            <Route
              path="/auth/changepassword"
              exact
              component={ChangePassword}
            />
            <Route
              path="/auth/register/socialstep2"
              exact
              component={SocialRegister2}
            />
            <Route
              path="/auth/forgotpassword"
              exact
              component={ForgotPassword}
            />
            <Route path="/auth/setpassword/:id" exact component={SetPassword} />
            <Route path="/auth/verify/:id" exact component={VerifiedWindow} />
            <Redirect from="/auth" to="/auth/login" />
          </Switch> */}
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot" element={<ForgotPasswordPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/registerStep2" element={<InterestPage />} />
            {/* <Redirect from="/testing" to="/auth/login" /> */}
          </Routes>
        </section>
      </main>
    </React.Fragment>
  );
}
