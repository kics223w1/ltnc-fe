import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '../theme/ThemeProvider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { Button } from '../../../~/components/ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';
import ExaminationTableModel from '../../models/examination-table-model';
import Examination from '../../../main/models/examination';

const model = new ExaminationTableModel();

type Params = {
  examinations: Examination[];
  handleLoadExaminations: () => void;
  setSelectedExaminations: (examinations: Examination[]) => void;
};

const ExaminationTable = ({
  examinations,
  handleLoadExaminations,
  setSelectedExaminations,
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
      handleReloadExaminations();
    };

    setup();
  }, []);

  useEffect(() => {
    try {
      const newRows = model.convertToRows(examinations);
      setRows(newRows);
    } catch (e) {
      setRows([]);
      console.error(e);
    }
  }, [examinations]);

  const handleReloadExaminations = async () => {
    setIsLoading(true);

    await handleLoadExaminations();

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-end">
        <Button
          variant={'outline'}
          size={'icon'}
          onClick={handleReloadExaminations}
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
              const newSelected = examinations.flatMap((ex) =>
                ex.id === lastId ? [ex] : []
              );
              setSelectedExaminations(newSelected);
            }}
            pageSizeOptions={[10]}
            disableRowSelectionOnClick
          />
        </ThemeProvider>
      </div>
    </div>
  );
};

export default ExaminationTable;
