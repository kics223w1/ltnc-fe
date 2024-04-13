import LeftPanelMainView from './left-panel-main-view';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '~/components/ui/resizable';
import RightPanelMainView from './right-panel-main-view';

const MainView = () => {
  return (
    <ResizablePanelGroup direction="horizontal" className="w-full h-full">
      <ResizablePanel defaultSize={30}>
        <LeftPanelMainView />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={70} className="w-full h-full">
        <RightPanelMainView />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default MainView;
