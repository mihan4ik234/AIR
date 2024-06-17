import React, { useState, useEffect } from 'react';
import axios from '../axios.js';
import { Link } from 'react-router-dom';
import '../App.css';
import './Home.css';
import ProjectCard from '../components/ProjectCard';

function Home() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/');
        setProjects(response.data);
      } catch (error) {
        console.error('Ошибка при получении проектов:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className='main'>
      <div className="banner container">
        <div className="banner__textblock">
          <h1 className="banner__title">
            Help not only with money
          </h1>
          <Link to="/addproject">
            <button id="" className="button button--banner" type="text">
              <span>Browse projects</span>
            </button>
          </Link>
        </div>
      </div>
      <div className="whitebgcontainer">
          <div className="ticker-wrap">
            <div className="ticker">
              <span>182374234$ FUNDED 7065443 USERS 3218 PROJECTS</span>
            </div>
        </div>
        <div className="project__line container">
          {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </div>
  </div>
  );
}

export default Home;
