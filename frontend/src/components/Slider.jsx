import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SimpleSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    autoplaySpeed: 2000,
    dotsClass: "slick-dots custom-dots", // Custom class for better styling
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  return (
    <div className="dark:bg-gray-800 bg-white py-10">
      <div className="container mx-auto">
        <div className="carousel-wrapper mx-auto max-w-4xl lg:rounded-lg overflow-hidden">
          <Slider {...settings}>
            <div>
              <img
                className="w-full h-64 md:h-96 object-cover"
                src="https://img.theloom.in/blog/wp-content/uploads/2024/03/thumb3.png"
                alt="Slide 1"
              />
            </div>
            <div>
              <img
                className="w-full h-64 md:h-96 object-cover"
                src="https://miro.medium.com/v2/resize:fit:1400/1*nculSVfbqj3yg5FR8Kk3AQ.jpeg"
                alt="Slide 2"
              />
            </div>
            <div>
              <img
                className="w-full h-64 md:h-96 object-cover"
                src="https://www.worldfashionexchange.com/blog/wp-content/uploads/2024/01/PRADA.webp"
                alt="Slide 3"
              />
            </div>
            <div>
              <img
                className="w-full h-64 md:h-96 object-cover"
                src="https://img.theloom.in/blog/wp-content/uploads/2024/03/thumb3.png"
                alt="Slide 4"
              />
            </div>
            <div>
              <img
                className="w-full h-64 md:h-96 object-cover"
                src="https://www.miamiamine.com/wp-content/uploads/2019/10/Mia-Mia-Mine-Louis-Vuitton-Scarf-1-650x975.jpeg"
                alt="Slide 5"
              />
            </div>
            <div>
              <img
                className="w-full h-64 md:h-96 object-cover"
                src="https://www.worldfashionexchange.com/blog/wp-content/uploads/2024/01/PRADA.webp"
                alt="Slide 6"
              />
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
}

// Custom Next Arrow
const CustomNextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} bg-red-500 hover:bg-gray-700 p-2 rounded-full`}
      onClick={onClick}
    >
      ▶
    </div>
  );
};

// Custom Prev Arrow
const CustomPrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} bg-red-500 hover:bg-gray-700 p-2 rounded-full`}
      onClick={onClick}
    >
      ◀
    </div>
  );
};
