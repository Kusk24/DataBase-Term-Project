import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ProfileSelection } from './ProfileSelection';
import AdminDashboard from './AdminDashboard';
import { Login } from './Login';
import { CustomerRentPage } from './CustomerRentPage';
import { CustomerCurrentlyRent } from './CustomerCurrentlyRent';
import { CustomerHistory } from './CustomerHistory';
import { CustomerProfile } from './CustomerProfile';
import { CustomerDashboard } from './CustomerDashboard';

function App() {
    const [selectedProfile, setSelectedProfile] = useState("customer");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleProfileSelect = (profile) => {
        setSelectedProfile(profile);
    };

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

    const handleSignOut = () => {
        setSelectedProfile(null);
        setIsLoggedIn(false);
    };

    const Home = () => {
        const navigate = useNavigate();

        useEffect(() => {
            if (selectedProfile) {
                navigate(`/login`);
            }
        }, [selectedProfile, navigate]);

        return <ProfileSelection onProfileSelect={handleProfileSelect} />;
    };

    const ProtectedRoute = ({ children, profileName }) => {
        if (!isLoggedIn) {
            return <Navigate to={`/login`} />;
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
                    path="/login"
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

                {/* Customer Pages */}
                {/* Customer Dashboard with Nested Routes */}
                <Route
                    path="/customer/*"
                    element={
                        <ProtectedRoute profileName="Customer">
                            <CustomerDashboard
                                onSignOut={handleSignOut}
                                profile={selectedProfile}
                            />
                        </ProtectedRoute>
                    }
                >
                    <Route path="rentPage" element={<CustomerRentPage />} />
                    <Route path="currentlyRent" element={<CustomerCurrentlyRent />} />
                    <Route path="history" element={<CustomerHistory />} />
                    <Route
                        path="profile"
                        element={
                            <CustomerProfile
                                profile={selectedProfile}
                                onSignOut={handleSignOut}
                            />
                        }
                    />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
