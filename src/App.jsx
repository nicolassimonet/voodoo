import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import TarotPage from './pages/TarotPage';
import VoodooPage from './pages/VoodooPage';

const App = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<TarotPage />} />
        <Route path="/voodoo" element={<VoodooPage />} />
      </Routes>
    </Router>
  );
};

export default App;
