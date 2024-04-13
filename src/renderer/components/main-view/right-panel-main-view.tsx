import HeaderRightPanel from '../header/HeaderRightPanel';
import TableDoctor from '../table/TableDoctor';

const RightPanelMainView = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-full flex flex-col">
        <HeaderRightPanel />
        <TableDoctor />
      </div>
      <div className="w-full h-12 border-t border-border"></div>
    </div>
  );
};

export default RightPanelMainView;
