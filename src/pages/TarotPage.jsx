// Importation des dépendances React nécessaires
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Particles from '../components/Particles'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { registerLocale, setDefaultLocale } from 'react-datepicker'
import fr from 'date-fns/locale/fr'
import AnimatedTarotCards from '../components/AnimatedTarotCards'

// Importation des plugins GSAP nécessaires
gsap.registerPlugin(ScrollTrigger)
registerLocale('fr', fr)
setDefaultLocale('fr')

// Composant principal de la page Tarot
const TarotPage = () => {
  // Référence pour le conteneur principal
  const containerRef = useRef(null)
  // Référence pour le titre principal
  const titleRef = useRef(null)
  
  // États pour gérer les dates et heures sélectionnées
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  // État pour gérer l'échelle d'animation
  const [animationScale, setAnimationScale] = useState(1)

  // Fonction pour filtrer les dates disponibles
  const isWeekday = (date) => {
    const day = date.getDay()
    if (day === 0 || day === 6) return false
    const currentDate = new Date()
    return date > currentDate
  }

  // Fonction pour générer les créneaux horaires
  const generateTimeSlots = () => {
    const timeSlots = []
    for (let hour = 10; hour <= 17; hour++) {
      timeSlots.push(`${hour}:00`)
      if (hour !== 17) {
        timeSlots.push(`${hour}:30`)
      }
    }
    return timeSlots
  }

  // Gestionnaire pour le changement de date
  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  // Gestionnaire pour la sélection de l'heure
  const handleTimeSelection = (time) => {
    setSelectedTime(time)
  }

  // Effet pour gérer les animations et les événements de défilement
  useEffect(() => {
    // Gestionnaire pour le redimensionnement de la fenêtre
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

    // Contexte GSAP pour les animations
    const ctx = gsap.context(() => {
      // Animation des sections adaptative
      gsap.from('.concept-section', {
        y: 50 * animationScale,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '.concept-section',
          start: 'top bottom-=100',
          end: 'top center',
          toggleActions: 'play none none reverse'
        }
      });

      gsap.from('.booking-section', {
        y: 50 * animationScale,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '.booking-section',
          start: 'top bottom-=100',
          end: 'top center',
          toggleActions: 'play none none reverse'
        }
      });

      gsap.fromTo(
        titleRef.current,
        { 
          opacity: 0, 
          y: 50 * animationScale 
        },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.5,
          ease: "power2.out",
          clearProps: "all"
        }
      ).then(() => {
        gsap.set(titleRef.current, { opacity: 1 });
      });
    }, containerRef);

    // Nettoyage des événements et du contexte GSAP
    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, [animationScale]);

  return (
    <div className="tarot-page" ref={containerRef}>
      {/* Composant de particules */}
      <Particles />
      
      {/* Section héro avec le titre principal */}
      <section className="hero">
        <h1 ref={titleRef}>
          Ingeneria Support
        </h1>
      </section>

      {/* Section des cartes de tarot animées */}
      <AnimatedTarotCards />

      {/* Section de présentation du concept */}
      <section className="concept-section">
        <div className="concept-content">
          <div className="concept-text">
            <h2>Amulettes et Talismans</h2>
            
            <div className="concept-features">
              <div className="feature">
                <h3>Amulettes</h3>
                <p>28€</p>
                <p>Un objet magique de protection, chargé d'énergie protectrice pour son porteur.</p>
              </div>
              
              <div className="feature">
                <h3>Talismans</h3>
                <p>54€</p>
                <p>Un talisman est actif et apporte un bénéfice spécifique : chance, prospérité ou réussite dans un domaine particulier.</p>
              </div>
              
              <div className="feature">
                <h3>Sagesse Ancestrale</h3>
                <p>Les talismans sont chargés d'une intention particulière lors de rituels, d'invocations, ou de bénédictions. Ils sont imprégnés d'énergie cosmique ou spirituelle et doivent être activés.</p>
              </div>
              
              <div className="feature">
                <h3>Affirmations Positives</h3>
                <p>Cinq lignes pour vos mantras personnalisés, renforçant votre intention et votre motivation.</p>
              </div>
            </div>
          </div>

          <div className="concept-illustration">
            <div className="mini-template">
              <div className="mini-project-space"></div>
              <div className="mini-cards">
                <div className="mini-card"></div>
                <div className="mini-card"></div>
                <div className="mini-card"></div>
              </div>
              <div className="mini-rune"></div>
              <div className="mini-mantras">
                <div className="mini-mantra"></div>
                <div className="mini-mantra"></div>
                <div className="mini-mantra"></div>
                <div className="mini-mantra"></div>
                <div className="mini-mantra"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section de réservation */}
      <section className="booking-section">
        <div className="booking-content">
          <div className="session-info">
            <h2>Réserver une séance</h2>
            <div className="info-item">
              <i className="fas fa-clock"></i>
              <strong>Durée de la séance</strong>
              <p>1 heure de consultation personnalisée</p>
            </div>
            <div className="info-item">
              <i className="fas fa-euro-sign"></i>
              <strong>Tarif</strong>
              <p>60€ par séance</p>
            </div>
            <div className="info-item">
              <i className="fas fa-video"></i>
              <strong>Format</strong>
              <p>Séance en visioconférence via Zoom</p>
              <p>Lien envoyé après la réservation</p>
            </div>
          </div>

          <div className="calendar-container">
            <h3>Choisissez votre créneau</h3>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              inline
              locale="fr"
              minDate={new Date()}
              filterDate={isWeekday}
              placeholderText="Sélectionnez une date"
            />
            
            {selectedDate && (
              <div className="time-slots">
                <div className="time-buttons">
                  {generateTimeSlots().map((time, index) => (
                    <button
                      key={index}
                      onClick={() => handleTimeSelection(time)}
                      className={selectedTime === time ? 'selected' : ''}
                    >
                      {time}
                    </button>
                  ))}
                </div>
                {selectedTime && (
                  <button className="confirm-booking">
                    Confirmer la réservation
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default TarotPage
