import { DataGrid, GridColDef, useGridApiRef } from '@mui/x-data-grid';
import { useTheme } from '../theme/ThemeProvider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Input } from '~/components/ui/input';
import { Button } from '/~/components/ui/button';
import DoctorTable from '../table/DoctorTable';

const columns: GridColDef<typeof rows[number]>[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 15 },
  { id: 6, lastName: 'Melisandre', firstName: 'Ferrara', age: 10 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const nurseRows = [
  {
    id: 1,
    name: 'John Doe',
    phone: '1234567890',
    email: 'sample@gmail.com',
    department: 'Cardiology',
    degree: 'MBBS',
  },
  {
    id: 2,
    name: 'Jane Smith',
    phone: '9876543210',
    email: 'example@gmail.com',
    department: 'Pediatrics',
    degree: 'MD',
  },
  {
    id: 3,
    name: 'Michael Johnson',
    phone: '5555555555',
    email: 'michael@example.com',
    department: 'Orthopedics',
    degree: 'MD',
  },
  {
    id: 4,
    name: 'Emily Davis',
    phone: '9999999999',
    email: 'emily@example.com',
    department: 'Dermatology',
    degree: 'MD',
  },
  {
    id: 5,
    name: 'David Wilson',
    phone: '1111111111',
    email: 'david@example.com',
    department: 'Ophthalmology',
    degree: 'MD',
  },
];

const otherStaffs = [
  {
    id: 1,
    name: 'John Doe',
    type: 'Labortory Technician',
    phone: '1234567890',
    email: 'sample@gmail.com',
    department: 'Cardiology',
    degree: 'MBBS',
  },
  {
    id: 2,
    name: 'Jane Smith',
    type: 'Technician',
    phone: '9876543210',
    email: 'example@gmail.com',
    department: 'Pediatrics',
    degree: 'MD',
  },
  {
    id: 3,
    name: 'Michael Johnson',
    type: "Nurse's Assistant",
    phone: '5555555555',
    email: 'michael@example.com',
    department: 'Orthopedics',
    degree: 'MD',
  },
  {
    id: 4,
    name: 'Emily Davis',
    type: 'Receptionist',
    phone: '9999999999',
    email: 'emily@example.com',
    department: 'Dermatology',
    degree: 'MD',
  },
  {
    id: 5,
    name: 'David Wilson',
    type: 'Pharmacist',
    phone: '1111111111',
    email: 'david@example.com',
    department: 'Ophthalmology',
    degree: 'MD',
  },
];

const StaffInformationTab = () => {
  return (
    <div className="flex flex-col w-full h-full px-12">
      <DoctorTable />
    </div>
  );
};

export default StaffInformationTab;
