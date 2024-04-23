import { ROLE } from '../../../main/models/constants';
import TreeLeftPanel from '../tree/TreeLeftPanel';
import HeaderLeftPanel from './HeaderLeftPanel';

type LeftPanelMainViewParams = {
  userRole: ROLE | undefined;
};

const LeftPanelMainView = ({ userRole }: LeftPanelMainViewParams) => {
  return (
    <div className="w-full h-full flex flex-col overflow-x-hidden">
      <div className="w-full h-full">
        <HeaderLeftPanel />

        <TreeLeftPanel userRole={userRole} />
      </div>
      <div className="flex flex-shrink-0 w-full h-12 border-t border-border"></div>
    </div>
  );
};

export default LeftPanelMainView;
