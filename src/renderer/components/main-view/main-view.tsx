import LeftPanelMainView from './left-panel-main-view';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '~/components/ui/resizable';
import RightPanelMainView from './right-panel-main-view';
import User from '../../../main/models/user';

type Props = {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
};

const MainView = ({ user, setUser }: Props) => {
  return (
    <ResizablePanelGroup direction="horizontal" className="w-full h-full">
      <ResizablePanel defaultSize={20}>
        <LeftPanelMainView user={user} />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={80} className="w-full h-full">
        <RightPanelMainView user={user} setUser={setUser} />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default MainView;
