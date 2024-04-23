import LeftPanelMainView from './left-panel-main-view';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '~/components/ui/resizable';
import RightPanelMainView from './right-panel-main-view';
import { useEffect, useState } from 'react';
import { EVENTS_FROM_MAIN_PROCESS, ROLE } from '../../../main/models/constants';

const MainView = () => {
  const [userRole, setUserRole] = useState<ROLE | undefined>(undefined);

  return (
    <ResizablePanelGroup direction="horizontal" className="w-full h-full">
      <ResizablePanel defaultSize={20}>
        <LeftPanelMainView userRole={userRole} />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={80} className="w-full h-full">
        <RightPanelMainView userRole={userRole} setUserRole={setUserRole} />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default MainView;
