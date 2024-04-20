import { Button } from '/~/components/ui/button';
import {
  EVENTS_FROM_MAIN_PROCESS,
  MAIN_VIEW_TAB,
  PATIENT_SERVICE,
} from '../../../main/models/constants';
import ExaminationTable from '../table/ExaminationTable';
import { useState } from 'react';
import Examination from '../../../main/models/examination';

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
      <div className="flex items-center justify-end gap-4 mt-5">
        <Button variant={'outline'} size={'lg'}>
          Huỷ lịch
        </Button>
        <Button variant={'default'} size={'lg'} onClick={handleNewAppointment}>
          Đặt lịch
        </Button>
      </div>
    </div>
  );
};

export default PatientExamination;
