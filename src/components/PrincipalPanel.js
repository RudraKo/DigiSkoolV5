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
  Tabs,
  Tab,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';

// Constants for data generation
const FIRST_NAMES = ['John', 'Jane', 'Michael', 'Emily', 'David', 'Sarah', 'James', 'Emma', 'Robert', 'Olivia'];
const LAST_NAMES = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
const DEPARTMENTS = ['Administration', 'Accounts', 'Library', 'Maintenance', 'Security'];
const DESIGNATIONS = ['Clerk', 'Accountant', 'Librarian', 'Maintenance Staff', 'Security Guard'];
const SUBJECTS = ['Mathematics', 'Science', 'English', 'History', 'Geography', 'Computer Science', 'Physical Education'];
const CLASSES = ['9th', '10th', '11th', '12th'];
const ATTENDANCE_STATUS = {
  PRESENT: 'present',
  ABSENT: 'absent',
  LATE: 'late'
};

// Function to generate random staff data
const generateStaff = () => {
  const staff = [];
  for (let i = 1; i <= 20; i++) {
    const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
    const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
    const department = DEPARTMENTS[Math.floor(Math.random() * DEPARTMENTS.length)];
    const designation = DESIGNATIONS[Math.floor(Math.random() * DESIGNATIONS.length)];
    
    const attendance = Array(50).fill(null).map(() => {
      const random = Math.random();
      if (random < 0.9) return ATTENDANCE_STATUS.PRESENT;
      if (random < 0.95) return ATTENDANCE_STATUS.LATE;
      return ATTENDANCE_STATUS.ABSENT;
    });

    staff.push({
      _id: `staff_${i}`,
      name: `${firstName} ${lastName}`,
      employeeId: `S${1000 + i}`,
      department,
      designation,
      attendance
    });
  }
  return staff;
};

// Function to generate random teacher data
const generateTeachers = () => {
  const teachers = [];
  for (let i = 1; i <= 30; i++) {
    const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
    const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
    const subject = SUBJECTS[Math.floor(Math.random() * SUBJECTS.length)];
    const assignedClass = CLASSES[Math.floor(Math.random() * CLASSES.length)];
    
    const attendance = Array(50).fill(null).map(() => {
      const random = Math.random();
      if (random < 0.95) return ATTENDANCE_STATUS.PRESENT;
      if (random < 0.98) return ATTENDANCE_STATUS.LATE;
      return ATTENDANCE_STATUS.ABSENT;
    });

    teachers.push({
      _id: `teacher_${i}`,
      name: `${firstName} ${lastName}`,
      employeeId: `T${1000 + i}`,
      subject,
      assignedClass,
      attendance
    });
  }
  return teachers;
};

