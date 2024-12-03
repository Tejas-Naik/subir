import React, { useState } from 'react';
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
  padding: 10rem 0;
  min-height: 100vh;
  overflow: visible;
  position: relative;

  .portfolio__wrapper {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
    overflow: visible;
    touch-action: pan-y pinch-zoom;
  }

  .portfolio__header {
    text-align: center;
    margin-bottom: 5rem;
    opacity: 1;
    transform: none;
  }

  .portfolio__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin: 3rem auto;
    max-width: 1200px;
    padding: 0 1.5rem;
    grid-auto-rows: 400px;

    @media only screen and (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 1.5rem;
      grid-auto-rows: 300px;
      padding: 0 1rem;
    }

    @media only screen and (min-width: 769px) and (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .portfolio__item {
    position: relative;
    overflow: hidden;
    border-radius: 12px;
    cursor: pointer;
    background: #f0f0f0;
    height: 100%;
    width: 100%;
    opacity: 0;

    &:nth-child(3n+1) {
      grid-row: span 2;

      @media only screen and (max-width: 768px) {
        grid-row: span 1;
      }
    }

    .lazy-load-image-background {
      width: 100% !important;
      height: 100% !important;
      display: block !important;
      background-size: cover !important;

      span {
        height: 100% !important;
      }

      img {
        width: 100% !important;
        height: 100% !important;
        object-fit: cover !important;
        transition: transform 0.3s ease-in-out;
      }
    }

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: all 0.5s ease-in-out;
      transform: translateY(20px);

      .overlay__content {
        text-align: center;
        color: white;
        transform: translateY(20px);
        opacity: 0;
        transition: all 0.5s ease-in-out;
        transition-delay: 0.1s;
        padding: 0 1rem;
      }
    }

    &:hover {
      .lazy-load-image-background img {
        transform: scale(1.1);
      }
      .overlay {
        opacity: 1;
        transform: translateY(0);

        .overlay__content {
          transform: translateY(0);
          opacity: 1;
        }
      }
    }
  }

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 2rem;
    overflow-y: auto;

    .image-container {
      position: relative;
      max-width: 1200px;
      width: 90%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      max-height: 90vh;
    }

    img {
      max-width: 100%;
      max-height: 90vh;
      object-fit: contain;
      margin: 0 auto;
      box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.3);
    }

    .controls {
      position: absolute;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 2rem;
      background: rgba(255, 255, 255, 0.1);
      padding: 1rem 2rem;
      border-radius: 50px;
      backdrop-filter: blur(10px);
    }

    .nav-button {
      background: none;
      border: none;
      color: white;
      font-size: 3rem;
      cursor: pointer;
      padding: 1rem;
      transition: all 0.3s ease;
      opacity: 0.7;
      
      &:hover {
        opacity: 1;
        transform: scale(1.1);
      }

      &.prev {
        left: 2rem;
      }

      &.next {
        right: 2rem;
      }
    }

    .close-button {
      position: absolute;
      top: 2rem;
      right: 2rem;
      background: rgba(255, 255, 255, 0.1);
      border: none;
      color: white;
      font-size: 2.5rem;
      cursor: pointer;
      z-index: 2;
      transition: all 0.3s ease;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(10px);
      
      &:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: rotate(90deg);
      }
    }
  }

  /* Mobile-specific styles */
  @media (max-width: 768px) {
    padding: 5rem 0;
    
    .portfolio__wrapper {
      padding: 0 1rem;
    }

    .portfolio__header {
      margin-bottom: 3rem;
    }
  }

  /* Add pull-to-refresh indicator */
  .pull-indicator {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.9);
    transform: translateY(-100%);
    transition: transform 0.3s ease;
    z-index: 1000;
    
    &.active {
      transform: translateY(0);
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

const modalVariants = {
  hidden: { 
    opacity: 0,
    scale: 0.8,
    y: 50
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 50,
    transition: {
      duration: 0.3
    }
  }
};

function Portfolio() {
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [loadedImages, setLoadedImages] = React.useState(new Set());
  const [isRefreshing, setIsRefreshing] = React.useState(false);
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
    placeholder: `/wed-images/Coloured photos/thumbnails/${image}`
  })), [images]);

  const handleImageLoad = (id) => {
    setLoadedImages(prev => new Set([...prev, id]));
  };

  const openModal = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setCurrentIndex(0);
  };

  const navigateImage = (direction) => {
    const newIndex = (currentIndex + direction + portfolioItems.length) % portfolioItems.length;
    setCurrentIndex(newIndex);
    setSelectedImage(portfolioItems[newIndex]);
  };

  const handleKeyPress = React.useCallback((e) => {
    if (!selectedImage) return;
    
    switch(e.key) {
      case 'ArrowLeft':
        navigateImage(-1);
        break;
      case 'ArrowRight':
        navigateImage(1);
        break;
      case 'Escape':
        closeModal();
        break;
      default:
        break;
    }
  }, [selectedImage, currentIndex]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh - replace with actual refresh logic
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  const handleSwipeLeft = () => {
    // Navigate to next item
    setCurrentIndex(prev => Math.min(prev + 1, portfolioItems.length - 1));
  };

  const handleSwipeRight = () => {
    // Navigate to previous item
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const touchHandlers = useTouch({
    onSwipeLeft: handleSwipeLeft,
    onSwipeRight: handleSwipeRight,
    onPullDown: handleRefresh,
    threshold: 50,
  });

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <>
      <Header />
      <PortfolioStyles>
        <div className={`pull-indicator ${isRefreshing ? 'active' : ''}`}>
          {isRefreshing ? 'Refreshing...' : 'Pull to refresh'}
        </div>
        <motion.div 
          className="portfolio__wrapper"
          {...touchHandlers}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div 
            className="portfolio__header"
            style={{ opacity, scale }}
          >
            <SectionTitle>Our Portfolio</SectionTitle>
            <ParagraphText>
              Discover our collection of captivating moments and beautiful stories
              told through our lens. Each image represents a unique perspective and
              a cherished memory.
            </ParagraphText>
          </motion.div>

          <motion.div
            className="portfolio__grid"
            variants={containerVariants}
          >
            {portfolioItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="portfolio__item"
                variants={itemVariants}
                whileHover={{ y: -10 }}
                onClick={() => openModal(item, index)}
              >
                <LazyLoadImage
                  src={item.src}
                  alt={item.alt}
                  effect="blur"
                  width="100%"
                  height="100%"
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
                  afterLoad={() => handleImageLoad(item.id)}
                  wrapperClassName="lazy-load-image-wrapper"
                />
                <div className="overlay">
                  <div className="overlay__content">
                    <ParagraphText>{item.alt}</ParagraphText>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <AnimatePresence>
            {selectedImage && (
              <motion.div
                className="modal"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={closeModal}
              >
                <motion.div 
                  className="image-container" 
                  onClick={(e) => e.stopPropagation()}
                  layoutId={`image-${currentIndex}`}
                >
                  <LazyLoadImage
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    effect="blur"
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
                  <div className="controls">
                    <motion.button 
                      className="nav-button prev" 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateImage(-1);
                      }}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      &#8249;
                    </motion.button>
                    <motion.button 
                      className="nav-button next" 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateImage(1);
                      }}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      &#8250;
                    </motion.button>
                  </div>
                </motion.div>
                <motion.button 
                  className="close-button" 
                  onClick={closeModal}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ×
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </PortfolioStyles>
      <Footer />
    </>
  );
}

export default Portfolio;
