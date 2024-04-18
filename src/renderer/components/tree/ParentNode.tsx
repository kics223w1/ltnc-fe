import { MAIN_VIEW_TAB } from '../../../main/models/constant';
import { ICON_SVG } from '../../models/constants';
import IconSVG from '../utils/icon-svg';
import ChildrenNode from './ChildrenNode';

type Params = {
  title: string;
  tabs: MAIN_VIEW_TAB[];
  currentTab: MAIN_VIEW_TAB;
  setCurrentTab: (tab: MAIN_VIEW_TAB) => void;
};

const ParentNode = ({ title, tabs, currentTab, setCurrentTab }: Params) => {
  return (
    <>
      <div className="flex items-center gap-1 mt-5 w-full px-2 py-[2px] hover:bg-hoverBackground rounded cursor-pointer truncate">
        <div className="w-5 h-5 flex flex-shrink-0">
          <IconSVG css="w-5 h-5" iconName={ICON_SVG.FOLDER} style={{}} />
        </div>
        <span className="text-base font-customSemiBold">{title}</span>
      </div>

      <div className="flex flex-shrink-0 flex-col items-center gap-2 mt-2">
        {tabs.map((tab, index) => {
          return (
            <ChildrenNode
              key={`${title}_${index}_${tab}`}
              tab={tab}
              icon={ICON_SVG.DOC}
              setCurrentTab={setCurrentTab}
              currentTab={currentTab}
            />
          );
        })}
      </div>
    </>
  );
};

export default ParentNode;
