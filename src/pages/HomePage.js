import React from 'react';
import ImageSlider from "../component/ImageSlider.js";
import ProductPage from './product/ProductPage.js';

export default function HomePage(){

    // return <h1>Hellobhjbhbjhbhjbhjbjhbbbjhb</h1>
    const images = [
        {
            imgPath:"https://as1.ftcdn.net/v2/jpg/02/73/22/74/1000_F_273227473_N0WRQuX3uZCJJxlHKYZF44uaJAkh2xLG.jpg",
        },
        {
           imgPath :"https://as1.ftcdn.net/v2/jpg/02/69/00/62/1000_F_269006287_UOjqqlydfZpqlXB4tSxLZGXI0MXhHytb.jpg",
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
