import IconSVG from '../utils/icon-svg';
import { getTabTitle } from '../utils/utils';
import { MAIN_VIEW_TAB } from '/main/models/constant';
import { ICON_SVG } from '/renderer/models/constants';

type Params = {
  icon: ICON_SVG;
  tab: MAIN_VIEW_TAB;
  currentTab: MAIN_VIEW_TAB;
  setCurrentTab: (tab: MAIN_VIEW_TAB) => void;
};

const ChildrenNode = ({ icon, currentTab, tab, setCurrentTab }: Params) => {
  return (
    <div
      onClick={() => {
        setCurrentTab(tab);
      }}
      className={`flex items-center gap-1 w-full px-7 py-[2px] ${
        currentTab === tab ? 'bg-hoverBackground' : 'hover:bg-hoverBackground'
      } rounded cursor-pointer`}
    >
      <IconSVG css="w-5 h-5" style={{}} iconName={icon} />
      <span className="text-base font-customMedium">{getTabTitle(tab)}</span>
    </div>
  );
};

export default ChildrenNode;
