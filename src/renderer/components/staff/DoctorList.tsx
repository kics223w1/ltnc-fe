import { useState } from 'react';
import DoctorTable from '../table/DoctorTable';
import Doctor from '/main/models/doctor';

const DoctorList = () => {
  const [selectedDoctors, setSelectedDoctors] = useState<Doctor[]>([]);

  return (
    <div className="flex flex-col pt-10 px-12 gap-5 w-full h-full">
      <div className="relative">
        <DoctorTable
          isAllowSelection={false}
          setSelectedDoctors={setSelectedDoctors}
        />
      </div>
    </div>
  );
};

export default DoctorList;
