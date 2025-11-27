import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Admin from './pages/Admin';


function App() {
  return (
 
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
            
              <Route path="/admin" element={<Admin />} />
              
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
   
  );
}

export default App;