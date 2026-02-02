import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Resume from './pages/Resume';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Marketplace from './pages/Marketplace';
import DevNews from './pages/DevNews';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminProfile from './pages/AdminProfile';
import AdminAbout from './pages/AdminAbout';
import AdminProjects from './pages/AdminProjects';
import AdminSkills from './pages/AdminSkills';
import AdminResume from './pages/AdminResume';
import AdminOrders from './pages/AdminOrders';
import AdminProducts from './pages/AdminProducts';
import AdminFeedback from './pages/AdminFeedback';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/devnews" element={<DevNews />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/profile"
              element={
                <ProtectedRoute>
                  <AdminProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/about"
              element={
                <ProtectedRoute>
                  <AdminAbout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/projects"
              element={
                <ProtectedRoute>
                  <AdminProjects />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/skills"
              element={
                <ProtectedRoute>
                  <AdminSkills />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/resume"
              element={
                <ProtectedRoute>
                  <AdminResume />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <ProtectedRoute>
                  <AdminOrders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <ProtectedRoute>
                  <AdminProducts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/feedback"
              element={
                <ProtectedRoute>
                  <AdminFeedback />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
          <Chatbot />
          <ToastContainer position="bottom-right" theme="dark" autoClose={3000} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
