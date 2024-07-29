import React from 'react';
import NavbarGuard from '../components/NavbarGuard';
import CreateRegEntry from '../components/CreateRegEntry';
import '../styles/GuardiaInterface.css';

const HomeGuard = () => {
  return (
    <>
        <NavbarGuard />
        <div className='create-entry-box'>  
          <CreateRegEntry />
        </div>
    </>
  );
};

export default HomeGuard;
