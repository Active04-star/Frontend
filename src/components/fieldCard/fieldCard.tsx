import React, { useEffect, useState } from "react";
import { IField } from "@/interfaces/field_Interface";
import { format, addDays } from "date-fns";
import { es } from "date-fns/locale";
import { IField_Block } from "@/types/zTypes";
import { API_URL } from "@/config/config";

interface FieldCardProps {
  field: IField;
  onReserve: (fieldId: string, blockId: string, date: Date) => void;
  isReserving: boolean;

}

const FieldCard: React.FC<FieldCardProps> = ({ field, onReserve,isReserving }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [blocks, setBlocks] = useState<IField_Block[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  

  const nextDays = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));

  useEffect(() => {
    getBlocksForDate(selectedDate);
  }, [selectedDate]);

  const getBlocksForDate = async (date: Date) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/field/${field.id}/blocks?date=${date.toISOString()}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch blocks");
      }
      const data = await response.json();
      setBlocks(data);
    } catch (error) {
      console.error("Error fetching blocks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-md relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex justify-center items-center z-10">
          <div className="loader border-t-4 border-yellow-600 rounded-full w-8 h-8 animate-spin"></div>
        </div>
      )}
      <div className="bg-yellow-600 text-white p-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Cancha #{field.number}</h2>
        <span className="text-lg">${field.price}/hora</span>
      </div>

      <div className="p-4">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Selecciona una fecha:</h3>
          <div className="flex overflow-x-auto space-x-2 pb-2">
            {nextDays.map((day) => (
              <button
                key={day.toISOString()}
                onClick={() => setSelectedDate(day)}
                className={`px-3 py-2 rounded-full text-sm ${
                  selectedDate.toDateString() === day.toDateString()
                    ? "bg-yellow-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {format(day, "EEE d", { locale: es })}
              </button>
            ))}
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-2">Horarios disponibles:</h3>
        <div className="grid grid-cols-3 gap-2">
          {isLoading ? (
            <div className="col-span-3 text-center">Cargando horarios...</div>
          ) : blocks.length > 0 ? (
            blocks.map((block) => (
              <button
                key={block.id}
                onClick={() => onReserve(field.id, block.id, selectedDate)}
                className={`px-3 py-2 rounded text-sm ${
                  block.status === "AVAILABLE"
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                disabled={block.status !== "AVAILABLE" || isReserving}
                >
                {block.start_time.slice(0, 5)} - {block.end_time.slice(0, 5)}
              </button>
            ))
          ) : (
            <div className="col-span-3 text-center">No hay horarios disponibles.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FieldCard;
