import {
  EVENTS_FROM_MAIN_PROCESS,
  MAIN_VIEW_TAB,
  ROLE,
} from '../../../main/models/constants';
import { useEffect, useState } from 'react';
import ParentNode from './ParentNode';
import User from '../../../main/models/user';

type TreeLeftPanelProps = {
  user: User | undefined;
};

const TreeLeftPanel = ({ user }: TreeLeftPanelProps) => {
  const [currentTab, setCurrentTab] = useState(MAIN_VIEW_TAB.PATIENT_BOOKING);
  const userRole = user?.role;

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

  const handleSetCurrentTab = (tab: MAIN_VIEW_TAB) => {
    setCurrentTab(tab);
    window.electron.ipcRenderer.sendMessage(
      EVENTS_FROM_MAIN_PROCESS.ON_UPDATE_MAIN_VIEW,
      {
        tab,
      }
    );
  };

  return (
    <div className="w-full h-full flex flex-col px-2">
      <ParentNode
        tabs={[
          MAIN_VIEW_TAB.PATIENT_BOOKING,
          MAIN_VIEW_TAB.PATIENT_APPOINTMENT,
        ]}
        title={'Bệnh nhân'}
        setCurrentTab={handleSetCurrentTab}
        currentTab={currentTab}
      ></ParentNode>

      <ParentNode
        tabs={
          userRole && userRole !== ROLE.PATIENT
            ? [
                MAIN_VIEW_TAB.DOCTOR_LIST,
                MAIN_VIEW_TAB.NURSE_LIST,
                MAIN_VIEW_TAB.PATIENT_LIST,
                MAIN_VIEW_TAB.MANAGEMENT_EXAMINATION,
              ]
            : [MAIN_VIEW_TAB.DOCTOR_LIST, MAIN_VIEW_TAB.NURSE_LIST]
        }
        title={'Nhân viên'}
        setCurrentTab={handleSetCurrentTab}
        currentTab={currentTab}
      ></ParentNode>

      {userRole === ROLE.ADMIN && (
        <ParentNode
          tabs={[
            MAIN_VIEW_TAB.ADMIN_DOCTOR_DASHBOARD,
            MAIN_VIEW_TAB.ADMIN_NURSE_DASHBOARD,
            MAIN_VIEW_TAB.ADMIN_MACHINE_DASHBOARD,
          ]}
          title={'Quản trị viên'}
          setCurrentTab={handleSetCurrentTab}
          currentTab={currentTab}
        ></ParentNode>
      )}
    </div>
  );
};

export default TreeLeftPanel;
