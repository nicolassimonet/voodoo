// Importation des dépendances React et GSAP
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Enregistrement du plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Tableau des cartes de tarot
const cards = [
  {
    name: "Le Magicien",
    image: "https://www.trustedtarot.com/img/cards/the-magician.png"
  },
  {
    name: "La Grande Prêtresse",
    image: "https://www.trustedtarot.com/img/cards/the-high-priestess.png"
  },
  {
    name: "L'Impératrice",
    image: "https://www.trustedtarot.com/img/cards/the-empress.png"
  },
  {
    name: "L'Empereur",
    image: "https://www.trustedtarot.com/img/cards/the-emperor.png"
  },
  {
    name: "La Force",
    image: "https://www.trustedtarot.com/img/cards/strength.png"
  }
];

// Composant pour les cartes de tarot animées
const AnimatedTarotCards = () => {
  // Référence pour les cartes
  const cardsRef = useRef([]);
  // État pour l'échelle d'animation
  const [animationScale, setAnimationScale] = useState(1);

  useEffect(() => {
    // Fonction de gestion de la taille de la fenêtre
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setAnimationScale(0.5);
      } else if (window.innerWidth <= 768) {
        setAnimationScale(0.7);
      } else {
        setAnimationScale(1);
      }
    };

    // Appel initial de la fonction de gestion de la taille
    handleResize();
    // Ajout de l'événement de redimensionnement
    window.addEventListener('resize', handleResize);

    // Sélection des éléments de carte
    const cardElements = cardsRef.current;

    // Animation pour chaque carte
    cardElements.forEach((card, index) => {
      // Configuration de l'animation au défilement
      ScrollTrigger.create({
        trigger: card,
        start: "top bottom-=100",
        end: "bottom top+=100",
        onEnter: () => {
          // Ajout de la classe 'visible' à la carte
          card.classList.add('visible');
          // Animation de flottement adaptative
          gsap.to(card, {
            y: `+=${20 * animationScale}`,
            rotation: `+=${5 * animationScale}`,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
          });
        },
        onLeave: () => {
          // Suppression de la classe 'visible' de la carte
          card.classList.remove('visible');
          // Arrêt des animations de la carte
          gsap.killTweensOf(card);
        },
        onEnterBack: () => {
          // Ajout de la classe 'visible' à la carte
          card.classList.add('visible');
          // Réactivation de l'animation de flottement
          gsap.to(card, {
            y: `+=${20 * animationScale}`,
            rotation: `+=${5 * animationScale}`,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
          });
        },
        onLeaveBack: () => {
          // Suppression de la classe 'visible' de la carte
          card.classList.remove('visible');
          // Arrêt des animations de la carte
          gsap.killTweensOf(card);
        }
      });
    });

    // Nettoyage lors du démontage
    return () => {
      // Suppression de l'événement de redimensionnement
      window.removeEventListener('resize', handleResize);
      // Arrêt des animations et suppression des déclencheurs
      cardElements.forEach(card => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        gsap.killTweensOf(card);
      });
    };
  }, [animationScale]);

  return (
    // Section des cartes de tarot avec animation
    <div className="tarot-cards-section">
      <div className="tarot-cards-container">
        {cards.map((card, index) => (
          <div
            key={card.name}
            ref={el => cardsRef.current[index] = el}
            className="tarot-card"
          >
            <div className="card-inner">
              <img src={card.image} alt={card.name} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedTarotCards;
