import {
  CaretDownIcon,
  CaretRightIcon,
  CaretSortIcon,
} from '@radix-ui/react-icons';
import IconSVG from '../utils/icon-svg';
import { ICON_SVG } from '/renderer/models/constants';
import { useState } from 'react';

const TreeLeftPanel = () => {
  const [isTableMenuVisible, setIsTableMenuVisible] = useState(true);

  return (
    <div className="w-full h-full flex flex-col px-2 pt-5">
      <div
        onClick={() => {
          setIsTableMenuVisible(!isTableMenuVisible);
        }}
        className="flex items-center gap-1 w-full px-2 py-[2px] hover:bg-hoverBackground rounded cursor-pointer"
      >
        <IconSVG css="w-5 h-5" iconName={ICON_SVG.TABLE_CELL_1} style={{}} />
        <span className="text-base font-customSemiBold">Table</span>
      </div>

      <div className="flex flex-col items-center gap-2 mt-2">
        <div className="flex items-center gap-1 w-full px-7 py-[2px] hover:bg-hoverBackground rounded cursor-pointer">
          <IconSVG css="w-5 h-5" style={{}} iconName={ICON_SVG.PERSON_2_1} />
          <span className="text-base font-customMedium">Doctor Table</span>
        </div>
        <div className="flex items-center gap-1 w-full px-7 py-[2px] hover:bg-hoverBackground rounded cursor-pointer">
          <IconSVG css="w-5 h-5" style={{}} iconName={ICON_SVG.PERSON_2_1} />
          <span className="text-base font-customMedium">Doctor Table</span>
        </div>
        <div className="flex items-center gap-1 w-full px-7 py-[2px] hover:bg-hoverBackground rounded cursor-pointer">
          <IconSVG css="w-5 h-5" style={{}} iconName={ICON_SVG.PERSON_2_1} />
          <span className="text-base font-customMedium">Doctor Table</span>
        </div>
        <div className="flex items-center gap-1 w-full px-7 py-[2px] hover:bg-hoverBackground rounded cursor-pointer">
          <IconSVG css="w-5 h-5" style={{}} iconName={ICON_SVG.PERSON_2_1} />
          <span className="text-base font-customMedium">Doctor Table</span>
        </div>
        <div className="flex items-center gap-1 w-full px-7 py-[2px] hover:bg-hoverBackground rounded cursor-pointer">
          <IconSVG css="w-5 h-5" style={{}} iconName={ICON_SVG.PERSON_2_1} />
          <span className="text-base font-customMedium">Doctor Table</span>
        </div>
      </div>

      <div
        onClick={() => {
          setIsTableMenuVisible(!isTableMenuVisible);
        }}
        className="flex items-center gap-1 w-full px-2 py-[2px] mt-5 hover:bg-hoverBackground rounded cursor-pointer"
      >
        <IconSVG css="w-5 h-5" iconName={ICON_SVG.TABLE_CELL_1} style={{}} />
        <span className="text-base font-customSemiBold">Table</span>
      </div>

      <div className="flex flex-col items-center gap-2 mt-1">
        <div className="flex items-center gap-1 w-full px-7 py-[2px] hover:bg-hoverBackground rounded cursor-pointer">
          <IconSVG css="w-5 h-5" style={{}} iconName={ICON_SVG.PERSON_2_1} />
          <span className="text-base font-customMedium">Doctor Table</span>
        </div>
        <div className="flex items-center gap-1 w-full px-7 py-[2px] hover:bg-hoverBackground rounded cursor-pointer">
          <IconSVG css="w-5 h-5" style={{}} iconName={ICON_SVG.PERSON_2_1} />
          <span className="text-base font-customMedium">Doctor Table</span>
        </div>
        <div className="flex items-center gap-1 w-full px-7 py-[2px] hover:bg-hoverBackground rounded cursor-pointer">
          <IconSVG css="w-5 h-5" style={{}} iconName={ICON_SVG.PERSON_2_1} />
          <span className="text-base font-customMedium">Doctor Table</span>
        </div>
        <div className="flex items-center gap-1 w-full px-7 py-[2px] hover:bg-hoverBackground rounded cursor-pointer">
          <IconSVG css="w-5 h-5" style={{}} iconName={ICON_SVG.PERSON_2_1} />
          <span className="text-base font-customMedium">Doctor Table</span>
        </div>
        <div className="flex items-center gap-1 w-full px-7 py-[2px] hover:bg-hoverBackground rounded cursor-pointer">
          <IconSVG css="w-5 h-5" style={{}} iconName={ICON_SVG.PERSON_2_1} />
          <span className="text-base font-customMedium">Doctor Table</span>
        </div>
      </div>
    </div>
  );
};

export default TreeLeftPanel;
