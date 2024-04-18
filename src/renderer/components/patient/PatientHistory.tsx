import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '../theme/ThemeProvider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button } from '/~/components/ui/button';
import {
  EVENTS_FROM_MAIN_PROCESS,
  MAIN_VIEW_TAB,
} from '../../../main/models/constant';

const columns: any = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'time',
    headerName: 'Time',
    width: 200,
  },
  {
    field: 'doctor',
    headerName: 'Doctor',
    width: 150,
  },
  {
    field: 'doctorPhone',
    headerName: 'Doctor Phone',
    width: 150,
  },
  {
    field: 'address',
    headerName: 'Address',
    width: 200,
  },
];

const doctorRows = [
  {
    id: 1,
    time: '10:00 AM on 12/12/2021',
    doctor: 'Dr. John Doe',
    doctorPhone: '9876543210',
    address: '123, ABC Street, XYZ City',
  },
  {
    id: 2,
    time: '11:00 AM on 12/12/2021',
    doctor: 'Dr. Jane Smith',
    doctorPhone: '1234567890',
    address: '456, DEF Street, XYZ City',
  },
  {
    id: 3,
    time: '12:00 PM on 12/12/2021',
    doctor: 'Dr. Michael Johnson',
    doctorPhone: '5555555555',
    address: '789, GHI Street, XYZ City',
  },
  {
    id: 4,
    time: '1:00 PM on 12/12/2021',
    doctor: 'Dr. Sarah Williams',
    doctorPhone: '9999999999',
    address: '987, JKL Street, XYZ City',
  },
  {
    id: 5,
    time: '2:00 PM on 12/12/2021',
    doctor: 'Dr. Robert Brown',
    doctorPhone: '1111111111',
    address: '654, MNO Street, XYZ City',
  },
];

type Params = {};

const PatientHistory = ({}: Params) => {
  const { theme, setTheme } = useTheme();

  const tableTheme = createTheme({
    palette: {
      mode: theme === 'light' ? 'light' : 'dark',
    },
  });

  const handleNewAppointment = () => {
    window.electron.ipcRenderer.sendMessage(
      EVENTS_FROM_MAIN_PROCESS.ON_UPDATE_MAIN_VIEW,
      {
        tab: MAIN_VIEW_TAB.PATIENT_BOOKING,
      }
    );
  };

  return (
    <div className="flex flex-col w-full h-full px-12 pt-10">
      <div className="h-[500px]">
        <ThemeProvider theme={tableTheme}>
          <DataGrid
            rows={doctorRows}
            columns={columns}
            checkboxSelection
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
          Cancel
        </Button>
        <Button variant={'default'} size={'lg'} onClick={handleNewAppointment}>
          New
        </Button>
      </div>
    </div>
  );
};

export default PatientHistory;
