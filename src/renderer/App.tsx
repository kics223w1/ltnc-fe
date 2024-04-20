import './App.css';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { FocusStyleManager } from '@blueprintjs/core';
import MainView from './components/main-view/main-view';
import { ThemeProvider } from './components/theme/ThemeProvider';
import { Toaster } from '~/components/ui/toaster';

// Bug blue outline, Ref: https://github.com/palantir/blueprint/issues/2691
FocusStyleManager.onlyShowFocusOnTabs();

const MainApp = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex flex-col h-screen w-screen overflow-hidden">
        <MainView />
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
