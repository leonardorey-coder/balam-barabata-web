'use client';

import { useState, useRef } from 'react';
import IdealForCard from './IdealForCard';

interface IdealForData {
  title: string;
  description: string;
  price: string;
  location: string;
}

interface IdealForCarouselProps {
  data: IdealForData[];
}

export default function IdealForCarousel({ data }: IdealForCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollTo = (index: number) => {
    if (scrollContainerRef.current) {
      const cardWidth = 400; // Approximate width of each card including margin
      scrollContainerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  const scrollLeft = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : data.length - 1;
    scrollTo(newIndex);
  };

  const scrollRight = () => {
    const newIndex = currentIndex < data.length - 1 ? currentIndex + 1 : 0;
    scrollTo(newIndex);
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 400;
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const newIndex = Math.round(scrollLeft / cardWidth);
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
      }
    }
  };

  return (
    <div className="relative">
      {/* Carousel container (scroll only) */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto gap-6 pb-4 scroll-smooth"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {data.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-80 md:w-96"
            style={{ scrollSnapAlign: 'start' }}
          >
            <IdealForCard
              title={item.title}
              description={item.description}
              price={item.price}
              location={item.location}
            />
          </div>
        ))}
      </div>

      
    </div>
  );
}
