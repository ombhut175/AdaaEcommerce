import { motion } from 'framer-motion';
import { useState } from 'react';

const testimonials = [
  {
    id: 1,
    name: 'James K.',
    role: 'Traveller',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80',
    text: 'You won\'t regret it. I would like to personally thank you for your outstanding product. Absolutely wonderful!',
    rating: 5
  },
  {
    id: 2,
    name: 'Sarah M.',
    role: 'Designer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
    text: 'I was looking for this! Thank you for making it happen and none of all these free! All is great.',
    rating: 5
  },
  {
    id: 3,
    name: 'John W.',
    role: 'Photographer',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80',
    text: 'The delivery was prompt and the product quality exceeded my expectations. Highly recommended!',
    rating: 5
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-black dark:text-white mb-4">
            This Is What Our Customers Say
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultricies sollicitudin.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-8"
          >
            <div className="flex items-center gap-6">
              <img
                src={testimonials[activeIndex].image}
                alt={testimonials[activeIndex].name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <div className="flex text-yellow-400 mb-2">
                  {'★'.repeat(testimonials[activeIndex].rating)}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {testimonials[activeIndex].text}
                </p>
                <h4 className="font-semibold text-black dark:text-white">
                  {testimonials[activeIndex].name}
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {testimonials[activeIndex].role}
                </p>
              </div>
            </div>
          </motion.div>

          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-black dark:bg-white text-white dark:text-black"
            >
              ←
            </button>
            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-black dark:bg-white text-white dark:text-black"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}