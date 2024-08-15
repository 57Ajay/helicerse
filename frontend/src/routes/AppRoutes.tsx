import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrincipalPage from '../pages/PrincipalPage';
import TeacherPage from '../pages/TeacherPage';
import StudentPage from '../pages/StudentPage';

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/principal" element={<PrincipalPage />} />
                <Route path="/teacher" element={<TeacherPage />} />
                <Route path="/student" element={<StudentPage />} />
                <Route path="/" element={<PrincipalPage />} /> {/* Default route */}
            </Routes>
        </Router>
    );
};

export default AppRoutes;
