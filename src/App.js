import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ProfileSelection } from './ProfileSelection';
import AdminDashboard from './AdminDashboard';
import { Login } from './Login';

function App() {
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleProfileSelect = (profile) => {
        setSelectedProfile(profile);
    };

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

    const Home = () => {
        const navigate = useNavigate();

        useEffect(() => {
            if (selectedProfile) {
                navigate(`/${selectedProfile.name.toLowerCase()}/login`);
            }
        }, [selectedProfile, navigate]);

        return (
            <ProfileSelection onProfileSelect={handleProfileSelect} />
        );
    };

    const ProtectedRoute = ({ children, profileName }) => {
        if (!selectedProfile || selectedProfile.name !== profileName) {
            return <Navigate to="/" />;
        }
        if (!isLoggedIn) {
            return <Navigate to={`/${profileName.toLowerCase()}/login`} />;
        }
        return children;
    };

    return (
        <Router>
            <Routes>
                {/* Home Route */}
                <Route path="/" element={<Home />} />

                {/* Login Route */}
                <Route
                    path="/:profile/login"
                    element={
                        selectedProfile ? (
                            <Login
                                profile={selectedProfile}
                                onLoginSuccess={handleLoginSuccess}
                            />
                        ) : (
                            <Navigate to="/" />
                        )
                    }
                />

                {/* Admin Dashboard Routes */}
                <Route
                    path="/admin/*"
                    element={
                        <ProtectedRoute profileName="Admin">
                            <Routes>
                                <Route path="dashboard" element={<AdminDashboard />} />
                            </Routes>
                        </ProtectedRoute>
                    }
                />

                {/* Add additional roles and dashboards here */}
            </Routes>
        </Router>
    );
}

export default App;
