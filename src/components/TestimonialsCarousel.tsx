'use client';

import TestimonialCard from './TestimonialCard';

interface Testimonial {
  name: string;
  comment: string;
  avatar: string;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  /** Animation duration in seconds (optional, defaults to 30 s) */
  duration?: number;
}

export default function TestimonialsCarousel({
  testimonials,
  duration = 30,
}: TestimonialsCarouselProps) {
  // Duplicate the testimonials array so the marquee loops seamlessly
  const items = [...testimonials, ...testimonials];

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex space-x-6 animate-marquee"
        style={{ animationDuration: `${duration}s` }}
      >
        {items.map((testimonial, index) => (
          <div key={index} className="flex-shrink-0">
            <TestimonialCard
              comment={testimonial.comment}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
