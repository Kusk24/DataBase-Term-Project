import React, { useState } from 'react';
import './mainPage.css';

const profiles = [
    { id: 1, name: 'Customer', description: 'This is customer role' },
    { id: 2, name: 'Staff', description: 'This is staff role' },
    { id: 3, name: 'Admin', description: 'This is admin role' },
];

const ProfileCard = ({ profile, onSelect }) => (
    <div className="profile-card">
        <h2>{profile.name}</h2>
        <p>{profile.description}</p>
        <button onClick={() => onSelect(profile)}>Choose</button>
    </div>
);

export const ProfileSelection = ({ onProfileSelect }) => (
    <div className="main-page">
        <h1>Select a Role</h1>
        <div className="profiles-container">
            {profiles.map((profile) => (
                <ProfileCard key={profile.id} profile={profile} onSelect={onProfileSelect} />
            ))}
        </div>
    </div>
);