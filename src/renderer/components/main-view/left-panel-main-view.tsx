import TreeLeftPanel from '../tree/TreeLeftPanel';
import HeaderLeftPanel from './HeaderLeftPanel';

const LeftPanelMainView = () => {
  return (
    <div className="w-full h-full flex flex-col overflow-x-hidden">
      <div className="w-full h-full">
        <HeaderLeftPanel />

        <TreeLeftPanel />
      </div>
      <div className="flex flex-shrink-0 w-full h-12 border-t border-border"></div>
    </div>
  );
};

export default LeftPanelMainView;
