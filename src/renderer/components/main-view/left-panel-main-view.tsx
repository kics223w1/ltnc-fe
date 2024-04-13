import TreeLeftPanel from '../tree/TreeLeftPanel';

const LeftPanelMainView = () => {
  return (
    <div className="w-full h-full flex flex-col overflow-x-hidden">
      <div className="w-full h-full">
        <div className="w-full h-[45.5px] border-b border-border"></div>

        <TreeLeftPanel />
      </div>
      <div className="w-full h-12 border-t border-border"></div>
    </div>
  );
};

export default LeftPanelMainView;
