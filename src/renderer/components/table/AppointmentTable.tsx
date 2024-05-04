import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '../theme/ThemeProvider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { Button } from '../../../~/components/ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';
import Appointment from '../../../main/models/appointment';
import AppointmentTableModel from '../../models/examination-table-model';

const model = new AppointmentTableModel();

type Params = {
  appointments: Appointment[];
  handleLoadAppointments: () => void;
  setSelectedAppointments: (appointments: Appointment[]) => void;
};

const AppointmentTable = ({
  appointments,
  handleLoadAppointments,
  setSelectedAppointments,
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
      handleReloadAppointments();
    };

    setup();
  }, []);

  useEffect(() => {
    try {
      const newRows = model.convertToRows(appointments);
      setRows(newRows);
    } catch (e) {
      setRows([]);
      console.error(e);
    }
  }, [appointments]);

  const handleReloadAppointments = async () => {
    setIsLoading(true);

    await handleLoadAppointments();

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-end">
        <Button
          variant={'outline'}
          size={'icon'}
          onClick={handleReloadAppointments}
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
              const lastId = params.length > 0 ? params[params.length - 1] : -1;
              const newSelected = appointments.flatMap((ex) =>
                ex.id === lastId ? [ex] : []
              );
              setSelectedAppointments(newSelected);
            }}
            pageSizeOptions={[10]}
            disableRowSelectionOnClick
          />
        </ThemeProvider>
      </div>
    </div>
  );
};

export default AppointmentTable;
