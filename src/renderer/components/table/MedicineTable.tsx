import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '../theme/ThemeProvider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import Medicine from '/main/models/medicine';
import { Button } from '../../../~/components/ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';
import { MEDICINE_SERVICE } from '/main/models/constants';
import MedicineTableModel from '/renderer/models/medicine-table-model';

const model = new MedicineTableModel();

type Params = {
  medicines: Medicine[];
  handleLoadMedicines: () => void;
  setSelectedMedicines: (medicines: Medicine[]) => void;
};

const MedicineTable = ({
  medicines,
  handleLoadMedicines,
  setSelectedMedicines,
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
      handleReloadMedicines();
    };
    setup();
  }, []);

  useEffect(() => {
    try {
      const newRows = model.convertToRows(medicines);
      setRows(newRows);
    } catch (e) {
      setRows([]);
      console.error(e);
    }
  }, [medicines]);

  const handleReloadMedicines = async () => {
    setIsLoading(true);
    handleLoadMedicines();
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-end">
        <Button
          variant={'outline'}
          size={'icon'}
          onClick={handleReloadMedicines}
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
              const newSelectedMedicines = medicines.flatMap((med) =>
                params.includes(med.medicine_id) ? [med] : []
              );
              setSelectedMedicines(newSelectedMedicines);
            }}
            pageSizeOptions={[10]}
            disableRowSelectionOnClick
          />
        </ThemeProvider>
      </div>
    </div>
  );
};

export default MedicineTable;
