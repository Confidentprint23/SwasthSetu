import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import PatientDashboard from './components/Patient/Dashboard';
import DoctorList from './components/Patient/DoctorList';
import BookConsultation from './components/Patient/BookConsultation';
import ConsultationHistory from './components/Patient/ConsultationHistory';
import HealthRecords from './components/Patient/HealthRecords';
import SymptomChecker from './components/SymptomChecker/SymptomForm';
import PharmacyLocator from './components/Pharmacy/PharmacyLocator';
import DoctorDashboard from './components/Doctor/DoctorDashboard';
import Profile from './pages/Profile';
import About from './pages/About';
import Contact from './pages/Contact';
import ForgotPassword from './pages/ForgotPassword';
import NotFound from './pages/NotFound';
import useAuth from './hooks/useAuth';
import './styles/global.css';

function DashboardRouter() {
  const { user } = useAuth();
  if (user?.role === 'doctor') return <DoctorDashboard />;
  return <PatientDashboard />;
}

function AppContent() {
  return (
    <Router>
      <Navbar />
      <main style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardRouter />
              </ProtectedRoute>
            }
          />

          <Route path="/doctors" element={<DoctorList />} />

          <Route
            path="/book-consultation/:doctorId"
            element={
              <ProtectedRoute>
                <BookConsultation />
              </ProtectedRoute>
            }
          />

          <Route
            path="/consultations"
            element={
              <ProtectedRoute>
                <ConsultationHistory />
              </ProtectedRoute>
            }
          />

          <Route
            path="/health-records"
            element={
              <ProtectedRoute>
                <HealthRecords />
              </ProtectedRoute>
            }
          />

          <Route path="/symptom-checker" element={<SymptomChecker />} />
          <Route path="/pharmacies" element={<PharmacyLocator />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;