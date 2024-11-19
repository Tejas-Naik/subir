import React from "react";
import styled from "styled-components";
import ParagraphText from "./paragraphTexts/ParagraphText";
import SectionTitle from "./titles/SectionTitle";

const TestimonialsStyles = styled.div`
  padding: 10rem 0;
  .testimonials__wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  .testimonial__card {
    padding: 3rem;
    border-radius: 12px;
    background: var(--mediumSlateBlue);
    text-align: center;
  }
  .testimonial__name {
    margin-bottom: 1rem;
    color: var(--lightBlue_1);
    font-size: 2rem;
    font-weight: 600;
  }
  .testimonial__stars {
    color: #ffd700;
    margin-bottom: 1rem;
    font-size: 1.8rem;
  }
  .testimonial__text {
    color: var(--lightBlue_1);
  }
  .section__title {
    text-align: center;
    margin-bottom: 3rem;
  }
  @media only screen and (max-width: 768px) {
    .testimonials__wrapper {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media only screen and (max-width: 500px) {
    .testimonials__wrapper {
      grid-template-columns: 1fr;
    }
  }
`;

const testimonials = [
  {
    name: "Sarah Johnson",
    stars: "★★★★★",
    text: "Absolutely amazing photography! Captured our wedding perfectly with stunning shots.",
  },
  {
    name: "Mike Peters",
    stars: "★★★★★",
    text: "Professional service and incredible attention to detail. Would highly recommend!",
  },
  {
    name: "Emily Davis",
    stars: "★★★★½",
    text: "Great experience working with this team. They made our family shoot so fun and natural.",
  },
  {
    name: "David Wilson",
    stars: "★★★★★",
    text: "Outstanding corporate event coverage. They captured every important moment.",
  },
  {
    name: "Lisa Thompson",
    stars: "★★★★★",
    text: "The photos exceeded our expectations. True artists behind the lens!",
  },
  {
    name: "John Martinez",
    stars: "★★★★★",
    text: "Brilliant composition and lighting. They have an eye for perfect moments.",
  },
];

function TestimonialsSection() {
  return (
    <TestimonialsStyles>
      <div className="container">
        <SectionTitle className="section__title">
          Client Testimonials
        </SectionTitle>
        <div className="testimonials__wrapper">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial__card">
              <h3 className="testimonial__name">{testimonial.name}</h3>
              <div className="testimonial__stars">{testimonial.stars}</div>
              <ParagraphText className="testimonial__text">
                {testimonial.text}
              </ParagraphText>
            </div>
          ))}
        </div>
      </div>
    </TestimonialsStyles>
  );
}

export default TestimonialsSection;
