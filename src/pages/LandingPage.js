import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/contactSection/ContactSection';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import Header from '../components/Header';
// import NewsletterSection from '../components/NewsletterSection';
import TestimonialsSection from "../components/TestimonialsSection";
import ServicesSection from '../components/services/ServicesSection';
import TeamSection from '../components/team/TeamSection';

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
      ease: "easeOut",
      staggerChildren: 0.2
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

const sectionVariants = {
  initial: {
    opacity: 0,
    y: 50
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

function LandingPage() {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
      >   
        <Header />
        <motion.div variants={sectionVariants}>
          <HeroSection />
        </motion.div>
        
        <motion.div 
          variants={sectionVariants}
          viewport={{ once: true }}
          whileInView="animate"
          initial="initial"
        >
          <ServicesSection />
        </motion.div>
        
        <motion.div 
          variants={sectionVariants}
          viewport={{ once: true }}
          whileInView="animate"
          initial="initial"
        >
          <AboutSection />
        </motion.div>
        
        <motion.div 
          variants={sectionVariants}
          viewport={{ once: true }}
          whileInView="animate"
          initial="initial"
        >
          <TeamSection />
        </motion.div>
        
        <motion.div 
          variants={sectionVariants}
          viewport={{ once: true }}
          whileInView="animate"
          initial="initial"
        >
          <TestimonialsSection />
        </motion.div>
        
        <motion.div 
          variants={sectionVariants}
          viewport={{ once: true }}
          whileInView="animate"
          initial="initial"
        >
          <ContactSection />
        </motion.div>
        
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
}

export default LandingPage;
