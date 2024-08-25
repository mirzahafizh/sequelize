import React from 'react';
import Contact from '../home/contact';
import Footer from '../home/footer';
import Hero from '../home/hero'; // Import the Hero component
import Navbar from '../home/navbar';
import OurTeam from '../home/ourTeam';
import Project from '../home/project';
import Skills from '../home/skills';

const Home = () => {
  return (
    <div className='font-mono'>
      <Hero /> {/* Render the Hero component */}
      <Navbar />
      <Skills />
      <OurTeam />
      <Project />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
