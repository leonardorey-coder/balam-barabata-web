interface TestimonialCardProps {
  name: string;
  comment: string;
  avatar: string;
}

export default function TestimonialCard({ name, comment, avatar }: TestimonialCardProps) {
  return (
    <div className="flex-none w-80 mx-4">
      <div className="bg-blue-50 rounded-xl p-6 relative">
        <div className="absolute -bottom-2 left-36">
          <div className="w-11 h-10 bg-blue-50 transform rotate-45"></div>
        </div>
        <p className="text-gray-800 text-sm leading-relaxed mb-4">
          "{comment}"
        </p>
      </div>
      <div className="flex items-center justify-center mt-4">
        <div className="w-20 h-20 rounded-full bg-gray-300 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600"></div>
        </div>
      </div>
    </div>
  );
}
