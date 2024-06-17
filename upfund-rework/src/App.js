import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import AddProject from './pages/AddProject';
import ProjectPage from './components/ProjectPage'; // Импортируем новый компонент
import Header from './components/Header';
import UserProfile from './pages/UserProfile';
import { AuthProvider } from './components/AuthContext';

function App() {
  const [showHeader, setShowHeader] = useState(true);
  const [projects, setProjects] = useState([]); // Добавляем состояние для хранения проектов

  return (
    <Router>
      <AuthProvider>
        <Header showHeader={showHeader} setShowHeader={setShowHeader} />
        <Routes>
          <Route path="/" element={<Home projects={projects} />} />
          <Route path="/auth" element={<Auth setShowHeader={setShowHeader} />} />
          <Route path="/addproject" element={<AddProject setProjects={setProjects} />} />
          <Route path="/projects/:projectId" element={<ProjectPage projects={projects} />} />
          <Route path="/user" element={<UserProfile />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;