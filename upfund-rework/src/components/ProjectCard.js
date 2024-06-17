// src/components/ProjectCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './ProjectCard.css';

const ProjectCard = ({ project }) => {
  return (
    <div className="project__wrap">
      <Link to={`/projects/${project._id}`} className="project__link">
        <img src={project.imageUrl} alt={project.title} className="project__img" />
        <div className="project__text-wrap">
          <div className="project__tags-wrap">
            {project.tags && project.tags.split(',').map((tag, index) => (
              <div key={index} className="project__tags">
                <p>{tag.trim()}</p>
              </div>
            ))}
          </div>
          <h4 className="project__title">{project.title}</h4>
          <span className="project__subtitle">by {project.user.fullName}</span>
          <p className="project__desc">{project.description}</p>
          <div className="stats-wrap">
            <p>
              <span className="project__stats-big"> {project.moneyGoal}$ </span>
              <span className="project__stats-small"> funded </span>
            </p>
            <p>
              <span className="project__stats-big"> {project.timeGoal} </span>
              <span className="project__stats-small"> helped </span>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProjectCard;
