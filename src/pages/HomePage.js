import React from 'react';
import ImageSlider from "../component/ImageSlider.js";
import ProductPage from './product/ProductPage.js';

export default function HomePage(){

    // return <h1>Hellobhjbhbjhbhjbhjbjhbbbjhb</h1>
    const images = [
        {
            imgPath:"https://in.pinterest.com/pin/acrylic-panting-sunlight-scenery-panting-in-2023--301319031333624216/",
        },
        {
           imgPath :" https://in.pinterest.com/pin/814236807605337234/",
        },
        // Add more images here
      ];

    return (
        // <section className="featured-artists">
        //   <h2>Featured Artists</h2>
        //   <div className="artist-cards">
        //     {/* Artist cards with images and bios */}
        //   </div>
        // </section>
        <div>
           <ImageSlider images={images} />
           <ProductPage/>

      </div>
      );
}
