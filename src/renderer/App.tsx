import './App.css';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { FocusStyleManager } from '@blueprintjs/core';

// Bug blue outline, Ref: https://github.com/palantir/blueprint/issues/2691
FocusStyleManager.onlyShowFocusOnTabs();

const MainApp = () => {
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden"></div>
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
