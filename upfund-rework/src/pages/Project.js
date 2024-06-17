// src/pages/Project.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Project = () => {
  const { _id } = useParams();
  const [project, setProject] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projects/${_id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch project');
        }
        const data = await response.json();
        setProject(data);
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    };
    fetchProject();
  }, [_id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    // Simulated comment submission
    setComments([...comments, comment]);
    setComment('');
  };

  if (!project) return <p>Loading...</p>;

  return (
    <div className="project-detail__wrap">
      <img src={project.imageUrl} alt={project.title} className="project-detail__img" />
      <h1 className="project-detail__title">{project.title}</h1>
      <p className="project-detail__desc">{project.description}</p>
      <div className="project-detail__comments">
        <h3>Comments</h3>
        <ul>
          {comments.map((cmt, index) => (
            <li key={index}>{cmt}</li>
          ))}
        </ul>
        <form onSubmit={handleCommentSubmit}>
          <input 
            type="text" 
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Leave a comment" 
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Project;
