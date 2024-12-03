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
  overflow-y: auto !important;
  -webkit-overflow-scrolling: touch;

  .portfolio__wrapper {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  .portfolio__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    padding-bottom: 2rem;
  }

  .portfolio__item {
    position: relative;
    height: 300px;
    background: #f0f0f0;
    border-radius: 8px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    &.loading {
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: loading 1.5s infinite;
      }
    }
  }

  @keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
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
  const imageObserver = useRef(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize Intersection Observer for lazy loading
    imageObserver.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              imageObserver.current.unobserve(img);
            }
          }
        });
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1
      }
    );

    return () => {
      if (imageObserver.current) {
        imageObserver.current.disconnect();
      }
    };
  }, []);

  const imagesData = [
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

  const portfolioItems = React.useMemo(() => imagesData.map((image, index) => ({
    id: index + 1,
    src: `/wed-images/Coloured photos/${image}`,
    alt: `Wedding photo ${index + 1}`,
    placeholder: `/wed-images/Coloured photos/thumbnails/${image}`,
    loaded: false
  })), [imagesData]);

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
                className={`portfolio__item ${!loadedImages.has(item.id) ? 'loading' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => openModal(item, index)}
              >
                <img
                  data-src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  onLoad={() => handleImageLoad(item.id)}
                  ref={img => {
                    if (img && !loadedImages.has(item.id)) {
                      imageObserver.current?.observe(img);
                    }
                  }}
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
