import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Suspense, useState, useEffect } from 'react';
import * as THREE from 'three';
import Particles from '../components/Particles';

function Triskel() {
  const [scale, setScale] = useState(1.6);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setScale(1.2);
      } else if (window.innerWidth <= 768) {
        setScale(1.4);
      } else {
        setScale(1.6);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Float
      speed={1}
      rotationIntensity={0.8}
      floatIntensity={1.5}
    >
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

function ProductCard({ product }) {
  return (
    <motion.div
      className="product-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="product-price">
          <span>{product.price}€</span>
          <button>Ajouter au panier</button>
        </div>
      </div>
    </motion.div>
  );
}

function VoodooPage() {
  return (
    <div className="voodoo-page">
      <Particles />
      
      <section className="hero-voodoo">
        <h1>Boutique Voodoo</h1>
      </section>

      <section className="model-section">
        <Canvas camera={{ position: [0, 0, 3.5] }}>  {/* Rapproché de 4 à 3.5 pour le triskel plus petit */}
          <ambientLight intensity={0.2} />
          <pointLight position={[0, 0, 2]} intensity={1} color="#FFD700" />
          <Suspense fallback={null}>
            <Triskel />
          </Suspense>
          <OrbitControls enableZoom={false} />
        </Canvas>
      </section>

      <section className="shop-section">
        <h2>Nos Poupées Voodoo</h2>
        <p>Chaque poupée est unique, fabriquée à la main avec des matériaux soigneusement sélectionnés.</p>
        <div className="products-grid">
          {voodooProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="contact-section">
        <h2>Contactez-nous</h2>
        <p>Pour toute question sur nos services ou produits</p>
        
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
