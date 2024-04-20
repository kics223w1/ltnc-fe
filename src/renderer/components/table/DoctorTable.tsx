import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '../theme/ThemeProvider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import Doctor from '../../../main/models/doctor';
import { Button } from '../../../~/components/ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';
import { USER_SERVICE } from '../../../main/models/constants';
import UserTableModel from '../../models/user-table-model';

const model = new UserTableModel();

type Params = {
  setSelectedDoctors: (doctor: Doctor[]) => void;
};

const DoctorTable = ({ setSelectedDoctors }: Params) => {
  const { theme, setTheme } = useTheme();
  const tableTheme = createTheme({
    palette: {
      mode: theme === 'light' ? 'light' : 'dark',
    },
  });

  const columns = model.getColumns();

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    const setup = async () => {
      const newDoctors: Doctor[] = await handleGetDoctors();
      if (newDoctors.length === 0) {
        handleReloadDoctors();
        return;
      }
      setDoctors(newDoctors);
    };

    setup();
  }, []);

  useEffect(() => {
    try {
      const newRows = model.convertToRows(doctors);
      setRows(newRows);
    } catch (e) {
      setRows([]);
      console.error(e);
    }
  }, [doctors]);

  const handleGetDoctors = async () => {
    return await window.electron.ipcRenderer.invoke(
      USER_SERVICE.GET_DOCTORS,
      {}
    );
  };

  const handleReloadDoctors = async () => {
    setIsLoading(true);
    const newDoctors = await window.electron.ipcRenderer.invoke(
      USER_SERVICE.RELOAD_DOCTORS,
      {}
    );

    setIsLoading(false);

    setDoctors(newDoctors);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-end">
        <Button variant={'outline'} size={'icon'} onClick={handleReloadDoctors}>
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
              const newSelectedDoctors = doctors.flatMap((doc) =>
                params.includes(doc.userId) ? [doc] : []
              );
              setSelectedDoctors(newSelectedDoctors);
            }}
            pageSizeOptions={[10]}
            disableRowSelectionOnClick
          />
        </ThemeProvider>
      </div>
    </div>
  );
};

export default DoctorTable;
