import path from 'path';
import { OS_PLATFORM } from './models/constants';

export let resolveHtmlPath: (htmlFileName: string) => string;

if (process.env.NODE_ENV === 'development') {
  const port = process.env.PORT || 1212;
  resolveHtmlPath = (htmlFileName: string) => {
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  };
} else {
  resolveHtmlPath = (htmlFileName: string) => {
    return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
  };
}

const getOSPlatform = (): OS_PLATFORM => {
  switch (process.platform) {
    case 'darwin':
      return OS_PLATFORM.MAC_OS;
    case 'win32':
      return OS_PLATFORM.WINDOWS;
    case 'linux':
      return OS_PLATFORM.LINUX;
    default:
      return OS_PLATFORM.UKNOWN;
  }
};

export { getOSPlatform };
