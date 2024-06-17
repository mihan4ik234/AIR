import React, { useState } from 'react';
import axios from '../axios.js';
import Choices from 'choices.js';
import 'choices.js/public/assets/styles/choices.min.css';
import './AddProject.css';



const AddProject = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    moneyGoal: 10000,
    timeGoal: '',
    genre: '',
    tags: '',
    imageUrl: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Получаем токен из локального хранилища
    const token = localStorage.getItem('authToken');

    // Если токен существует, передаем его в заголовках запроса
    const headers = token ? { 'Authorization': `Bearer ${token}` } : {};

    try {
      await axios.post('/projects', formData, { headers });
      // Здесь вы можете добавить обработку успешного создания проекта
    } catch (error) {
      console.error('Error creating project:', error.response.data)
      // Здесь вы можете обработать ошибку
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleimage = (e) => {
    setFormData({ ...formData, [e.target.imageUrl]: e.target.value });
  };

  const handleMoneyGoalChange = (e) => {
    setFormData({ ...formData, moneyGoal: parseInt(e.target.value, 10) });
  };

  const handleGenreChange = (e) => {
    setFormData({ ...formData, genre: e.target.value });
  };

  const handleEndDateChange = (e) => {
    setFormData({ ...formData, timeGoal: e.target.value });
  };

  React.useEffect(() => {
    const genreSelect = document.getElementById('projectGenre');
    const choices = new Choices(genreSelect, {
      searchEnabled: false,
      itemSelectText: '',
    });

    return () => {
      choices.destroy();
    };
  }, []);

  return (
    <div className="body--wbg">
      <div className="welcome container step">
        <h1 className="welcome__title">Let's</h1>
        <div className="function__line">
        <div className="function__wrap">
					<img className="function__img" src={`${process.env.PUBLIC_URL}/images/icons/icon_create.svg`} alt=""/>
					<div className="function__title">
						Create a project
					</div>
				</div>
				<div className="function__wrap">
					<img className="function__img" src={`${process.env.PUBLIC_URL}/images/icons/icon_community.svg`} alt=""/>
					<div className="function__title">
						Find a community
					</div>
				</div>
				<div className="function__wrap">
					<img className="function__img" src={`${process.env.PUBLIC_URL}/images/icons/icon_help.svg`} alt=""/>
					<div className="function__title">
						Get money and resourses
					</div>
				</div>
        </div>
        <button className="button button--welcome">Go</button>
      </div>
      <div className="welcome gameinfo container step">
        <h1 className="welcome__title">Tell us about your project</h1>
        <input
          className="input input--project__name"
          type="text"
          placeholder="Project name"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <input
          className="input input--project__name"
          type="text"
          placeholder="Ссылка на картинку"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
        />
        <textarea
          className="textarea textarea--project__desc"
          rows="5"
          required
          placeholder="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <h2 className="other__desc">Money and time goal, genre</h2>
        <div className="gameinfo__line-wrap">
          <div className="range-input">
            <input
              type="range"
              id="rangeInput"
              min="1000"
              max="100000"
              value={formData.moneyGoal}
              step="1000"
              onChange={handleMoneyGoalChange}
            />
            <input
              type="number"
              id="numberInput"
              min="1000"
              max="100000"
              value={formData.moneyGoal}
              step="1000"
              onChange={handleMoneyGoalChange}
            />
          </div>
          <select
            id="projectGenre"
            className="js-choice choices"
            value={formData.genre}
            onChange={handleGenreChange}
          >
            <option value="">Выберите жанр</option>
            <option value="action">Экшен</option>
            <option value="adventure">Приключения</option>
            <option value="rpg">РПГ</option>
          </select>
          <input
            className="time__goal"
            type="date"
            id="projectEndDate"
            required
            value={formData.timeGoal}
            onChange={handleEndDateChange}
          />
        </div>
        <button className="button button--welcome" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddProject;
