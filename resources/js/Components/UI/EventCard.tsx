// イベントカードコンポーネント
import React from "react";
import { Link } from "@inertiajs/react";

type EventCardProps = {
  event: {
    id: number;
    title: string;
    date: string;
    image?: string;
    description?: string;
    route: string;
  };
};

const EventCard: React.FC<EventCardProps> = ({ event }) => (
  <div className="bg-white rounded-lg shadow-md p-4 mb-4 flex flex-col md:flex-row">
    <div className="md:w-1/3 w-full shrink-0">
      <img
        src={event.image || "/img/no-image.png"}
        alt={event.title}
        className="object-cover w-full h-32 rounded-lg"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/img/no-image.png";
        }}
      />
    </div>
    <div className="md:w-2/3 w-full md:pl-4 mt-2 md:mt-0 flex flex-col justify-between">
      <div>
        <Link href={event.route} className="text-lg font-bold text-blue-600 hover:underline">
          {event.title}
        </Link>
        <p className="text-sm text-gray-500 mt-1">{event.date}</p>
        {event.description && <p className="mt-2 text-gray-700">{event.description}</p>}
      </div>
    </div>
  </div>
);

export default EventCard;
