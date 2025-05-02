import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Avatar,
  Container,
  Alert,
} from '@mui/material';
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Mock user credentials
    const users = {
      admin: { password: 'admin123', role: 'admin' },
      teacher: { password: 'teacher123', role: 'teacher' },
      principal: { password: 'principal123', role: 'principal' },
    };

    const user = users[username.toLowerCase()];

    if (user && user.password === password) {
      localStorage.setItem('token', 'mock-token');
      localStorage.setItem('role', user.role);
      navigate('/dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            bgcolor: 'background.paper',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color="primary">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleLogin} sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'primary.main',
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.light',
                  },
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'primary.main',
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.light',
                  },
                },
              }}
            />
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
            >
              Sign In
            </Button>
          </Box>
        </Paper>
        <Paper
          elevation={3}
          sx={{
            mt: 3,
            p: 2,
            width: '100%',
            bgcolor: 'background.paper',
          }}
        >
          <Typography variant="h6" color="primary" gutterBottom>
            Available Login Credentials:
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Typography variant="body1" color="text.primary">
              Admin: username: admin, password: admin123
            </Typography>
            <Typography variant="body1" color="text.primary">
              Teacher: username: teacher, password: teacher123
            </Typography>
            <Typography variant="body1" color="text.primary">
              Principal: username: principal, password: principal123
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login; 