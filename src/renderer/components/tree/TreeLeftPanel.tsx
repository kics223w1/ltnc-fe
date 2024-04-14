import IconSVG from '../utils/icon-svg';
import { ICON_SVG } from '/renderer/models/constants';
import { EVENTS_FROM_MAIN_PROCESS, MAIN_VIEW_TAB } from '/main/models/constant';
import { useEffect, useState } from 'react';
import ChildrenNode from './ChildrenNode';

const TreeLeftPanel = () => {
  const [currentTab, setCurrentTab] = useState(
    MAIN_VIEW_TAB.DOCTOR_INFORMATION
  );

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage(
      EVENTS_FROM_MAIN_PROCESS.ON_UPDATE_MAIN_VIEW,
      {
        tab: currentTab,
      }
    );
  }, [currentTab]);

  return (
    <div className="w-full h-full flex flex-col px-2 pt-5">
      <div className="flex items-center gap-1 w-full px-2 py-[2px] hover:bg-hoverBackground rounded cursor-pointer">
        <IconSVG css="w-5 h-5" iconName={ICON_SVG.TABLE_CELL_1} style={{}} />
        <span className="text-base font-customSemiBold">Staff</span>
      </div>

      <div className="flex flex-col items-center gap-2 mt-2">
        <ChildrenNode
          tab={MAIN_VIEW_TAB.DOCTOR_INFORMATION}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          icon={ICON_SVG.TABLE_CELL_1}
        />

        <ChildrenNode
          tab={MAIN_VIEW_TAB.NURSE_INFORMATION}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          icon={ICON_SVG.TABLE_CELL_1}
        />

        <ChildrenNode
          tab={MAIN_VIEW_TAB.OTHER_STAFFS_INFORMATION}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          icon={ICON_SVG.TABLE_CELL_1}
        />

        <ChildrenNode
          tab={MAIN_VIEW_TAB.STAFF_MANAGEMENT}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          icon={ICON_SVG.TABLE_CELL_1}
        />
      </div>
    </div>
  );
};

export default TreeLeftPanel;
