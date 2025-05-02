import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Pagination,
  Alert,
  Snackbar,
  CircularProgress,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  CalendarMonth as CalendarIcon,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// Sample student data with provided names
const initialStudents = [
  // 10th Grade - Section A
  { id: 1, name: 'Aarav Sharma', rollNumber: 'R001', class: '10th', section: 'A', attendance: {} },
  { id: 2, name: 'Ahmed Khan', rollNumber: 'R002', class: '10th', section: 'A', attendance: {} },
  { id: 3, name: 'John Mathew', rollNumber: 'R003', class: '10th', section: 'A', attendance: {} },
  { id: 4, name: 'Amarpreet Singh', rollNumber: 'R004', class: '10th', section: 'A', attendance: {} },
  { id: 5, name: 'Siddhartha Gupta', rollNumber: 'R005', class: '10th', section: 'A', attendance: {} },
  { id: 6, name: 'Mahavir Jain', rollNumber: 'R006', class: '10th', section: 'A', attendance: {} },
  { id: 7, name: 'Cyrus Irani', rollNumber: 'R007', class: '10th', section: 'A', attendance: {} },
  { id: 8, name: 'David Fernandez', rollNumber: 'R008', class: '10th', section: 'A', attendance: {} },
  { id: 9, name: 'Abdu\'l-Bahá Patel', rollNumber: 'R009', class: '10th', section: 'A', attendance: {} },
  { id: 10, name: 'Aryan Reddy', rollNumber: 'R010', class: '10th', section: 'A', attendance: {} },

  // 10th Grade - Section B
  { id: 11, name: 'Ali Hussain', rollNumber: 'R011', class: '10th', section: 'B', attendance: {} },
  { id: 12, name: 'Mary Joseph', rollNumber: 'R012', class: '10th', section: 'B', attendance: {} },
  { id: 13, name: 'Harpreet Kaur', rollNumber: 'R013', class: '10th', section: 'B', attendance: {} },
  { id: 14, name: 'Ananda Sharma', rollNumber: 'R014', class: '10th', section: 'B', attendance: {} },
  { id: 15, name: 'Suryakant Desai', rollNumber: 'R015', class: '10th', section: 'B', attendance: {} },
  { id: 16, name: 'Roxana Parsi', rollNumber: 'R016', class: '10th', section: 'B', attendance: {} },
  { id: 17, name: 'Rachel Abraham', rollNumber: 'R017', class: '10th', section: 'B', attendance: {} },
  { id: 18, name: 'Rúhíyyih Baqi', rollNumber: 'R018', class: '10th', section: 'B', attendance: {} },
  { id: 19, name: 'Priya Verma', rollNumber: 'R019', class: '10th', section: 'B', attendance: {} },
  { id: 20, name: 'Ayesha Ahmed', rollNumber: 'R020', class: '10th', section: 'B', attendance: {} },

  // 11th Grade - Section A
  { id: 21, name: 'Grace Pereira', rollNumber: 'R021', class: '11th', section: 'A', attendance: {} },
  { id: 22, name: 'Simran Kaur', rollNumber: 'R022', class: '11th', section: 'A', attendance: {} },
  { id: 23, name: 'Tenzin Dorje', rollNumber: 'R023', class: '11th', section: 'A', attendance: {} },
  { id: 24, name: 'Shanti Jain', rollNumber: 'R024', class: '11th', section: 'A', attendance: {} },
  { id: 25, name: 'Darius Patel', rollNumber: 'R025', class: '11th', section: 'A', attendance: {} },
  { id: 26, name: 'Isaac Malhotra', rollNumber: 'R026', class: '11th', section: 'A', attendance: {} },
  { id: 27, name: 'Shoghi Mishra', rollNumber: 'R027', class: '11th', section: 'A', attendance: {} },
  { id: 28, name: 'Deepak Raj', rollNumber: 'R028', class: '11th', section: 'A', attendance: {} },
  { id: 29, name: 'Ibrahim Ali', rollNumber: 'R029', class: '11th', section: 'A', attendance: {} },
  { id: 30, name: 'Joseph Thomas', rollNumber: 'R030', class: '11th', section: 'A', attendance: {} },

  // 11th Grade - Section B
  { id: 31, name: 'Jaswinder Singh', rollNumber: 'R031', class: '11th', section: 'B', attendance: {} },
  { id: 32, name: 'Pema Lhamo', rollNumber: 'R032', class: '11th', section: 'B', attendance: {} },
  { id: 33, name: 'Shruti Agarwal', rollNumber: 'R033', class: '11th', section: 'B', attendance: {} },
  { id: 34, name: 'Farhang Mehta', rollNumber: 'R034', class: '11th', section: 'B', attendance: {} },
  { id: 35, name: 'Levi D\'Souza', rollNumber: 'R035', class: '11th', section: 'B', attendance: {} },
  { id: 36, name: 'Esther Bansal', rollNumber: 'R036', class: '11th', section: 'B', attendance: {} },
  { id: 37, name: 'Noor Khan', rollNumber: 'R037', class: '11th', section: 'B', attendance: {} },
  { id: 38, name: 'Gurjit Singh', rollNumber: 'R038', class: '11th', section: 'B', attendance: {} },
  { id: 39, name: 'Kelsang Tenzin', rollNumber: 'R039', class: '11th', section: 'B', attendance: {} },
  { id: 40, name: 'Jinesh Shah', rollNumber: 'R040', class: '11th', section: 'B', attendance: {} },

  // 12th Grade - Section A
  { id: 41, name: 'Benjamin Solomon', rollNumber: 'R041', class: '12th', section: 'A', attendance: {} },
  { id: 42, name: 'Ananya Deshmukh', rollNumber: 'R042', class: '12th', section: 'A', attendance: {} },
  { id: 43, name: 'Zara Qureshi', rollNumber: 'R043', class: '12th', section: 'A', attendance: {} },
  { id: 44, name: 'Samuel George', rollNumber: 'R044', class: '12th', section: 'A', attendance: {} },
  { id: 45, name: 'Gurdeep Singh', rollNumber: 'R045', class: '12th', section: 'A', attendance: {} },
  { id: 46, name: 'Lobsang Choden', rollNumber: 'R046', class: '12th', section: 'A', attendance: {} },
  { id: 47, name: 'Jinesh Jain', rollNumber: 'R047', class: '12th', section: 'A', attendance: {} },
  { id: 48, name: 'Rupal Mehta', rollNumber: 'R048', class: '12th', section: 'A', attendance: {} },
  { id: 49, name: 'Miriam Lobo', rollNumber: 'R049', class: '12th', section: 'A', attendance: {} },
  { id: 50, name: 'Radhika Patel', rollNumber: 'R050', class: '12th', section: 'A', attendance: {} },

  // 12th Grade - Section B
  { id: 51, name: 'Mohammad Ali', rollNumber: 'R051', class: '12th', section: 'B', attendance: {} },
  { id: 52, name: 'Joseph David', rollNumber: 'R052', class: '12th', section: 'B', attendance: {} },
  { id: 53, name: 'Gurjit Kaur', rollNumber: 'R053', class: '12th', section: 'B', attendance: {} },
  { id: 54, name: 'Choden Tenzin', rollNumber: 'R054', class: '12th', section: 'B', attendance: {} },
  { id: 55, name: 'Bhavna Khandelwal', rollNumber: 'R055', class: '12th', section: 'B', attendance: {} },
  { id: 56, name: 'Vikram Bedi', rollNumber: 'R056', class: '12th', section: 'B', attendance: {} },
  { id: 57, name: 'Aditi Kapoor', rollNumber: 'R057', class: '12th', section: 'B', attendance: {} },
  { id: 58, name: 'Pema Lhamo', rollNumber: 'R058', class: '12th', section: 'B', attendance: {} },
  { id: 59, name: 'Kian Patel', rollNumber: 'R059', class: '12th', section: 'B', attendance: {} },
  { id: 60, name: 'Ruth David', rollNumber: 'R060', class: '12th', section: 'B', attendance: {} },
];

