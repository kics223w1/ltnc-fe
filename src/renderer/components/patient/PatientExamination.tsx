import { Button } from '/~/components/ui/button';
import {
  EVENTS_FROM_MAIN_PROCESS,
  MAIN_VIEW_TAB,
  PATIENT_SERVICE,
} from '../../../main/models/constants';
import ExaminationTable from '../table/ExaminationTable';
import { useState } from 'react';
import Examination from '../../../main/models/examination';
import { Dialog, DialogTrigger } from '../../../~/components/ui/dialog';
import ExaminationInformation from '../dialog/ExaminationInformation';

type Params = {};

const PatientExamination = ({}: Params) => {
  const [examinations, setExaminations] = useState<Examination[]>([]);
  const [selectedExaminations, setSelectedExaminations] = useState<
    Examination[]
  >([]);

  const handleNewAppointment = () => {
    window.electron.ipcRenderer.sendMessage(
      EVENTS_FROM_MAIN_PROCESS.ON_UPDATE_MAIN_VIEW,
      {
        tab: MAIN_VIEW_TAB.PATIENT_BOOKING,
      }
    );
  };

  const handleLoadExaminations = async () => {
    const newExaminations: Examination[] =
      await window.electron.ipcRenderer.invoke(
        PATIENT_SERVICE.RELOAD_EXAMINATIONS,
        {}
      );
    setExaminations(newExaminations);
  };

  return (
    <div className="flex flex-col w-full h-full px-12 pt-10">
      <ExaminationTable
        handleLoadExaminations={handleLoadExaminations}
        examinations={examinations}
        setSelectedExaminations={setSelectedExaminations}
      />
      <div className="flex items-center justify-between gap-4 mt-5">
        <Dialog>
          <DialogTrigger disabled={selectedExaminations.length === 0}>
            <Button
              disabled={selectedExaminations.length === 0}
              variant={'default'}
              size={'lg'}
            >
              Xem chi tiết
            </Button>
          </DialogTrigger>
          {examinations.length > 0 && (
            <ExaminationInformation
              examination={examinations[examinations.length - 1]}
            />
          )}
        </Dialog>

        <div className="flex items-center gap-4">
          <Button variant={'outline'} size={'lg'}>
            Huỷ lịch
          </Button>
          <Button
            variant={'default'}
            size={'lg'}
            onClick={handleNewAppointment}
          >
            Đặt lịch
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PatientExamination;
