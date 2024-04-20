import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '../theme/ThemeProvider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { Button } from '../../../~/components/ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';
import { USER_SERVICE } from '../../../main/models/constants';
import UserTableModel from '../../models/user-table-model';
import Nurse from '../../../main/models/nurse';

const model = new UserTableModel();

type Params = {
  setSelectedNurses: (nurses: Nurse[]) => void;
};

const NurseTable = ({ setSelectedNurses }: Params) => {
  const { theme, setTheme } = useTheme();
  const tableTheme = createTheme({
    palette: {
      mode: theme === 'light' ? 'light' : 'dark',
    },
  });

  const columns = model.getColumns();

  const [nurses, setNurses] = useState<Nurse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    const setup = async () => {
      const newNurses: Nurse[] = await handleGetNurses();
      if (newNurses.length === 0) {
        handleReloadNurses();
        return;
      }
      setNurses(newNurses);
    };

    setup();
  }, []);

  useEffect(() => {
    try {
      const newRows = model.convertToRows(nurses);
      setRows(newRows);
    } catch (e) {
      setRows([]);
      console.error(e);
    }
  }, [nurses]);

  const handleGetNurses = async () => {
    return await window.electron.ipcRenderer.invoke(
      USER_SERVICE.GET_NURSES,
      {}
    );
  };

  const handleReloadNurses = async () => {
    setIsLoading(true);
    const newNurses = await window.electron.ipcRenderer.invoke(
      USER_SERVICE.RELOAD_NURSES,
      {}
    );

    setIsLoading(false);

    setNurses(newNurses);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-end">
        <Button variant={'outline'} size={'icon'} onClick={handleReloadNurses}>
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
              const newSelected = nurses.flatMap((nur) =>
                params.includes(nur.userId) ? [nur] : []
              );
              setSelectedNurses(newSelected);
            }}
            pageSizeOptions={[10]}
            disableRowSelectionOnClick
          />
        </ThemeProvider>
      </div>
    </div>
  );
};

export default NurseTable;