const StudentAttendance = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [openDialog, setOpenDialog] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState('10th');
  const [selectedSection, setSelectedSection] = useState('A');
  const [attendanceHistory, setAttendanceHistory] = useState({});

  useEffect(() => {
    // Simulate loading students data
    setTimeout(() => {
      setStudents(initialStudents);
      setFilteredStudents(initialStudents);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const filtered = students.filter(student =>
      (student.class === selectedClass && student.section === selectedSection) &&
      (student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredStudents(filtered);
    setPage(1);
  }, [searchTerm, students, selectedClass, selectedSection]);

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const handleStatusChange = (studentId, status) => {
    const dateStr = formatDate(selectedDate);
    setStudents(prevStudents =>
      prevStudents.map(student =>
        student.id === studentId
          ? {
              ...student,
              attendance: {
                ...student.attendance,
                [dateStr]: status,
              },
            }
          : student
      )
    );
    setSnackbar({
      open: true,
      message: 'Attendance updated successfully',
      severity: 'success',
    });
  };

  const getAttendanceStatus = (student, date) => {
    const dateStr = formatDate(date);
    return student.attendance[dateStr] || 'present';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'present':
        return 'success';
      case 'absent':
        return 'error';
      case 'late':
        return 'warning';
      default:
        return 'default';
    }
  };

  const handleAddStudent = () => {
    setCurrentStudent(null);
    setOpenDialog(true);
  };

  const handleEditStudent = (student) => {
    setCurrentStudent(student);
    setOpenDialog(true);
  };

  const handleDeleteStudent = (studentId) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setStudents(prevStudents => prevStudents.filter(student => student.id !== studentId));
      setSnackbar({
        open: true,
        message: 'Student deleted successfully',
        severity: 'success',
      });
    }
  };

  const handleSaveStudent = (studentData) => {
    if (currentStudent) {
      setStudents(prevStudents =>
        prevStudents.map(student =>
          student.id === currentStudent.id ? { ...student, ...studentData } : student
        )
      );
    } else {
      const newStudent = {
        id: students.length + 1,
        ...studentData,
        attendance: { [formatDate(selectedDate)]: 'present' },
      };
      setStudents(prevStudents => [...prevStudents, newStudent]);
    }
    setOpenDialog(false);
    setSnackbar({
      open: true,
      message: `Student ${currentStudent ? 'updated' : 'added'} successfully`,
      severity: 'success',
    });
  };

  const handleClassChange = (event, newValue) => {
    setSelectedClass(newValue);
  };

  const handleSectionChange = (event) => {
    setSelectedSection(event.target.value);
  };

  const paginatedStudents = filteredStudents.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" component="h1">
              Student Attendance
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddStudent}
            >
              Add Student
            </Button>
          </Box>

          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs value={selectedClass} onChange={handleClassChange}>
              <Tab label="10th Grade" value="10th" />
              <Tab label="11th Grade" value="11th" />
              <Tab label="12th Grade" value="12th" />
            </Tabs>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <FormControl sx={{ minWidth: 120 }}>
              <Select
                value={selectedSection}
                onChange={handleSectionChange}
                displayEmpty
              >
                <MenuItem value="A">Section A</MenuItem>
                <MenuItem value="B">Section B</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Search Students"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'action.active' }} />,
              }}
            />
            <DatePicker
              label="Select Date"
              value={selectedDate}
              onChange={(newDate) => setSelectedDate(newDate)}
              renderInput={(params) => <TextField {...params} />}
            />
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Roll Number</TableCell>
                  <TableCell>Class</TableCell>
                  <TableCell>Section</TableCell>
                  <TableCell>Attendance Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.rollNumber}</TableCell>
                    <TableCell>{student.class}</TableCell>
                    <TableCell>{student.section}</TableCell>
                    <TableCell>
                      <FormControl fullWidth>
                        <Select
                          value={getAttendanceStatus(student, selectedDate)}
                          onChange={(e) => handleStatusChange(student.id, e.target.value)}
                          size="small"
                        >
                          <MenuItem value="present">Present</MenuItem>
                          <MenuItem value="absent">Absent</MenuItem>
                          <MenuItem value="late">Late</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleEditStudent(student)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteStudent(student.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Pagination
              count={Math.ceil(filteredStudents.length / rowsPerPage)}
              page={page}
              onChange={(e, value) => setPage(value)}
              color="primary"
            />
          </Box>
        </Paper>

        <StudentDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          onSave={handleSaveStudent}
          student={currentStudent}
          selectedClass={selectedClass}
          selectedSection={selectedSection}
        />

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </LocalizationProvider>
  );
};

const StudentDialog = ({ open, onClose, onSave, student, selectedClass, selectedSection }) => {
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    class: selectedClass,
    section: selectedSection,
  });

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        rollNumber: student.rollNumber,
        class: student.class,
        section: student.section,
      });
    } else {
      setFormData({
        name: '',
        rollNumber: '',
        class: selectedClass,
        section: selectedSection,
      });
    }
  }, [student, selectedClass, selectedSection]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {student ? 'Edit Student' : 'Add New Student'}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <TextField
            margin="dense"
            label="Roll Number"
            fullWidth
            value={formData.rollNumber}
            onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
            required
          />
          <FormControl fullWidth margin="dense">
            <Select
              value={formData.class}
              onChange={(e) => setFormData({ ...formData, class: e.target.value })}
              required
            >
              <MenuItem value="10th">10th Grade</MenuItem>
              <MenuItem value="11th">11th Grade</MenuItem>
              <MenuItem value="12th">12th Grade</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <Select
              value={formData.section}
              onChange={(e) => setFormData({ ...formData, section: e.target.value })}
              required
            >
              <MenuItem value="A">Section A</MenuItem>
              <MenuItem value="B">Section B</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {student ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default StudentAttendance; 