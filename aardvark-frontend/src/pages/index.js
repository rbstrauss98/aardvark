import React from 'react';
import fakeData from '../fakeData';
import BugComponent from '../components/HomepageBug/BugComponent';

const Home = () => {
  return (
    <div>
      <h1>Welcome to Aardvark</h1>
      <BugComponent/>
    </div>
  );
};
  
export default Home;