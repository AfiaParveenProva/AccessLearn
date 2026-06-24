import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; 
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProgressPage from './pages/ProgressPage';
import CoursesPage from "./pages/coursepage";
import './index.css';
import Navbar from './components/HF/Navbar'; // Assuming this contains your profile button
import CursorHighlight from './components/CursorHighlight'; // Import CursorHighlight
import VerifyEmailPage from './pages/VerifyEmailPage';
import ProfilePage from './pages/ProfilePage';
import Forums from './pages/Forums';
import Support from './pages/Support';
import AccessibilityButton from './components/AccessibilityButton';
import AccessibilityPanel from './components/AccessibilityPanel';
import PreviewCourses from './pages/PreviewCourses';
import Books from './pages/Books';
import ReturnToTop from './components/ReturnToTop';
import CourseList from './pages/CourseList';
import BookSelection from './pages/BookSelection';
import Flashcards from './pages/Flashcards';
import QuizPage from "./pages/QuizPage";
import QuizList from "./pages/QuizList";




const NotFound = () => <h2>404 - Page Not Found</h2>;

function App() {
  
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  const toggleAccessibility = () => {
    setIsAccessibilityOpen(prev => !prev); // ✅ toggle function
  };

 
  return (
    <Router>
      <AuthProvider>
        <CursorHighlight /> 
        <Navbar /> 
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/profilePage" element={<ProfilePage />} />
          <Route path="/forums" element={<Forums />} />
          <Route path="/support" element={<Support />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/previewCourses" element={<PreviewCourses />} />
          <Route path="/Books" element={<Books />} />
          <Route path="/CourseList" element={<CourseList />} />
          <Route path="/course/:courseId" element={<CoursesPage />} />
          <Route path="/book-selection" element={<BookSelection />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/QuizList" element={<QuizList />} />
        </Routes>
 
 <AccessibilityButton onClick={toggleAccessibility} />


{isAccessibilityOpen && (
  <AccessibilityPanel onClose={() => setIsAccessibilityOpen(false)} />
)}
        
        <ReturnToTop />
      </AuthProvider>
    </Router>
  );
}

export default App;
