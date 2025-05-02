import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Select,
  MenuItem,
  FormControl,
  Alert,
  Snackbar,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Pagination,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

// Function to generate random staff data
const generateStaff = () => {
  const staff = [];
  const firstNames = ['John', 'Jane', 'Michael', 'Emily', 'David', 'Sarah', 'James', 'Emma', 'Robert', 'Olivia'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
  const departments = ['Administration', 'Teaching', 'Library', 'Maintenance', 'Security'];
  const designations = ['Principal', 'Teacher', 'Librarian', 'Maintenance Staff', 'Security Guard'];

  for (let i = 1; i <= 50; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const department = departments[Math.floor(Math.random() * departments.length)];
    const designation = designations[Math.floor(Math.random() * designations.length)];
    
    const attendance = Array(50).fill(null).map(() => {
      const random = Math.random();
      if (random < 0.9) return 'present'; // 90% chance of present
      if (random < 0.95) return 'late';   // 5% chance of late
      return 'absent';                    // 5% chance of absent
    });

    staff.push({
      _id: `staff_${i}`,
      name: `${firstName} ${lastName}`,
      employeeId: `E${1000 + i}`,
      department,
      designation,
      attendance
    });
  }
  return staff;
};

const StaffDashboard = () => {
  const [staff, setStaff] = useState([]);
  const [filteredStaff, setFilteredStaff] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: '',
    employeeId: '',
    department: '',
    designation: ''
  });
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(0);

  useEffect(() => {
    const generatedStaff = generateStaff();
    setStaff(generatedStaff);
    setFilteredStaff(generatedStaff);
  }, []);

  useEffect(() => {
    const filtered = staff.filter(member =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.employeeId.includes(searchTerm) ||
      member.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.designation.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStaff(filtered);
    setPage(1);
  }, [searchTerm, staff]);

  const handleStatusChange = (staffId, status) => {
    const updatedStaff = [...staff];
    const staffIndex = updatedStaff.findIndex(s => s._id === staffId);
    
    if (staffIndex !== -1) {
      const newAttendance = [...updatedStaff[staffIndex].attendance];
      newAttendance[selectedDate] = status;
      updatedStaff[staffIndex] = {
        ...updatedStaff[staffIndex],
        attendance: newAttendance
      };
      setStaff(updatedStaff);
    }
  };

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setNewStaff({
      name: '',
      employeeId: '',
      department: '',
      designation: ''
    });
  };

  const handleAddStaff = () => {
    if (newStaff.name && newStaff.employeeId && newStaff.department && newStaff.designation) {
      const newId = `staff_${staff.length + 1}`;
      const staffToAdd = {
        _id: newId,
        ...newStaff,
        attendance: Array(50).fill('present')
      };

      setStaff([...staff, staffToAdd]);
      handleCloseAddDialog();
      setSnackbar({
        open: true,
        message: `Staff member ${newStaff.name} added successfully`
      });
    }
  };

  const handleDeleteStaff = (staffId) => {
    const member = staff.find(s => s._id === staffId);
    if (window.confirm(`Are you sure you want to delete ${member.name}?`)) {
      setStaff(staff.filter(s => s._id !== staffId));
      setSnackbar({
        open: true,
        message: `Staff member ${member.name} deleted successfully`
      });
    }
  };

  const paginatedStaff = filteredStaff.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box>
              <Typography variant="h4" component="h1" gutterBottom>
                Staff Dashboard
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Manage Staff Attendance
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleOpenAddDialog}
              sx={{
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 3,
                },
                transition: 'all 0.2s',
              }}
            >
              Add Staff
            </Button>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Select Day</InputLabel>
              <Select
                value={selectedDate}
                onChange={(e) => setSelectedDate(parseInt(e.target.value))}
                label="Select Day"
              >
                {Array.from({ length: 50 }, (_, i) => (
                  <MenuItem key={i} value={i}>
                    Day {i + 1}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <OutlinedInput
                placeholder="Search staff..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
        </Paper>

        <TableContainer
          component={Paper}
          elevation={3}
          sx={{ borderRadius: 2 }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'primary.main' }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  Name
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  Employee ID
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  Department
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  Designation
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  Day {selectedDate + 1} Status
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedStaff.map((member) => (
                <TableRow
                  key={member._id}
                  sx={{
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                >
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.employeeId}</TableCell>
                  <TableCell>{member.department}</TableCell>
                  <TableCell>{member.designation}</TableCell>
                  <TableCell>
                    <FormControl fullWidth>
                      <Select
                        value={member.attendance[selectedDate] || ''}
                        onChange={(e) => handleStatusChange(member._id, e.target.value)}
                        displayEmpty
                        sx={{
                          '& .MuiSelect-select': {
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                          },
                        }}
                      >
                        <MenuItem value="present">
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CheckCircleIcon color="success" />
                            Present
                          </Box>
                        </MenuItem>
                        <MenuItem value="absent">
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CancelIcon color="error" />
                            Absent
                          </Box>
                        </MenuItem>
                        <MenuItem value="late">
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <AccessTimeIcon color="warning" />
                            Late
                          </Box>
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Delete">
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteStaff(member._id)}
                        sx={{
                          '&:hover': {
                            transform: 'scale(1.1)',
                          },
                          transition: 'all 0.2s',
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination
            count={Math.ceil(filteredStaff.length / rowsPerPage)}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
          />
        </Box>

        <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
          <DialogTitle>Add New Staff Member</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
              <TextField
                label="Name"
                value={newStaff.name}
                onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                fullWidth
                required
              />
              <TextField
                label="Employee ID"
                value={newStaff.employeeId}
                onChange={(e) => setNewStaff({ ...newStaff, employeeId: e.target.value })}
                fullWidth
                required
              />
              <TextField
                label="Department"
                value={newStaff.department}
                onChange={(e) => setNewStaff({ ...newStaff, department: e.target.value })}
                fullWidth
                required
              />
              <TextField
                label="Designation"
                value={newStaff.designation}
                onChange={(e) => setNewStaff({ ...newStaff, designation: e.target.value })}
                fullWidth
                required
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddDialog}>Cancel</Button>
            <Button
              onClick={handleAddStaff}
              variant="contained"
              color="primary"
              disabled={!newStaff.name || !newStaff.employeeId || !newStaff.department || !newStaff.designation}
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity="success"
            variant="filled"
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default StaffDashboard; 