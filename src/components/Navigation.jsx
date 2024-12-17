// Importation des dépendances React et de react-router
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Composant Navigation avec la prop visible pour gérer l'affichage
const Navigation = () => {
  // Hook pour obtenir la location actuelle (URL)
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Fermer le menu quand on change de page
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`main-nav ${isVisible ? 'nav-visible' : 'nav-hidden'}`}>
      <div className="nav-content">
        {/* Logo/Home link always visible */}
        <Link to="/" className="nav-logo">
          <span>Ingeneria Support</span>
        </Link>

        {/* Burger Menu Button */}
        <button 
          className={`burger-menu ${isMenuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation Links */}
        <div className={`nav-links ${isMenuOpen ? 'show' : ''}`}>
          <Link 
            to="/voodoo" 
            className={`nav-link ${location.pathname === '/voodoo' ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <span>Voodoo Projet</span>
          </Link>
          <Link 
            to="/team" 
            className={`nav-link ${location.pathname === '/team' ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <span>Équipe</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
