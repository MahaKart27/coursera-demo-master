import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginComponent from './LoginComponent';
import WelcomePage from './WelcomePage';
import CoursesPage from './CoursesPage';
import AdminPage from './AdminPage';
import ErrorPage from './ErrorPage';
import ProtectedRoute from './ProtectedRoute'; // Import the ProtectedRoute component
import Paymentgateway from './Paymentgateway';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route 
                    path="/admin" 
                    element={
                        <ProtectedRoute>
                            <AdminPage />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/courses" 
                    element={
                        <ProtectedRoute>
                            <CoursesPage />
                        </ProtectedRoute>
                    } 
                />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/payment" element={<Paymentgateway/>}/>
      </Routes>
    </Router>
  );
}

export default App;
