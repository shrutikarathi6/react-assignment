import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import CourseExplorer from './pages/CourseExplorer';
import Admin from './pages/Admin';
// import CourseCreation from './pages/CourseCreation';
import { CourseProvider } from './context/CourseContext';

function App() {
  return (
    <CourseProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<CourseExplorer />} />
              <Route path="/admin" element={<Admin />} />
              {/* <Route path="/create" element={<CourseCreation />} /> */}
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CourseProvider>
  );
}

export default App;