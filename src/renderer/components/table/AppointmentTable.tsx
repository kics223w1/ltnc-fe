import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '../theme/ThemeProvider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { Button } from '../../../~/components/ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';
import Appointment from '../../../main/models/appointment';
import AppointmentTableModel from '../../models/examination-table-model';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../~/components/ui/select';
import { APPOINTMENT_STATUS } from '../../../main/models/constants';

const model = new AppointmentTableModel();

type Params = {
  appointments: Appointment[];
  handleLoadAppointments: (status: APPOINTMENT_STATUS) => void;
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

  const [status, setStatus] = useState<APPOINTMENT_STATUS>(
    APPOINTMENT_STATUS.CREATED
  );

  useEffect(() => {
    handleReloadAppointments();
  }, [status]);

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

    await handleLoadAppointments(status);

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <Select
          onValueChange={(val) => {
            setStatus(val as APPOINTMENT_STATUS);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Trạng thái ca khám" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={APPOINTMENT_STATUS.CREATED}>Đã hẹn</SelectItem>
            <SelectItem value={APPOINTMENT_STATUS.DONE}>Đã xong</SelectItem>
            <SelectItem value={APPOINTMENT_STATUS.CANCEL}>Đã huỷ</SelectItem>
          </SelectContent>
        </Select>

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
            slots={{
              noRowsOverlay: () => (
                <>
                  <div className="flex flex-col items-center justify-center w-full h-full">
                    <span className="text-lg text-muted-foreground">
                      Không có ca khám
                    </span>
                  </div>
                </>
              ),
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
