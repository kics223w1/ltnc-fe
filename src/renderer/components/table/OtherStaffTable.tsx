import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '../theme/ThemeProvider';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const columns: any = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Full Name',
    width: 150,
  },
  {
    field: 'dob',
    headerName: 'Date of Birth',
    width: 150,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 200,
  },
  {
    field: 'phone',
    headerName: 'Phone Number',
    width: 200,
  },
  {
    field: 'department',
    headerName: 'Department',
    width: 200,
  },
  {
    field: 'degree',
    headerName: 'Degree',
    width: 200,
  },
];

const otherStaffs = [
  {
    id: 1,
    name: 'John Doe',
    type: 'Labortory Technician',
    phone: '1234567890',
    email: 'sample@gmail.com',
    dob: '01/01/1990',

    department: 'Cardiology',
    degree: 'MBBS',
  },
  {
    id: 2,
    name: 'Jane Smith',
    type: 'Technician',
    phone: '9876543210',
    email: 'example@gmail.com',
    dob: '01/01/1990',

    department: 'Pediatrics',
    degree: 'MD',
  },
  {
    id: 3,
    name: 'Michael Johnson',
    type: "Nurse's Assistant",
    phone: '5555555555',
    email: 'michael@example.com',
    dob: '01/01/1990',

    department: 'Orthopedics',
    degree: 'MD',
  },
  {
    id: 4,
    name: 'Emily Davis',
    type: 'Receptionist',
    phone: '9999999999',
    email: 'emily@example.com',
    dob: '01/01/1990',

    department: 'Dermatology',
    degree: 'MD',
  },
  {
    id: 5,
    name: 'David Wilson',
    type: 'Pharmacist',
    phone: '1111111111',
    email: 'david@example.com',
    dob: '01/01/1990',

    department: 'Ophthalmology',
    degree: 'MD',
  },
];

const OtherStaffTable = () => {
  const { theme, setTheme } = useTheme();

  const tableTheme = createTheme({
    palette: {
      mode: theme === 'light' ? 'light' : 'dark',
    },
  });

  return (
    <div className="h-[500px]">
      <ThemeProvider theme={tableTheme}>
        <DataGrid
          rows={otherStaffs}
          columns={columns}
          checkboxSelection
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
          disableRowSelectionOnClick
        />
      </ThemeProvider>
    </div>
  );
};

export default OtherStaffTable;
