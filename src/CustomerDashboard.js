import React, { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { AppBar, Tabs, Tab, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import HistoryIcon from '@mui/icons-material/History';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const CustomerDashboard = ({ onSignOut, profile }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const tabNames = ['rentPage', 'currentlyRent', 'history', 'profile'];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    navigate(`/customer/${tabNames[newValue]}`);
  };

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: '#1e1e1e', color: '#FFFFFF' }}>
      {/* Top Navigation Bar */}
      <AppBar 
        position="static" 
        sx={{
          bgcolor: '#2c2c2c',
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.7)',
          borderRadius: '20px', // Rounded corners
          margin: '20px auto',
          maxWidth: '800px',
          pt: 1,
          pb: 1,
          px: 2,
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          textColor="inherit"
          indicatorColor="secondary"
          centered
          sx={{
            bgcolor: '#3a3a3a',
            borderRadius: '15px', // Rounded corners for tabs
          }}
        >
          {[
            { label: "Rent Page", icon: <ShoppingCartIcon /> },
            { label: "Currently Rented", icon: <LibraryBooksIcon /> },
            { label: "History", icon: <HistoryIcon /> },
            { label: "Profile", icon: <AccountCircleIcon /> }
          ].map((tab, index) => (
            <Tab
              key={tab.label}
              label={tab.label}
              icon={tab.icon}
              iconPosition="start"
              sx={{
                textTransform: 'none',
                fontWeight: activeTab === index ? 'bold' : 'normal',
                color: activeTab === index ? '#FFFFFF' : '#CCCCCC', // Pure white for active, light gray for inactive
                background: activeTab === index ? 'rgba(29, 191, 115, 0.3)' : 'transparent', // Light green for active tab
                borderRadius: '12px', // Rounded corners for tabs
                transition: 'all 0.3s ease', // Smooth transitions
                '&:hover': {
                  background: 'rgba(29, 191, 115, 0.2)', // Hover effect
                  color: '#FFFFFF',
                },
              }}
            />
          ))}
        </Tabs>
      </AppBar>

      {/* Page Content Area */}
      <Box
        sx={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '20px',
          boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.6)',
          borderRadius: '20px', // Rounded corners for content area
          background: 'linear-gradient(145deg, #2b2b2b, #1e1e1e)',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
