import { useState, useEffect } from "react";

const Carousel = () => {
  const slides = [
    { id: 1, image: "https://media.istockphoto.com/id/535448086/photo/summer-shopping.jpg?s=612x612&w=0&k=20&c=65gysXUbtmr0uadu2T0H06ZzAAypiHDdlMUFUi8e13Y=" },
    { id: 2, image: "https://png.pngtree.com/thumb_back/fw800/background/20231211/pngtree-full-body-woman-in-christmas-fashion-dress-concept-on-brown-background-image_15501664.jpg" },
    { id: 3, image: "https://img.freepik.com/free-photo/vertical-portrait-young-beautiful-lady-standing-looking-camera_144627-77322.jpg" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const goToNext = () => {
    if (currentIndex === slides.length - 1) {
      // Temporarily disable transition for a smooth jump from last to first
      setIsTransitioning(false);
      setTimeout(() => {
        setCurrentIndex(0);
        setIsTransitioning(true);
      }, 500); // Matches the transition duration
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (currentIndex === 0) {
      // Temporarily disable transition for a smooth jump from first to last
      setIsTransitioning(false);
      setTimeout(() => {
        setCurrentIndex(slides.length - 1);
        setIsTransitioning(true);
      }, 500); // Matches the transition duration
    } else {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (

    <div className="relative w-full max-w-4xl mx-auto mb-8">
      {/* Slides */}
      <div className="overflow-hidden rounded-lg">
        <div
          className={`flex ${
            isTransitioning ? "transition-transform duration-500 ease-in-out" : ""
          }`}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide) => (
            <img
              key={slide.id}
              src={slide.image}
              alt={`Slide ${slide.id}`}
              className="w-full flex-shrink-0"
            />
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
      >
        &lt;
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
      >
        &gt;
      </button>

      {/* Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex
                ? "bg-blue-600"
                : "bg-gray-400 hover:bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
