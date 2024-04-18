import { DataGrid, GridColDef, useGridApiRef } from '@mui/x-data-grid';
import { useTheme } from '../theme/ThemeProvider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Input } from '~/components/ui/input';
import { Button } from '/~/components/ui/button';

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

const nurseRows = [
  {
    id: 1,
    name: 'John Doe',
    phone: '1234567890',
    email: 'sample@gmail.com',
    dob: '01/01/1990',
    department: 'Cardiology',
    degree: 'MBBS',
  },
  {
    id: 2,
    name: 'Jane Smith',
    phone: '9876543210',
    email: 'example@gmail.com',
    dob: '01/01/1990',

    department: 'Pediatrics',
    degree: 'MD',
  },
  {
    id: 3,
    name: 'Michael Johnson',
    phone: '5555555555',
    email: 'michael@example.com',
    dob: '01/01/1990',

    department: 'Orthopedics',
    degree: 'MD',
  },
  {
    id: 4,
    name: 'Emily Davis',
    phone: '9999999999',
    email: 'emily@example.com',
    dob: '01/01/1990',

    department: 'Dermatology',
    degree: 'MD',
  },
  {
    id: 5,
    name: 'David Wilson',
    phone: '1111111111',
    email: 'david@example.com',
    dob: '01/01/1990',

    department: 'Ophthalmology',
    degree: 'MD',
  },
];

const NurseTable = () => {
  const { theme, setTheme } = useTheme();

  const tableTheme = createTheme({
    palette: {
      mode: theme === 'light' ? 'light' : 'dark',
    },
  });

  return (
    <div className="flex flex-col w-full h-full px-12">
      <div className="flex items-center gap-4 my-5">
        <Input></Input>
        <Button variant={'default'} size={'lg'}>
          Search
        </Button>
      </div>
      <div className="h-[500px]">
        <ThemeProvider theme={tableTheme}>
          <DataGrid
            rows={nurseRows}
            columns={columns}
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
      <div className="flex items-center justify-end gap-4 mt-5">
        <Button variant={'outline'} size={'lg'}>
          Edit
        </Button>
        <Button variant={'default'} size={'lg'}>
          Schedule
        </Button>
      </div>
    </div>
  );
};

export default NurseTable;
