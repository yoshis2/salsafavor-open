// レッスンカードコンポーネント
import React from "react";

type LessonCardProps = {
  lesson: {
    id: number;
    title: string;
    date: string;
    image?: string;
    description?: string;
    genre?: string;
    route: string;
  };
};

const LessonCard: React.FC<LessonCardProps> = ({ lesson }) => (
  <div className="bg-white rounded-lg shadow-md p-4 mb-4 flex flex-col md:flex-row">
    <div className="md:w-1/3 w-full flex-shrink-0">
      <img
        src={lesson.image || "/img/no-image.png"}
        alt={lesson.title}
        className="object-cover w-full h-32 rounded-lg"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/img/no-image.png";
        }}
      />
    </div>
    <div className="md:w-2/3 w-full md:pl-4 mt-2 md:mt-0 flex flex-col justify-between">
      <div>
        <a href={lesson.route} className="text-lg font-bold text-blue-600 hover:underline">
          {lesson.title}
        </a>
        <p className="text-sm text-gray-500 mt-1">{lesson.date}</p>
        {lesson.genre && (
          <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs mr-2">{lesson.genre}</span>
        )}
        {lesson.description && <p className="mt-2 text-gray-700">{lesson.description}</p>}
      </div>
    </div>
  </div>
);

export default LessonCard;
