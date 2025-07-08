import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const UserRatings: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const ratings = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Patient",
      location: "San Francisco, CA",
      rating: 5,
      comment: "The AI symptom checker was incredibly accurate and helped me identify a serious condition early. The doctors here literally saved my life! The platform is intuitive and the care is exceptional.",
      avatar: "https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=150",
      date: "2 weeks ago"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Regular User",
      location: "Austin, TX",
      rating: 5,
      comment: "Finally, a healthcare platform that actually understands my needs. The personalized care recommendations and medication tracking have transformed how I manage my health.",
      avatar: "https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=150",
      date: "1 month ago"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Chronic Care Patient",
      location: "New York, NY",
      rating: 5,
      comment: "I love how easy it is to track my medications and symptoms. The medicine scanner feature is a game-changer - no more confusion about dosages. This app has become essential to my daily routine.",
      avatar: "https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=150",
      date: "3 weeks ago"
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Family Caregiver",
      location: "Chicago, IL",
      rating: 5,
      comment: "Managing my elderly mother's healthcare has never been easier. The appointment scheduling and medical history tracking features are incredibly helpful for our family.",
      avatar: "https://images.pexels.com/photos/5407205/pexels-photo-5407205.jpeg?auto=compress&cs=tinysrgb&w=150",
      date: "1 week ago"
    },
    {
      id: 5,
      name: "Lisa Wang",
      role: "Healthcare Professional",
      location: "Seattle, WA",
      rating: 5,
      comment: "As a nurse, I recommend this platform to all my patients. The disease encyclopedia is comprehensive and the emergency features provide peace of mind for everyone.",
      avatar: "https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=150",
      date: "2 days ago"
    },
    {
      id: 6,
      name: "Robert Martinez",
      role: "Senior Patient",
      location: "Phoenix, AZ",
      rating: 4,
      comment: "The 24/7 support has been invaluable during my recovery. The team is always available when I need them most, and the platform is surprisingly easy to use for someone my age.",
      avatar: "https://images.pexels.com/photos/5407207/pexels-photo-5407207.jpeg?auto=compress&cs=tinysrgb&w=150",
      date: "4 days ago"
    }
  ];

  const itemsPerSlide = {
    mobile: 1,
    tablet: 2,
    desktop: 3
  };

  const [itemsToShow, setItemsToShow] = useState(itemsPerSlide.desktop);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsToShow(itemsPerSlide.mobile);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(itemsPerSlide.tablet);
      } else {
        setItemsToShow(itemsPerSlide.desktop);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxSlides = Math.ceil(ratings.length / itemsToShow);

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % maxSlides);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, maxSlides]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % maxSlides);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + maxSlides) % maxSlides);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ));
  };

  return (
    <section id="ratings" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Our
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600"> Patients Say</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Real stories from people who've transformed their healthcare experience with our platform.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white dark:bg-gray-900 shadow-lg rounded-full p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 group"
            aria-label="Previous reviews"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white dark:bg-gray-900 shadow-lg rounded-full p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 group"
            aria-label="Next reviews"
          >
            <ChevronRight className="h-6 w-6 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
          </button>

          {/* Carousel Content */}
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * (100 / maxSlides)}%)`,
                width: `${maxSlides * 100}%`
              }}
            >
              {Array.from({ length: maxSlides }).map((_, slideIndex) => (
                <div
                  key={slideIndex}
                  className="flex space-x-6"
                  style={{ width: `${100 / maxSlides}%` }}
                >
                  {ratings
                    .slice(slideIndex * itemsToShow, (slideIndex + 1) * itemsToShow)
                    .map((rating) => (
                      <div
                        key={rating.id}
                        className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 flex-1 border border-gray-100 dark:border-gray-700"
                      >
                        {/* Quote Icon */}
                        <div className="mb-4">
                          <Quote className="h-8 w-8 text-blue-600 dark:text-blue-400 opacity-50" />
                        </div>

                        {/* Rating Stars */}
                        <div className="flex mb-4">
                          {renderStars(rating.rating)}
                        </div>

                        {/* Comment */}
                        <p className="text-gray-700 dark:text-gray-300 mb-6 italic leading-relaxed">
                          "{rating.comment}"
                        </p>

                        {/* User Info */}
                        <div className="flex items-center space-x-4">
                          <img
                            src={rating.avatar}
                            alt={rating.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900 dark:text-white">
                              {rating.name}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {rating.role} • {rating.location}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                              {rating.date}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: maxSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  currentSlide === index
                    ? 'bg-blue-600 dark:bg-blue-400'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">4.9/5</div>
            <div className="text-gray-600 dark:text-gray-400">Average Rating</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-2">50K+</div>
            <div className="text-gray-600 dark:text-gray-400">Happy Patients</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">98%</div>
            <div className="text-gray-600 dark:text-gray-400">Satisfaction Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">24/7</div>
            <div className="text-gray-600 dark:text-gray-400">Support Available</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserRatings;