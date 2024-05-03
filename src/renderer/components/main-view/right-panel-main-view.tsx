import { useEffect, useState } from 'react';
import HeaderRightPanel from '../header/HeaderRightPanel';
import {
  EVENTS_FROM_MAIN_PROCESS,
  MAIN_VIEW_TAB,
  ROLE,
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
import AdminMedicineDashboard from '../admin/AdminMedicineDasboard';
import PatientList from '../staff/PatientList';
import ManagementExamination from '../staff/ManagementExamination';
import User from '../../../main/models/user';
import AdminBatchDashboard from '../admin/AdminBatchDasboard';

type TreeLeftPanelProps = {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
};

const RightPanelMainView = ({ user, setUser }: TreeLeftPanelProps) => {
  const [currentTab, setCurrentTab] = useState(MAIN_VIEW_TAB.PATIENT_BOOKING);

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
      <HeaderRightPanel user={user} setUser={setUser} />
      <div className="w-full h-[calc(100%-96px)]">{buildView(currentTab)}</div>
      <div className="flex flex-shrink-0 items-center w-full h-12 pl-12 border-t border-border">
        <span className="text-sm text-muted-foreground">
          © 2024 Đại học Bách Khoa Thành Phố Hồ Chí Minh - BTL Lập trình nâng
          cao
        </span>
      </div>
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
    case MAIN_VIEW_TAB.ADMIN_MEDICINE_DASHBOARD:
      return <AdminMedicineDashboard />;
    case MAIN_VIEW_TAB.ADMIN_BATCH_DASHBOARD:
      return <AdminBatchDashboard />;
    case MAIN_VIEW_TAB.ADMIN_MACHINE_DASHBOARD:
      return <AdminMachineDashboard />;
    default:
      return <></>;
  }
};

export default RightPanelMainView;