const PrincipalPanel = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [staff, setStaff] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    employeeId: '',
    ...(activeTab === 0 ? { department: '', designation: '' } : { subject: '', assignedClass: '' })
  });
  const [formErrors, setFormErrors] = useState({});
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(0);

  useEffect(() => {
    const generatedStaff = generateStaff();
    const generatedTeachers = generateTeachers();
    setStaff(generatedStaff);
    setTeachers(generatedTeachers);
    setFilteredData(generatedStaff);
  }, []);

  useEffect(() => {
    const data = activeTab === 0 ? staff : teachers;
    const filtered = data.filter(member =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.employeeId.includes(searchTerm) ||
      (activeTab === 0 ? member.department.includes(searchTerm) : member.subject.includes(searchTerm))
    );
    setFilteredData(filtered);
    setPage(1);
  }, [searchTerm, staff, teachers, activeTab]);

  const validateForm = () => {
    const errors = {};
    if (!newMember.name.trim()) errors.name = 'Name is required';
    if (!newMember.employeeId.trim()) errors.employeeId = 'Employee ID is required';
    
    if (activeTab === 0) {
      if (!newMember.department.trim()) errors.department = 'Department is required';
      if (!newMember.designation.trim()) errors.designation = 'Designation is required';
    } else {
      if (!newMember.subject.trim()) errors.subject = 'Subject is required';
      if (!newMember.assignedClass.trim()) errors.assignedClass = 'Assigned Class is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setFilteredData(newValue === 0 ? staff : teachers);
    setPage(1);
  };

  const handleStatusChange = (memberId, status) => {
    const updatedData = activeTab === 0 ? [...staff] : [...teachers];
    const memberIndex = updatedData.findIndex(m => m._id === memberId);
    
    if (memberIndex !== -1) {
      const newAttendance = [...updatedData[memberIndex].attendance];
      newAttendance[selectedDate] = status;
      updatedData[memberIndex] = {
        ...updatedData[memberIndex],
        attendance: newAttendance
      };

      if (activeTab === 0) {
        setStaff(updatedData);
      } else {
        setTeachers(updatedData);
      }
    }
  };

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
    setFormErrors({});
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setNewMember({
      name: '',
      employeeId: '',
      ...(activeTab === 0 ? { department: '', designation: '' } : { subject: '', assignedClass: '' })
    });
    setFormErrors({});
  };

  const handleAddMember = () => {
    if (!validateForm()) return;

    const newId = activeTab === 0 ? `staff_${staff.length + 1}` : `teacher_${teachers.length + 1}`;
    const memberToAdd = {
      _id: newId,
      ...newMember,
      attendance: Array(50).fill(ATTENDANCE_STATUS.PRESENT)
    };

    if (activeTab === 0) {
      setStaff([...staff, memberToAdd]);
    } else {
      setTeachers([...teachers, memberToAdd]);
    }

    handleCloseAddDialog();
    setSnackbar({
      open: true,
      message: `${activeTab === 0 ? 'Staff' : 'Teacher'} ${newMember.name} added successfully`,
      severity: 'success'
    });
  };

  const handleDeleteMember = (memberId) => {
    const member = (activeTab === 0 ? staff : teachers).find(m => m._id === memberId);
    if (window.confirm(`Are you sure you want to delete ${member.name}?`)) {
      if (activeTab === 0) {
        setStaff(staff.filter(s => s._id !== memberId));
      } else {
        setTeachers(teachers.filter(t => t._id !== memberId));
      }
      setSnackbar({
        open: true,
        message: `${activeTab === 0 ? 'Staff' : 'Teacher'} ${member.name} deleted successfully`,
        severity: 'success'
      });
    }
  };

  const paginatedData = filteredData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 2,
            bgcolor: 'white',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box>
              <Typography variant="h4" component="h1" gutterBottom>
                Principal Panel
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Manage {activeTab === 0 ? 'Staff' : 'Teacher'} Attendance
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
              Add {activeTab === 0 ? 'Staff' : 'Teacher'}
            </Button>
          </Box>

          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs value={activeTab} onChange={handleTabChange}>
              <Tab icon={<PersonIcon />} label="Staff" />
              <Tab icon={<SchoolIcon />} label="Teachers" />
            </Tabs>
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
                placeholder={`Search ${activeTab === 0 ? 'staff' : 'teachers'}...`}
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
                {activeTab === 0 ? (
                  <>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                      Department
                    </TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                      Designation
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                      Subject
                    </TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                      Assigned Class
                    </TableCell>
                  </>
                )}
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  Day {selectedDate + 1} Status
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((member) => (
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
                  {activeTab === 0 ? (
                    <>
                      <TableCell>{member.department}</TableCell>
                      <TableCell>{member.designation}</TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>{member.subject}</TableCell>
                      <TableCell>{member.assignedClass}</TableCell>
                    </>
                  )}
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
                        <MenuItem value={ATTENDANCE_STATUS.PRESENT}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CheckCircleIcon color="success" />
                            Present
                          </Box>
                        </MenuItem>
                        <MenuItem value={ATTENDANCE_STATUS.ABSENT}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CancelIcon color="error" />
                            Absent
                          </Box>
                        </MenuItem>
                        <MenuItem value={ATTENDANCE_STATUS.LATE}>
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
                        onClick={() => handleDeleteMember(member._id)}
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
            count={Math.ceil(filteredData.length / rowsPerPage)}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
          />
        </Box>

        <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
          <DialogTitle>Add New {activeTab === 0 ? 'Staff' : 'Teacher'}</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
              <TextField
                label="Name"
                value={newMember.name}
                onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                error={!!formErrors.name}
                helperText={formErrors.name}
                fullWidth
                required
              />
              <TextField
                label="Employee ID"
                value={newMember.employeeId}
                onChange={(e) => setNewMember({ ...newMember, employeeId: e.target.value })}
                error={!!formErrors.employeeId}
                helperText={formErrors.employeeId}
                fullWidth
                required
              />
              {activeTab === 0 ? (
                <>
                  <TextField
                    label="Department"
                    value={newMember.department}
                    onChange={(e) => setNewMember({ ...newMember, department: e.target.value })}
                    error={!!formErrors.department}
                    helperText={formErrors.department}
                    fullWidth
                    required
                  />
                  <TextField
                    label="Designation"
                    value={newMember.designation}
                    onChange={(e) => setNewMember({ ...newMember, designation: e.target.value })}
                    error={!!formErrors.designation}
                    helperText={formErrors.designation}
                    fullWidth
                    required
                  />
                </>
              ) : (
                <>
                  <TextField
                    label="Subject"
                    value={newMember.subject}
                    onChange={(e) => setNewMember({ ...newMember, subject: e.target.value })}
                    error={!!formErrors.subject}
                    helperText={formErrors.subject}
                    fullWidth
                    required
                  />
                  <TextField
                    label="Assigned Class"
                    value={newMember.assignedClass}
                    onChange={(e) => setNewMember({ ...newMember, assignedClass: e.target.value })}
                    error={!!formErrors.assignedClass}
                    helperText={formErrors.assignedClass}
                    fullWidth
                    required
                  />
                </>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddDialog}>Cancel</Button>
            <Button
              onClick={handleAddMember}
              variant="contained"
              color="primary"
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
            severity={snackbar.severity}
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

export default PrincipalPanel;