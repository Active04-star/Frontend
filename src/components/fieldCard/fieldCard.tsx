import React, { useEffect, useState, useCallback } from "react";
import { IField } from "@/interfaces/field_Interface";
import { format, addDays, parseISO, isAfter } from "date-fns";
import { es } from "date-fns/locale";
import { IField_Block } from "@/types/zTypes";
import { API_URL } from "@/config/config";
import { swalCustomError } from "@/helpers/swal/swal-custom-error";
import { swalNotifyError } from "@/helpers/swal/swal-notify-error";
import Swal from "sweetalert2";
import { IUser } from "@/types/zTypes";
import { swalConfirmation } from "@/helpers/swal/swal-notify-confirm";
import { fetchWithAuth } from "@/helpers/errors/fetch-with-token-interceptor";

interface FieldCardProps {
  field: IField;
  user: IUser | null;
}

const FieldCard: React.FC<FieldCardProps> = ({ field, user }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [blocks, setBlocks] = useState<IField_Block[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isReserving, setIsReserving] = useState<boolean>(false);

  const nextDays = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));

  const handleReserve = async (blockId: string) => {
    if (user === null) {
      swalCustomError("Error, necesitas iniciar sesión");
      return;
    }

   
   
   
   
   
   
   
   
   
    const result = await Swal.fire({
      title: "¿Confirmar reserva?",
      text: `¿Deseas reservar la cancha para el ${selectedDate.toLocaleDateString()}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, reservar",
      cancelButtonText: "Cancelar",
    });




    
    if (result.isConfirmed) {
      setIsReserving(true);
      try {
        await fetchWithAuth(`${API_URL}/reservation/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fieldId: field.id,
            fieldBlockId: blockId,
            date: selectedDate,
            userId: user?.user.id,
          }),
        });

        swalConfirmation("Reservada creada");
        getBlocksForDate(selectedDate);
      } catch (error) {
        console.error("Error:", error);
        Swal.fire(
          "Error",
          "No se pudo completar la reserva. Por favor, intenta de nuevo.",
          "error"
        );
      } finally {
        setIsReserving(false);
      }
    }
  };

  const getBlocksForDate = useCallback(
    async (date: Date) => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${API_URL}/field/${field.id}/blocks?date=${date.toISOString()}`
        );

        if (!response.ok) {
          swalCustomError("Ocurrio un error al traer los bloques");
        }

        const data = await response.json();
        setBlocks(data);
      } catch (error: any) {
        swalNotifyError(error);
      } finally {
        setIsLoading(false);
      }
    },
    [field.id]
  );

  useEffect(() => {
    getBlocksForDate(selectedDate);
  }, [selectedDate, getBlocksForDate]);

  const isBlockAvailable = (block: IField_Block) => {
    const now = new Date();
    const blockDate = new Date(selectedDate);
    blockDate.setHours(
      parseInt(block.start_time.split(":")[0]),
      parseInt(block.start_time.split(":")[1])
    );
    return block.status === "AVAILABLE" && isAfter(blockDate, now);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-md relative">
      {(isLoading || isReserving) && (
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
                onClick={() => handleReserve(block.id)}
                className={`px-3 py-2 rounded text-sm ${
                  isBlockAvailable(block)
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                disabled={!isBlockAvailable(block) || isReserving}
              >
                {block.start_time.slice(0, 5)} - {block.end_time.slice(0, 5)}
              </button>
            ))
          ) : (
            <div className="col-span-3 text-center">
              No hay horarios disponibles.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FieldCard;
