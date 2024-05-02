import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '../theme/ThemeProvider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { MEDICINE_SERVICE } from '/main/models/constants';
import MedicineHistory from '../../../main/models/medicine-history';
import MedicineHistoryTableModel from '../../models/medicine-history-table-model';

const model = new MedicineHistoryTableModel();

type Params = {
  idMedicine: string | undefined;
};

const MedicineHistoryTable = ({ idMedicine }: Params) => {
  const { theme, setTheme } = useTheme();
  const tableTheme = createTheme({
    palette: {
      mode: theme === 'light' ? 'light' : 'dark',
    },
  });

  const columns = model.getColumns();

  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    const setup = async () => {
      const medicineHistory: MedicineHistory[] =
        await window.electron.ipcRenderer.invoke(
          MEDICINE_SERVICE.GET_MEDICINE_LOG,
          {
            id: idMedicine,
          }
        );

      const newRows = model.convertToRows(medicineHistory);
      setRows(newRows);
    };

    if (idMedicine) {
      setup();
    } else {
      setRows([]);
    }
  }, [idMedicine]);

  return (
    <div className="h-[500px] w-full">
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
        />
      </ThemeProvider>
    </div>
  );
};

export default MedicineHistoryTable;
