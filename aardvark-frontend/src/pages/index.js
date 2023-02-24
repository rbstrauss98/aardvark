import React from 'react';
import fakeData from '../fakeData';
import BugComponent from '../components/HomepageBug/BugComponent';

const Home = (props) => {
  return (
    <div>
      <h1>Welcome to Aardvark</h1>
      <BugComponent searchQuery = {props.searchQuery}/>
    </div>
  );
};
  
export default Home;