import React from 'react';
import { Box, Typography, Paper, Grid, Button, Stack, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  People as PeopleIcon,
  School as SchoolIcon,
  BarChart as BarChartIcon,
  Add as AddIcon,
  Event as EventIcon,
} from '@mui/icons-material';

const Dashboard = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('role');

  const quickActions = [
    {
      title: 'Add Student',
      icon: <AddIcon />,
      path: '/students',
      roles: ['admin', 'teacher'],
    },
    {
      title: 'View Students',
      icon: <SchoolIcon />,
      path: '/students',
      roles: ['admin', 'teacher'],
    },
    {
      title: 'Manage Staff',
      icon: <PeopleIcon />,
      path: '/staff',
      roles: ['admin', 'principal'],
    },
    {
      title: 'View Statistics',
      icon: <BarChartIcon />,
      path: '/stats',
      roles: ['admin', 'teacher', 'principal'],
    },
  ];

  const filteredActions = quickActions.filter(action => action.roles.includes(userRole));

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom color="primary">
        Welcome to Dashboard
      </Typography>
      <Typography variant="subtitle1" gutterBottom color="text.secondary">
        Logged in as: {userRole}
      </Typography>
      
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Quick Stats Cards */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', bgcolor: 'background.paper' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PeopleIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" color="primary">
                  Total Students
                </Typography>
              </Box>
              <Typography variant="h4" color="text.primary">
                150
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', bgcolor: 'background.paper' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SchoolIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" color="primary">
                  Total Staff
                </Typography>
              </Box>
              <Typography variant="h4" color="text.primary">
                25
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', bgcolor: 'background.paper' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <EventIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" color="primary">
                  Today's Attendance
                </Typography>
              </Box>
              <Typography variant="h4" color="text.primary">
                92%
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, bgcolor: 'background.paper' }}>
            <Typography variant="h6" gutterBottom color="primary">
              Quick Actions
            </Typography>
            <Stack spacing={2}>
              {filteredActions.map((action) => (
                <Button
                  key={action.title}
                  variant="contained"
                  startIcon={action.icon}
                  onClick={() => navigate(action.path)}
                  fullWidth
                  sx={{
                    py: 1.5,
                    bgcolor: 'primary.main',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
                  }}
                >
                  {action.title}
                </Button>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 