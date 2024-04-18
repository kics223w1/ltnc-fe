import { useEffect, useState } from 'react';
import HeaderRightPanel from '../header/HeaderRightPanel';
import { EVENTS_FROM_MAIN_PROCESS, MAIN_VIEW_TAB } from '/main/models/constant';
import DoctorTable from '../table/DoctorTable';
import NurseTable from '../table/NurseTable';
import OtherStaffTable from '../table/OtherStaffTable';
import PatientAppointment from '../patient/PatientAppointment';
import DoctorList from '../staff/DoctorList';
import PatientBooking from '../patient/PatientBooking';

const RightPanelMainView = () => {
  const [currentTab, setCurrentTab] = useState(MAIN_VIEW_TAB.DOCTOR_LIST);

  useEffect(() => {
    const ipcListener1 = window.electron.ipcRenderer.on(
      EVENTS_FROM_MAIN_PROCESS.ON_UPDATE_MAIN_VIEW,
      (newTab: MAIN_VIEW_TAB) => {
        setCurrentTab(newTab);
      }
    );

    // Remove listener when component unmount
    return () => {
      if (ipcListener1) {
        ipcListener1();
      }
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-full flex flex-col">
        <HeaderRightPanel />
        {buildView(currentTab)}
      </div>
      <div className="w-full h-12 border-t border-border"></div>
    </div>
  );
};

const buildView = (tab: MAIN_VIEW_TAB) => {
  switch (tab) {
    case MAIN_VIEW_TAB.DOCTOR_LIST:
      return <DoctorList />;
    case MAIN_VIEW_TAB.NURSE_INFORMATION:
      return <NurseTable />;
    case MAIN_VIEW_TAB.OTHER_STAFFS_INFORMATION:
      return <OtherStaffTable />;
    case MAIN_VIEW_TAB.PATIENT_APPOINTMENT:
      return <PatientAppointment />;
    case MAIN_VIEW_TAB.PATIENT_BOOKING:
      return <PatientBooking />;
    default:
      return <></>;
  }
};

export default RightPanelMainView;
