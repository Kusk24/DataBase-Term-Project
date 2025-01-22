import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProfileSelection } from './ProfileSelection';
import { AdminDashboard } from './AdminDashboard';
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

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        selectedProfile ? (
                            <Navigate to={`/${selectedProfile.name.toLowerCase()}/login`} />
                        ) : (
                            <ProfileSelection onProfileSelect={handleProfileSelect} />
                        )
                    }
                />
                <Route
                    path="/admin/login"
                    element={
                        selectedProfile?.name === 'Admin' ? (
                            <Login
                                profile={selectedProfile}
                                onLoginSuccess={handleLoginSuccess}
                            />
                        ) : (
                            <Navigate to="/" />
                        )
                    }
                />
                <Route
                    path="/customer/login"
                    element={
                        selectedProfile?.name === 'Customer' ? (
                            <Login
                                profile={selectedProfile}
                                onLoginSuccess={handleLoginSuccess}
                            />
                        ) : (
                            <Navigate to="/" />
                        )
                    }
                />
                <Route
                    path="/staff/login"
                    element={
                        selectedProfile?.name === 'Staff' ? (
                            <Login
                                profile={selectedProfile}
                                onLoginSuccess={handleLoginSuccess}
                            />
                        ) : (
                            <Navigate to="/" />
                        )
                    }
                />
                <Route
                    path="/admin/dashboard"
                    element={
                        isLoggedIn && selectedProfile?.name === 'Admin' ? (
                            <AdminDashboard />
                        ) : (
                            <Navigate to="/" />
                        )
                    }
                />
                {/* Add additional role-specific routes if needed */}
            </Routes>
        </Router>
    );
}

export default App;
