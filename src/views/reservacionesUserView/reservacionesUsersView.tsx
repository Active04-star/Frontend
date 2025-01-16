/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import BotonVolver from "@/components/back-button/back-button";
import ReservationCard from "@/components/userReservations/userReservations";
import { API_URL } from "@/config/config";
import { ApiStatusEnum } from "@/enum/HttpStatus.enum";
import { ReservationStatus } from "@/enum/ReservationStatus";
import { useLocalStorage } from "@/helpers/auth/useLocalStorage";
import { ErrorHelper } from "@/helpers/errors/error-helper";
import { fetchWithAuth } from "@/helpers/errors/fetch-with-token-interceptor";
import { swalNotifyError } from "@/helpers/swal/swal-notify-error";
import { swalNotifySuccess } from "@/helpers/swal/swal-notify-success";
import { IReservation } from "@/interfaces/reservation_Interface";
import { IUser } from "@/types/zTypes";
import { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";

const ReservacionesUsersView = () => {
  const [userLocalStorage] = useLocalStorage<IUser | null>("userSession", null);
  const [reservations, setReservations] = useState<IReservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [user] = useLocalStorage<IUser | null>("userSession", null);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const fetchReservations = useCallback(async () => {
    if (!userLocalStorage?.user?.id) return;
    try {
      setIsLoading(true);
      const response: IReservation[] = await fetchWithAuth(
        `${API_URL}/reservation/${userLocalStorage.user.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setShow(true);
      // Filtrar solo las reservas activas
      const activeReservations = response.filter(
        (reservation) => reservation.status === ReservationStatus.ACTIVE
      );
      setReservations(activeReservations);
    } catch (error: any) {
      if (error instanceof ErrorHelper && error.message === ApiStatusEnum.RESERVATION_NOT_FOUND) {
        setShow(false);
        setError("No tienes reservaciones aun!");
      } else if (error instanceof ErrorHelper) {
        swalNotifyError(error);
      } else {
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  }, [userLocalStorage?.user?.id]);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  const handleCancel = async (id: string) => {
    const result = await Swal.fire({
      title: "Estás seguro?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cancelarla!",
    });

    if (result.isConfirmed) {
      setCancellingId(id);
      try {
        await fetchWithAuth(`${API_URL}/reservation/cancel/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        });

        setReservations((prevReservations) =>
          prevReservations.map((reservation) =>
            reservation.id === id
              ? { ...reservation, status: ReservationStatus.CANCELLED }
              : reservation
          )
        );
        swalNotifySuccess(
          "Reserva cancelada",
          "Tu reserva ha sido cancelada exitosamente."
        );
        await fetchReservations();
      } catch (error: any) {

        if (error instanceof ErrorHelper) {
          swalNotifyError(error);

        } else {
          console.error(error);

        }

      } finally {
        setCancellingId(null);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
      </div>
    );
  }

  return (
    <div className="mt-16 max-w-7xl mx-auto p-6">
      <BotonVolver />
      <h1 className="text-3xl font-bold mb-8 text-center">Mis Reservas</h1>
      <div>
        {show &&
          <h2 className="text-xl font-semibold mb-4 text-green-600 text-center">Activas</h2>
        }
        {error !== "" ?
          <div className="mb-8 text-center">
            {error}
          </div> :
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reservations.map((reservation) => (
              <ReservationCard
                key={reservation.id}
                reservation={reservation}
                onCancel={handleCancel}
                isCancelling={cancellingId === reservation.id}
              />
            ))}
          </div>}
      </div>
    </div>

  );
};

export default ReservacionesUsersView;
