import { useEffect, useState } from 'react';
import { useTheme } from '../theme/ThemeProvider';
import { ICON_SVG } from '../../../main/models/constantss';

type props = {
  id?: string;
  iconName: ICON_SVG;
  css: string;
  style: { [key: string]: string }; // Get the filter from https://codepen.io/sosuke/pen/Pjoqqp
};

const IconSVG = ({ id, iconName, css, style }: props) => {
  const { theme } = useTheme();
  const src = require(`../../../../assets/toolbar-icons/${iconName}`);

  const [filterText, setFilterText] = useState<string>('');

  useEffect(() => {
    if (theme === 'dark') {
      setFilterText(
        'invert(100%) sepia(100%) saturate(0%) hue-rotate(164deg) brightness(105%) contrast(106%)'
      );
    } else {
      setFilterText(
        'invert(97%) sepia(0%) saturate(10%) hue-rotate(231deg) brightness(79%) contrast(86%)'
      );
    }
  }, [theme]);

  return (
    <img
      id={id ? id : ''}
      loading="lazy"
      draggable={false}
      className={`${css} select-none`}
      src={src.default}
      style={{
        filter: filterText,
      }}
    />
  );
};

export default IconSVG;
