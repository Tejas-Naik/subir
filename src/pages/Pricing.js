import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { MdStar, MdCheck, MdClose } from 'react-icons/md';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionTitle from '../components/titles/SectionTitle';
import PrimaryButton from '../components/buttons/PrimaryButton';

const PricingStyles = styled.div`
  padding: 5rem 0;
  min-height: 100vh;

  .pricing__wrapper {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  .pricing__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
  }

  .pricing__card {
    background: var(--darkBlue_2);
    border-radius: 10px;
    padding: 2rem;
    text-align: center;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }
  }

  .pricing__card.recommended {
    background: var(--mediumSlateBlue);
    .pricing__item-name,
    .pricing__item-price,
    .pricing__item-features li {
      color: var(--lightBlue_1);
    }
    .recommended-label {
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--darkBlue_3);
      color: var(--lightBlue_1);
      padding: 0.4rem 1.5rem;
      border-radius: 4px;
      font-size: 1.4rem;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      white-space: nowrap;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
  }

  .pricing__item-name {
    font-size: 2.8rem;
    font-weight: 500;
    color: var(--lightBlue_1);
    margin-bottom: 2rem;
  }

  .pricing__item-price {
    font-size: 4rem;
    font-family: 'Poppins', sans-serif;
    color: var(--lightBlue_1);
    margin-bottom: 3rem;
    .original-price {
      font-size: 2rem;
      color: var(--gray-1);
      text-decoration: line-through;
      margin-left: 1rem;
    }
  }

  .pricing__item-features {
    list-style: none;
    margin: 3rem 0;
    flex-grow: 1;
    li {
      color: var(--lightBlue_1);
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1.7rem;
      svg {
        color: var(--lightBlue_1);
        font-size: 1.2rem;
        min-width: 15px;
      }
    }
  }

  .pricing__item-btn {
    width: 100%;
    text-align: center;
    margin-top: auto;
    padding-top: 2rem;
  }

  @media (max-width: 768px) {
    padding: 3rem 0;

    .pricing__wrapper {
      padding: 0 1rem;
    }

    .pricing__grid {
      grid-template-columns: 1fr;
      max-width: 400px;
      margin: 2rem auto;
    }

    .pricing__card {
      margin: 0 auto;
      width: 100%;
    }
  }
`;

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3
    }
  }
};

const cardVariants = {
  initial: {
    opacity: 0,
    y: 50,
    scale: 0.9
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

function Pricing() {
  const pricingItems = [
    {
      id: 1,
      name: 'Mini Package',
      price: 150,
      features: [
        'Professional photographer',
        '50 photos delivered',
        'Select photos professionally edited',
        'Digital delivery',
      ],
    },
    {
      id: 2,
      name: 'Basic Package',
      price: 250,
      features: [
        'Professional photographer',
        '100 photos delivered',
        'Select photos professionally edited',
        'Digital delivery',
        'Optional ceremony video (+$30)',
      ],
    },
    {
      id: 3,
      name: 'Premium Package',
      price: 500,
      recommended: true,
      features: [
        '2 Professional Photographers',
        '500-750 Photos Delivered',
        'All Photos Professionally Edited',
        'Ceremony Video',
        'Digital delivery',
      ],
    },
    {
      id: 4,
      name: 'Ultimate Package',
      price: 750,
      originalPrice: 1000,
      features: [
        '2 Professional Photographers',
        '1000+ Photos Delivered',
        'All Photos Professionally Edited',
        'Ceremony Video',
        'Vintage Party Video',
        'Premium photo album',
      ],
    },
  ];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
      >
        <Header />
        <PricingStyles>
          <div className="container">
            <motion.div 
              className="pricing__wrapper"
              variants={containerVariants}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <SectionTitle className="pricing__title">
                  Our Pricing Plans
                </SectionTitle>
              </motion.div>
              
              <motion.div 
                className="pricing__grid"
                variants={containerVariants}
              >
                {pricingItems.map((item) => (
                  <motion.div
                    key={item.id}
                    className={`pricing__card ${item.recommended ? 'recommended' : ''}`}
                    variants={cardVariants}
                    whileHover={{ 
                      scale: 1.03,
                      transition: { duration: 0.3 }
                    }}
                  >
                    {item.recommended && (
                      <motion.div 
                        className="recommended-label"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <MdStar /> Most Popular
                      </motion.div>
                    )}
                    <motion.h3 
                      className="pricing__item-name"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      {item.name}
                    </motion.h3>
                    <motion.div 
                      className="pricing__item-price"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      ${item.price}
                      {item.originalPrice && (
                        <span className="original-price">${item.originalPrice}</span>
                      )}
                    </motion.div>
                    <motion.ul 
                      className="pricing__item-features"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {item.features.map((feature, index) => (
                        <motion.li 
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                        >
                          <MdCheck /> {feature}
                        </motion.li>
                      ))}
                    </motion.ul>
                    <motion.div 
                      className="pricing__item-btn"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <PrimaryButton to="/contact">Choose Plan</PrimaryButton>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </PricingStyles>
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
}

export default Pricing;
