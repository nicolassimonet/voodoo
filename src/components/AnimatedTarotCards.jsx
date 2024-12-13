import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

const AnimatedTarotCards = () => {
  const cardsRef = useRef([]);
  const [animationScale, setAnimationScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setAnimationScale(0.5);
      } else if (window.innerWidth <= 768) {
        setAnimationScale(0.7);
      } else {
        setAnimationScale(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const cardElements = cardsRef.current;

    cardElements.forEach((card, index) => {
      // Animation d'apparition
      ScrollTrigger.create({
        trigger: card,
        start: "top bottom-=100",
        end: "bottom top+=100",
        onEnter: () => {
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
          card.classList.remove('visible');
          gsap.killTweensOf(card);
        },
        onEnterBack: () => {
          card.classList.add('visible');
          // Réactive l'animation de flottement
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
          card.classList.remove('visible');
          gsap.killTweensOf(card);
        }
      });
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      cardElements.forEach(card => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        gsap.killTweensOf(card);
      });
    };
  }, [animationScale]);

  return (
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
