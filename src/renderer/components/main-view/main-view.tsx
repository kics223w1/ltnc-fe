//@ts-ignore
import Pane from '@proxymanllc/better-react-split-pane/lib/Pane';
//@ts-ignore
import SplitPane from '@proxymanllc/better-react-split-pane/lib/SplitPane';
import { useState } from 'react';
import LeftPanelMainView from './left-panel-main-view';
import TopPanelMainView from './top-panel-main-view';
import BottomNavigationBar from '../bottom/bottom-navigation-bar';
import TopNavigationBar from '../top/top-navigation-bar';
import BottomPanelMainView from './bottom-panel-main-view';

const MainView = () => {
  const [positionLeftPanel, setPositionLeftPanel] = useState<string>('20%');
  const [positionMiddlePanel, setPositionMiddlePanel] = useState<string>('80%');
  const [positionTopPanel, setPositionTopPanel] = useState<string>('40%');

  const handleChangeLayout1Size = (size: any) => {};

  const handleChangeLayout2Size = (size: any) => {};

  return (
    <div className="flex flex-col w-full h-full">
      <TopNavigationBar />
      <div className="flex items-center w-full h-[calc(100%-48px)]">
        <div className="w-16 h-full border-r border-[#414141]"></div>
        <div className="w-[calc(100%-64px)] h-full">
          <SplitPane
            split="horizontal"
            onChange={(size: any) => handleChangeLayout1Size(size)}
          >
            <Pane initialSize={positionTopPanel}>
              <TopPanelMainView />
            </Pane>
            <Pane>
              <BottomPanelMainView />
            </Pane>
          </SplitPane>
        </div>
      </div>
    </div>
  );
};

export default MainView;
