"use client";
import React, { useState } from "react";
import { IField } from "@/interfaces/field_Interface";
import Swal from "sweetalert2";
import FieldCard from "../fieldCard/fieldCard";
import { API_URL } from "@/config/config";
import { useLocalStorage } from "@/helpers/auth/useLocalStorage";
import { IUser } from "@/types/zTypes";
import { swalCustomError } from "@/helpers/swal/swal-custom-error";
import { swalNotifySuccess } from "@/helpers/swal/swal-notify-success";
import { swalConfirmation } from "@/helpers/swal/swal-notify-confirm";
import { fetchWithAuth } from "@/helpers/errors/fetch-with-token-interceptor";

interface FieldListProps {
  fields: IField[];
}

const FieldList: React.FC<FieldListProps> = ({ fields }) => {
  const [userLocalStorage] = useLocalStorage<IUser | null>("userSession", null);
  const [isLoading, setIsLoading] = useState(false);

  const handleReserve = async (
    fieldId: string,
    blockId: string,
    date: Date
  ) => {
    console.log(
      `Reserva para la cancha ${fieldId}, bloque ${blockId}, fecha ${date}`
    );

    const result = await Swal.fire({
      title: "¿Confirmar reserva?",
      text: `¿Deseas reservar la cancha para el ${date.toLocaleDateString()}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, reservar",
      cancelButtonText: "Cancelar",
    });

    if (userLocalStorage === null) {
      swalCustomError("error,necesitar iniciar sesion");
    }

    if (result.isConfirmed) {
      setIsLoading(true);
      try {
        await fetchWithAuth(`${API_URL}/reservation/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fieldId,
            fieldBlockId: blockId,
            date,
            userId: userLocalStorage?.user.id,
          }),
        });

        swalConfirmation("Reservada creada");
      } catch (error) {
        console.error("Error:", error);
        Swal.fire(
          "Error",
          "No se pudo completar la reserva. Por favor, intenta de nuevo.",
          "error"
        );
      } finally {
        setIsLoading(false);
      }
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {fields.map((field) => (
        <FieldCard
          key={field.id}
          field={field}
          onReserve={handleReserve}
          isReserving={isLoading}
        />
      ))}
    </div>
  );
};

export default FieldList;
