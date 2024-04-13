import { DataGrid, GridColDef, useGridApiRef } from '@mui/x-data-grid';
import { useTheme } from '../theme/ThemeProvider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Input } from '~/components/ui/input';
import { Button } from '/~/components/ui/button';

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

const TableDoctor = () => {
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
          Button 1
        </Button>
      </div>
      <div className="h-[500px]">
        <ThemeProvider theme={tableTheme}>
          <DataGrid
            rows={rows}
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
          Button 2
        </Button>
        <Button variant={'default'} size={'lg'}>
          Button 3
        </Button>
      </div>
    </div>
  );
};

export default TableDoctor;
