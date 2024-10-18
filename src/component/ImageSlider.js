import React, { useState, useEffect } from 'react';
import './ImageSlider.css';

function ImageSlider({ images }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNextSlide();
    }, 5000); // Adjust the interval as needed

    return () => clearInterval(intervalId);
  }, [currentSlide]);

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  return (
    <div className="image-slider">
      <button className="slider-button prev-button" onClick={handlePrevSlide}>Prev</button>
      <button className="slider-button next-button" onClick={handleNextSlide}>Next</button>

      <div
        className="slide"
        style={{ backgroundImage: `url(${images[currentSlide].imgPath})` }}
      >
      </div>
    </div>
  );
}

export default ImageSlider;
