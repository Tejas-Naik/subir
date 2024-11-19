import React from 'react';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/contactSection/ContactSection';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import Header from '../components/Header';
// import NewsletterSection from '../components/NewsletterSection';
import TestimonialsSection from "../components/TestimonialsSection";
import ServicesSection from '../components/services/ServicesSection';
import TeamSection from '../components/team/TeamSection';

function LandingPage() {
  return (
    <>   
      <Header />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <TeamSection />
      {/* <NewsletterSection/> */}
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </>
  );
}

export default LandingPage;
