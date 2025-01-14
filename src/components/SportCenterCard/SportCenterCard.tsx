import Link from "next/link";
import Image from "next/image";
import { ISportCenter } from "@/interfaces/sport_center.interface";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { DayOfWeek } from "@/enum/DayOfWeek";

const SportCenterCard: React.FC<ISportCenter> = ({
  id,
  name,
  address,
  photos,
  fields,
  schedules,
  averageRating,
}) => {
  const currentDay = new Date().getDay();
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDayName = daysOfWeek[currentDay];

  const currentDaySchedule = schedules.find(
    (schedule) => schedule.day === (currentDayName as DayOfWeek)
  );

  const images =
    photos && photos.length > 0
      ? photos.map((photo) => photo.image_url)
      : ["/placeholder-image.jpg"];

  return (
    <div className="flex justify-center items-center p-2">
      <div className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden transform transition hover:scale-105 hover:shadow-lg w-80">
        {/* Image Gallery */}
        <div className="w-full h-48 overflow-hidden">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            className="h-full"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index} className="h-full">
                <div className="relative w-full h-full">
                  <Image
                    src={image}
                    alt={`${name} - Image ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Content */}
        <div className="flex flex-col p-4">
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            {name}
          </h2>
          <p className="text-sm text-gray-500 truncate mt-1">{address}</p>

          {/* Rating */}
          <div className="mt-2 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-yellow-400 mr-1"
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke="none"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <span className="text-sm text-gray-600">
              {averageRating?.toFixed(1) || 0}
            </span>
          </div>

          {/* Fields count */}
          <p className="text-sm text-gray-600 mt-2">
            {fields.length} {fields.length === 1 ? "cancha" : "canchas"}{" "}
            disponibles
          </p>

          {/* Current day schedule */}
          <div className="mt-2">
            <p className="text-sm font-semibold">{currentDayName}:</p>
            {currentDaySchedule ? (
              currentDaySchedule.isOpen ? (
                <p className="text-sm text-gray-600">
                  {currentDaySchedule.opening_time} -{" "}
                  {currentDaySchedule.closing_time}
                </p>
              ) : (
                <p className="text-sm text-gray-600">Cerrado</p>
              )
            ) : (
              <p className="text-sm text-gray-600">Horario no disponible</p>
            )}
          </div>

          {/* Ver Más Button */}
          <div className="mt-4">
            <Link href={`/sport-centers/${id}`} passHref>
              <button className="w-full bg-yellow-600 text-white text-sm font-medium py-2 rounded transition duration-300 hover:bg-yellow-700">
                Ver más
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SportCenterCard;
