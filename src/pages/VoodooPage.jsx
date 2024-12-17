// Importation des dépendances React et composants
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Suspense, useState, useEffect } from 'react';
import * as THREE from 'three';
import Particles from '../components/Particles';

// Composant principal de la page Voodoo
function Triskel() {
  // État pour la mise à l'échelle du triskel en fonction de la taille de l'écran
  const [scale, setScale] = useState(1.6);

  useEffect(() => {
    // Fonction de gestion de la mise à l'échelle lors du redimensionnement de la fenêtre
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setScale(1.2);
      } else if (window.innerWidth <= 768) {
        setScale(1.4);
      } else {
        setScale(1.6);
      }
    };

    // Initialisation de la mise à l'échelle et ajout de l'écouteur d'événement
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    // Composant Float pour l'animation du triskel
    <Float
      speed={1}
      rotationIntensity={0.8}
      floatIntensity={1.5}
    >
      {/* Groupe pour la mise à l'échelle du triskel */}
      <group scale={scale}>
        {/* Branches du triskel */}
        {[0, 1, 2].map((i) => (
          <group key={i} rotation={[0, 0, (i * Math.PI * 2) / 3]}>
            {/* Branche principale */}
            <mesh>
              <torusGeometry args={[0.8, 0.05, 16, 100, Math.PI]} />
              <meshStandardMaterial 
                color="#c0a080"
                metalness={0.8}
                roughness={0.2}
                emissive="#ffd700"
                emissiveIntensity={0.3}
              />
            </mesh>
            
            {/* Spirale au bout */}
            <group position={[0.8, 0, 0]}>
              {[1, 0.7, 0.4].map((scale, j) => (
                <mesh key={j} scale={[scale, scale, 1]} position={[0.1 * j, 0, 0]}>
                  <torusGeometry args={[0.2, 0.05, 16, 100, Math.PI * 1.5]} />
                  <meshStandardMaterial 
                    color="#c0a080"
                    metalness={0.8}
                    roughness={0.2}
                    emissive="#ffd700"
                    emissiveIntensity={0.3}
                  />
                </mesh>
              ))}
            </group>
          </group>
        ))}

        {/* Effet de lumière central */}
        <mesh>
          <sphereGeometry args={[0.12, 32, 32]} />
          <meshStandardMaterial 
            color="#ffd700"
            emissive="#ffd700"
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
            transparent={true}
            opacity={0.8}
          />
        </mesh>

        {/* Halo lumineux */}
        <mesh>
          <ringGeometry args={[0.15, 0.8, 32]} />
          <meshBasicMaterial 
            color="#c0a080"
            transparent={true}
            opacity={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </Float>
  );
}

// Tableau de produits Voodoo
const voodooProducts = [
  {
    id: 1,
    name: "Poupée Protection",
    price: 89.99,
    image: "https://cdn.store-factory.com/www.lapinourose.com/content/pdtimg_4659910b.jpg?v=1636473390"
  },
  {
    id: 2,
    name: "Poupée Amour",
    price: 129.99,
    image: "https://stress-zero.fr/cdn/shop/products/squishy-poupee-vaudou-399.jpg?v=1632838245"
  },
  {
    id: 3,
    name: "Poupée Prospérité",
    price: 149.99,
    image: "https://nlcdeco.fr/file/2023/03/poupee-vaudou-geante-nlcdeco.jpg"
  },
  {
    id: 4,
    name: "Poupée Guérison",
    price: 109.99,
    image: "https://m.media-amazon.com/images/I/81VugjchnDL.jpg"
  }
];

// Composant pour une carte de produit
function ProductCard({ product }) {
  return (
    // Composant motion pour l'animation de la carte
    <motion.div
      className="product-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Image du produit */}
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      {/* Informations du produit */}
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        {/* Prix et bouton d'ajout au panier */}
        <div className="product-price">
          <span>{product.price}€</span>
          <button>Ajouter au panier</button>
        </div>
      </div>
    </motion.div>
  );
}

// Composant principal de la page Voodoo
function VoodooPage() {
  return (
    // Conteneur principal de la page
    <div className="voodoo-page">
      {/* Particules en arrière-plan */}
      <Particles />
      
      {/* Section héro avec titre */}
      <section className="hero-voodoo">
        <h1>Boutique Voodoo</h1>
      </section>

      {/* Section de présentation du modèle 3D */}
      <section className="model-section">
        {/* Canvas pour le rendu du modèle 3D */}
        <Canvas camera={{ position: [0, 0, 3.5] }}>  
          {/* Lumière ambiante */}
          <ambientLight intensity={0.2} />
          {/* Lumière ponctuelle */}
          <pointLight position={[0, 0, 2]} intensity={1} color="#FFD700" />
          {/* Composant de suspension pour le chargement du modèle */}
          <Suspense fallback={null}>
            <Triskel />
          </Suspense>
          {/* Contrôles d'orbite pour la navigation dans le modèle */}
          <OrbitControls enableZoom={false} />
        </Canvas>
      </section>

      {/* Section de présentation des produits */}
      <section className="shop-section">
        <h2>Nos Poupées Voodoo</h2>
        <p>Chaque poupée est unique, fabriquée à la main avec des matériaux soigneusement sélectionnés.</p>
        {/* Grille de produits */}
        <div className="products-grid">
          {voodooProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Section de contact */}
      <section className="contact-section">
        <h2>Contactez-nous</h2>
        <p>Pour toute question sur nos services ou produits</p>
        
        {/* Formulaire de contact */}
        <form className="contact-form">
          <div className="form-group">
            <input type="text" placeholder="Votre nom" required />
          </div>
          <div className="form-group">
            <input type="email" placeholder="Votre email" required />
          </div>
          <div className="form-group">
            <textarea placeholder="Votre message" rows="5" required></textarea>
          </div>
          <button type="submit" className="submit-btn">Envoyer</button>
        </form>
      </section>
    </div>
  );
}

export default VoodooPage;
