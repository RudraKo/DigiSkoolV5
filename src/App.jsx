import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import StaffDashboard from './components/StaffDashboard';
import StudentAttendance from './components/StudentAttendance';
import AttendanceStats from './components/AttendanceStats';
import Navigation from './components/Navigation';
import { Box } from '@mui/material';

// Create a comprehensive dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
      light: '#e3f2fd',
      dark: '#42a5f5',
    },
    secondary: {
      main: '#f48fb1',
      light: '#f8bbd0',
      dark: '#f06292',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#1e1e1e',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#1e1e1e',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
});

const PrivateRoute = ({ children, allowedRoles }) => {
  const isAuthenticated = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Box sx={{ 
          display: 'flex', 
          minHeight: '100vh',
          width: '100%',
          bgcolor: 'background.default',
          overflow: 'hidden'
        }}>
          <Navigation />
          <Box 
            component="main" 
            sx={{ 
              flexGrow: 1, 
              p: 3,
              height: '100vh',
              overflow: 'auto',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/staff"
                element={
                  <PrivateRoute allowedRoles={["admin", "principal"]}>
                    <StaffDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/students"
                element={
                  <PrivateRoute allowedRoles={["admin", "teacher"]}>
                    <StudentAttendance />
                  </PrivateRoute>
                }
              />
              <Route
                path="/stats"
                element={
                  <PrivateRoute allowedRoles={["admin", "teacher", "principal"]}>
                    <AttendanceStats />
                  </PrivateRoute>
                }
              />
              <Route path="/" element={<Navigate to="/dashboard" />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
