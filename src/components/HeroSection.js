import React from 'react';
import { Link } from 'react-scroll';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import HeroImg from '../assets/images/hero.png';
import PrimaryButton from './buttons/PrimaryButton';
import ParagraphText from './paragraphTexts/ParagraphText';
import HeroTitle from './titles/HeroTitle';

const HeroSectionStyles = styled(motion.div)`
  min-height: 100vh;
  padding-top: calc(var(--header-height) + 30px);
  display: flex;
  align-items: center;
  justify-content: center;
  .hero__wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 2rem;
  }
  .hero__info {
    flex: 3;
    opacity: 0;
  }
  .hero__img {
    flex: 4;
    opacity: 0;
    img {
      object-fit: contain;
      width: 100%;
      height: auto;
      max-width: 600px;
    }
  }
  .hero__title {
    margin-bottom: 1.5rem;
    max-width: 500px;
  }
  .hero__desc {
    margin-bottom: 2rem;
    max-width: 400px;
    line-height: 1.8;
  }
  @media only screen and (max-width: 768px) {
    .hero__wrapper {
      flex-direction: column-reverse;
      gap: 1rem;
      text-align: center;
    }
    .hero__info {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .hero__img {
      display: flex;
      justify-content: center;
      img {
        max-width: 400px;
        margin-top: auto;
      }
    }
  }
`;

function HeroSection() {
  return (
    <HeroSectionStyles
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      id="home"
    >
      <div className="container">
        <div className="hero__wrapper">
          <motion.div
            className="hero__info"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <HeroTitle className="hero__title">
              Memories that last a lifetime.
            </HeroTitle>
            <ParagraphText className="hero__desc">
              Because every picture tells a story, let us help you tell yours.
              Professional photography services for all your special moments.
            </ParagraphText>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <PrimaryButton
                buttonType={Link}
                smooth
                to="contact"
                className="hero__cta"
                aria-label="Get In Touch"
              >
                Get In Touch
              </PrimaryButton>
            </motion.div>
          </motion.div>
          <motion.div
            className="hero__img"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <LazyLoadImage
              src={HeroImg}
              alt="Professional Photography Studio"
              effect="blur"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </HeroSectionStyles>
  );
}

export default HeroSection;
