import React from 'react';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  /* Mobile touch feedback */
  @media (max-width: 768px) {
    &:active img {
      transform: scale(0.98);
    }

    /* Remove hover effects on mobile */
    &:hover img {
      transform: none;
    }
  }
`;

const ResponsiveImage = ({ 
  src, 
  alt, 
  lowResSrc, 
  sizes = '(max-width: 768px) 100vw, 50vw',
  onLoad,
  onClick 
}) => {
  // Generate srcSet for responsive images
  const generateSrcSet = (imageSrc) => {
    const widths = [320, 640, 960, 1280];
    return widths
      .map(width => {
        // In a real application, you would use a proper image service
        // This is just a placeholder implementation
        const scaledSrc = imageSrc.replace(/\.\w+$/, `-${width}w$&`);
        return `${scaledSrc} ${width}w`;
      })
      .join(', ');
  };

  return (
    <ImageWrapper>
      <LazyLoadImage
        src={src}
        alt={alt}
        effect="blur"
        placeholderSrc={lowResSrc}
        srcSet={generateSrcSet(src)}
        sizes={sizes}
        onLoad={onLoad}
        onClick={onClick}
        threshold={300}
        wrapperProps={{
          style: {
            width: '100%',
            height: '100%',
          },
        }}
      />
    </ImageWrapper>
  );
};

export default ResponsiveImage;
