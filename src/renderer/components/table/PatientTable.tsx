import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '../theme/ThemeProvider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import Doctor from '../../../main/models/doctor';
import { Button } from '../../../~/components/ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';
import { USER_SERVICE } from '../../../main/models/constants';
import UserTableModel from '../../models/user-table-model';
import Patient from '../../../main/models/patient';

const model = new UserTableModel();

type Params = {
  setSelectedPatients: (patients: Patient[]) => void;
};

const PatientTable = ({ setSelectedPatients }: Params) => {
  const { theme, setTheme } = useTheme();
  const tableTheme = createTheme({
    palette: {
      mode: theme === 'light' ? 'light' : 'dark',
    },
  });

  const columns = model.getColumns();

  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    const setup = async () => {
      const newPatients: Patient[] = await handleGetPatients();
      if (newPatients.length === 0) {
        handleReloadPatients();
        return;
      }
      setPatients(newPatients);
    };

    setup();
  }, []);

  useEffect(() => {
    try {
      const newRows = model.convertToRows(patients);
      setRows(newRows);
    } catch (e) {
      setRows([]);
      console.error(e);
    }
  }, [patients]);

  const handleGetPatients = async () => {
    return await window.electron.ipcRenderer.invoke(
      USER_SERVICE.GET_PATIENTS,
      {}
    );
  };

  const handleReloadPatients = async () => {
    setIsLoading(true);
    const newPatients = await window.electron.ipcRenderer.invoke(
      USER_SERVICE.RELOAD_PATIENTS,
      {}
    );

    setIsLoading(false);

    setPatients(newPatients);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-end">
        <Button
          variant={'outline'}
          size={'icon'}
          onClick={handleReloadPatients}
        >
          <ReloadIcon className={`${isLoading ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      <div className="h-[500px] w-full">
        <ThemeProvider theme={tableTheme}>
          <DataGrid
            checkboxSelection
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            onRowSelectionModelChange={(params) => {
              const newSelected = patients.flatMap((doc) =>
                params.includes(doc.userId) ? [doc] : []
              );
              setSelectedPatients(newSelected);
            }}
            pageSizeOptions={[10]}
            disableRowSelectionOnClick
          />
        </ThemeProvider>
      </div>
    </div>
  );
};

export default PatientTable;
