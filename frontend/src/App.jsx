import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import Header from './components/Header';
import Home from './components/Home';
import Skills from './components/Skills';
import Projects from './components/Projects'; // The dynamic component
import Blogs from './components/Blogs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AddProjectPage from './pages/AddProjectPage';
import EditProjectPage from './pages/EditProjectPage';

const MainLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Home />
        <Skills />
        <Projects />
        <Blogs />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 50,
    });
  }, []);

  return (
    <Routes>
      {/* Route for the main portfolio page */}
      <Route path="/" element={<MainLayout />} />

      {/* Route for the admin login page */}
      <Route path="/login" element={<LoginPage />} />

      {/* We will add protected admin routes here later */}
      <Route path="/admin/dashboard" element={<DashboardPage />} />
      <Route path="/admin/add-project" element={<AddProjectPage />} />
      <Route path="/admin/edit-project/:id" element={<EditProjectPage />} />
    </Routes>
  );
}

export default App;