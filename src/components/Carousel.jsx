import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ImageCarousel = ({ images }) => {
  return (
    <Carousel>
      {images.map((image, index) => (
        <Carousel.Item key={index} interval={3000}>
          <img
            className="d-block w-100 bg-gray-700 p-6 rounded-sm"
            src={image}
            alt={`Screenshot ${index + 1}`}
            style={{ height: '500px', objectFit: 'contain',width:'100%' }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ImageCarousel;
