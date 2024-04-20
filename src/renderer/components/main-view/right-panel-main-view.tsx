import { useEffect, useState } from 'react';
import HeaderRightPanel from '../header/HeaderRightPanel';
import {
  EVENTS_FROM_MAIN_PROCESS,
  MAIN_VIEW_TAB,
} from '../../../main/models/constants';
import PatientExamination from '../patient/PatientExamination';
import DoctorList from '../staff/DoctorList';
import PatientBooking from '../patient/PatientBooking';
import PatientHistory from '../patient/PatientHistory';
import PatientBilling from '../patient/PatientBilling';
import NurseList from '../staff/NurseList';
import AdminDoctorDashboard from '../admin/AdminDoctorDashboard';
import OtherStaffList from '../staff/OtherStaffList';
import AdminNurseDashboard from '../admin/AdminNurseDashboard';
import AdminMachineDashboard from '../admin/AdminMachineDashboard';
import AdminMedicineDashboard from '../admin/AdminMedicineDashboard';
import PatientList from '../staff/PatientList';
import ManagementExamination from '../staff/ManagementExamination';
import MachineList from '../medicine-machine/MachineList';
import MedicineList from '../medicine-machine/MedicineList';

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
      <HeaderRightPanel />
      <div className="w-full h-[calc(100%-96px)]">{buildView(currentTab)}</div>
      <div className="flex flex-shrink-0 w-full h-12 border-t border-border"></div>
    </div>
  );
};

const buildView = (tab: MAIN_VIEW_TAB) => {
  switch (tab) {
    // Patient
    case MAIN_VIEW_TAB.PATIENT_APPOINTMENT:
      return <PatientExamination />;
    case MAIN_VIEW_TAB.PATIENT_BOOKING:
      return <PatientBooking />;

    // Staff
    case MAIN_VIEW_TAB.DOCTOR_LIST:
      return <DoctorList />;
    case MAIN_VIEW_TAB.NURSE_LIST:
      return <NurseList />;
    case MAIN_VIEW_TAB.PATIENT_LIST:
      return <PatientList />;

    case MAIN_VIEW_TAB.OTHER_STAFFS_INFORMATION:
      return <OtherStaffList />;
    case MAIN_VIEW_TAB.MANAGEMENT_EXAMINATION:
      return <ManagementExamination />;

    case MAIN_VIEW_TAB.PATIENT_HISTORY:
      return <PatientHistory />;
    case MAIN_VIEW_TAB.PATIENT_BILLING:
      return <PatientBilling />;
    case MAIN_VIEW_TAB.ADMIN_DOCTOR_DASHBOARD:
      return <AdminDoctorDashboard />;
    case MAIN_VIEW_TAB.ADMIN_NURSE_DASHBOARD:
      return <AdminNurseDashboard />;
    case MAIN_VIEW_TAB.ADMIN_MACHINE_DASHBOARD:
      return <AdminMachineDashboard />;
    case MAIN_VIEW_TAB.ADMIN_MEDICINE_DASHBOARD:
      return <AdminMedicineDashboard />;
    case MAIN_VIEW_TAB.MACHINE_LIST:
      return <MachineList />;
    case MAIN_VIEW_TAB.MEDICINE_LIST:
      return <MedicineList />;
    default:
      return <></>;
  }
};

export default RightPanelMainView;
