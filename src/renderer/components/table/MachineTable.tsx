import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '../theme/ThemeProvider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect } from 'react';
import networkService from '../../../main/service/network-service';

const columns: any = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: "Machine's Name",
    width: 150,
  },
  {
    field: 'vendor',
    headerName: 'Vendor',
    width: 200,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 150,
  },
  {
    field: 'desc',
    headerName: 'Description',
    width: 300,
  },
];

const machineRows = [
  {
    id: 1,
    name: 'MRI Machine',
    vendor: 'ABC Medical',
    status: 'Operational',
    desc: 'A powerful imaging machine used for detailed scans.',
  },
  {
    id: 2,
    name: 'X-ray Machine',
    vendor: 'XYZ Imaging',
    status: 'Under Maintenance',
    desc: "Used for producing images of the inside of a patient's body.",
  },
  {
    id: 3,
    name: 'Ultrasound Machine',
    vendor: 'DEF Technologies',
    status: 'Operational',
    desc: 'Utilizes high-frequency sound waves to visualize internal organs.',
  },
  {
    id: 4,
    name: 'CT Scanner',
    vendor: 'GHI Medical Solutions',
    status: 'Operational',
    desc: 'Produces detailed cross-sectional images of the body.',
  },
  {
    id: 5,
    name: 'ECG Machine',
    vendor: 'QRS Healthcare',
    status: 'Operational',
    desc: 'Used to record the electrical activity of the heart over time.',
  },
  {
    id: 6,
    name: 'Ventilator',
    vendor: 'LMN Technologies',
    status: 'Operational',
    desc: 'Assists patients in breathing when they are unable to do so on their own.',
  },
  {
    id: 7,
    name: 'Anesthesia Machine',
    vendor: 'OPQ Medical Devices',
    status: 'Operational',
    desc: 'Administers anesthetic gases to patients undergoing surgery.',
  },
  {
    id: 8,
    name: 'Defibrillator',
    vendor: 'RST Healthcare Solutions',
    status: 'Operational',
    desc: 'Used to deliver an electric shock to the heart to restore normal rhythm.',
  },
  {
    id: 9,
    name: 'Blood Gas Analyzer',
    vendor: 'UVW Diagnostics',
    status: 'Under Maintenance',
    desc: 'Measures the concentration of oxygen and carbon dioxide in blood.',
  },
  {
    id: 10,
    name: 'Infusion Pump',
    vendor: 'IJK Medical Devices',
    status: 'Operational',
    desc: "Delivers fluids, such as medications or nutrients, into a patient's body in controlled amounts.",
  },
];

type Params = {};

const MachineTable = () => {
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
          rows={machineRows}
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

export default MachineTable;
