import { useEffect, useState } from 'react';
import HeaderRightPanel from '../header/HeaderRightPanel';
import { EVENTS_FROM_MAIN_PROCESS, MAIN_VIEW_TAB } from '/main/models/constant';
import StaffInformationTab from '../staff/StaffInformationTab';
import DoctorTable from '../table/DoctorTable';
import NurseTable from '../table/NurseTable';
import OtherStaffTable from '../table/OtherStaffTable';

const RightPanelMainView = () => {
  const [currentTab, setCurrentTab] = useState(
    MAIN_VIEW_TAB.DOCTOR_INFORMATION
  );

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
        {currentTab === MAIN_VIEW_TAB.DOCTOR_INFORMATION && <DoctorTable />}
        {currentTab === MAIN_VIEW_TAB.NURSE_INFORMATION && <NurseTable />}
        {currentTab === MAIN_VIEW_TAB.OTHER_STAFFS_INFORMATION && (
          <OtherStaffTable />
        )}
      </div>
      <div className="w-full h-12 border-t border-border"></div>
    </div>
  );
};

export default RightPanelMainView;
