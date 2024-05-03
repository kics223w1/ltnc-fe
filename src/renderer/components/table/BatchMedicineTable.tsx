import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '../theme/ThemeProvider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import BatchMedicine from '../../../main/models/batch-medicine';
import BatchMedicineTableModel from '../../models/batch-medicine-table-model';

const model = new BatchMedicineTableModel();

type Params = {
  batchMedicines: BatchMedicine[];
};

const BatchMedicineTable = ({ batchMedicines }: Params) => {
  const { theme, setTheme } = useTheme();
  const tableTheme = createTheme({
    palette: {
      mode: theme === 'light' ? 'light' : 'dark',
    },
  });

  const columns = model.getColumns();

  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    try {
      const newRows = model.convertToRows(batchMedicines);
      setRows(newRows);
    } catch (e) {
      setRows([]);
      console.error(e);
    }
  }, [batchMedicines]);

  return (
    <div className="flex flex-col gap-2">
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
    </div>
  );
};

export default BatchMedicineTable;
