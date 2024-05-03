import { useEffect, useState } from 'react';
import { useTheme } from '../theme/ThemeProvider';
import { ICON_SVG } from '../../../main/models/constants';

type props = {
  id?: string;
  iconName: ICON_SVG;
  css: string;
  style: { [key: string]: string }; // Get the filter from https://codepen.io/sosuke/pen/Pjoqqp
};

const IconSVG = ({ id, iconName, css, style }: props) => {
  const src = require(`../../../../assets/toolbar-icons/${iconName}`);

  return (
    <img
      id={id ? id : ''}
      loading="lazy"
      draggable={false}
      className={`${css} select-none`}
      src={src.default}
      style={style}
    />
  );
};

export default IconSVG;
