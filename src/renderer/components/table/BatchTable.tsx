import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '../theme/ThemeProvider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { Button } from '../../../~/components/ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';
import Batch from '../../../main/models/batch';
import BatchTableModel from '../../models/batch-table-model';

const model = new BatchTableModel();

type Params = {
  batches: Batch[];
  handleLoadBatches: () => void;
  setSelectedBatches: (batches: Batch[]) => void;
};

const BatchTable = ({
  batches,
  handleLoadBatches,
  setSelectedBatches,
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
      handleReloadBatches();
    };
    setup();
  }, []);

  useEffect(() => {
    try {
      const newRows = model.convertToRows(batches);
      setRows(newRows);
    } catch (e) {
      setRows([]);
      console.error(e);
    }
  }, [batches]);

  const handleReloadBatches = async () => {
    setIsLoading(true);
    await handleLoadBatches();
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-end">
        <Button variant={'outline'} size={'icon'} onClick={handleReloadBatches}>
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
              const newSelectedBatches = batches.flatMap((bat, index: number) =>
                params.includes(`${index}_batch`) ? [bat] : []
              );
              setSelectedBatches(newSelectedBatches);
            }}
            pageSizeOptions={[10]}
            disableRowSelectionOnClick
          />
        </ThemeProvider>
      </div>
    </div>
  );
};

export default BatchTable;
