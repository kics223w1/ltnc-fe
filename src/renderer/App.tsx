import './App.css';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { FocusStyleManager } from '@blueprintjs/core';
import MainView from './components/main-view/main-view';
import { ThemeProvider } from './components/theme/ThemeProvider';
import { Toaster } from '~/components/ui/toaster';
import { useEffect, useState } from 'react';
import {
  EVENTS_FROM_MAIN_PROCESS,
  LOGIN_SERVICE,
  ROLE,
} from '../main/models/constants';
import HomePageView from './components/main-view/HomePageView';

// Bug blue outline, Ref: https://github.com/palantir/blueprint/issues/2691
FocusStyleManager.onlyShowFocusOnTabs();

const MainApp = () => {
  const [userRole, setUserRole] = useState<ROLE | undefined>(undefined);

  useEffect(() => {
    const setup = async () => {
      const newUserRole = await window.electron.ipcRenderer.invoke(
        LOGIN_SERVICE.GET_USER_ROLE,
        {}
      );
      setUserRole(newUserRole);
    };
    setup();
  }, []);

  useEffect(() => {
    const ipcListener = window.electron.ipcRenderer.on(
      EVENTS_FROM_MAIN_PROCESS.ON_UPDATE_USER_ROLE,
      (obj: { role: ROLE | undefined }) => {
        setUserRole(obj.role);
      }
    );

    return () => {
      if (ipcListener) {
        ipcListener();
      }
    };
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex flex-col h-screen w-screen overflow-hidden">
        {userRole ? (
          <>
            <MainView userRole={userRole} setUserRole={setUserRole} />
          </>
        ) : (
          <>
            <HomePageView />
          </>
        )}
        <Toaster />
      </div>
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
