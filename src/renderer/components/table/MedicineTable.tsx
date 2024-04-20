import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '../theme/ThemeProvider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect } from 'react';
import networkService from '../../../main/service/network-service';

const columns: any = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: "Medicine's Name",
    width: 150,
  },
  {
    field: 'vendor',
    headerName: 'Vendor',
    width: 200,
  },
  {
    field: 'quantity',
    headerName: 'Quantity',
    width: 150,
  },
  {
    field: 'price',
    headerName: 'Price',
    width: 300,
  },
];

const medicineRows = [
  {
    id: 1,
    name: 'Aspirin',
    vendor: 'PharmaA',
    quantity: 100,
    price: 5.99,
  },
  {
    id: 2,
    name: 'Paracetamol',
    vendor: 'PharmaB',
    quantity: 150,
    price: 3.49,
  },
  {
    id: 3,
    name: 'Ibuprofen',
    vendor: 'PharmaC',
    quantity: 80,
    price: 4.79,
  },
  {
    id: 4,
    name: 'Amoxicillin',
    vendor: 'PharmaD',
    quantity: 60,
    price: 7.99,
  },
  {
    id: 5,
    name: 'Lisinopril',
    vendor: 'PharmaE',
    quantity: 40,
    price: 10.99,
  },
  {
    id: 6,
    name: 'Metformin',
    vendor: 'PharmaF',
    quantity: 120,
    price: 6.59,
  },
  {
    id: 7,
    name: 'Atorvastatin',
    vendor: 'PharmaG',
    quantity: 90,
    price: 8.79,
  },
  {
    id: 8,
    name: 'Omeprazole',
    vendor: 'PharmaH',
    quantity: 110,
    price: 9.49,
  },
  {
    id: 9,
    name: 'Amlodipine',
    vendor: 'PharmaI',
    quantity: 70,
    price: 11.29,
  },
  {
    id: 10,
    name: 'Simvastatin',
    vendor: 'PharmaJ',
    quantity: 100,
    price: 7.99,
  },
];

type Params = {};

const MedicineTable = () => {
  const { theme, setTheme } = useTheme();

  const tableTheme = createTheme({
    palette: {
      mode: theme === 'light' ? 'light' : 'dark',
    },
  });

  return (
    <div className="h-[500px] w-full">
      <ThemeProvider theme={tableTheme}>
        <DataGrid
          checkboxSelection
          rows={medicineRows}
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
  );
};

export default MedicineTable;
