import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BuggyService from './pages/BuggyService';
import TaskDesk from './pages/TaskDesk';
import CanteenService from './pages/CanteenService';
import MobilityService from './pages/MobilityService';
import AIBot from './pages/AIBot';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ai-bot" element={<AIBot />} />
              <Route path="/buggy" element={<BuggyService />} />
              <Route path="/task-desk" element={<TaskDesk />} />
              <Route path="/canteen" element={<CanteenService />} />
              <Route path="/mobility" element={<MobilityService />} />
            </Routes>
          </main>
          <Toaster position="top-right" />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;