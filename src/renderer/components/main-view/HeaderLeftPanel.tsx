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
    ></div>
  );
}
