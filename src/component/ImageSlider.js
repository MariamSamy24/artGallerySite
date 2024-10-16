import React, { useState, useEffect } from 'react';
import './ImageSlider.css';


function ImageSlider({ images }) {
  console.log(images)
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 5000); // Adjust the interval as needed

    return () => clearInterval(intervalId);
  }, [images]);

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  return (
    <div className="image-slider">
      <button onClick={handlePrevSlide}>Prev</button>
      <button onClick={handleNextSlide}>Next</button>
      <div className="slider-container">
        {images.map((image, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${image.imgPath})` }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default ImageSlider;