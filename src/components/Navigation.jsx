// Importation des dépendances React et de react-router
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Composant Navigation avec la prop visible pour gérer l'affichage
const Navigation = () => {
  // Hook pour obtenir la location actuelle (URL)
  const location = useLocation();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos, visible]);

  return (
    // Barre de navigation avec classe conditionnelle pour l'affichage
    <nav className={`main-nav ${visible ? 'nav-visible' : 'nav-hidden'}`}>
      <div className="nav-content">
        {/* Lien vers la page d'accueil */}
        <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
          <span>Ingeneria Support</span>
        </Link>
        
        {/* Lien vers la page Voodoo */}
        <Link to="/voodoo" className={`nav-link ${location.pathname === '/voodoo' ? 'active' : ''}`}>
          <span>Voodoo Projet</span>
        </Link>
        
        {/* Lien vers la page Équipe */}
        <Link to="/team" className={`nav-link ${location.pathname === '/team' ? 'active' : ''}`}>
          <span>Équipe</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
