import React from 'react';
import styled from 'styled-components';
import { MdStar, MdCheck, MdClose } from 'react-icons/md';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionTitle from '../components/titles/SectionTitle';
import PrimaryButton from '../components/buttons/PrimaryButton';

const PricingStyles = styled.div`
  padding: 15rem 0 10rem 0;
  .pricing__wrapper {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }
  .pricing__title {
    text-align: center;
    margin-bottom: 3rem;
  }
  .pricing__items {
    display: flex;
    gap: 2rem;
    justify-content: center;
    margin-top: 5rem;
    @media only screen and (max-width: 768px) {
      flex-direction: column;
      max-width: 350px;
      margin: 0 auto;
      gap: 5rem;
    }
  }
  .pricing__item {
    width: 350px;
    background: var(--darkBlue_2);
    padding: 4.5rem 2.5rem 3.5rem;
    border-radius: 12px;
    position: relative;
    transition: all 0.3s ease;
    min-height: 600px;
    display: flex;
    flex-direction: column;
    &:hover {
      background: var(--darkBlue_3);
      transform: translateY(-10px);
    }
    &.recommended {
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
      }
    }
  }
  .pricing__item-name {
    font-size: 2.8rem;
    font-weight: 500;
    color: var(--lightBlue_1);
    margin-bottom: 2rem;
    text-align: center;
  }
  .pricing__item-price {
    font-size: 4rem;
    font-family: 'Poppins', sans-serif;
    color: var(--lightBlue_1);
    margin-bottom: 3rem;
    text-align: center;
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
`;

function Pricing() {
  const pricingItems = [
    {
      id: 1,
      name: 'Basic Package',
      price: 350,
      originalPrice: 400,
      features: [
        'Professional photographer',
        '250-500 photos delivered',
        'Select photos professionally edited',
        'Optional ceremony video (+$30)',
      ],
    },
    {
      id: 2,
      name: 'Premium Package',
      price: 500,
      recommended: true,
      features: [
        '2 Professional Photographers',
        '500-750 Photos Delivered',
        'Select Photos Professionally Edited',
        'Ceremony Video',
      ],
    },
    {
      id: 3,
      name: 'Ultimate Package',
      price: 750,
      originalPrice: 1000,
      features: [
        '2 Professional Photographers',
        '1000 Photos Delivered',
        'Select Photos Professionally Edited',
        'Ceremony Video',
        'Vintage Party Video',
      ],
    },
  ];

  return (
    <>
      <Header />
      <PricingStyles>
        <div className="container">
          <div className="pricing__wrapper">
            <SectionTitle className="pricing__title">
              Our Pricing Plans
            </SectionTitle>
            <div className="pricing__items">
              {pricingItems.map((item) => (
                <div
                  key={item.id}
                  className={`pricing__item ${item.recommended ? 'recommended' : ''}`}
                >
                  {item.recommended && (
                    <div className="recommended-label">
                      <MdStar /> Most Popular
                    </div>
                  )}
                  <h3 className="pricing__item-name">{item.name}</h3>
                  <div className="pricing__item-price">
                    ${item.price}
                    {item.originalPrice && (
                      <span className="original-price">${item.originalPrice}</span>
                    )}
                  </div>
                  <ul className="pricing__item-features">
                    {item.features.map((feature, index) => (
                      <li key={index}>
                        <MdCheck style={{width: '25px'}} /> {feature}
                      </li>
                    ))}
                    {item.id <= 2 && (
                      <li>
                        <MdClose style={{width: '25px', color: 'var(--lightBlue_1)'}} />
                      </li>
                    )}
                  </ul>
                  <div className="pricing__item-btn">
                    <PrimaryButton to="/contact">Book Now</PrimaryButton>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PricingStyles>
      <Footer />
    </>
  );
}

export default Pricing;
