import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '../theme/ThemeProvider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import Machine from '/main/models/machine';
import { Button } from '../../../~/components/ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';
import { MACHINE_SERVICE } from '/main/models/constants';
import MachineTableModel from '../../models/machine-table-model';

const model = new MachineTableModel();

type Params = {
  machines: Machine[];
  handleLoadMachines: () => void;
  setSelectedMachines: (machines: Machine[]) => void;
};

const MachineTable = ({
  setSelectedMachines,
  machines,
  handleLoadMachines,
}: Params) => {
  const { theme, setTheme } = useTheme();
  const tableTheme = createTheme({
    palette: {
      mode: theme === 'light' ? 'light' : 'dark',
    },
  });

  const columns = model.getColumns();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    const setup = async () => {
      handleReloadMachines();
    };

    setup();
  }, []);

  useEffect(() => {
    try {
      const newRows = model.convertToRows(machines);
      setRows(newRows);
    } catch (e) {
      setRows([]);
      console.error(e);
    }
  }, [machines]);

  const handleReloadMachines = async () => {
    setIsLoading(true);

    await handleLoadMachines();

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-end">
        <Button
          variant={'outline'}
          size={'icon'}
          onClick={handleReloadMachines}
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
              const newSelectedMachines = machines.flatMap((mac) =>
                params.includes(mac.id) ? [mac] : []
              );
              setSelectedMachines(newSelectedMachines);
            }}
            pageSizeOptions={[10]}
            disableRowSelectionOnClick
          />
        </ThemeProvider>
      </div>
    </div>
  );
};

export default MachineTable;
