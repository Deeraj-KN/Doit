import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { Logo } from '../components';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import React from 'react';
import  './Landing.css'


const Landing = () => {
  const { user } = useAppContext();
  return (
    <React.Fragment>-+*
      {user && <Navigate to='/' />}
      <Wrapper>
        <nav>
          <Logo />
        </nav>
        <div className='main'>
        <div className='container page'>
          {/* info */}
          <div className='info'>
            <h1>
              Do-<span>It</span> app
            </h1>
            <p>
            Keep all your tasks in one place, making it easy to prioritize and organize them ,By breaking down tasks into smaller, more manageable pieces, a Do-It app help you better manage your time to avoid procrastination.
            </p>
            <Link to='/register' className='btn btn-hero'>
              Login/Register
            </Link>
          </div>
          <img src={main} alt='task hunt' className='img main-img' />
         
        </div>
        <p className='btn bt'>Email me:<a  href="mailto:deeraj0201@gmail.com">deeraj0201@gmail.com</a></p>
        </div>
      </Wrapper>
    </React.Fragment>
  );
};

export default Landing;
