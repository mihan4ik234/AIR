import React, { useState, useEffect } from 'react';
import axios from '../axios.js';
import { useParams } from 'react-router-dom';

const ProjectPage = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`/projects/${projectId}`);
        setProject(response.data);
      } catch (error) {
        console.error('Ошибка при получении проекта:', error);
      }
    };

    fetchProject();
  }, [projectId]);

  if (!project) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="project-page">
      <div className="project-pageheader">
        <img src={project.imageUrl} alt={project.title} className="project-pageimage" />
        <div className="project-pagetags">
          {project.tags && project.tags.split(',').map((tag, index) => (
            <span key={index} className="project-pagetag">{tag.trim()}</span>
          ))}
        </div>
      </div>
      <div className="project-pagecontent">
        <h1 className="project-pagetitle">{project.title}</h1>
        <p className="project-pagesubtitle">by {project.user.fullName}</p>
        <p className="project-pagedescription">{project.description}</p>
        <div className="project-pagestats">
          <p>
            <span className="project-pagestats-big">{project.moneyGoal}$</span>
            <span className="project-pagestats-small">funded</span>
          </p>
          <p>
            <span className="project-pagestats-big">{project.timeGoal}</span>
            <span className="project-page__stats-small">helped</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;