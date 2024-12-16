import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TarotPage from './pages/TarotPage';
import VoodooPage from './pages/VoodooPage';
import TeamPage from './pages/TeamPage';
import Navigation from './components/Navigation';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<TarotPage />} />
        <Route path="/tarot" element={<TarotPage />} />
        <Route path="/voodoo" element={<VoodooPage />} />
        <Route path="/team" element={<TeamPage />} />
      </Routes>
    </Router>
  );
}

export default App;
