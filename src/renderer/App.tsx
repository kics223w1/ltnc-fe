import './App.css';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { FocusStyleManager } from '@blueprintjs/core';
import MainView from './components/main-view/main-view';
import { WINDOWS } from './models/constants';
import { useEffect, useState } from 'react';
import DialogLayout from './components/dialog/dialog-layout';
import { EVENTS_FROM_MAIN_PROCESS } from '/main/models/constant';
import { ThemeProvider } from './components/theme-provider';

// Bug blue outline, Ref: https://github.com/palantir/blueprint/issues/2691
FocusStyleManager.onlyShowFocusOnTabs();

const MainApp = () => {
  const [windowsID, setWindowsID] = useState<WINDOWS | undefined>(undefined);

  useEffect(() => {
    window.electron.ipcRenderer.on(
      EVENTS_FROM_MAIN_PROCESS.ON_SHOW_DIALOG,
      (newWindowsID: WINDOWS) => {
        console.log('huy vao ne: ', newWindowsID);
        setWindowsID(newWindowsID);
      }
    );
  }, []);

  const showErrorToaster = () => {};

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#161719]">
        <MainView />
      </div>
      {windowsID !== undefined && (
        <DialogLayout
          showErrorToaster={showErrorToaster}
          windowsID={windowsID}
          setWindowsID={setWindowsID}
        ></DialogLayout>
      )}
    </ThemeProvider>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp />} />
      </Routes>
    </Router>
  );
}
