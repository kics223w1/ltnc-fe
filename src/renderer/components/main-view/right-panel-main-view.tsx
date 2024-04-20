import { useEffect, useState } from 'react';
import HeaderRightPanel from '../header/HeaderRightPanel';
import {
  EVENTS_FROM_MAIN_PROCESS,
  MAIN_VIEW_TAB,
} from '../../../main/models/constants';
import OtherStaffTable from '../table/OtherStaffTable';
import PatientAppointment from '../patient/PatientAppointment';
import DoctorList from '../staff/DoctorList';
import PatientBooking from '../patient/PatientBooking';
import PatientHistory from '../patient/PatientHistory';
import PatientBilling from '../patient/PatientBilling';
import NurseList from '../staff/NurseList';
import AdminDoctorDashboard from '../admin/AdminDoctorDashboard';
import OtherStaffList from '../staff/OtherStaffList';
import AdminNurseDashboard from '../admin/AdminNurseDashboard';
import AdminOtherStaffDashboard from '../admin/AdminOtherStaffDashboard';
import AdminMachineDashboard from '../admin/AdminMachineDashboard';
import Management from '../staff/Management';

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
    case MAIN_VIEW_TAB.DOCTOR_LIST:
      return <DoctorList />;
    case MAIN_VIEW_TAB.NURSE_INFORMATION:
      return <NurseList />;
    case MAIN_VIEW_TAB.OTHER_STAFFS_INFORMATION:
      return <OtherStaffList />;
    case MAIN_VIEW_TAB.STAFF_MANAGEMENT:
      return <Management />;
    case MAIN_VIEW_TAB.PATIENT_APPOINTMENT:
      return <PatientAppointment />;
    case MAIN_VIEW_TAB.PATIENT_BOOKING:
      return <PatientBooking />;
    case MAIN_VIEW_TAB.PATIENT_HISTORY:
      return <PatientHistory />;
    case MAIN_VIEW_TAB.PATIENT_BILLING:
      return <PatientBilling />;
    case MAIN_VIEW_TAB.ADMIN_DOCTOR_DASHBOARD:
      return <AdminDoctorDashboard />;
    case MAIN_VIEW_TAB.ADMIN_NURSE_DASHBOARD:
      return <AdminNurseDashboard />;
    case MAIN_VIEW_TAB.ADMIN_OTHER_STAFF_DASHBOARD:
      return <AdminOtherStaffDashboard />;
    case MAIN_VIEW_TAB.ADMIN_MACHINE_DASHBOARD:
      return <AdminMachineDashboard />;
    default:
      return <></>;
  }
};

export default RightPanelMainView;
