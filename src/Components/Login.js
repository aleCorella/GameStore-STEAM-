import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { auth, fs } from '../Config/Config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../LoginStyle.css';

export const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        await auth.signInWithEmailAndPassword(email, password);
        toast.success('Successfully Logged In. Redirecting to the home page...');
        setEmail('');
        setPassword('');
        history.push('/');
      } else {
        const credentials = await auth.createUserWithEmailAndPassword(email, password);
        await fs.collection('users').doc(credentials.user.uid).set({
          FullName: fullName,
          Email: email,
          Password: password,
        });

        toast.success('Successfully signed up. Redirecting to the login page...');
        setFullName('');
        setEmail('');
        setPassword('');
        history.push('/login');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="row">
      <div className="col-md-6 mx-auto p-0">
        <div className="card">
          <div className="login-box">
            <div className="login-snip">
              <input
                id="tab-1"
                type="radio"
                name="tab"
                className="sign-in"
                checked={isLogin}
                onChange={() => setIsLogin(true)}
              />
              <label htmlFor="tab-1" className="tab">
                Login
              </label>
              <input
                id="tab-2"
                type="radio"
                name="tab"
                className="sign-up"
                checked={!isLogin}
                onChange={() => setIsLogin(false)}
              />
              <label htmlFor="tab-2" className="tab">
                Sign Up
              </label>
              <div className="login-space">
                <form
                  className="login-form"
                  autoComplete="off"
                  onSubmit={handleFormSubmit}
                >
                  <div className="group">
                    <label htmlFor="email" className="label">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="text"
                      className="input"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="password" className="label">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      className="input"
                      data-type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  {!isLogin && (
                    <>
                      <div className="group">
                        <label htmlFor="fullName" className="label">
                          Full Name
                        </label>
                        <input
                          id="fullName"
                          type="text"
                          className="input"
                          placeholder="Enter your full name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                        />
                      </div>
                      <div className="group">
                        <label htmlFor="repeatPassword" className="label">
                          Repeat Password
                        </label>
                        <input
                          id="repeatPassword"
                          type="password"
                          className="input"
                          data-type="password"
                          placeholder="Repeat your password"
                        />
                      </div>
                    </>
                  )}
                  <div className="group">
                    <input
                      type="submit"
                      className="button"
                      value={isLogin ? 'Sign In' : 'Sign Up'}
                    />
                  </div>
                  <div className="hr"></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
