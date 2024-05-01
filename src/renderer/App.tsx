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
} from '../main/models/constants';
import HomePageView from './components/main-view/HomePageView';
import User from '../main/models/user';

// Bug blue outline, Ref: https://github.com/palantir/blueprint/issues/2691
FocusStyleManager.onlyShowFocusOnTabs();

const MainApp = () => {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const setup = async () => {
      const newUser = await window.electron.ipcRenderer.invoke(
        LOGIN_SERVICE.GET_USER,
        {}
      );
      setUser(newUser);
    };
    setup();
  }, []);

  useEffect(() => {
    const ipcListener = window.electron.ipcRenderer.on(
      EVENTS_FROM_MAIN_PROCESS.ON_UPDATE_USER,
      (obj: { user: User | undefined }) => {
        setUser(obj.user);
      }
    );

    return () => {
      if (ipcListener) {
        ipcListener();
      }
    };
  }, []);

  console.log('User: ', user);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex flex-col h-screen w-screen overflow-hidden">
        {user ? (
          <>
            <MainView user={user} setUser={setUser} />
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
