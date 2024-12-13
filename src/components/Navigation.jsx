import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navigation = () => {
  const location = useLocation();
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <nav className={`main-nav ${visible ? 'nav-visible' : 'nav-hidden'}`}>
      <div className="nav-content">
        <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
          <i className="fas fa-tarot"></i>
          <span>Ingeneria Support</span>
        </Link>
        <Link to="/voodoo" className={`nav-link ${location.pathname === '/voodoo' ? 'active' : ''}`}>
          <i className="fas fa-skull"></i>
          <span>Voodoo Projet</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
