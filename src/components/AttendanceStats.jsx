import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import PeopleIcon from '@mui/icons-material/People';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

// Mock data
const mockStudents = [
  {
    _id: '1',
    name: 'John Doe',
    rollNumber: '101',
    class: '10th',
    section: 'A',
    attendance: {
      present: 15,
      absent: 2,
      late: 3
    }
  },
  {
    _id: '2',
    name: 'Jane Smith',
    rollNumber: '102',
    class: '10th',
    section: 'A',
    attendance: {
      present: 18,
      absent: 1,
      late: 1
    }
  },
  {
    _id: '3',
    name: 'Mike Johnson',
    rollNumber: '103',
    class: '10th',
    section: 'A',
    attendance: {
      present: 16,
      absent: 3,
      late: 1
    }
  }
];

const COLORS = ['#4CAF50', '#F44336', '#FFC107'];

const AttendanceStats = () => {
  const [students] = useState(mockStudents);

  const totalAttendance = students.reduce((acc, student) => {
    acc.present += student.attendance.present;
    acc.absent += student.attendance.absent;
    acc.late += student.attendance.late;
    return acc;
  }, { present: 0, absent: 0, late: 0 });

  const totalDays = totalAttendance.present + totalAttendance.absent + totalAttendance.late;
  const attendanceRate = ((totalAttendance.present + totalAttendance.late) / totalDays) * 100;

  const barChartData = [
    { name: 'Present', value: totalAttendance.present },
    { name: 'Absent', value: totalAttendance.absent },
    { name: 'Late', value: totalAttendance.late }
  ];

  const pieChartData = [
    { name: 'Present', value: totalAttendance.present },
    { name: 'Absent', value: totalAttendance.absent },
    { name: 'Late', value: totalAttendance.late }
  ];

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Attendance Statistics
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Overview of class attendance
          </Typography>
        </Paper>

        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Card
              elevation={3}
              sx={{
                height: '100%',
                borderRadius: 2,
                bgcolor: 'primary.main',
                color: 'white',
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PeopleIcon sx={{ mr: 1 }} />
                  <Typography variant="h6">Total Students</Typography>
                </Box>
                <Typography variant="h4">{students.length}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card
              elevation={3}
              sx={{
                height: '100%',
                borderRadius: 2,
                bgcolor: 'success.main',
                color: 'white',
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CheckCircleIcon sx={{ mr: 1 }} />
                  <Typography variant="h6">Attendance Rate</Typography>
                </Box>
                <Typography variant="h4">{attendanceRate.toFixed(1)}%</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card
              elevation={3}
              sx={{
                height: '100%',
                borderRadius: 2,
                bgcolor: 'error.main',
                color: 'white',
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CancelIcon sx={{ mr: 1 }} />
                  <Typography variant="h6">Total Absences</Typography>
                </Box>
                <Typography variant="h4">{totalAttendance.absent}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card
              elevation={3}
              sx={{
                height: '100%',
                borderRadius: 2,
                bgcolor: 'warning.main',
                color: 'white',
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AccessTimeIcon sx={{ mr: 1 }} />
                  <Typography variant="h6">Total Late</Typography>
                </Box>
                <Typography variant="h4">{totalAttendance.late}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 2,
                height: '100%',
                minHeight: 400,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Attendance Distribution
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#1976d2" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 2,
                height: '100%',
                minHeight: 400,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Attendance Breakdown
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AttendanceStats; 