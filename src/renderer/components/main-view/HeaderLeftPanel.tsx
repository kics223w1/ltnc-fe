import {
  EVENTS_FROM_MAIN_PROCESS,
  ICON_SVG,
} from '../../../main/models/constants';
import IconSVG from '../utils/icon-svg';

const styleDrag: any = {
  WebkitAppRegion: 'drag',
};

const styleNoDrag: any = {
  WebkitAppRegion: 'no-drag',
};

export default function HeaderLeftPanel() {
  const handleCloseApp = () => {
    window.electron.ipcRenderer.sendMessage(
      EVENTS_FROM_MAIN_PROCESS.ON_CLOSE_APP,
      {}
    );
  };

  const handleToggleFullScreen = () => {
    window.electron.ipcRenderer.sendMessage(
      EVENTS_FROM_MAIN_PROCESS.ON_TOGGLE_FULL_SCREEN,
      {}
    );
  };

  const handleMinimizeApp = () => {
    window.electron.ipcRenderer.sendMessage(
      EVENTS_FROM_MAIN_PROCESS.ON_MINIMIZE_APP,
      {}
    );
  };

  return (
    <div
      className="flex flex-shrink-0 w-full h-12 pl-4 border-b border-border"
      style={styleDrag}
    >
      <div className="flex items-center gap-1.5 group" style={styleNoDrag}>
        <div
          className="flex items-center justify-center w-3.5 h-3.5 rounded-full bg-colorCloseButton"
          onClick={handleCloseApp}
        >
          <IconSVG
            iconName={ICON_SVG.XMARK}
            css="w-1.5 h-1.5 hidden group-hover:block"
            style={{}}
          />
        </div>
        <div
          className="flex items-center justify-center w-3.5 h-3.5 rounded-full bg-colorMinimizeButton"
          onClick={handleMinimizeApp}
        >
          <IconSVG
            iconName={ICON_SVG.MINUS}
            css="w-2 h-1.5 hidden group-hover:block"
            style={{}}
          />
        </div>
        <div
          className="flex items-center justify-center w-3.5 h-3.5 rounded-full bg-colorFullScreenButton"
          onClick={handleToggleFullScreen}
        >
          <IconSVG
            iconName={ICON_SVG.CHEVRON_UP_CHEVRON_DOWN}
            css="w-2 h-2 hidden group-hover:block -rotate-45"
            style={{}}
          />
        </div>
      </div>
    </div>
  );
}
