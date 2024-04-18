import DoctorTable from '../table/DoctorTable';

const PatientBooking = () => {
  return (
    <div className="flex flex-col gap-10 px-12 pt-10">
      <DoctorTable />

      <div className="w-full h-px bg-border"></div>
    </div>
  );
};

export default PatientBooking;
