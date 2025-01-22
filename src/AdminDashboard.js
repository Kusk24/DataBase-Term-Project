import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Active' },
];

const mockGames = [
    { id: 1, title: 'Cyberpunk 2077', stock: 5, price: 14.99, status: 'Available' },
    { id: 2, title: 'Elden Ring', stock: 3, price: 15.99, status: 'Available' },
];

export const AdminDashboard = () => {
    const [currentSection, setCurrentSection] = useState('dashboard');
    const navigate = useNavigate(); // For navigation

    const renderAdminSection = () => {
        switch (currentSection) {
            case 'dashboard':
                return (
                    <div>
                        <h2>Admin Dashboard</h2>
                        <p>Manage your application efficiently.</p>
                    </div>
                );
            case 'users':
                return (
                    <div>
                        <h2>Users Management</h2>
                        <ul>
                            {mockUsers.map((user) => (
                                <li key={user.id}>
                                    {user.name} - {user.email} ({user.status})
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            case 'games':
                return (
                    <div>
                        <h2>Games Management</h2>
                        <ul>
                            {mockGames.map((game) => (
                                <li key={game.id}>
                                    {game.title} - ${game.price} ({game.stock} in stock)
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <nav>
                <button onClick={() => setCurrentSection('dashboard')}>Dashboard</button>
                <button onClick={() => setCurrentSection('users')}>Users</button>
                <button onClick={() => setCurrentSection('games')}>Games</button>
                <button onClick={() => navigate('/')}>Main Menu</button> {/* Main Menu Button */}
            </nav>
            <main>{renderAdminSection()}</main>
        </div>
    );
};
