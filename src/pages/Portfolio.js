import React from 'react';
import styled from 'styled-components';
import SectionTitle from '../components/titles/SectionTitle';
import ParagraphText from '../components/paragraphTexts/ParagraphText';
import Header from '../components/Header';
import Footer from '../components/Footer';
import themeList from '../data/themeList';

const PortfolioStyles = styled.div`
  padding: 10rem 0;
  background-color: ${({ theme: { theme } }) =>
    theme === themeList.light ? 'var(--lightBlue_1)' : 'var(--darkBlue_3)'};
  .portfolio__wrapper {
    max-width: 1200px;
    margin: 0 auto;
  }
  .portfolio__title {
    text-align: center;
    margin-bottom: 3rem;
  }
  .portfolio__items {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 5rem;
  }
  .portfolio__item {
    background-color: ${({ theme: { theme } }) =>
      theme === themeList.light ? 'var(--mediumSlateBlue)' : 'var(--darkBlue_4)'};
    padding: 1rem;
    border-radius: 12px;
    img {
      width: 100%;
      height: 300px;
      object-fit: cover;
      border-radius: 8px;
    }
  }
  .portfolio__item-details {
    margin-top: 1rem;
    h3 {
      color: var(--lightBlue_1);
      font-size: 2rem;
      margin-bottom: 1rem;
    }
    p {
      color: var(--lightBlue_1);
    }
  }
`;

function Portfolio() {
  // This is a placeholder. You can add your actual portfolio items here
  const portfolioItems = [
    {
      id: 1,
      title: 'Wedding Photography',
      description: 'Capturing beautiful moments of special days',
      image: 'https://source.unsplash.com/random/800x600/?wedding'
    },
    {
      id: 2,
      title: 'Nature Photography',
      description: 'Stunning landscapes and wildlife shots',
      image: 'https://source.unsplash.com/random/800x600/?nature'
    },
    {
      id: 3,
      title: 'Portrait Photography',
      description: 'Professional portrait sessions',
      image: 'https://source.unsplash.com/random/800x600/?portrait'
    }
  ];

  return (
    <>
      <Header />
      <PortfolioStyles>
        <div className="container">
          <div className="portfolio__wrapper">
            <SectionTitle className="portfolio__title">
              Our Portfolio
            </SectionTitle>
            <ParagraphText>
              Explore our collection of memorable moments and creative captures
            </ParagraphText>
            <div className="portfolio__items">
              {portfolioItems.map((item) => (
                <div key={item.id} className="portfolio__item">
                  <img src={item.image} alt={item.title} />
                  <div className="portfolio__item-details">
                    <h3>{item.title}</h3>
                    <ParagraphText>{item.description}</ParagraphText>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PortfolioStyles>
      <Footer />
    </>
  );
}

export default Portfolio;
