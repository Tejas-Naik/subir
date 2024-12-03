import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionTitle from '../components/titles/SectionTitle';
import ParagraphText from '../components/paragraphTexts/ParagraphText';
import useTouch from '../hooks/useTouch';

const PortfolioStyles = styled.div`
  padding: 5rem 0;
  min-height: 100vh;
  position: relative;

  .portfolio__wrapper {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  .portfolio__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    padding: 2rem 0;
  }

  .portfolio__item {
    position: relative;
    height: 300px;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    background: #f0f0f0;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.02);
    }

    .lazy-load-image-background {
      width: 100% !important;
      height: 100% !important;

      img {
        width: 100% !important;
        height: 100% !important;
        object-fit: cover !important;
      }
    }
  }

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 2rem;

    .image-container {
      position: relative;
      max-width: 90%;
      max-height: 90vh;
      
      img {
        max-width: 100%;
        max-height: 90vh;
        object-fit: contain;
      }
    }

    .controls {
      position: absolute;
      bottom: -60px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 2rem;
    }

    .nav-button {
      background: rgba(255, 255, 255, 0.2);
      border: none;
      color: white;
      font-size: 2rem;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.3s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.3);
      }
    }

    .close-button {
      position: absolute;
      top: 20px;
      right: 20px;
      background: rgba(255, 255, 255, 0.2);
      border: none;
      color: white;
      font-size: 2rem;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.3s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.3);
      }
    }
  }

  @media (max-width: 768px) {
    padding: 3rem 0;
    
    .portfolio__grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .portfolio__item {
      height: 250px;
    }

    .modal {
      padding: 1rem;
      
      .image-container {
        max-width: 95%;
      }

      .controls {
        bottom: -50px;
      }
    }
  }
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren"
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0,
    y: 50,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
};

function Portfolio() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);

  const images = [
    'IMG_9265.JPG',
    'IMG_9273.JPG',
    'IMG_9277.JPG',
    'IMG_9300.JPG',
    'IMG_9345.JPG',
    'IMG_9355.JPG',
    'IMG_9362.JPG',
    'IMG_9392.JPG',
    'IMG_9415.JPG',
    'IMG_9460.JPG',
    'IMG_9472.JPG',
    'IMG_2888.JPG',
    'IMG_2891.JPG',
    'IMG_2897.JPG',
    'IMG_2913.JPG',
    'IMG_2924.JPG',
    'IMG_2942.JPG',
    'IMG_2966.JPG'
  ];

  const portfolioItems = React.useMemo(() => images.map((image, index) => ({
    id: index + 1,
    src: `/wed-images/Coloured photos/${image}`,
    alt: `Wedding photo ${index + 1}`,
    title: `Wedding photo ${index + 1}`
  })), [images]);

  const handleImageClick = (item, index) => {
    setSelectedImage(item);
    setCurrentIndex(index);
  };

  return (
    <>
      <Header />
      <PortfolioStyles>
        <div className="portfolio__wrapper">
          <motion.div 
            className="portfolio__grid"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {portfolioItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="portfolio__item"
                variants={itemVariants}
                onClick={() => handleImageClick(item, index)}
              >
                <LazyLoadImage
                  src={item.src}
                  alt={item.alt}
                  effect="blur"
                  threshold={100}
                  width="100%"
                  height="100%"
                  style={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%'
                  }}
                  placeholder={
                    <div style={{ 
                      width: '100%', 
                      height: '100%', 
                      background: '#f0f0f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      Loading...
                    </div>
                  }
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <AnimatePresence>
          {selectedImage && (
            <motion.div 
              className="modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            >
              <button 
                className="close-button"
                onClick={() => setSelectedImage(null)}
              >
                ×
              </button>
              <div className="image-container" onClick={(e) => e.stopPropagation()}>
                <img 
                  src={selectedImage.src} 
                  alt={selectedImage.alt}
                />
                <div className="controls">
                  <button
                    className="nav-button prev"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(prev => 
                        prev > 0 ? prev - 1 : portfolioItems.length - 1
                      );
                      setSelectedImage(portfolioItems[
                        currentIndex > 0 ? currentIndex - 1 : portfolioItems.length - 1
                      ]);
                    }}
                  >
                    ‹
                  </button>
                  <button
                    className="nav-button next"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(prev => 
                        prev < portfolioItems.length - 1 ? prev + 1 : 0
                      );
                      setSelectedImage(portfolioItems[
                        currentIndex < portfolioItems.length - 1 ? currentIndex + 1 : 0
                      ]);
                    }}
                  >
                    ›
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </PortfolioStyles>
      <Footer />
    </>
  );
}

export default Portfolio;
